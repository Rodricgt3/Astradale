// Animate existing text blocks in place so links, prices and form labels keep their semantics.
(() => {
  const selector = 'h1,h2,h3,h4,p,small,li,dt,dd,legend,label,summary,figcaption,th,td,strong,footer a,footer b,footer span,.caption,.button,.ps-apply,.private-text-link';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const words = '.statement p,.private-lead,.ps-intro,.leasing-lead,.fomo-prices h1';
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reduced.matches || target.contains(document.activeElement)) continue;
      target.classList.add('text-arrival');
    }
  });
  for (const node of document.querySelectorAll(selector)) {
    if (node.closest('.site-nav,[aria-hidden=true],[role=status],[aria-live]') || node.matches(words)) continue;
    if (node.parentElement.closest(selector)) continue;
    observer.observe(node);
  }

  const surfaces = document.querySelectorAll('.statement,.offers,.orbit,.questions,#contact,.fomo-standalone main,.ps-hero,.ps-service,#private-clients .private-block,#private-clients .private-application');
  surfaces.forEach((surface, index) => {
    const field = document.createElement('div');
    field.className = 'light-field field-' + index % 3;
    field.setAttribute('aria-hidden','true');
    surface.classList.add('light-stage');
    surface.prepend(field);
  });
})();
