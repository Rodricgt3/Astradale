(() => {
  const reduced = window.fomoMotion;
  const scene = document.querySelector('.orbit');
  const cards = [...scene.querySelectorAll('.sat')];
  const toggle = scene.querySelector('button');
  let phase = 0, frame = 0, last = 0, visible = false, paused = false;
  function paint() {
    cards.forEach((card, i) => {
      const angle = phase + i * Math.PI * 2 / cards.length;
      const depth = Math.cos(angle);
      card.style.transform = 'translate(-50%,-50%) translate(' + Math.sin(angle)*scene.clientWidth*.39 + 'px,' + depth*scene.clientHeight*.15 + 'px) scale(' + (.76+depth*.22) + ')';
      card.style.zIndex = String(Math.round(10+depth*9));
      card.style.filter = 'brightness(' + (.72+depth*.27) + ')';
    });
  }
  function tick(now) {
    phase += last ? Math.min(now-last,65)*.00019 : 0;
    last = now;
    paint();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    paint();
    toggle.hidden = reduced.matches;
    if (visible && !paused && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
  }
  toggle.onclick = () => {
    paused = !paused;
    toggle.textContent = paused ? 'Reanudar órbita' : 'Pausar órbita';
    sync();
  };
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(scene);
  addEventListener('resize',sync);
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  const buttons = [...document.querySelectorAll('.choices button')];
  const art = document.querySelector('.service-view .tile');
  function select(button) {
    buttons.forEach(item => item.setAttribute('aria-pressed',String(item === button)));
    art.className = 'tile ' + button.dataset.art;
    art.nextElementSibling.textContent = button.dataset.copy;
    if (!reduced.matches) art.animate([{opacity:.45,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320});
  }
  buttons.forEach(button => { button.onclick = () => select(button); });
  select(buttons[0]);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    if (!reduced.matches) entry.target.animate([{opacity:.15,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out'});
  }));
  document.querySelectorAll('.experience h2,.offers a').forEach(item => observer.observe(item));
})();
