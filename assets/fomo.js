(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  // Entrance parameters from the published AgencyIO hero.
  const frames = (progress, offset = 0) => ({
    opacity: 0.001 + 0.999 * Math.min(1, Math.max(0, progress)),
    translate: '0 ' + (offset * (1 - progress)) + 'px'
  });
  for (const id of ['qx1f5z', '1vozo0s', 'f1sg5u']) {
    const node = document.querySelector('[data-framer-appear-id="' + id + '"]');
    if (!node) continue;
    const description = id === 'f1sg5u';
    const duration = description ? 1.2 : 0.9;
    const keyframes = Array.from({ length: 61 }, (_, i) => {
      const t = duration * i / 60;
      const progress = description
        ? 1 - 1.20710678 * Math.exp((-20 + Math.sqrt(200)) * t)
          + 0.20710678 * Math.exp((-20 - Math.sqrt(200)) * t)
        : 1 - Math.exp(-8 * t) * (Math.cos(6 * t) + 8 / 6 * Math.sin(6 * t));
      return frames(i === 60 ? 1 : progress, description ? 40 : 0);
    });
    node.animate(keyframes, { duration: duration * 1000, delay: description ? 400 : 0, fill: 'backwards' });
  }

  const wordHeadings = new Map();
  document.querySelectorAll('h2').forEach(heading => {
    const words = Array.from(heading.querySelectorAll(':scope > span')).filter(word => word.style.display === 'inline-block');
    if (!words.length) return;
    for (const word of words) word.style.transform = 'none';
    wordHeadings.set(heading, words);
  });
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reduced.matches) continue;
      const words = wordHeadings.get(target);
      if (words) {
        words.forEach((word, index) => {
          const blurred = word.style.filter.includes('blur');
          const start = { opacity: 0.001, transform: blurred ? 'translateY(10px)' : 'translateY(20px)' };
          if (blurred) start.filter = 'blur(10px)';
          word.animate([start, { opacity: 1, transform: 'none', filter: 'none' }], {
            duration: 420, delay: index * 45, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards'
          });
        });
        continue;
      }
      target.animate([
        { opacity: 0.65, translate: '0 10px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  }, { threshold: 0 });

  const selector = 'h1,h2,h3,.private-card,.private-process li,.fomo-grid article,.ps-details section,.leasing-panel,[data-framer-name="Difference card"],[data-framer-name="Pricing card wrapper"],[data-framer-name="Why choose us card"]';
  document.querySelectorAll(selector).forEach(element => { if (wordHeadings.has(element) || !element.closest('[data-framer-appear-id]')) observer.observe(element); });
})();
