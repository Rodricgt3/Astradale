(() => {
  'use strict';
  const form = document.getElementById('private-application-form');
  const validateButton = document.getElementById('private-validate');
  const status = document.getElementById('private-form-status');
  const profile = document.getElementById('private-profile');
  const contentOptions = [...document.querySelectorAll('#private-application-form input[name="content"]')];
  const contentError = document.getElementById('private-content-error');
  if (!form || !validateButton || !status || !profile || contentOptions.length === 0) return;

  const isProfile = value => {
    const candidate = value.trim();
    if (/^@?[a-z\d._]{2,30}$/i.test(candidate)) return true;
    try {
      const url = new URL(/^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`);
      return Boolean(url.hostname.includes('.') && !url.username && !url.password);
    } catch {
      return false;
    }
  };

  profile.addEventListener('input', () => profile.setCustomValidity(''));
  contentOptions.forEach(option => option.addEventListener('change', () => {
    const selected = contentOptions.some(item => item.checked);
    contentOptions[0].setCustomValidity(selected ? '' : 'Selecciona al menos un tipo de contenido.');
    contentError.textContent = selected ? '' : 'Selecciona al menos una opción.';
  }));

  validateButton.addEventListener('click', () => {
    profile.setCustomValidity(isProfile(profile.value) ? '' : 'Escribe @usuario o pega un enlace válido a tu perfil.');
    const selected = contentOptions.some(item => item.checked);
    contentOptions[0].setCustomValidity(selected ? '' : 'Selecciona al menos un tipo de contenido.');
    contentError.textContent = selected ? '' : 'Selecciona al menos una opción.';
    if (!form.reportValidity()) {
      status.textContent = 'Revisa los campos marcados. No se envió ni guardó ningún dato.';
      return;
    }
    status.textContent = 'Los campos son válidos en este dispositivo. No se envió ni guardó nada: falta el aviso de privacidad y configurar un receptor seguro.';
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = 'El envío no está disponible. No se envió ni guardó ningún dato.';
  });
})();
