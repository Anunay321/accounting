const S=[...document.querySelectorAll('.slide')],$=id=>document.getElementById(id),f=n=>'₹'+n.toLocaleString('en-IN');
let i=0,t0=performance.now(),busy=0;
let ci=0;document.querySelectorAll('h1,h2').forEach(h=>{ci=0;(function w(n,ch){[...n.childNodes].forEach(c=>{if(c.nodeType==3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p.trim()){f.append(p);return}const wd=document.createElement('span');wd.className='w';[...p].forEach(g=>{const e=document.createElement('span');e.className='ch'+(ch?' chrome':'');e.textContent=g;e.style.setProperty('--c',ci++);wd.append(e)});f.append(wd)});c.replaceWith(f)}else{const m=c.classList.contains('chrome');c.classList.remove('chrome');w(c,ch||m)}})})(h,0)});
function scr(e){const el=e.querySelector('.tag-txt')||e,o=el.dataset.o||(el.dataset.o=el.textContent),G='▓▒░#$%&*+=<>/0123456789ABCDEF';let f=0;setTimeout(()=>{const t=setInterval(()=>{el.textContent=[...o].map((c,n)=>n<f/1.5||c==' '?c:G[Math.random()*G.length|0]).join('');if(++f>o.length*1.5+2){el.textContent=o;clearInterval(t)}},35)},1200+Math.random()*500)}
const G='stroke="#000" stroke-width="5"',cn=[0,1,2].map(k=>`<rect x="44" y="${104-k*26}" width="112" height="26" fill="#ffd23f"/><ellipse cx="100" cy="${130-k*26}" rx="56" ry="16" fill="#ffd23f"/><ellipse cx="100" cy="${104-k*26}" rx="56" ry="16" fill="#ffe680"/>`).join(''),
bt=[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${60+c*28}" y="${54+r*22}" width="24" height="18" fill="${(r+c)%2?'#ff3d9a':'#ffd23f'}" stroke="#000" stroke-width="3"/>`).join('')).join('');
const SV={1:[`<svg viewBox="0 0 200 150"><g ${G}><path d="M20 40h160l-14 34H34z" fill="#ff4a1c"/><rect x="32" y="74" width="136" height="66" fill="#efeadf"/><rect x="82" y="94" width="36" height="46" fill="#5b3cff"/><rect x="42" y="88" width="30" height="26" fill="#3df0ff"/><rect x="128" y="88" width="30" height="26" fill="#3df0ff"/></g><text x="100" y="64" text-anchor="middle" font-family="Archivo Black" font-size="20">SHOP</text></svg>`,'Our shop starts with ₹50,000'],
2:[`<svg viewBox="0 0 200 140"><rect x="12" y="12" width="176" height="116" fill="#efeadf" ${G}/><path d="M100 12V128M24 48H88M24 66H88M24 84H88M24 102H88M112 48H176M112 66H176M112 84H176M112 102H176" stroke="#000" stroke-width="3" fill="none"/><text x="56" y="36" text-anchor="middle" font-family="Archivo Black" font-size="16" fill="#ff4a1c">Dr</text><text x="144" y="36" text-anchor="middle" font-family="Archivo Black" font-size="16" fill="#5b3cff">Cr</text></svg>`,'A ledger page: Dr left, Cr right'],
7:[`<svg viewBox="0 0 200 150"><g ${G}>${cn}</g><text x="100" y="58" text-anchor="middle" font-family="Archivo Black" font-size="22">₹</text></svg>`,'₹42,000 still in the till'],
9:[`<svg viewBox="0 0 200 150"><g ${G} fill="none"><path d="M100 24V122M70 128H130"/><g style="transform-origin:100px 36px;animation:rock 3s ease-in-out infinite alternate"><path d="M30 36H170M36 36L18 86H54ZM164 36L146 86H182Z" fill="#d4ff3a"/></g></g><text x="36" y="112" text-anchor="middle" font-family="Archivo Black" font-size="16">Dr</text><text x="164" y="112" text-anchor="middle" font-family="Archivo Black" font-size="16">Cr</text></svg>`,'Balancing: both sides must agree'],
10:[`<svg viewBox="0 0 200 150"><rect x="50" y="8" width="100" height="136" fill="#3df0ff" ${G}/><rect x="60" y="18" width="80" height="26" fill="#2a1a8a"/><text x="136" y="38" text-anchor="end" font-family="Space Mono" font-size="16" fill="#d4ff3a">65,000</text>${bt}</svg>`,'Calculator: do not trust at 3 AM']};
S.forEach((s,n)=>{if(!SV[n])return;const r=document.createElement('div'),p=document.createElement('div');r.className='grid r';p.className='b p pic';p.innerHTML=SV[n][0]+'<h3>'+SV[n][1]+'</h3>';r.append(p);s.firstElementChild.append(r)});
document.querySelectorAll('.grid>.b').forEach(e=>e.classList.add('r'));
const CF=[['#07070f','#efeadf','#d4ff3a','#000','#8a1c5c','#ffd23f','#0f2a6b','d'],['#5b3cff','#efeadf','#ff3d9a','#000','#2a1a8a','#3df0ff','#d4ff3a','l'],['#d4ff3a','#000','#5b3cff','#efeadf','#0b3d91','#ffd23f','#ff3d9a','l'],['#5b3cff','#efeadf','#d4ff3a','#000','#2a1a8a','#3df0ff','#ff4a1c','l'],['#ff3d9a','#000','#5b3cff','#efeadf','#8a1c5c','#ffd23f','#3df0ff','l'],['#5b3cff','#efeadf','#ff3d9a','#000','#0b3d91','#3df0ff','#ffd23f','l'],['#d4ff3a','#000','#3df0ff','#000','#8a1c5c','#ffd23f','#2a1a8a','d'],['#ff3d9a','#000','#5b3cff','#efeadf','#2a1a8a','#ffd23f','#5dffb0','l'],['#3df0ff','#000','#d4ff3a','#000','#0a6e4e','#3df0ff','#ff3d9a','l'],['#ff4a1c','#000','#5b3cff','#efeadf','#2a1a8a','#ffd23f','#3df0ff','l'],['#ff3d9a','#000','#d4ff3a','#000','#0a6e4e','#3df0ff','#4a0e6e','d'],['#3df0ff','#000','#d4ff3a','#000','#0b3d91','#ffd23f','#8a1c5c','d']];
S.forEach((s,n)=>{s.dataset.bg=CF[n][6];s.dataset.th=CF[n][7]});
S.forEach((s,n)=>{s.dataset.no=String(n+1).padStart(2,'0');const w=s.firstElementChild,t=document.createElement('div');t.className='tick r';t.innerHTML='<div>'+(' ✦ '+s.dataset.t.toUpperCase()).repeat(18)+'</div>';w.insertBefore(t,w.children[s.querySelector('.stk')?3:2]);
w.querySelectorAll('.r').forEach((e,q)=>e.style.setProperty('--d',q));$('dots').appendChild(Object.assign(document.createElement('b'),{onclick:()=>go(n)}))});
function show(n){['b1','b2','b3'].forEach((v,q)=>document.documentElement.style.setProperty('--'+v,CF[n][[5,4,2][q]]));if(n==10&&!show.w){show.w=1;setTimeout(()=>{if(i==10)celebrate()},2800)}setTimeout(()=>{if(i==n)SFX.ding()},1600);if(n==7)setTimeout(()=>{if(i==7)rain()},1700);S[n].querySelectorAll('table').forEach(t=>t.querySelectorAll('tr').forEach((r,q)=>r.style.setProperty('--q',q)));S[i].classList.remove('on');i=n;S[i].classList.add('on');S[i].scrollTop=0;['hp','ht','pp','pt','cb','pv'].forEach((v,q)=>document.documentElement.style.setProperty('--'+v,CF[i][q]));document.body.className=S[i].dataset.th;$('bg').style.background=S[i].dataset.bg;
[...$('dots').children].forEach((d,q)=>d.classList.toggle('on',q==i));$('pg').style.width=(i+1)/S.length*100+'%';
$('sl').textContent=S[i].dataset.no+' / '+S[i].dataset.t.toUpperCase();k=2.2;fade=0;S[i].querySelectorAll('.tag,.b h3').forEach(scr);cc=[];setTimeout(()=>{cc=[...document.querySelectorAll('.on .ch')].map(e=>{const r=e.getBoundingClientRect();return[e,r.left+r.width/2,r.top+r.height/2,0]})},3200);
S[i].querySelectorAll('[data-n]').forEach(e=>{const m=+e.dataset.n,st=performance.now()+1500;(function u(now){const p=Math.max(0,Math.min(1,(now-st)/1100));e.textContent=f(Math.round(m*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(u)})(st)})}
const COL=['#ff4a1c','#d4ff3a','#5b3cff','#efeadf','#3df0ff','#ff3d9a'],ST=(o)=>[o[0],{...o[1],offset:.36},{...o[1],offset:.72},o[2]];
const LK=[[{opacity:0,transform:'scale(.4) rotate(-8deg)'},{opacity:1,transform:'none',offset:.4},{opacity:1,transform:'none',offset:.62},{opacity:0,transform:'scale(1.5) rotate(4deg)'}],[{opacity:0,transform:'translateX(-70vw) skewX(30deg)'},{opacity:1,transform:'none',offset:.4},{opacity:1,transform:'none',offset:.62},{opacity:0,transform:'translateX(70vw) skewX(-30deg)'}],[{opacity:0,transform:'translateY(60vh) scaleY(2)'},{opacity:1,transform:'none',offset:.4},{opacity:1,transform:'none',offset:.62},{opacity:0,transform:'translateY(-60vh) scaleY(2)'}]];
function fx(t){const w=$('wp');[...w.children].forEach(e=>e.id!='wl'&&e.remove());
const A=(css,kf,o)=>{const e=document.createElement('div');e.style.cssText=css+';will-change:transform';w.insertBefore(e,$('wl'));e.animate(kf,Object.assign({duration:1500,fill:'both',easing:'cubic-bezier(.76,0,.24,1)'},o))};
const cx=px<0?innerWidth/2:px,cy=px<0?innerHeight/2:py,I={transform:'none'};
if(t==0)for(let n=0;n<6;n++)A(`top:0;bottom:0;left:${n*16.67}%;width:16.9%;background:${COL[n]};border-inline:3px solid #000`,ST([{transform:'translateY(-101%)'},I,{transform:'translateY(101%)'}]),{delay:n*80});
if(t==1)for(let n=0;n<8;n++)A(`left:0;right:0;top:${n*12.5}%;height:12.7%;background:${COL[n%6]};border-block:3px solid #000`,ST([{transform:`translateX(${n%2?'101%':'-101%'})`},I,{transform:`translateX(${n%2?'-101%':'101%'})`}]),{delay:n*70});
if(t==2)[0,1,2].forEach(n=>A(`left:${cx}px;top:${cy}px;width:260vmax;height:260vmax;margin:-130vmax 0 0 -130vmax;border-radius:50%;background:${['#ff4a1c','#d4ff3a','#5b3cff'][n]};border:6px solid #000`,ST([{transform:'scale(0)'},{transform:'scale(1)'},{transform:'scale(0)'}]),{delay:n*130,duration:1400}));
if(t==3)for(let n=0;n<8;n++){const u=n%2?'':'-';A(`top:-10%;bottom:-10%;left:${n*14-10}%;width:22%;background:${COL[n%6]};border-inline:4px solid #000`,ST([{transform:`skewX(-22deg) translateY(${u}120%)`},{transform:'skewX(-22deg)'},{transform:`skewX(-22deg) translateY(${n%2?'-':''}120%)`}]),{delay:n*60})}
if(t==4)for(let r=0;r<8;r++)for(let c=0;c<6;c++)A(`left:${c*16.67}%;top:${r*12.5}%;width:16.9%;height:12.7%;background:${COL[(r+c)%6]}`,[{transform:'scale(0) rotate(90deg)'},{transform:'none',offset:.3},{transform:'none',offset:.75},{transform:'scale(0) rotate(-90deg)'}],{delay:Math.random()*450,duration:1500,easing:'ease-in-out'});
if(t==5){A('inset:0;background:#2a1a8a',[{opacity:0},{opacity:1,offset:.3},{opacity:1,offset:.7},{opacity:0}],{duration:1700,easing:'linear'});
['#ff4a1c','#3df0ff','#d4ff3a'].forEach((c,n)=>{const kf=[];for(let u=0;u<18;u++){const y=Math.random()*80;kf.push({clipPath:`inset(${y}% 0 ${90-y-Math.random()*20}% 0)`,transform:`translateX(${(Math.random()-.5)*40}vw)`,opacity:u>2&&u<15?1:0})}A(`inset:0;background:${c}`,kf,{duration:1700,easing:'steps(1)'})})}
if(t==6)for(let n=0;n<14;n++)A(`left:0;right:0;top:${n*7.15}%;height:7.3%;background:${COL[n%6]};transform-origin:50% ${n%2?0:100}%`,ST([{transform:'scaleY(0) skewX(20deg)'},{transform:'scaleY(1.05)'},{transform:'scaleY(0) skewX(-20deg)'}]),{delay:n*18,duration:1800});
if(t==7)for(let n=0;n<12;n++){const p=a=>`${50+170*Math.cos(a)}% ${50+170*Math.sin(a)}%`;A(`inset:0;background:${COL[n%6]};clip-path:polygon(50% 50%,${p(n*Math.PI/6)},${p((n+1)*Math.PI/6)})`,[{opacity:0,transform:'rotate(-40deg) scale(.5)'},{opacity:1,transform:'none',offset:.38},{opacity:1,transform:'none',offset:.66},{opacity:0,transform:'rotate(40deg) scale(1.6)'}],{delay:n*25,duration:1700})}
if(t==8){[['left:0','-101%',COL[0]],['right:0','101%',COL[2]]].forEach(([q,o,c])=>A(`${q};top:0;bottom:0;width:50.5%;background:${c};border-inline:4px solid #000`,ST([{transform:`translateX(${o})`},I,{transform:`translateX(${o})`}]),{duration:1500}));A('left:0;right:0;top:48%;height:4%;background:#000',[{transform:'scaleX(0)'},{transform:'scaleX(1)',offset:.36},{transform:'scaleX(1)',offset:.72},{transform:'scaleX(0)'}],{duration:1500})}
if(t==9)[0,1,2,3].forEach(n=>A(`left:${cx}px;top:${cy}px;width:180vmax;height:180vmax;margin:-90vmax 0 0 -90vmax;background:${COL[n]};border:6px solid #000`,ST([{transform:'rotate(45deg) scale(0)'},{transform:'rotate(45deg) scale(1)'},{transform:'rotate(45deg) scale(0)'}]),{delay:n*110,duration:1500}));
if(t==10)for(let n=0;n<7;n++)A(`top:0;bottom:0;left:${n*14.3}%;width:14.5%;background:${COL[n%6]};border-inline:3px solid #000;transform-origin:${n%2?'0':'100%'} 50%`,ST([{transform:'perspective(900px) rotateY(95deg)'},{transform:'perspective(900px) rotateY(0)'},{transform:'perspective(900px) rotateY(-95deg)'}]),{delay:n*70});
if(t==11)for(let r=0;r<6;r++)for(let c=0;c<8;c++)A(`left:${c*12.5}%;top:${r*16.67}%;width:12.7%;height:16.9%;background:${COL[(r+c)%6]}`,[{transform:'scale(0)'},{transform:'scale(1.02)',offset:.25},{transform:'scale(1.02)',offset:.75},{transform:'scale(0)'}],{delay:(r+c)*30,duration:1500,easing:'cubic-bezier(.7,0,.3,1)'});
if(t==12)A(`left:50%;top:50%;width:250vmax;height:250vmax;margin:-125vmax 0 0 -125vmax;border-radius:50%;background:conic-gradient(${COL[0]},${COL[1]},${COL[2]},${COL[4]},${COL[5]},${COL[0]})`,ST([{transform:'rotate(-180deg) scale(0)'},{transform:'rotate(0deg) scale(1)'},{transform:'rotate(180deg) scale(0)'}]),{duration:1600});
if(t==13){A('inset:0;background:#ffd23f',[{opacity:0},{opacity:1,offset:.3},{opacity:1,offset:.7},{opacity:0}],{duration:1700,easing:'linear'});A('inset:0;display:grid;place-items:center;font:400 70vmin/1 "Archivo Black",sans-serif;color:#000;text-shadow:8px 8px 0 #fff',ST([{transform:'rotateY(-540deg) scale(.2)',opacity:0},{transform:'none',opacity:1},{transform:'rotateY(540deg) scale(.2)',opacity:0}]),{duration:1700});$('wl').previousElementSibling.textContent='₹'}
$('wl').animate(LK[t%3],{duration:1700,fill:'both'})}
let lk=-1;const pick=()=>{let t;do{t=Math.random()*14|0}while(t==lk);return lk=t};function go(n){n=Math.max(0,Math.min(S.length-1,n));if(n==i||busy)return;if(LITE){SFX.tick(3);show(n);return}busy=1;const tk=pick();SFX.tr(tk);$('wl').innerHTML=S[n].dataset.no+'<br>'+S[n].dataset.t;const w=$('wp');w.style.display='block';fx(tk);setTimeout(()=>show(n),1050);setTimeout(()=>shower(36),1600);setTimeout(()=>{busy=0;w.style.display='none'},2150)}
$('pv').onclick=()=>go(i-1);$('nx').onclick=()=>go(i+1);
addEventListener('keydown',e=>{const lb=$('poster-lightbox');if(lb&&lb.classList.contains('open')){if(e.key=='Escape'){closeLightbox();return}if(e.key=='ArrowRight'||e.key=='ArrowDown'){nextPoster();return}if(e.key=='ArrowLeft'||e.key=='ArrowUp'){prevPoster();return}return}const pm=$('poster-modal');if(pm&&pm.classList.contains('open')){if(e.key=='Escape'){closePosterModal();return}if(e.key=='ArrowRight'||e.key=='ArrowDown'){nextPoster();return}if(e.key=='ArrowLeft'||e.key=='ArrowUp'){prevPoster();return}return}if(e.target.isContentEditable)return;if('ArrowRight ArrowDown PageDown'.includes(e.key)||e.key==' ')go(i+1);if('ArrowLeft ArrowUp PageUp'.includes(e.key))go(i-1)});
let sx,sy;addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>70&&Math.abs(dy)<50)go(i+(dx<0?1:-1))});
setInterval(()=>{const s=(performance.now()-t0)/1e3|0;$('tc').textContent='TC 00:'+String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},250);
document.addEventListener('click',e=>{const c=e.target.closest('#st1 .chip,#st2 .chip');if(c){c.classList.toggle('done');SFX.pop(c.classList.contains('done'))}const h=e.target.closest('.hl');if(h){h.style.background=h.style.background?'':'var(--v)'}});
// tilt + cursor + particles
let mx=0,my=0,px=-999,py=-999,tx=0,ty=0,k=1;const cur=$('cur');
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;mx=px/innerWidth-.5;my=py/innerHeight-.5;cur.style.left=px+'px';cur.style.top=py+'px';
const b=e.target.closest&&e.target.closest('.b');if(b){const r=b.getBoundingClientRect();b.style.setProperty('--ry',((px-r.left)/r.width-.5)*8+'deg');b.style.setProperty('--rx',-((py-r.top)/r.height-.5)*8+'deg')}});
addEventListener('pointerout',e=>{const b=e.target.closest&&e.target.closest('.b');if(b){b.style.setProperty('--rx','0deg');b.style.setProperty('--ry','0deg')}});
const cv=$('cv'),x=cv.getContext('2d');let W,H,fade=0,pls=0,fr=0;const TR=[],RG=[],rt=document.documentElement.style;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}addEventListener('resize',rs);rs();
const TCH=matchMedia('(hover:none)').matches;let cc=[];
addEventListener('pointermove',e=>{TR.push([e.clientX,e.clientY]);if(TR.length>26)TR.shift();if(TCH)return;cc.forEach(c=>{const dx=e.clientX-c[1],dy=e.clientY-c[2],d=Math.hypot(dx,dy);if(d<130){const f=1-d/130;c[0].style.translate=`${-dx*f*.3}px ${-dy*f*.3}px`;c[0].style.scale=1+f*.5;c[3]=1}else if(c[3]){c[0].style.translate=c[0].style.scale='';c[3]=0}})});
addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY;pls=1;k=1.35;RG.push({x:px,y:py,r:10})});
const SP=[],RN=[],GL='Dr Cr ₹ 0 1 2 3 5 7 8 + = % Dr Cr'.split(' '),ln=(a,b,c,d)=>{x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke()};
for(let n=0;n<240;n++){const y=1-2*(n+.5)/240,r=Math.sqrt(1-y*y),g=n*2.39996;SP.push([Math.cos(g)*r,y,Math.sin(g)*r])}
for(let n=0;n<Math.ceil(innerWidth/34)+1;n++)RN.push({x:n*34,y:Math.random()*innerHeight,s:2+Math.random()*4,t:Math.random()*50|0});
function rot(p,a,b){const ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);let X=p[0]*ca+p[2]*sa,Z=p[2]*ca-p[0]*sa,Y=p[1]*cb-Z*sb;Z=Z*cb+p[1]*sb;return[X,Y,Z]}
let LITE=(()=>{try{const v=localStorage.getItem('lite');if(v!==null)return v=='1'}catch(e){}return matchMedia('(prefers-reduced-motion:reduce)').matches})();document.documentElement.classList.toggle('lite',LITE);
const FL=Array.from({length:32},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,v:.3+Math.random()*.9,s:2+(Math.random()*4|0),g:GL[Math.random()*GL.length|0],c:COL[Math.random()*6|0],r:Math.random()*6,vr:(Math.random()-.5)*.02,ph:Math.random()*6})),BL=$('blobs');
(function d(T){if(LITE||busy||document.hidden||(TCH&&(fr&1))){fr++;requestAnimationFrame(d);return}x.clearRect(0,0,W,H);fr++;tx+=(mx-tx)*.05;ty+=(my-ty)*.05;k+=(1-k)*.05;pls*=.95;fade+=(1-fade)*.04;
const L=document.body.classList.contains('l'),ink=L?'#5b3cff':'#fff',a=T/3500+tx*3,b=ty*2,R=Math.min(W,H)*.42*k,cx=W/2,cy=H/2,s=i%8;x.globalAlpha=fade;x.lineWidth=1.6;x.strokeStyle=ink;
if(s==0){const cxs=cx-mx*160+Math.sin(T/1500)*30,cys=cy-my*160+Math.cos(T/1900)*30,sp=T/1800*(1+pls*3),M=Math.max(W,H);x.lineWidth=4;
for(let n=0;n<16;n++){const z=(n/16+sp)%1,sc=Math.pow(z,2.2)*M*1.1,rt=T/2500+n*.18+(1-z)*2;x.globalAlpha=fade*Math.min(1,z*3)*(1-z*.35);x.strokeStyle=L?'#5b3cff':COL[n%5];x.beginPath();for(let v=0;v<=4;v++){const an=rt+v*Math.PI/2;x.lineTo(cxs+Math.cos(an)*sc*.7,cys+Math.sin(an)*sc*.7)}x.stroke()}
x.lineWidth=2;for(let n=0;n<60;n++){const an=n*2.399+Math.sin(n),z=(n*.137+sp*1.7)%1,r1=z*z*M,r2=Math.pow(Math.min(1,z+.06),2)*M;x.globalAlpha=fade*z;x.strokeStyle=n%3?(L?'#5b3cff':'#fff'):'#d4ff3a';ln(cxs+Math.cos(an)*r1,cys+Math.sin(an)*r1,cxs+Math.cos(an)*r2,cys+Math.sin(an)*r2)}}
if(s==1){const hz=H*.5+my*H*.15,vx=W/2+mx*W*.4;for(let j=0;j<16;j++){const e=((j+(T/500)%1)/16),h=e*e*H*.55;x.globalAlpha=fade*e;x.strokeStyle=L?'#5b3cff':'#ff4a1c';ln(0,hz+h,W,hz+h);ln(0,hz-h,W,hz-h)}
x.globalAlpha=fade*.7;x.strokeStyle=L?'#5b3cff':'#3df0ff';for(let n=-14;n<=14;n++){const bx=vx+n*W*.18;ln(vx,hz,bx,H);ln(vx,hz,bx,0)}}
if(s==2){for(let n=0;n<240;n++){const p=rot(SP[n],a,b);let sx=cx+p[0]*R,sy=cy+p[1]*R;const dx=sx-px,dy=sy-py,q=dx*dx+dy*dy;if(q<16000){const m=(1-q/16000)*45/Math.sqrt(q+1);sx+=dx*m;sy+=dy*m}x.fillStyle=n%6==3?'#d4ff3a':n%6==4?'#ff4a1c':n%6==5?'#5b3cff':ink;const z=2+(p[2]+1)*1.8;x.fillRect(sx,sy,z,z)}}
if(s==3){for(let r=-9;r<=9;r++){x.beginPath();for(let c=-10;c<=10;c++){const dd=Math.hypot(c*.19-(px/W-.5)*3,r*.19-(py/H-.5)*3),p=rot([c*.19,Math.sin(c*.5+T/500)*Math.cos(r*.5-T/700)*.2+Math.sin(dd*8-T/150)*.05*pls*6,r*.19],tx*2,.9+ty);x.lineTo(cx+p[0]*R*1.8,cy+p[1]*R*1.8)}x.strokeStyle=L?'#5b3cff':(r%2?'#d4ff3a':'#3df0ff');x.stroke()}}
if(s==4){for(let n=0;n<5;n++){x.strokeStyle=L?'#5b3cff':COL[n];x.beginPath();for(let u=0;u<=64;u++){const th=u/64*6.2832,p=rot(rot([Math.cos(th),0,Math.sin(th)],n*.7+T/6000,n*.5+ty*2),0,0);x.lineTo(cx+p[0]*R*1.2,cy+p[1]*R*1.2)}x.stroke();
for(let u=0;u<10;u++){const th=u*.63+T/(900+n*250),p=rot([Math.cos(th),0,Math.sin(th)],n*.7+T/6000,n*.5+ty*2);x.fillStyle=COL[(n+u)%5];x.fillRect(cx+p[0]*R*1.2-5,cy+p[1]*R*1.2-5,10,10)}}
const V=[];for(let n=0;n<8;n++)V.push(rot([(n&1?.2:-.2),(n&2?.2:-.2),(n&4?.2:-.2)],a*2,b*2));x.strokeStyle=L?'#5b3cff':'#fff';for(let u=0;u<8;u++)for(let v=u+1;v<8;v++){const m=u^v;if(m==1||m==2||m==4)ln(cx+V[u][0]*R*1.2,cy+V[u][1]*R*1.2,cx+V[v][0]*R*1.2,cy+V[v][1]*R*1.2)}}
if(s==5){x.font='700 16px "Space Mono",monospace';RN.forEach(c=>{c.y+=c.s*(1+pls*4);if(c.y>H+300)c.y=-Math.random()*300;const nr=Math.abs(c.x-px)<70;for(let n=0;n<9;n++){x.globalAlpha=fade*(1-n/9)*(nr?1:.65);x.fillStyle=n?(L?'#5b3cff':'#d4ff3a'):(L?'#ff3d9a':'#fff');x.fillText(GL[(c.t+n*3+(T/400|0))%GL.length],c.x,c.y-n*18)}})}
if(s==6){for(let n=0;n<9;n++){const z=(n/9+T/4000)%1;x.globalAlpha=fade*(1-z);x.lineWidth=3;x.strokeStyle=L?'#5b3cff':COL[n%5];x.beginPath();x.arc(cx-mx*80,cy-my*80,z*Math.max(W,H)*.7,0,6.2832);x.stroke()}x.globalAlpha=fade*.6;x.lineWidth=2;x.strokeStyle=ink;for(let n=0;n<12;n++){const an=T/3000+n*.5236;ln(cx,cy,cx+Math.cos(an)*Math.max(W,H),cy+Math.sin(an)*Math.max(W,H))}}
if(s==7){for(let n=0,N=Math.ceil(W/28);n<N;n++){const h=(.25+.2*Math.sin(T/500+n*.5)+.15*Math.sin(T/800+n*1.3)+.2*Math.max(0,1-Math.abs(n*28-px)/200)*(1+pls))*H*.7;x.globalAlpha=fade*.8;x.fillStyle=n%2?(L?'#5b3cff':'#d4ff3a'):(L?'#ff3d9a':'#ff4a1c');x.fillRect(n*28,H-h,22,h)}}
BL.style.translate=`${-mx*50}px ${-my*50}px`;x.globalAlpha=fade*.5;FL.forEach(p=>{p.y-=p.v;p.x+=Math.sin(T/1600+p.ph)*.35;p.r+=p.vr;if(p.y<-40){p.y=H+40;p.x=Math.random()*W}const dx=p.x-px,dy=p.y-py,q=dx*dx+dy*dy;if(q<14400){const m=(1-q/14400)*3/Math.sqrt(q+1);p.x+=dx*m;p.y+=dy*m}x.save();x.translate(p.x-mx*p.s*3,p.y-my*p.s*3);x.rotate(p.r);x.font=`700 ${p.s*7}px "Space Mono",monospace`;x.fillStyle=L?'#000':p.c;x.fillText(p.g,0,0);x.restore()});
x.globalAlpha=1;x.lineWidth=4;if(TR.length&&Math.random()<.4)TR.shift();TR.forEach((p,n)=>{const u=(n+1)/TR.length;x.fillStyle=COL[n%5];x.fillRect(p[0]-7*u,p[1]-7*u,14*u,14*u)});
RG.forEach(r=>{r.r+=14;x.globalAlpha=Math.max(0,1-r.r/(Math.max(W,H)*.6));x.strokeStyle=L?'#5b3cff':'#d4ff3a';x.beginPath();x.arc(r.x,r.y,r.r,0,6.2832);x.stroke()});while(RG.length&&RG[0].r>Math.max(W,H))RG.shift();
requestAnimationFrame(d)})(0);
// engine: one ledger model drives journal, ledger, equation bar and trial balance
const AC={cash:'Cash A/c',cap:'Capital A/c',fur:'Furniture A/c',pur:'Purchases A/c',sal:'Sales A/c',ami:"Amit's A/c",rav:"Ravi's A/c"},SH={cash:'Cash',cap:'Capital',fur:'Furniture',pur:'Purchases',sal:'Sales',ami:'Amit',rav:'Ravi'},
JN=[['Owner invests cash',50000,'cash','cap'],['Furniture bought for cash',10000,'fur','cash'],['Goods bought on credit from Ravi',8000,'pur','rav'],['Goods sold on credit to Amit',12000,'ami','sal'],['Cash received from Amit',7000,'cash','ami'],['Cash paid to Ravi',5000,'rav','cash']],
LN=n=>{const[,a,d,c]=JN[n];return[[n,d,'D',a,'To '+SH[c]],[n,c,'C',a,'By '+SH[d]]]},
lines=(ids,m)=>ids.flatMap(n=>LN(n).map(l=>m?m(l):l).filter(Boolean)),
tot=(L,k)=>L.filter(l=>l[1]==k).reduce((o,l)=>(o[l[2]]+=l[3],o),{D:0,C:0}),
fm=v=>(v<0?'−':'')+f(Math.abs(v)),on=new Set(),O=()=>[...on].sort((a,b)=>a-b);
let bz=0,balNew=0,fresh=-1,em='';
const SFX=(()=>{let c,m=0,u=0;try{m=localStorage.getItem('mute')=='1'}catch(e){}
['pointerdown','keydown','touchstart'].forEach(e=>addEventListener(e,()=>u=1,{once:true,capture:true}));
const g=()=>{if(m||!u)return 0;if(!c){try{c=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return 0}}c.state=='suspended'&&c.resume();return c},
o=(f,t,d,ty,v,f2)=>{const a=g();if(!a)return;const s=a.currentTime+t,os=a.createOscillator(),gn=a.createGain();os.type=ty;os.frequency.setValueAtTime(f,s);f2&&os.frequency.exponentialRampToValueAtTime(f2,s+d);gn.gain.setValueAtTime(v,s);gn.gain.exponentialRampToValueAtTime(.0001,s+d);os.connect(gn).connect(a.destination);os.start(s);os.stop(s+d+.02)},
nz=(t,d,fq,f2,v)=>{const a=g();if(!a)return;const s=a.currentTime+t,b=a.createBuffer(1,a.sampleRate*d|0,a.sampleRate),h=b.getChannelData(0);for(let n=0;n<h.length;n++)h[n]=Math.random()*2-1;const sr=a.createBufferSource(),fl=a.createBiquadFilter(),gn=a.createGain();sr.buffer=b;fl.type='bandpass';fl.Q.value=1.2;fl.frequency.setValueAtTime(fq,s);fl.frequency.exponentialRampToValueAtTime(f2,s+d);gn.gain.setValueAtTime(v,s);gn.gain.exponentialRampToValueAtTime(.0001,s+d);sr.connect(fl).connect(gn).connect(a.destination);sr.start(s)},
R=[()=>nz(0,.5,3000,300,.5),()=>{o(200,0,.5,'sine',.1,1200);nz(0,.45,500,4000,.25)},()=>{o(150,0,.3,'sine',.25,40);nz(0,.4,2500,200,.35)},()=>o(1800,0,.35,'square',.04,200),()=>[0,1,2,3,4,5].forEach(q=>o(500+Math.random()*900,q*.06,.08,'triangle',.07)),()=>{for(let q=0;q<9;q++)o(200+Math.random()*1500,q*.045,.05,'square',.04)},()=>{o(100,0,.4,'sawtooth',.05,420);o(420,.4,.3,'sawtooth',.04,90)},()=>[1046,1318,1568,2093,2637].forEach((n,q)=>o(n,q*.06,.2,'sine',.07))];
return{tick:q=>o(700+q*140,0,.09,'square',.05),cha:()=>{o(1318,0,.25,'triangle',.12);o(1976,.11,.5,'triangle',.12)},buzz:()=>{o(110,0,.45,'sawtooth',.08,70);o(116,0,.45,'sawtooth',.06,74)},win:()=>[523,659,784,1046].forEach((n,q)=>o(n,q*.09,.3,'triangle',.1)),
tr:t=>R[t%8](),coin:()=>{o(2093,0,.08,'sine',.1);o(2794,.07,.25,'sine',.1)},pop:up=>o(up?420:520,0,.12,'sine',.12,up?900:260),ding:()=>o(880,0,.5,'sine',.05,1320),thump:()=>{o(160,0,.3,'sine',.3,40);nz(0,.15,1200,200,.3)},sad:()=>[392,349,311,262].forEach((n,q)=>o(n,q*.17,.3,'sawtooth',.05)),
off:()=>m,mute:()=>{m=!m;try{localStorage.setItem('mute',m?1:0)}catch(e){}return m}}})();
$('mu').textContent=SFX.off()?'🔇':'🔊';$('mu').onclick=()=>{$('mu').textContent=SFX.mute()?'🔇':'🔊'};
function jr(){$('jr').innerHTML=on.size?O().map(n=>{const[ds,a,d,c]=JN[n];return `<div class="jl" data-t="${n}" data-a="${d}"><span>${n+1}. ${AC[d]} Dr.</span><b>${f(a)}</b></div><div class="jl" data-t="${n}" data-a="${c}"><span>&nbsp;&nbsp;To ${AC[c]}</span><b>${f(a)}</b></div><div class="jn">(${ds})</div>`}).join(''):'<div class="jn">Nothing recorded yet. Tap a transaction above.</div>'}
function acc(){const L=lines(O()),ks=Object.keys(AC).filter(k=>L.some(l=>l[1]==k)),s=balNew?'':' s',a=(cl,l,v)=>`<div class="row ${cl}${s}"><span>${l}</span><b>${v.toLocaleString('en-IN')}</b></div>`,tt=v=>`<div class="tt${s}"><span>Total</span><b>${f(v)}</b></div>`;
$('acc').innerHTML=ks.length?ks.map(k=>{const R=L.filter(l=>l[1]==k),r=l=>`<div class="row ${l[0]==fresh?'h':'s'}" data-t="${l[0]}" data-a="${k}"><span>${l[4]}</span><b>${l[3].toLocaleString('en-IN')}</b></div>`,t=tot(L,k),d=t.D,c=t.C,v=d-c;
let D=R.filter(l=>l[2]=='D').map(r).join(''),C=R.filter(l=>l[2]=='C').map(r).join(''),ex='';
if(bz){if(v>0)C+=a('cd','By Balance c/d',v);if(v<0)D+=a('cd','To Balance c/d',-v);ex=tt(Math.max(d,c))+tt(Math.max(d,c))+`<div>${v>0?a('bd','To Balance b/d',v):''}</div><div>${v<0?a('bd','By Balance b/d',-v):''}</div>`}
return `<div class="b" style="padding:0"><h3 style="background:var(--paper);color:#000;padding:6px;margin:0;text-align:center">${AC[k]}</h3><div class="t" style="border:0"><div>${D}</div><div>${C}</div>${ex}<div class="bal ${v>0?'k':'o2'}">${v==0?'Settled':(v>0?'Dr balance ':'Cr balance ')+f(Math.abs(v))}</div></div></div>`}).join(''):'<div class="jn">Post a transaction to open ledger accounts.</div>'}
function eq(){const L=lines(O()),n=k=>{const t=tot(L,k);return t.D-t.C},A=n('cash')+n('fur')+n('ami'),Li=-n('rav'),Cp=-n('cap'),N=-n('pur')-n('sal'),bx=(l,v)=>`<div><small>${l}</small><b>${fm(v)}</b></div>`;
$('eq').innerHTML=`<h3>Accounting equation</h3><br><div class="eqr">${bx('Assets',A)}<i>=</i>${bx('Liabilities',Li)}<i>+</i>${bx('Capital',Cp)}<i>+</i>${bx('Sales − Purchases',N)}</div><div class="${A==Li+Cp+N?'k':'o2'}" style="margin-top:6px">${A==Li+Cp+N?'✓ Equal after every double entry':'✗ Out of balance'}</div>`}
function draw(){[...$('tx').children].forEach((c,n)=>c.classList.toggle('done',on.has(n)));$('bl').textContent=bz?'Unbalance':'Balance accounts';jr();acc();eq()}
function fly(n){document.querySelectorAll(`#acc .row[data-t="${n}"]`).forEach((el,q)=>{const s=document.querySelector(`#jr .jl[data-t="${n}"][data-a="${el.dataset.a}"]`);if(!s){el.classList.remove('h');return}
const a=s.getBoundingClientRect(),b=el.getBoundingClientRect(),g=document.createElement('div');g.className='ghost';g.innerHTML=el.innerHTML;g.style.cssText=`left:${a.left}px;top:${a.top}px;width:${Math.max(b.width,130)}px`;document.body.append(g);
g.animate([{transform:'none'},{transform:`translate(${b.left-a.left}px,${b.top-a.top}px) rotate(-3deg)`}],{duration:750,delay:q*220,easing:'cubic-bezier(.6,0,.2,1)',fill:'both'}).onfinish=()=>{g.remove();el.classList.remove('h');SFX.tick(q);land(el)}})}
function tog(n){if(on.has(n)){on.delete(n);draw();return}on.add(n);fresh=n;draw();fly(n);fresh=-1}
JN.forEach((q,n)=>{$('tx').appendChild(Object.assign(document.createElement('button'),{className:'chip',textContent:(n+1)+' '+q[0]+' '+f(q[1]),onclick:()=>tog(n)}))});
$('all').onclick=()=>{let q=0;JN.forEach((_,n)=>{if(!on.has(n))setTimeout(()=>tog(n),q++*1100)});if(q)setTimeout(rain,q*1100+500)};
$('rst').onclick=()=>{on.clear();bz=0;draw()};
$('bl').onclick=()=>{bz=!bz;balNew=1;draw();balNew=0;if(bz&&on.size){setTimeout(()=>SFX.tick(1),350);setTimeout(()=>SFX.tick(4),900);setTimeout(()=>{SFX.cha();blast(innerWidth/2,innerHeight/2,30,9)},1450)}};
draw();
// trial balance, computed from the same ledger lines
const MU={amt:['Wrong amount: the ₹7,000 received from Amit was posted to his account as ₹6,000.',l=>l[0]==4&&l[1]=='ami'?[l[0],l[1],l[2],6000,l[4]]:l],
side:["Wrong side: the credit purchase from Ravi was posted on the debit side of Ravi's account.",l=>l[0]==2&&l[1]=='rav'?[l[0],l[1],'D',l[3],l[4]]:l],
omit:["Omission: the ₹5,000 paid to Ravi was never posted to Ravi's account.",l=>l[0]==5&&l[1]=='rav'?null:l],
comp:["Compensating errors: Amit's sale posted as ₹13,000 and Ravi's purchase as ₹9,000. Two ₹1,000 slips on opposite sides cancel out.",l=>l[0]==3&&l[1]=='ami'?[l[0],l[1],l[2],13000,l[4]]:l[0]==2&&l[1]=='rav'?[l[0],l[1],l[2],9000,l[4]]:l]};
function boom(){const r=$('tb').getBoundingClientRect(),cs=['#ff4a1c','#d4ff3a','#5b3cff','#3df0ff','#ff3d9a'];for(let n=0;n<(LITE?14:48);n++){const e=document.createElement('i'),a=Math.random()*6.28,d=140+Math.random()*260;e.className='cf';e.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;background:${cs[n%5]}`;document.body.append(e);
e.animate([{transform:'none',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d-80}px) rotate(${Math.random()*720}deg)`,opacity:1,offset:.6},{transform:`translate(${Math.cos(a)*d*1.1}px,${Math.sin(a)*d+240}px) rotate(900deg)`,opacity:0}],{duration:1400+Math.random()*500,easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish=()=>e.remove()}}
function tb(snd){const m=MU[em],L=lines(JN.map((_,n)=>n),m&&m[1]),rows=['cash','fur','pur','ami','cap','sal','rav'].map(k=>{const t=tot(L,k),v=t.D-t.C;return[SH[k],v>0?v:0,v<0?-v:0]}),D=rows.reduce((s,r)=>s+r[1],0),C=rows.reduce((s,r)=>s+r[2],0);
$('tb').innerHTML='<tr><th>Account</th><th>Debit</th><th>Credit</th></tr>'+rows.map((r,q)=>`<tr style="--q:${q+1}"><td>${r[0]}</td><td class="n">${r[1]?f(r[1]):''}</td><td class="n">${r[2]?f(r[2]):''}</td></tr>`).join('')+`<tr><th>Total</th><th class="n">${f(D)}</th><th class="n">${f(C)}</th></tr>`;
$('stt').innerHTML=D!=C?'<span class="o2">MISMATCH of '+f(Math.abs(D-C))+'. Find the posting error!</span>':em=='comp'?'<span class="o2">BALANCED, but the books are still wrong!</span>':'<span class="k">BALANCED. Debits = Credits</span>';
const ag=Math.max(-20,Math.min(20,-(D-C)/Math.max(D,C,1)*300));$('bm').style.transform=`rotate(${ag}deg)`;$('bm').querySelectorAll('span').forEach(e=>e.style.transform=`rotate(${-ag}deg)`);$('pl').textContent='Dr '+f(D);$('pr').textContent='Cr '+f(C);
$('hint').textContent=m?m[0]:'Pick an error to inject, then try to spot it from the totals.';
if(snd){if(D!=C||em){$('tb').classList.remove('bad');void $('tb').offsetWidth;$('tb').classList.add('bad');D!=C?SFX.buzz():(SFX.sad(),stamp('Still wrong','#ff4a1c'))}else celebrate()}}
document.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{em=b.dataset.e;tb(1)});tb();
function spark(el){const r=el.getBoundingClientRect();for(let n=0;n<8;n++){const e=document.createElement('i'),a=n*.785;e.className='cf';e.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;width:7px;height:7px;background:${COL[n%6]}`;document.body.append(e);e.animate([{transform:'none',opacity:1},{transform:`translate(${Math.cos(a)*50}px,${Math.sin(a)*50}px)`,opacity:0}],{duration:600,easing:'ease-out'}).onfinish=()=>e.remove()}}
function pup(el,t,c){const r=el.getBoundingClientRect(),e=document.createElement('b');e.className='pup';e.textContent=t;e.style.cssText=`left:${r.right-70}px;top:${r.top}px;color:${c}`;document.body.append(e);e.animate([{transform:'translateY(0) scale(.6)',opacity:0},{transform:'translateY(-22px) scale(1.2)',opacity:1,offset:.25},{transform:'translateY(-70px) scale(1)',opacity:0}],{duration:1100}).onfinish=()=>e.remove()}
function land(el){const dr=el.parentElement==el.parentElement.parentElement.children[0],b=el.closest('.b');{const q=el.getBoundingClientRect();blast(q.left+q.width/2,q.top+q.height/2,10,5)}pup(el,(dr?'Dr ₹':'Cr ₹')+el.lastElementChild.textContent,dr?'#d4ff3a':'#ff4a1c');b&&b.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:340})}
function rain(){if(LITE){SFX.coin();return}for(let q=0;q<6;q++)setTimeout(SFX.coin,q*170+Math.random()*90);for(let n=0;n<26;n++){const e=document.createElement('i');e.className='coin';e.textContent='₹';e.style.left=Math.random()*96+'vw';document.body.append(e);e.animate([{transform:'translateY(-10vh) rotateY(0)'},{transform:`translateY(110vh) rotateY(${720+Math.random()*720}deg)`}],{duration:1800+Math.random()*1400,delay:Math.random()*900,easing:'cubic-bezier(.4,0,.8,.6)',fill:'backwards'}).onfinish=()=>e.remove()}}
function stamp(t,c){const r=$('tb').getBoundingClientRect(),e=document.createElement('div'),k=(s,o,p)=>({transform:`translate(-50%,-50%) rotate(-12deg) scale(${s})`,opacity:o,offset:p});e.className='stamp';e.textContent=t;e.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;color:${c};border-color:${c}`;document.body.append(e);e.animate([k(4,0,0),k(1,1,.25),k(1.06,1,.3),k(1,1,.8),k(1,0,1)],{duration:1900}).onfinish=()=>e.remove();setTimeout(SFX.thump,420)}
function celebrate(){boom();stamp('Balanced','#d4ff3a');SFX.win();shower(70);const r=$('tb').getBoundingClientRect();blast(r.left+r.width/2,r.top+r.height/2,40,10)}
// live character physics: blast + falling shower on an overlay canvas
const FX=$('fx'),fc=FX.getContext('2d'),PT=[];let rf=0;
function fxr(){FX.width=innerWidth;FX.height=innerHeight}fxr();addEventListener('resize',fxr);
const gl=()=>GL[Math.random()*GL.length|0];
function blast(x,y,n,pw){if(PT.length>320)return;if(LITE)n=Math.min(n,8);for(let q=0;q<n;q++){const a=Math.random()*6.283,v=2+Math.random()*(pw||7);PT.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,g:gl(),c:COL[Math.random()*6|0],s:12+Math.random()*16,r:0,vr:(Math.random()-.5)*.4,l:1})}run()}
function shower(n){if(PT.length>320)return;if(LITE)n=Math.min(n,14);for(let q=0;q<n;q++)PT.push({x:Math.random()*innerWidth,y:-20-Math.random()*400,vx:(Math.random()-.5)*1.2,vy:1+Math.random()*2,g:gl(),c:COL[Math.random()*6|0],s:12+Math.random()*14,r:0,vr:(Math.random()-.5)*.1,l:1,f:1});run()}
function run(){if(rf)return;rf=1;(function u(){fc.clearRect(0,0,FX.width,FX.height);for(let q=PT.length-1;q>=0;q--){const p=PT[q];p.vy+=p.f?.02:.22;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;if(!p.f)p.l-=.012;if(p.y>FX.height+40||p.l<=0){PT.splice(q,1);continue}fc.save();fc.globalAlpha=Math.max(0,p.l);fc.translate(p.x,p.y);fc.rotate(p.r);fc.font=`700 ${p.s}px "Space Mono",monospace`;fc.fillStyle=p.c;fc.strokeStyle='#000';fc.lineWidth=3;fc.strokeText(p.g,0,0);fc.fillText(p.g,0,0);fc.restore()}if(PT.length)requestAnimationFrame(u);else{rf=0;fc.clearRect(0,0,FX.width,FX.height)}})()}
addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('.nav'))return;blast(e.clientX,e.clientY,14,6);const h=e.target.closest&&e.target.closest('h1,h2');if(h&&!LITE)h.querySelectorAll('.ch').forEach(c=>{const r=c.getBoundingClientRect(),dx=r.left+r.width/2-e.clientX,dy=r.top+r.height/2-e.clientY,d=Math.hypot(dx,dy);if(d<170){const f=1-d/170,ux=dx/(d+1);c.animate([{translate:'0 0',rotate:'0deg',opacity:1},{translate:`${ux*160*f}px ${dy/(d+1)*120*f-70}px`,rotate:`${ux*300}deg`,opacity:1,offset:.3},{translate:`${ux*220*f}px ${320+Math.random()*120}px`,rotate:`${ux*600}deg`,opacity:0,offset:.7},{translate:'0 0',rotate:'0deg',opacity:0,offset:.72},{translate:'0 0',rotate:'0deg',opacity:1}],{duration:2200,delay:Math.random()*150,easing:'ease-in'})}})});
setInterval(()=>{if(!LITE&&!document.hidden&&!busy)shower(8)},9000);
$('lt').textContent=LITE?'⚡ LITE: ON':'⚡ LITE';$('lt').onclick=()=>{LITE=!LITE;try{localStorage.setItem('lite',LITE?1:0)}catch(e){}document.documentElement.classList.toggle('lite',LITE);$('lt').textContent=LITE?'⚡ LITE: ON':'⚡ LITE';SFX.pop(LITE)};
// ledger views + slide 9, all from the same six journal entries
const DT=['1 Apr','3 Apr','8 Apr','12 Apr','18 Apr','25 Apr'],ALL=[0,1,2,3,4,5],sm=a=>a.reduce((s,l)=>s+l[3],0),N=v=>v.toLocaleString('en-IN'),nm=k=>AC[k].replace(' A/c',' Account');
let ck='cash',vm='t';
const cnt=(e,m)=>{const st=performance.now();(function u(now){const p=Math.min(1,(now-st)/800);e.textContent=f(Math.round(m*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(u)})(st)};
function acv(go){const L=lines(ALL).filter(l=>l[1]==ck),D=L.filter(l=>l[2]=='D'),C=L.filter(l=>l[2]=='C'),d=sm(D),c=sm(C),v=d-c,T=Math.max(d,c);let h;
const two=(l,r,cell,hd,span)=>Array.from({length:Math.max(l.length,r.length)},(_,q)=>`<tr style="--q:${q+1}">${cell(l[q])}${cell(r[q])}</tr>`).join('');
if(vm=='t'){const l=D.map(x=>[x[4],x[3]]),r=C.map(x=>[x[4],x[3]]);if(v>0)r.push(['By Balance c/d',v]);if(v<0)l.push(['To Balance c/d',-v]);const cell=x=>x?`<td>${x[0]}</td><td class="n">${N(x[1])}</td>`:'<td></td><td></td>';
h=`<table><tr><th colspan="4" style="text-align:center">${nm(ck)}</th></tr><tr><th>Dr. Particulars</th><th>₹</th><th>Cr. Particulars</th><th>₹</th></tr>${two(l,r,cell)}<tr><th>Total</th><th class="n">${N(T)}</th><th>Total</th><th class="n">${N(T)}</th></tr>${v?`<tr><td>${v>0?'To Balance b/d':''}</td><td class="n">${v>0?N(v):''}</td><td>${v<0?'By Balance b/d':''}</td><td class="n">${v<0?N(-v):''}</td></tr>`:''}</table>`}
if(vm=='p'){const mk=a=>a.map(x=>[DT[x[0]],x[4],'J'+(x[0]+1),x[3]]),l=mk(D),r=mk(C);if(v>0)r.push(['30 Apr','By Balance c/d','',v]);if(v<0)l.push(['30 Apr','To Balance c/d','',-v]);const cell=x=>x?`<td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td><td class="n">${N(x[3])}</td>`:'<td></td><td></td><td></td><td></td>';
h=`<table class="lp"><tr><th colspan="8" style="text-align:center">${nm(ck)} (Ledger folio L${Object.keys(AC).indexOf(ck)+1})</th></tr><tr><th colspan="4">Dr.</th><th colspan="4">Cr.</th></tr><tr><th>Date</th><th>Particulars</th><th>J.F.</th><th>₹</th><th>Date</th><th>Particulars</th><th>J.F.</th><th>₹</th></tr>${two(l,r,cell)}<tr><th colspan="3">Total</th><th class="n">${N(T)}</th><th colspan="3">Total</th><th class="n">${N(T)}</th></tr>${v?`<tr><td>${v>0?'1 May':''}</td><td>${v>0?'To Balance b/d':''}</td><td></td><td class="n">${v>0?N(v):''}</td><td>${v<0?'1 May':''}</td><td>${v<0?'By Balance b/d':''}</td><td></td><td class="n">${v<0?N(-v):''}</td></tr>`:''}</table>`}
if(vm=='r'){let b=0;h=`<table class="lp"><tr><th colspan="6" style="text-align:center">${nm(ck)}: running balance</th></tr><tr><th>Date</th><th>Particulars</th><th>J.F.</th><th>Debit ₹</th><th>Credit ₹</th><th>Balance ₹</th></tr>${L.map((x,q)=>{b+=x[2]=='D'?x[3]:-x[3];return `<tr style="--q:${q+1}"><td>${DT[x[0]]}</td><td>${x[4]}</td><td>J${x[0]+1}</td><td class="n">${x[2]=='D'?N(x[3]):''}</td><td class="n">${x[2]=='C'?N(x[3]):''}</td><td class="n">${N(Math.abs(b))} ${b>=0?'Dr':'Cr'}</td></tr>`}).join('')}</table>`}
$('lv').innerHTML=h;$('cb').dataset.n=Math.abs(v);if(go)cnt($('cb'),Math.abs(v));
$('cl').innerHTML=`<h3>Calculation</h3><br>Total debits = ${f(d)}.<br>Total credits = ${f(c)}.<br>Balance = ${f(Math.max(d,c))} − ${f(Math.min(d,c))} = <b class="k">${f(Math.abs(v))}</b> ${v>0?'(debit balance)':v<0?'(credit balance)':'(nil)'}.${ck=='cash'?'<br><br>This shows how the Cash Account answers the question, "Where did the money go?" It identifies the cash received, the cash paid and the amount remaining.':''}`}
Object.keys(AC).forEach(k=>$('av').append(Object.assign(document.createElement('button'),{className:'chip'+(k==ck?' done':''),textContent:nm(k),onclick:e=>{ck=k;[...$('av').children].forEach(b=>b.classList.toggle('done',b==e.currentTarget));SFX.pop(1);acv(1)}})));
document.querySelectorAll('#vw .chip').forEach(b=>b.onclick=()=>{vm=b.dataset.v;document.querySelectorAll('#vw .chip').forEach(x=>x.classList.toggle('done',x==b));SFX.pop(1);acv(0)});acv(0);
(function(){const L=lines(ALL),g=(k,s)=>sm(L.filter(l=>l[1]==k&&l[2]==s)),bl=k=>Math.abs(g(k,'D')-g(k,'C'));
$('dc').innerHTML=[['ami','o','Debtor / receivable','Credit sale','D','Cash received','C','Still receivable from Amit'],['rav','v','Creditor / payable','Credit purchase','C','Cash paid','D','Still payable to Ravi']].map(([k,cl,ty,a,sa,b,sb,t])=>`<div class="b ${cl}"><h3>${nm(k)}</h3><br><b>${ty}</b><br>${a}: ${f(g(k,sa))}<br>${b}: ${f(g(k,sb))}<div class="big" data-n="${bl(k)}">₹0</div>${t}</div>`).join('');
$('dn').innerHTML=`A debtor balance generally represents money receivable, while a creditor balance generally represents money payable. Here, Amit's Account has a <b>debit balance of ${f(bl('ami'))}</b> and Ravi's Account has a <b>credit balance of ${f(bl('rav'))}</b>.`})();
const MEMBERS=[
{num:1,name:'AARAV',role:'Member 1',slides:'Slides 1–2',topic:'Introduction & need for a ledger',photo:'Gemini_Generated_Image_p0u114p0u114p0u1.png',avatar:'avatar_aarav.jpg',tagline:'The Rider',desc:'Covers the daily volume of business transactions, the limitation of chronological journals, and why businesses need organized ledger accounts.',startSlide:1},
{num:2,name:'ADARSH',role:'Member 2',slides:'Slides 3–4',topic:'Meaning, journal vs ledger',photo:'Gemini_Generated_Image_bu2cllbu2cllbu2c.png',avatar:'avatar_adarsh.jpg',tagline:'The Skater',desc:'Explains what a ledger is as the principal book of accounts, personal/real/nominal accounts, and a side-by-side comparison with the journal.',startSlide:2},
{num:3,name:'ANUNAY',role:'Member 3',slides:'Slides 5–7',topic:'Format, posting, business example',photo:'Gemini_Generated_Image_j4blksj4blksj4bl.png',avatar:'avatar_anunay.jpg',tagline:'The Blaster',desc:'Details the traditional T-account format, the 5 systematic posting steps, and live interactive postings from journal to ledger with double entry balance.',startSlide:4},
{num:4,name:'DHAIRYA',role:'Member 4',slides:'Slides 8–10',topic:'Cash account, debtors/creditors, balancing',photo:'Gemini_Generated_Image_3f3ibp3f3ibp3f3i.png',avatar:'avatar_dhairya.jpg',tagline:'The Cashier',desc:'Demonstrates the Cash Account in 3 different views, debtor vs creditor balances, and the step-by-step arithmetic balancing process (Balance c/d & b/d).',startSlide:7},
{num:5,name:'TIRTH',role:'Member 5',slides:'Slides 11–12',topic:'Trial balance, errors, conclusion',photo:'Gemini_Generated_Image_rw91sorw91sorw91.png',avatar:'avatar_tirth.jpg',tagline:'The Cruiser',desc:'Tests arithmetical equality via the interactive Trial Balance and balance beam physics, explains undetectable errors, and concludes with key takeaways.',startSlide:10}
];
let modalMemIdx=0;
function openPosterModal(num){const idx=(num||1)-1;if(idx<0||idx>=MEMBERS.length)return;modalMemIdx=idx;renderModal();const m=$('poster-modal');if(m){m.classList.add('open');m.setAttribute('aria-hidden','false')}SFX.cha&&SFX.cha()}
function closePosterModal(){const m=$('poster-modal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');SFX.pop&&SFX.pop(0)}
function nextPoster(){modalMemIdx=(modalMemIdx+1)%MEMBERS.length;renderModal();SFX.tick&&SFX.tick(1)}
function prevPoster(){modalMemIdx=(modalMemIdx-1+MEMBERS.length)%MEMBERS.length;renderModal();SFX.tick&&SFX.tick(2)}
function renderModal(){
  const m=MEMBERS[modalMemIdx];if(!m)return;
  $('modal-tag').textContent='MEMBER 0'+m.num+' // GROUP 6';
  $('modal-name').textContent=m.name;
  $('modal-img').src=m.photo;
  $('modal-img').alt=m.name+' Comic Poster';
  $('modal-slides').textContent=m.slides.toUpperCase();
  $('modal-topic').textContent=m.topic;
  $('modal-desc').textContent=m.desc;
  $('modal-stamp').textContent=m.tagline.toUpperCase();
  $('modal-counter').textContent=m.num+' / '+MEMBERS.length;
  if($('modal-avatar'))$('modal-avatar').src=m.avatar;
  if($('modal-tagline-text'))$('modal-tagline-text').textContent=m.tagline.toUpperCase();
  syncLightbox();
}
function syncLightbox(){
  const m=MEMBERS[modalMemIdx];if(!m)return;
  if($('lightbox-img'))$('lightbox-img').src=m.photo;
  if($('lightbox-caption'))$('lightbox-caption').textContent=m.name+' // '+m.tagline.toUpperCase()+' (100% FULL HD)';
  if($('lightbox-raw-btn'))$('lightbox-raw-btn').href=m.photo;
}
function openLightbox(num){
  if(typeof num==='number')modalMemIdx=Math.max(0,Math.min(MEMBERS.length-1,num-1));
  renderModal();
  const lb=$('poster-lightbox');
  if(lb){lb.classList.add('open');lb.setAttribute('aria-hidden','false')}
  SFX.cha&&SFX.cha();
}
function closeLightbox(){
  const lb=$('poster-lightbox');
  if(!lb)return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  SFX.pop&&SFX.pop(0);
}
function jumpToMemberSlide(){const m=MEMBERS[modalMemIdx];closeLightbox();closePosterModal();if(m&&typeof go==='function')go(m.startSlide)}
document.documentElement.style.setProperty('--w','0s');document.documentElement.style.setProperty('--w2','0s');show(+(location.hash.slice(1)||1)-1||0);setTimeout(()=>{document.documentElement.style.removeProperty('--w');document.documentElement.style.removeProperty('--w2')},2500);

/* ========================================================
   INTEGRATED 2D ANUNAY SHIMEJI DESKTOP MASCOT CONTROLLER
   ======================================================== */
(function initShimeji() {
  const canvas = $('anunay-runner-canvas');
  if (!canvas || typeof Anunay2D === 'undefined') return;
  const ctx = canvas.getContext('2d');

  const shimejis = [];

  function createMascot(spawnX, spawnY) {
    const s = new Anunay2D(canvas, {
      scale: 0.38,
      groundY: window.innerHeight - 28,
      autonomous: true,
      sound: false,
      isShimeji: true,
      x: spawnX !== undefined ? spawnX : window.innerWidth * (0.2 + Math.random() * 0.6),
      y: spawnY !== undefined ? spawnY : (window.innerHeight - 28)
    });
    shimejis.push(s);
    return s;
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    shimejis.forEach(s => {
      s.groundY = window.innerHeight - 28;
      s.wallRightX = window.innerWidth - 45;
    });
  }
  resize();
  window.addEventListener('resize', resize);

  // Spawn primary Shimeji
  const primaryShimeji = createMascot();
  window.runnerAnunay = primaryShimeji;
  window.shimejis = shimejis;

  // Interactive Grab & Fling System
  let activeGrabbed = null;

  window.addEventListener('pointermove', (e) => {
    if (activeGrabbed) {
      activeGrabbed.drag(e.clientX, e.clientY);
      document.body.style.cursor = 'grabbing';
      return;
    }

    const hovered = shimejis.find(s => s.isHit(e.clientX, e.clientY));
    if (hovered) {
      document.body.style.cursor = 'grab';
    } else if (document.body.style.cursor === 'grab') {
      document.body.style.cursor = '';
    }
  });

  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.runner-hud-pill') || e.target.closest('.nav') || e.target.closest('.lightbox-modal')) return;
    const clicked = shimejis.find(s => s.isHit(e.clientX, e.clientY));
    if (clicked) {
      activeGrabbed = clicked;
      clicked.grab(e.clientX, e.clientY);
      document.body.style.cursor = 'grabbing';
      e.stopPropagation();
      e.preventDefault();
    }
  });

  window.addEventListener('pointerup', () => {
    if (activeGrabbed) {
      activeGrabbed.release();
      activeGrabbed = null;
      document.body.style.cursor = 'grab';
    }
  });

  // Shimeji Dock Controls
  let isRunning = true;
  const toggleBtn = $('runner-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isRunning = !isRunning;
      canvas.style.display = isRunning ? 'block' : 'none';
      toggleBtn.classList.toggle('active', isRunning);
      toggleBtn.textContent = isRunning ? '🐾 SHIMEJI: ON' : '🐾 SHIMEJI: OFF';
    });
  }

  const spawnBtn = $('shimeji-spawn-btn');
  if (spawnBtn) {
    spawnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (shimejis.length < 6) {
        const newMascot = createMascot(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          80
        );
        newMascot.surface = 'air';
        newMascot.vy = 2;
        newMascot.triggerJump();
      }
    });
  }

  const tossBtn = $('shimeji-toss-btn');
  if (tossBtn) {
    tossBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shimejis.forEach(s => {
        s.surface = 'air';
        s.vy = -14 - Math.random() * 6;
        s.vx = (Math.random() - 0.5) * 16;
        s.triggerJump();
      });
    });
  }

  // Animation Loop
  let lastTime = performance.now();
  function shimejiLoop(now) {
    if (isRunning) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shimejis.forEach(s => {
        s.update(dt);
        s.render();
      });
    }
    lastTime = now;
    requestAnimationFrame(shimejiLoop);
  }
  requestAnimationFrame(shimejiLoop);
})();


