const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
const bgio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.body.style.background=e.target.dataset.bg}),{threshold:.5});
bgio.observe;
function route(){
  const h=location.hash||'#/';let v='home',scr=null;
  if(h==='#/apropos')v='apropos';else if(h==='#/maison')v='maison';else if(h==='#/una')v='una';else if(h==='#/goodspot')v='goodspot';else if(h==='#/projets')v='projets';
  $$('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));
  $('#nav').classList.toggle('on',v!=='home');
  $$('#nav div a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')===(v==='home'?'#/':v==='apropos'?'#/apropos':'#/projets')));
  document.body.style.background=v==='maison'?'#FFF5FA':'#FFF5FA';
  if(scr){const r=$('#rail');scrollTo({top:r.offsetTop+10})}else scrollTo(0,0);
  $$('#v-'+v+' .rv').forEach(e=>io.observe(e));
  if(v==='apropos')$$('#v-apropos .s').forEach(s=>bgio.observe(s));
  $$('#v-'+v+' .txt').forEach(t=>{if(t.nextElementSibling?.classList.contains('vp'))return;
    if(t.scrollHeight>t.clientHeight+4){t.classList.add('has');const b=document.createElement('button');b.className='vp';b.textContent='Voir plus';
      b.onclick=()=>{t.classList.toggle('open');b.textContent=t.classList.contains('open')?'Voir moins':'Voir plus'};t.after(b)}});
  scrollFx();
}
// survol "Mes projets" → les images deviennent des aplats projets
const hero=$('#hero');$('[data-h=p]').addEventListener('mouseenter',()=>hero.classList.add('p'));$('[data-h=p]').addEventListener('mouseleave',()=>hero.classList.remove('p'));
// carrousel piloté par le scroll
function scrollFx(){
  if(!$('#v-home').classList.contains('on'))return;
  const r=$('#rail'),t=$('#track'),max=r.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.getBoundingClientRect().top/max));
}
addEventListener('scroll',scrollFx,{passive:true});addEventListener('resize',scrollFx);
$$('[data-c]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('#contact').scrollIntoView({behavior:'smooth'})}));
addEventListener('hashchange',route);addEventListener('load',route);
// The Good Spot : compteur des datavisualisations
document.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n,dc=+(c.dataset.d||0);new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){o.disconnect();const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1800);c.textContent=(n*(1-Math.pow(1-p,3))).toFixed(dc);if(p<1)requestAnimationFrame(f)})(t0)}}),{threshold:.4}).observe(c)});

// Accueil : carrousel horizontal (scroll horizontal / glisser)
(()=>{const t=document.getElementById('track');if(!t)return;let d=false,sx=0,sl=0,m=0;
t.addEventListener('mousedown',e=>{d=true;m=0;sx=e.pageX;sl=t.scrollLeft;t.classList.add('drag')});
addEventListener('mouseup',()=>{d=false;t.classList.remove('drag')});
addEventListener('mousemove',e=>{if(!d)return;m=Math.abs(e.pageX-sx);t.scrollLeft=sl-(e.pageX-sx)});
t.addEventListener('click',e=>{if(m>6)e.preventDefault()},true)})();
// Mes projets : vidéos démo lues seulement quand elles sont visibles
(()=>{const vs=[...document.querySelectorAll('video[data-src]')];if(!vs.length)return;
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.getAttribute('src'))v.src=v.dataset.src;v.muted=true;v.play().catch(()=>{})}else v.pause()}),{threshold:.2});
vs.forEach(v=>io.observe(v))})();

// Un seul bouton « Voir plus » par page projet : révèle la suite du projet
document.addEventListener('click',e=>{const b=e.target.closest('.vp-main');if(!b)return;
const r=b.closest('.vpw').nextElementSibling,o=r.classList.toggle('open');b.textContent=o?'Voir moins':'Voir plus';b.setAttribute('aria-expanded',o);
if(!o)b.scrollIntoView({block:'center',behavior:'smooth'})});


// ===== v14 : animations & fluidité =====
(()=>{
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)],clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),root=document.documentElement;
const bar=document.createElement('div');bar.className='sp';document.body.appendChild(bar);
const crt=document.createElement('div');crt.className='crt';crt.textContent='Mathilde.';document.body.appendChild(crt);
let cr=null,cx=-100,cy=-100,tx=-100,ty=-100;
if(FINE&&!RM){cr=document.createElement('div');cr.className='cr';cr.innerHTML='<span>Voir</span>';document.body.appendChild(cr);
 addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});
 document.addEventListener('mouseover',e=>{const t=e.target;if(!t.closest)return;const c=!!t.closest('.card');cr.classList.toggle('big',c);cr.classList.toggle('sm',!c&&!!t.closest('a,button,.mr'))})}
