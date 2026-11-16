(function(){
const kp=document.getElementById('kp');if(!kp)return;
const lab=document.getElementById('kpLabel'),val=document.getElementById('kpVal'),coarse=()=>matchMedia('(pointer:coarse)').matches;
let el=null;
const isNum=t=>t&&t.matches&&t.matches('input[data-num]');
const vis=i=>i.offsetParent!==null||!i.closest('[hidden]');
const nums=()=>[...document.querySelectorAll('input[data-num]')].filter(i=>!i.closest('[hidden]')&&!i.disabled);
const fire=()=>el.dispatchEvent(new Event('input',{bubbles:true}));
const upd=()=>{val.textContent=el&&el.value!==''?el.value:'0'};
const name=i=>{const f=i.closest('.fld'),l=f&&f.querySelector('label');let t=l?l.textContent.replace(/\s+/g,' ').trim():'Nhập số';if(i.classList.contains('meas')&&l)t+=' · đo thực tế';else if(i.placeholder&&/^(HB|HRB|HV)$/.test(i.placeholder))t='Độ cứng '+i.placeholder+' · đo thực tế';return t};
function show(t){el=t;lab.textContent=name(t);upd();kp.hidden=false;document.body.classList.add('kp-on');
 setTimeout(()=>{document.body.style.paddingBottom=(kp.offsetHeight+24)+'px';const y=t.getBoundingClientRect().top+scrollY-110;scrollTo({top:Math.max(0,y),behavior:'smooth'})},50)}
function hide(){kp.hidden=true;document.body.classList.remove('kp-on');document.body.style.paddingBottom='';el=null}
document.addEventListener('focusin',e=>{const t=e.target;if(isNum(t)){if(!coarse()){t.inputMode='decimal';return}t.inputMode='none';show(t)}else if(!kp.contains(t))hide()});
document.addEventListener('pointerdown',e=>{const t=e.target;if(!kp.hidden&&!kp.contains(t)&&!isNum(t))hide()});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.tab,.up,.go-install'))hide()});
kp.addEventListener('pointerdown',e=>{e.preventDefault();const b=e.target.closest('button');if(!b||!el)return;const k=b.dataset.k;
 if(k==='done'){const t=el;t.blur();hide();return}
 if(k==='clr'){el.value='';fire();upd();return}
 if(k==='next'){const l=nums(),n=l[l.indexOf(el)+1];if(n){n.focus();show(n)}else{el.blur();hide()}return}
 let i=el.selectionStart,j=el.selectionEnd;if(i==null){i=j=el.value.length}
 if(k==='bs'){if(i===j&&i>0)i--;el.value=el.value.slice(0,i)+el.value.slice(j);el.setSelectionRange(i,i);fire();upd();return}
 if(!/^[0-9.,]$/.test(k))return;
 el.value=el.value.slice(0,i)+k+el.value.slice(j);el.setSelectionRange(i+1,i+1);fire();upd()});
document.addEventListener('input',e=>{if(el&&e.target===el)upd()});
})();
