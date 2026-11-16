(function(){
const $$=s=>[...document.querySelectorAll(s)];
/* mũi tên 3D động chỉ xuống ô nhập, ở tiêu đề của từng khung nhập */
const arrow=(id)=>`<svg viewBox="0 0 60 84" aria-hidden="true"><defs><linearGradient id="ag${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--a2)"/><stop offset="1" style="stop-color:var(--a)"/></linearGradient><linearGradient id="ah${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<path d="M20 4h20v34h15L30 72 5 38h15z" fill="#0a1f5c" opacity=".55" transform="translate(5,8)"/>
<path d="M20 4h20v34h15L30 72 5 38h15z" fill="#0a1f5c" opacity=".35" transform="translate(2.5,4)"/>
<path d="M20 4h20v34h15L30 72 5 38h15z" fill="url(#ag${id})" stroke="rgba(255,255,255,.7)" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M23 7h6v31H23z" fill="url(#ah${id})"/>
<path d="M11 41l19 24V43z" fill="#fff" opacity=".2"/><path d="M30 65l19-24H30z" fill="#000" opacity=".12"/></svg>`;
$$('.pane').forEach((p,i)=>{const h=p.querySelector('.panel>h2');if(!h||h.parentNode.classList.contains('phd'))return;
 const w=document.createElement('div');w.className='phd';h.parentNode.insertBefore(w,h);w.appendChild(h);
 const a=document.createElement('span');a.className='arr3d';a.innerHTML=arrow(i+1);w.appendChild(a)});
/* biểu tượng nguyên tố cho nhóm độ cứng */
const el={cu:['Cu','cu'],al:['Al','al'],st:['Fe','fe'],oem:['OEM','oem']};
$$('.seg button[data-g]').forEach(b=>{const e=el[b.dataset.g];if(!e||b.querySelector('.el'))return;
 b.innerHTML=`<i class="el ${e[1]}">${e[0]}</i><span>${b.textContent.trim()}</span>`});
})();
