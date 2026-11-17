(() => {
  'use strict';
  const button = document.getElementById('mobile-menu-toggle');
  const navigation = document.getElementById('primary-navigation');
  if (!button || !navigation) return;
  const header = button.closest('.framer-52j6z2');

  const root = document.documentElement;
  const compact = window.matchMedia('(max-width: 1439.98px)');
  const setOpen = open => {
    root.toggleAttribute('data-mobile-nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    button.textContent = open ? 'Cerrar' : 'Menú';
  };

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  header?.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a[href^="#"]')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !root.hasAttribute('data-mobile-nav-open')) return;
    setOpen(false);
    button.focus();
  });
  document.addEventListener('pointerdown', event => {
    if (!root.hasAttribute('data-mobile-nav-open')) return;
    const target = event.target;
    if (target instanceof Node && !header?.contains(target)) setOpen(false);
  });
  compact.addEventListener('change', () => setOpen(false));
  root.setAttribute('data-mobile-ready', '');
})();
