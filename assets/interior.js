(() => {
  const menu = document.querySelector('.site-nav details');
  const toggle = menu.querySelector('summary');
  addEventListener('pageshow', () => { menu.open = false; });
  menu.addEventListener('toggle', () => {
    if (menu.open && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      menu.querySelector('nav').animate(
        [{ opacity: 0, translate: '0 -6px' }, { opacity: 1, translate: '0 0' }],
        { duration: 160, easing: 'ease-out' }
      );
    }
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) || event.target.closest('nav a')) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      toggle.focus();
    }
  });
})();

