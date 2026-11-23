(() => {
  const panel = document.querySelector('.workbench');
  const tags = [...panel.querySelectorAll('#crew i')];
  const points = [[.75,.36],[.61,.58],[.82,.79]];
  let pointer, timer, visible = true, gathered = false;
  function draw() {
    const {width,height} = panel.getBoundingClientRect();
    const phase = Math.max(0, Math.min(2, Math.floor((innerHeight - panel.getBoundingClientRect().top) / (innerHeight / 3))));
    tags.forEach((tag,i) => {
      const [x,y] = points[(i + phase) % points.length];
      const near = gathered && pointer;
      const left = near ? pointer.x + [-62,12,-20][i] : x * width;
      const top = near ? pointer.y + [-30,0,30][i] : y * height;
      tag.style.transform = 'translate(' + Math.max(12, Math.min(width-tag.offsetWidth-6,left)) + 'px,' + Math.max(12,Math.min(height-tag.offsetHeight-6,top)) + 'px)';
    });
  }
  function reset() { clearTimeout(timer); gathered = false; pointer = null; draw(); }
  function mode() {
    tags.forEach((tag,i) => {
      tag.style.display = 'block';
      tag.style.transition = 'transform ' + (460+i*110) + 'ms cubic-bezier(.2,.8,.2,1)';
    });
    reset();
  }
  panel.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const box = panel.getBoundingClientRect();
    pointer = {x:event.clientX-box.left,y:event.clientY-box.top};
    clearTimeout(timer);
    timer = setTimeout(() => { gathered = true; draw(); },220);
  });
  panel.addEventListener('pointerleave',reset);
  new IntersectionObserver(([entry]) => {visible=entry.isIntersecting;}).observe(panel);
  let frame = 0;
  function schedule() {
    if (!frame && visible)
      frame = requestAnimationFrame(() => {frame=0;draw();});
  }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  mode();
})();
