
// Music autoplay on first gesture (tap/scroll/arrow)
const audio = new Audio('./audio/trilha.mp3');
audio.loop = true;
audio.volume = 0.5;
let audioArmed = false;
function unlockAudio() {
  if (audioArmed) return;
  audioArmed = true;
  setTimeout(()=>audio.play().catch(()=>{}), 1000); // start 1s after unlock
  // remove listeners
  ['touchstart','click','scroll','keydown'].forEach(ev=>window.removeEventListener(ev, unlockAudio));
}
['touchstart','click','scroll','keydown'].forEach(ev=>window.addEventListener(ev, unlockAudio), {passive:true});

// Show sections on view
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.25});
document.querySelectorAll('.section').forEach(s=>io.observe(s));

// Arrow button jump + hide
const jump = document.getElementById('jump');
jump?.addEventListener('click', ()=>{
  const next = document.querySelector('#agenda');
  next?.scrollIntoView({behavior:'smooth'});
  jump.classList.add('hide'); // disappear after first use
  unlockAudio();
});

// Names rotator
const female = ['Aurora','Isis','Luna','Laura','Helena','Elisa'];
const male   = ['Gael','Noah','Theo','Samuel','Davi','Gabriel'];
let g='female', i=0;
const el = document.getElementById('name');
function tick(){
  const arr = g==='female'? female: male;
  el.textContent = arr[i % arr.length];
  g = (g==='female') ? 'male':'female';
  i++;
}
setInterval(tick, 3000); tick();
