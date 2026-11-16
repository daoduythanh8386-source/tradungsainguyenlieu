(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const B='#1f3f9c',R='#e0262b';
const t=(x,y,s,z=11,w=700,f='#1b2540',a='middle')=>`<text x="${x}" y="${y}" font-size="${z}" font-weight="${w}" fill="${f}" text-anchor="${a}" font-family="system-ui,Arial,sans-serif">${s}</text>`;
const rc=(x,y,w,h,r,f,st)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"${st?` stroke="${st}" stroke-width="1.5"`:''}/>`;
const hl=(x,y,w,h,r=10)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="rgba(224,38,43,.12)" stroke="${R}" stroke-width="3.5"><animate attributeName="stroke-opacity" values="1;.25;1" dur="1.3s" repeatCount="indefinite"/></rect>`;
const arrow=(x,y)=>`<g transform="translate(${x},${y})"><path d="M0 0 L0 22 M-9 13 L0 24 L9 13" stroke="${R}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"><animateTransform attributeName="transform" type="translate" values="0 0;0 6;0 0" dur="1s" repeatCount="indefinite"/></path></g>`;
const logo=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})">${rc(0,0,44,44,10,'#fff','#d5dcee')}${t(22,20,'ORI',9,900,B)}${t(22,32,'STAR',9,900,R)}</g>`;
const phone=(inner,id)=>`<svg viewBox="0 0 200 380" role="img" aria-label="Minh hoạ"><defs><clipPath id="c${id}"><rect x="14" y="16" width="172" height="348" rx="20"/></clipPath></defs>${rc(5,5,190,370,30,'#0e1730','#8fa3d6')}<g clip-path="url(#c${id})">${rc(14,16,172,348,20,'#fff')}${inner}</g>${rc(76,20,48,8,4,'#0e1730')}</svg>`;
const page=()=>rc(14,16,172,120,0,'#16328a')+t(100,92,'ORISTAR',22,900,'#fff')+t(100,112,'Tra cứu dung sai',10,700,'#cfe0ff')+[0,1,2].map(i=>rc(24,148+i*40,152,32,8,'#e9eefb')+rc(32,158+i*40,60,6,3,'#9fb0d6')+rc(32,168+i*40,90,5,3,'#c5d0ea')).join('');
const shareIc=(x,y,c='#2563eb')=>`<g transform="translate(${x},${y})" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-7 -2 H-10 V12 H10 V-2 H7"/><path d="M0 8 V-12 M-6 -6 L0 -12 L6 -6"/></g>`;
const home=(round)=>rc(14,16,172,348,0,'#3b5bdb')+rc(14,16,172,348,0,'rgba(0,0,0,.18)')+[0,1,2,3].map(r=>[0,1,2].map(c=>{const x=34+c*54,y=48+r*64;return r===1&&c===1?'':`<rect x="${x}" y="${y}" width="40" height="40" rx="${round?20:10}" fill="rgba(255,255,255,.28)"/>`}).join('')).join('')+`<g transform="translate(88,112)">${round?`<circle cx="22" cy="22" r="22" fill="#fff"/>`:rc(0,0,44,44,10,'#fff')}${t(22,20,'ORI',9,900,B)}${t(22,32,'STAR',9,900,R)}</g>`+t(110,172,'Oristar Tra cứu',9,800,'#fff')+rc(30,320,140,34,17,'rgba(255,255,255,.3)')+hl(78,96,64,92,14);
const safBar=(h)=>rc(14,322,172,42,0,'#f3f5fa')+rc(26,330,148,26,13,'#e1e6f3')+t(112,347,'ten-app.netlify.app',9,800,'#1b2540')+t(38,347,'aA',10,800,'#1b2540')+(h?hl(24,328,152,30,15):'');
const safTools=(h)=>rc(14,322,172,42,0,'#f3f5fa')+t(36,349,'‹',22,700,'#2563eb')+t(66,349,'›',22,700,'#9fb0d6')+shareIc(100,342)+rc(128,337,14,16,2,'none','#2563eb')+rc(156,337,12,12,2,'none','#2563eb')+rc(160,341,12,12,2,'none','#2563eb')+(h?hl(82,326,36,34,10):'');
const sheet=()=>rc(14,16,172,348,0,'rgba(0,0,0,.5)')+rc(14,120,172,244,18,'#f2f3f7')+rc(22,132,156,34,10,'#fff')+t(34,154,'ten-app.netlify.app',10,800,'#1b2540','start')+['Sao chép','Thêm vào dấu trang','Thêm vào MH chính','Tìm trên trang'].map((s,i)=>rc(22,176+i*40,156,34,10,'#fff')+t(32,198+i*40,s,10,800,'#1b2540','start')+(i===2?`<g transform="translate(165,${193+i*40})">${rc(-9,-9,18,18,4,'none','#1b2540')}${t(0,5,'+',16,900,'#1b2540')}</g>`:'')).join('')+hl(20,254,160,38,10);
const dlg=(ios)=>rc(14,16,172,348,0,'rgba(0,0,0,.45)')+(ios?rc(14,60,172,230,18,'#f2f3f7')+t(40,84,'Huỷ',12,800,'#2563eb','start')+t(100,84,'MH chính',11,900)+t(166,84,'Thêm',13,900,'#2563eb','end')+hl(138,68,40,24,8)+rc(24,104,152,76,10,'#fff')+logo(32,120)+t(86,134,'Oristar Tra cứu',9.5,900,'#1b2540','start')+rc(82,142,84,1,0,'#d5dcee')+t(86,158,'ten-app.netlify.app',8,700,'#66728d','start')+t(100,212,'App sẽ xuất hiện ngoài',10,700,'#66728d')+t(100,226,'màn hình chính.',10,700,'#66728d')
 :rc(20,120,160,150,18,'#fff')+logo(38,134)+t(88,152,'Cài đặt ứng dụng?',8.5,900,'#1b2540','start')+t(88,168,'Oristar Tra cứu',9,700,'#66728d','start')+t(100,206,'App sẽ được thêm vào',9,700,'#1b2540')+t(100,220,'màn hình chính.',9,700,'#1b2540')+t(70,252,'Huỷ',12,800,'#2563eb')+rc(110,236,54,26,13,'#2563eb')+t(137,254,'Cài đặt',11,900,'#fff')+hl(106,232,62,34,17));
const chromeTop=(h)=>rc(14,16,172,46,0,'#eef1f8')+rc(24,32,116,24,12,'#fff','#d5dcee')+t(82,48,'ten-app.netlify.app',9,800,'#1b2540')+t(160,52,'⋮',24,900,'#1b2540')+(h?hl(144,28,32,32,16):'');
const menu=()=>rc(14,16,172,348,0,'rgba(0,0,0,.25)')+rc(46,66,136,170,10,'#fff','#d5dcee')+['Thẻ mới','Lịch sử','Cài đặt ứng dụng','Thêm vào MH chính','Chia sẻ…'].map((s,i)=>t(58,90+i*30,s,10,i===2?900:700,'#1b2540','start')).join('')+hl(50,134,128,30,8);
const pc={
 win:(inner)=>`<svg viewBox="0 0 360 230" role="img" aria-label="Minh hoạ">${rc(4,4,352,222,12,'#0e1730','#8fa3d6')}${rc(10,10,340,210,8,'#fff')}${rc(10,10,340,34,8,'#e4e9f5')}<circle cx="26" cy="27" r="4" fill="#ff5f57"/><circle cx="40" cy="27" r="4" fill="#febc2e"/><circle cx="54" cy="27" r="4" fill="#28c840"/>${rc(74,18,200,18,9,'#fff','#c5d0ea')}${t(174,31,'ten-app.netlify.app',9.5,800)}${inner}</svg>`,
 body:()=>rc(10,44,340,56,0,'#16328a')+t(180,78,'ORISTAR · Tra cứu dung sai',16,900,'#fff')+[0,1,2,3].map(i=>rc(24+i*80,112,70,60,10,'#e9eefb')).join(''),
 ins:(x,y)=>`<g transform="translate(${x},${y})" stroke="#1b2540" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="-8" y="-6" width="16" height="11" rx="1.5"/><path d="M-4 8 H4 M0 -3 V3 M-3 0 L0 3 L3 0"/></g>`
};
const homePC=()=>`<svg viewBox="0 0 360 230" role="img" aria-label="Minh hoạ">${rc(4,4,352,222,12,'#0e1730','#8fa3d6')}${rc(10,10,340,210,8,'#3b5bdb')}${rc(10,196,340,24,0,'rgba(0,0,0,.35)')}<g transform="translate(26,34)">${rc(0,0,44,44,10,'#fff')}${t(22,20,'ORI',9,900,B)}${t(22,32,'STAR',9,900,R)}</g>${t(48,92,'Oristar Tra cứu',8.5,800,'#fff')}${hl(18,26,60,74,10)}${rc(150,40,160,110,8,'#fff','#c5d0ea')}${rc(150,40,160,16,8,'#16328a')}${t(230,98,'ORISTAR',16,900,'#16328a')}${t(230,114,'Mở như một app riêng',8.5,800,'#66728d')}</svg>`;
const S={
 ios:[['Mở bằng Safari','Mở đường link app bằng <b>Safari</b> (biểu tượng la bàn xanh). <b>Không</b> dùng Chrome hay Zalo.',phone(page()+"<g transform='translate(58,292) scale(.72)'><circle r='30' fill='#2b7de9'/><circle r='25' fill='#eaf3ff'/><circle r='25' fill='none' stroke='#fff' stroke-width='2'/><path d='M0 -17 L5 0 L0 17 L-5 0Z' transform='rotate(45)' fill='#fff'/><path d='M0 -17 L5 0 L-5 0Z' transform='rotate(45)' fill='#e0262b'/><path d='M0 17 L5 0 L-5 0Z' transform='rotate(45)' fill='#9fb0d6'/></g>"+t(88,298,'Safari',13,900,'#1b2540','start')+safBar(1),'a')],
  ['Bấm nút Chia sẻ','Nút <b>hình vuông có mũi tên lên</b> ở giữa thanh dưới cùng. Nếu không thấy thanh, kéo nhẹ trang xuống.',phone(page()+safTools(1),'b')],
  ['Chọn “Thêm vào MH chính”','Kéo danh sách lên, chọn dòng có dấu <b>+</b> trong ô vuông: <b>Thêm vào MH chính</b> (Add to Home Screen).',phone(sheet(),'c')],
  ['Bấm “Thêm”','Bấm <b>Thêm</b> ở góc trên bên phải để xác nhận. Có thể đổi tên app nếu muốn.',phone(dlg(1),'d')],
  ['Mở app ngoài màn hình chính','Icon <b>Oristar</b> nằm ngoài màn hình chính. Bấm vào là dùng như một app, <b>toàn màn hình</b>.',phone(home(0),'e')]],
 and:[['Mở bằng Chrome','Mở đường link app bằng <b>Chrome</b> (biểu tượng tròn đỏ-vàng-xanh).',phone(page()+"<g transform='translate(58,292) scale(.72)'><circle r='30' fill='#fff'/><path d='M0 0 L0 -30 A30 30 0 0 1 26 15Z' fill='#ea4335'/><path d='M0 0 L26 15 A30 30 0 0 1 -26 15Z' fill='#fbbc05'/><path d='M0 0 L-26 15 A30 30 0 0 1 0 -30Z' fill='#34a853'/><circle r='13' fill='#fff'/><circle r='10' fill='#4285f4'/></g>"+t(88,298,'Chrome',13,900,'#1b2540','start')+chromeTop(0),'f')],
  ['Bấm dấu ba chấm ⋮','Dấu <b>⋮</b> nằm ở <b>góc trên bên phải</b> màn hình.',phone(page()+chromeTop(1),'g')],
  ['Chọn “Cài đặt ứng dụng”','Chọn <b>Cài đặt ứng dụng</b> (Install app). Nếu không thấy, chọn <b>Thêm vào màn hình chính</b>.',phone(page()+chromeTop(0)+menu(),'h')],
  ['Bấm “Cài đặt”','Bấm nút <b>Cài đặt</b> (hoặc Thêm) để xác nhận.',phone(page()+chromeTop(0)+dlg(0),'i')],
  ['Mở app ngoài màn hình chính','Icon <b>Oristar</b> xuất hiện ngoài màn hình chính. Bấm vào để dùng.',phone(home(1),'j')]],
 pc:[['Mở bằng Chrome hoặc Edge','Mở đường link app trên <b>Google Chrome</b> hoặc <b>Microsoft Edge</b>.',pc.win(pc.body())],
  ['Bấm biểu tượng cài đặt','Ở <b>bên phải thanh địa chỉ</b> có biểu tượng <b>màn hình với mũi tên xuống</b>. Bấm vào đó.',pc.win(pc.body()+pc.ins(290,27)+hl(278,16,24,22,6))],
  ['Bấm “Cài đặt”','Hộp thoại hiện ra, bấm nút <b>Cài đặt</b> (Install).',pc.win(pc.body()+pc.ins(290,27)+rc(190,40,150,96,10,'#fff','#c5d0ea')+t(265,62,'Cài đặt ứng dụng?',10.5,900)+rc(204,72,28,28,6,'#fff','#c5d0ea')+t(218,84,'ORI',6,900,B)+t(218,92,'STAR',6,900,R)+t(240,90,'Oristar Tra cứu',9,800,'#1b2540','start')+rc(210,108,56,20,10,'#2563eb')+t(238,122,'Cài đặt',10,900,'#fff')+t(300,122,'Huỷ',10,800,'#2563eb')+hl(206,104,64,28,12))],
  ['Mở app từ Desktop / Start','App có icon ngoài <b>Desktop</b> hoặc trong menu <b>Start</b> (Mac: Launchpad). Mở lên là cửa sổ riêng, không còn thanh trình duyệt.',homePC()]]
};
const alt={ios:'Dùng iPad: làm giống iPhone. Nhớ dùng <b>Safari</b>, không dùng trình duyệt khác.',and:'Dùng <b>Samsung Internet</b>: bấm menu <b>≡</b> → <b>Thêm trang vào</b> → <b>Màn hình chính</b>.',pc:'Không thấy biểu tượng? Chrome: <b>⋮</b> → <b>Truyền, lưu và chia sẻ</b> → <b>Cài đặt trang này làm ứng dụng</b>. Edge: <b>⋯</b> → <b>Ứng dụng</b> → <b>Cài đặt trang web này làm ứng dụng</b>.'};
const host=$('#iHost');let cur='ios';
function draw(k){cur=k;$$('#iSeg button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
 host.innerHTML=`<div class="steps">${S[k].map((s,i)=>`<div class="step"><div class="sh"><span class="sn">${i+1}</span><h3>${s[0]}</h3></div><p>${s[1]}</p><div class="shot ${k==='pc'?'wide':''}">${s[2]}</div></div>`).join('')}</div><div class="res alt"><div class="rt">Mẹo</div><div class="rl">${alt[k]}</div></div>`}
$$('#iSeg button').forEach(b=>b.onclick=()=>draw(b.dataset.k));
const ua=navigator.userAgent,det=/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)?'ios':/Android/.test(ua)?'and':'pc';
const nm={ios:'iPhone / iPad',and:'điện thoại Android',pc:'máy tính'},inapp=/FBAN|FBAV|Zalo|Instagram|Line\/|MicroMessenger|Messenger/i.test(ua);
const br={ios:'Safari',and:'Chrome',pc:'Chrome hoặc Edge'};
$('#iDet').innerHTML=`Đã nhận diện: <b>${nm[det]}</b>. Làm theo các bước bên dưới là xong.`;
if(inapp){const e=$('#iDet');e.classList.add('warn');e.innerHTML=`<b>Bạn đang mở trong Zalo/Facebook.</b> Trình duyệt này không cài được app. Bấm <b>⋯</b> hoặc <b>⋮</b> → <b>Mở bằng ${br[det]}</b> rồi cài đặt.`}
$$('#iSeg button').forEach(b=>b.classList.toggle('me',b.dataset.k===det));
draw(det);
const std=matchMedia('(display-mode:standalone)').matches||navigator.standalone,fab=$('#fab');
const upd=()=>{fab.hidden=std||!$('#p5').hidden};upd();$$('.tab,.up').forEach(b=>b.addEventListener('click',()=>setTimeout(upd,60)));
$$('.go-install').forEach(b=>b.onclick=()=>{draw(det);$('.tab[data-p=p5]').click()});
if(std)$$('.hbtn').forEach(b=>b.hidden=true);
let dp=null;const btn=$('#iNow');
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;btn.hidden=false});
btn.onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;btn.hidden=true};
if(matchMedia('(display-mode:standalone)').matches||navigator.standalone){$('#iDone').hidden=false}
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
