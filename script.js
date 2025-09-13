
const audio = new Audio('./audio/trilha.mp3');
audio.loop = true; audio.volume = 0.5;
let audioArmed = false;
function unlockAudio(){ if(audioArmed) return; audioArmed = true; setTimeout(()=>audio.play().catch(()=>{}), 1000);
  ['touchstart','click','scroll','keydown'].forEach(ev=>window.removeEventListener(ev, unlockAudio)); }
['touchstart','click','scroll','keydown'].forEach(ev=>window.addEventListener(ev, unlockAudio), {passive:true});

const io = new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); }); },{threshold:.25});
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.section').forEach(s=>io.observe(s));
  document.getElementById('jump')?.addEventListener('click', ()=>{
    document.querySelector('#agenda')?.scrollIntoView({behavior:'smooth'});
    document.getElementById('jump').classList.add('hide'); unlockAudio();
  });
  const female=['Aurora','Isis','Luna','Laura','Helena','Elisa'], male=['Gael','Noah','Theo','Samuel','Davi','Gabriel'];
  let g='female', i=0; const el=document.getElementById('name'); function tick(){ const arr=g==='female'?female:male;
    el.textContent = arr[i % arr.length]; g = g==='female'?'male':'female'; i++; } setInterval(tick,3000); tick();
});
