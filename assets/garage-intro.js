(() => {
  const hero = document.querySelector('.garage');
  const words = hero.querySelectorAll('h1 span');
  const panels = hero.querySelectorAll('.garage-panels i');
  let active = [];
  let generation = 0;
  function stop() {
    generation++;
    active.forEach(animation => animation.cancel());
    active = [];
    hero.classList.remove('intro-running');
  }
  function play() {
    stop();
    const run = generation;
    hero.classList.add('intro-running');
    const animate = (node, frames, delay, duration) => {
      active.push(node.animate(frames,{duration,delay,fill:'backwards',easing:'cubic-bezier(.19,.72,.2,1)'}));
    };
    const starts = ['translate(-11%, 2%)','translateY(13%)','translate(11%, 2%)'];
    panels.forEach((panel,i) => animate(panel, [
      {transform:starts[i],opacity:.08},{transform:'translate(0,0)',opacity:1}
    ],[90,320,180][i],1250));
    words.forEach((word,i) => animate(word, [
      {transform:'translateY(.5em) rotate(3deg)',opacity:0,filter:'blur(7px)'},
      {transform:'none',opacity:1,filter:'blur(0)'}
    ],140+i*95,830));
    animate(document.querySelector('.site-brand'), [
      {clipPath:'inset(0 92% 0 0)',color:'#bbff00'},{clipPath:'inset(0)',color:'#eeefeb'}
    ],100,740);
    Promise.allSettled(active.map(animation => animation.finished)).then(() => {
      if (generation === run) stop();
    });
  }
  const photo = new Image();
  photo.src = new URL('assets/motor.webp',document.baseURI).href;
  photo.decode().then(() => {
    hero.classList.add('intro-ready');
    if (hero.getBoundingClientRect().bottom > 0) play();
  }).catch(() => {});
  addEventListener('pagehide',stop);
})();

