(() => {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const changes = new EventTarget();
  let choice;
  try { choice = localStorage.getItem('fomo-motion'); } catch {}
  function update() {
    const mode = choice || (system.matches ? 'soft' : 'full');
    document.documentElement.dataset.motion = mode;
    changes.dispatchEvent(new Event('change'));
  }
  window.fomoMotion = {
    get matches() { return document.documentElement.dataset.motion !== 'full'; },
    addEventListener: changes.addEventListener.bind(changes),
    set(mode) {
      choice = mode;
      try { localStorage.setItem('fomo-motion',mode); } catch {}
      update();
    }
  };
  system.addEventListener('change',update);
  update();
  document.addEventListener('DOMContentLoaded', () => {
    const dock = document.querySelector('.site-nav');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'motion-choice';
    function refresh() {
      const active = !window.fomoMotion.matches;
      button.textContent = active ? 'Movimiento ✓' : 'Activar movimiento';
      button.setAttribute('aria-pressed', String(active));
    }
    button.onclick = () => window.fomoMotion.set(window.fomoMotion.matches ? 'full' : 'soft');
    dock.insertBefore(button,dock.querySelector('details'));
    changes.addEventListener('change',refresh);
    refresh();
  });
})();
