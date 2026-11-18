(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (!reduced.matches) target.animate([
        { opacity: 0.65, translate: '0 10px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  }, { threshold: 0 });

  const selector = 'h1,h2,h3,.private-card,.private-process li,.fomo-grid article,.ps-details section,.leasing-panel,[data-framer-name="Difference card"],[data-framer-name="Pricing card wrapper"],[data-framer-name="Why choose us card"]';
  document.querySelectorAll(selector).forEach(element => observer.observe(element));
})();