[['.hero .p1',.05],['.hero .p2',.1],['.hero .p3',-.07],['.hero .name',.03],['.pg .c-m',.03],['.pg .c-u',-.05],['.pg .c-g',.04],['.sq3 .card:nth-child(1)',.03],['.sq3 .card:nth-child(2)',.07],['.sq3 .card:nth-child(3)',.11],['.pj > img:first-of-type',.04],['.dv',.05]].forEach(([s,v])=>qa(s).forEach(e=>e.dataset.sp=v));
qa('.th .dm').forEach(e=>e.dataset.spv=.07);
const nm=q('.hero .name');if(nm){const t=nm.textContent;nm.setAttribute('aria-label',t);nm.textContent='';[...t].forEach((c,i)=>{const s=document.createElement('span');s.className='l';s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');s.textContent=c;nm.appendChild(s)})}
const sc=q('#sc');let W=[];if(sc){W=sc.textContent.trim().split(/\s+/).map(w=>{const s=document.createElement('span');s.className='w';s.textContent=w+' ';return s});sc.textContent='';W.forEach(s=>sc.appendChild(s))}
let P=[],V=[],BG=[],lastBg='';const mq=q('.mqt2'),navEl=q('#nav');let mx=0;
function setup(){const v=q('.view.on');if(!v)return;
 qa('.pj',v).forEach(pj=>qa(':scope > section:not(.more), :scope > .rest > .rest-in > section',pj).forEach((s,i)=>s.dataset.bg=i%2?'#FBD9EC':'#FFF5FA'));
 BG=qa('[data-bg]',v);P=qa('[data-sp]',v).map(el=>({el,s:+el.dataset.sp,y:0}));V=qa('[data-spv]',v).map(el=>({el,p:el.parentElement,s:+el.dataset.spv,y:0}));
 const h=q('#hero');if(h){h.classList.remove('ready');requestAnimationFrame(()=>requestAnimationFrame(()=>h.classList.add('ready')))}}
let busy=false,shown=location.hash;removeEventListener('hashchange',route);
function swap(){shown=location.hash;route();setup()}
addEventListener('hashchange',()=>{if(shown===location.hash)return;if(RM){swap();return}if(busy)return;busy=true;
 crt.style.transition='transform .6s cubic-bezier(.76,0,.24,1)';crt.style.transform='translateY(0)';
 setTimeout(()=>{swap();setTimeout(()=>{crt.style.transform='translateY(-100%)';setTimeout(()=>{crt.style.transition='none';crt.style.transform='';busy=false;if(shown!==location.hash)swap()},650)},150)},620)});
addEventListener('load',()=>{shown=location.hash;setup()});
let last=scrollY,vel=0,fr=0;
function tick(){fr++;const y=scrollY,vh=innerHeight;vel+=((y-last)-vel)*.18;last=y;
 bar.style.width=(y/Math.max(1,document.documentElement.scrollHeight-vh)*100)+'%';
 if(navEl){if(y>240&&vel>3)navEl.classList.add('nav-hide');else if(vel<-3||y<120)navEl.classList.remove('nav-hide')}
 if(!RM){
  for(const o of P){const r=o.el.getBoundingClientRect();if(r.bottom<-300||r.top>vh+300)continue;const t=-((r.top-o.y)+r.height/2-vh/2)*o.s;o.y+=(t-o.y)*.1;o.el.style.translate=`0 ${o.y.toFixed(1)}px`}
  for(const o of V){const r=o.p.getBoundingClientRect();if(r.bottom<0||r.top>vh)continue;const t=-(r.top+r.height/2-vh/2)*o.s;o.y+=(t-o.y)*.1;o.el.style.setProperty('--py',o.y.toFixed(1)+'px')}
  if(sc&&sc.offsetParent){const r=sc.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const p=clamp((vh*.85-r.top)/(r.height+vh*.35),0,1),n=W.length;W.forEach((w,i)=>w.style.opacity=(.16+.84*clamp(p*n*1.25-i,0,1)).toFixed(2))}}
  if(mq&&mq.offsetParent){mx+=.7+Math.min(Math.abs(vel),50)*.25;const half=mq.scrollWidth/2;if(mx>=half)mx-=half;mq.style.transform=`translateX(${-mx}px) skewX(${clamp(-vel*.25,-8,8).toFixed(1)}deg)`}
  if(cr){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cr.style.transform=`translate(${cx}px,${cy}px)`}
 }
 if(fr%4===0){let c='';for(const s of BG){if(!s.offsetParent)continue;const r=s.getBoundingClientRect();if(r.top<=vh*.5&&r.bottom>vh*.5)c=s.dataset.bg}if(c&&c!==lastBg){lastBg=c;root.style.setProperty('--bg',c)}}
 requestAnimationFrame(tick)}
requestAnimationFrame(tick);
})();
