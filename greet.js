(function(){
const KEY='oristar_greeted_v1',SRC='assets/greeting.mp3';
let seen=false;try{seen=localStorage.getItem(KEY)==='1'}catch(e){}
const force=/[?&]greet=1/.test(location.search),skip=/[?&]nogreet/.test(location.search);
const btn=document.getElementById('sndBtn');
const a=new Audio();a.preload='auto';a.src=SRC;a.volume=1;let bad=false;a.addEventListener('error',()=>{bad=true});
const mark=()=>{try{localStorage.setItem(KEY,'1')}catch(e){}if(btn)btn.classList.remove('wait')};
/* dự phòng: nếu file âm thanh lỗi thì dùng giọng đọc của thiết bị (hạ cao độ cho trầm) */
function speak(){try{const s=window.speechSynthesis;if(!s)return false;const u=new SpeechSynthesisUtterance('Ô ri sta, xin chào');u.lang='vi-VN';u.pitch=.4;u.rate=.85;
 const vs=s.getVoices().filter(v=>/^vi/i.test(v.lang));const m=vs.find(v=>/nam|male/i.test(v.name))||vs[0];if(m)u.voice=m;s.cancel();s.speak(u);return true}catch(e){return false}}
function play(){if(btn){btn.classList.add('playing');setTimeout(()=>btn.classList.remove('playing'),1700)}
 if(bad){const ok=speak();if(ok)mark();return Promise.resolve(ok)}
 try{a.currentTime=0}catch(e){}
 const p=a.play();return p&&p.then?p.then(()=>{mark();return true}).catch(()=>false):Promise.resolve(true)}
const evs=['pointerdown','touchend','click','keydown'];let armed=false;
function arm(){if(armed)return;armed=true;if(btn)btn.classList.add('wait');
 const go=()=>{evs.forEach(e=>removeEventListener(e,go,true));armed=false;play().then(ok=>{if(!ok)arm()})};
 evs.forEach(e=>addEventListener(e,go,{capture:true,passive:true}))}
/* lần đầu truy cập: thử nói ngay; trình duyệt chặn tự phát âm thanh thì nói ở lần chạm/bấm đầu tiên */
if((!seen||force)&&!skip)play().then(ok=>{if(!ok)arm()});
if(btn)btn.addEventListener('click',e=>{e.stopPropagation();if(a.paused||a.ended)play()});
})();
