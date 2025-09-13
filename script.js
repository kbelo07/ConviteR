
// music unlock on first gesture
const audio = new Audio('./audio/trilha.mp3'); audio.loop = true; audio.volume = 0.5;
let armed = false;
function unlock(){ if(armed) return; armed = true; setTimeout(()=>audio.play().catch(()=>{}), 1000);
  ['touchstart','click','scroll','keydown'].forEach(ev=>window.removeEventListener(ev, unlock));
}
['touchstart','click','scroll','keydown'].forEach(ev=>window.addEventListener(ev, unlock), {passive:true});

// sections fade-in
const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); }),{threshold:.25});
document.addEventListener('DOMContentLoaded', ()=>document.querySelectorAll('.section').forEach(s=>io.observe(s)));

// arrow jump + hide
document.addEventListener('DOMContentLoaded', ()=>{
  const j = document.getElementById('jump');
  j.addEventListener('click', ()=>{ document.getElementById('agenda')?.scrollIntoView({behavior:'smooth'}); j.classList.add('hide'); unlock(); });
});

// names rotator
const girls=['Aurora','Isis','Luna','Laura','Helena','Elisa'];
const boys=['Gael','Noah','Theo','Samuel','Davi','Gabriel'];
let g='female',i=0; const el=document.getElementById('name');
function tick(){ const arr=g==='female'?girls:boys; el.textContent=arr[i%arr.length]; g=g==='female'?'male':'female'; i++; }
setInterval(tick,3000); tick();
