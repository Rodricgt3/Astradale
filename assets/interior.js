(() => {
  const menu = document.querySelector('.site-nav details');
  const toggle = menu.querySelector('summary');
  addEventListener('pageshow', () => { menu.open = false; });
  menu.addEventListener('toggle', () => {
    if (menu.open) {
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


// Native adaptations of React Bits Blur Text, Tilted Card and Click Spark.
(() => {
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const text = entry.target;
      observer.unobserve(text);
      if (text.children.length) continue;
      const words = text.textContent.trim().split(/\s+/);
      const fragment = document.createDocumentFragment();
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'motion-word';
        span.style.setProperty('--delay', Math.min(index * 26, 490) + 'ms');
        span.textContent = word;
        fragment.append(span, ' ');
      });
      text.replaceChildren(fragment);
    }
  });
  document.querySelectorAll('.statement p,.private-lead,.ps-intro,.leasing-lead,.fomo-prices h1').forEach(text => observer.observe(text));

  const cards = document.querySelectorAll('.offers a,.private-card,.fomo-grid article,.service-view');
  for (const card of cards) {
    let frame = 0, x = 0, y = 0;
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !mouse.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = card.getBoundingClientRect();
        card.style.setProperty('--pitch', (0.5 - (y - box.top) / box.height) * 6 + 'deg');
        card.style.setProperty('--yaw', ((x - box.left) / box.width - 0.5) * 6 + 'deg');
        card.classList.add('motion-tilt');
      });
    }, {passive:true});
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.classList.remove('motion-tilt');
    });
  }

  document.addEventListener('click', event => {
    if (!event.detail || !event.target.closest('summary,button')) return;
    const burst = document.createElement('span');
    burst.className = 'motion-spark';
    burst.setAttribute('aria-hidden','true');
    burst.style.left = event.clientX + 'px';
    burst.style.top = event.clientY + 'px';
    for (let i = 0; i < 6; i++) {
      const ray = document.createElement('i');
      ray.style.setProperty('--angle', i * 60 + 'deg');
      burst.append(ray);
    }
    document.body.append(burst);
    setTimeout(() => burst.remove(), 400);
  });
})();
