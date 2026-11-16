(function(){
const D=window.DATA,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const num=v=>{if(v==null)return NaN;v=String(v).trim().replace(/,/g,'.');return v===''?NaN:Number(v)};
const f=n=>String(+n.toFixed(4));
const inIv=(v,iv)=>(iv[0]==null||(iv[1]?v>=iv[0]:v>iv[0]))&&(iv[2]==null||(iv[3]?v<=iv[2]:v<iv[2]));
const parseTol=s=>{if(s==null)return{k:'none'};s=String(s).replace(/\s+/g,' ').replace(',','.').trim();
 if(s==='-'||s==='')return{k:'none'};let m;
 if(m=s.match(/^±\s*([\d.]+)\s*(%?)$/))return{k:'sym',v:+m[1],pct:!!m[2]};
 if(m=s.match(/^(-?[\d.]+)\s*~\s*\+?\s*([\d.]+)\s*(%?)$/))return(m[3]||+m[1]>0)?{k:'amb'}:{k:'asym',lo:+m[1],hi:+m[2]};
 if(m=s.match(/^(\d+)-(\d+)$/))return{k:'asym',lo:+m[1],hi:+m[2]};
 return{k:'text'}};
const rng=(t,n)=>{if(!(n>=0)||t.k==='none'||t.k==='text'||t.k==='amb')return null;
 if(t.k==='sym'){const d=t.pct?n*t.v/100:t.v;return{min:n-d,max:n+d,d,nom:n}}return{min:n+t.lo,max:n+t.hi,nom:n}};
const verdict=(r,m)=>{if(!r||!(m>=0)||isNaN(m))return'';const ok=m>=r.min-1e-9&&m<=r.max+1e-9;
 return`<div class="vd ${ok?'ok':'ng'}">${ok?'✔ ĐẠT':'✘ KHÔNG ĐẠT'}<small>Giá trị đo ${f(m)} ${ok?'nằm trong':'nằm ngoài'} khoảng cho phép</small></div>`};
const card=(title,lines,tolHtml,rr,meas,extra)=>`<div class="res"><div class="rt">${title}</div>${lines.map(l=>`<div class="rl">${l}</div>`).join('')}
 <div class="tol">${tolHtml}</div>${rr?`<div class="mm"><div><span>Nhỏ nhất</span><b>${f(rr.min)}</b></div><div><span>Danh nghĩa</span><b>${f(rr.nom)}</b></div><div><span>Lớn nhất</span><b>${f(rr.max)}</b></div></div>`:''}${extra||''}${verdict(rr,meas)}</div>`;
const warn=t=>`<div class="res warn">${t}</div>`;
const tabs=$$('.tab'),panes=$$('.pane');
tabs.forEach(b=>b.onclick=()=>{tabs.forEach(x=>x.classList.toggle('on',x===b));panes.forEach(p=>p.hidden=p.id!==b.dataset.p);const pn=$('#'+b.dataset.p);setTimeout(()=>pn.scrollIntoView({behavior:'smooth',block:'start'}),30)});
$$('.up').forEach(u=>u.onclick=()=>$('.tabs').scrollIntoView({behavior:'smooth',block:'center'}));$$('.pane').forEach(p=>p.style.scrollMarginTop='14px');

/* ===== 1. TRA NGUYÊN LIỆU ===== */
const mSel=$('#mat');mSel.innerHTML=D.order.map(t=>`<option>${t}</option>`).join('');
const dimName={T:t=>t==='DÀY'?'Dày (T)':t==='ĐƯỜNG KÍNH'?'Đường kính (D)':'Kích thước (D/W)',W:()=>'Rộng (W)',L:()=>'Dài (L)'};
function buildInputs(){const m=D.tra[mSel.value],k=[['T',m.tLabel]];if(m.hasW)k.push(['W','RỘNG']);if(m.hasL)k.push(['L','DÀI']);
 $('#dims').innerHTML=k.map(([c,l])=>`<div class="fld"><label>${dimName[c](l)} <i>mm</i></label><div class="two"><input id="n${c}" inputmode="none" data-num placeholder="Nhập số" autocomplete="off"><input id="m${c}" class="meas" inputmode="none" data-num placeholder="Đo thực tế" autocomplete="off"></div></div>`).join('');
 $$('#dims input').forEach(i=>i.oninput=calcMat);calcMat()}
function tblHtml(b,ri,ci){return`<details><summary>Xem toàn bộ bảng ${b.dim}</summary><div class="tw"><table><thead><tr><th></th>${b.cols.map((c,i)=>`<th class="${i===ci?'hc':''}">${c.label}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r,i)=>`<tr class="${i===ri?'hr':''}"><th>${r.label}</th>${r.vals.map((v,j)=>`<td class="${i===ri&&j===ci?'hit':j===ci?'hc':''}">${v??''}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`}
function calcMat(){const m=D.tra[mSel.value],out=[];const v={T:num($('#nT')?.value),W:num($('#nW')?.value),L:num($('#nL')?.value)},ms={T:num($('#mT')?.value),W:num($('#mW')?.value),L:num($('#mL')?.value)};
 if(isNaN(v.T)){$('#matOut').innerHTML='<div class="hint">Nhập <b>thông số</b> (ví dụ độ dày) để xem dung sai theo bảng.</div>';return}
 m.blocks.forEach(b=>{const tg=b.dim==='RỘNG'?'W':b.dim==='DÀI'?'L':'T',nom=v[tg],key=b.dim==='DÀI'?'L':'W',name=tg==='T'?m.tLabel:b.dim;
  const ri=b.rows.findIndex(r=>inIv(v.T,r.iv));
  if(ri<0){out.push(warn(`<b>${name}</b>: giá trị ${m.tLabel.toLowerCase()} <b>${f(v.T)}</b> nằm ngoài các dải trong bảng (${b.rows[0].label} … ${b.rows.at(-1).label}).`));return}
  let ci=0;if(b.cols.length>1){if(isNaN(v[key])){out.push(warn(`<b>${name}</b>: nhập thêm <b>${key==='W'?'chiều rộng (W)':'chiều dài (L)'}</b> để chọn đúng cột dung sai.`));return}
   ci=b.cols.findIndex(c=>inIv(v[key],c.iv));if(ci<0){out.push(warn(`<b>${name}</b>: ${key==='W'?'chiều rộng':'chiều dài'} <b>${f(v[key])}</b> nằm ngoài các cột trong bảng.`));return}}
  const raw=b.rows[ri].vals[ci],t=parseTol(raw);
  const lines=[`Dải ${m.tLabel.toLowerCase()}: <b>${b.rows[ri].label}</b>`];if(b.cols.length>1)lines.push(`Cột ${key==='W'?'rộng':'dài'}: <b>${b.cols[ci].label}</b>`);
  if(t.k==='none'||t.k==='text'||t.k==='amb'){const msg=t.k==='none'?'Bảng không quy định':t.k==='amb'?`<b>${raw}</b><small>Ô gốc ghi chưa rõ dấu, vui lòng đối chiếu bảng gốc</small>`:`<b>${raw}</b>`;
   out.push(card(`Dung sai ${name}${nom>=0?' · '+f(nom)+' mm':''}`,lines,msg,null,0,tblHtml(b,ri,ci)));return}
  const rr=isNaN(nom)?null:rng(t,nom);
  out.push(card(`Dung sai ${name}${nom>=0?' · '+f(nom)+' mm':''}`,lines,`<b>${raw.replace(/\s+/g,' ')}</b>${t.pct&&rr?` <small>= ± ${f(rr.d)} mm</small>`:t.k==='sym'?' <small>mm</small>':' <small>mm</small>'}`,rr,ms[tg],tblHtml(b,ri,ci)))});
 if(m.bend.length){const r=m.bend.find(x=>inIv(v.T,x.iv));out.push(r?card('Độ cong',[`Dải dày: <b>${r.label}</b>`],`<b>${r.v}</b>`,null,0):warn('Độ cong: độ dày nằm ngoài bảng.'))}
 $('#matOut').innerHTML=out.join('')}
mSel.onchange=buildInputs;buildInputs();

/* ===== 2. THÉP DÂY ===== */
const W=D.wire,codes=[...new Set(W.rows.map(r=>r.code))];
$('#wcode').innerHTML=codes.map(c=>`<option>${c}</option>`).join('');
const wr=r=>{const m=String(r).match(/^([\d.]+)\s*-\s*([\d.]+)$/),x=String(r).match(/^([\d.]+)x([\d.]+)$/);return m?[+m[1],+m[2]]:x?[+x[1],+x[1]]:[+r,+r]};
const wTable=(t,hi)=>`<details><summary>Xem toàn bộ bảng</summary><div class="tw"><table><thead><tr><th>Đường kính dây</th><th>DS</th><th>Độ lệch tâm</th></tr></thead><tbody>${t.map((r,i)=>`<tr class="${i===hi?'hr':''}"><th>${r.label}</th><td>${r.ds}</td><td>${r.ecc}</td></tr>`).join('')}</tbody></table></div></details>`;
function calcWire(){const c=$('#wcode').value,d=num($('#wd').value),me=num($('#wm').value),rows=W.rows.filter(r=>r.code===c);let o='';
 const list=`<details><summary>Các dải của ${c}</summary><div class="tw"><table><thead><tr><th>Đường kính (mm)</th><th>Dung sai</th><th>Tiêu chuẩn</th></tr></thead><tbody>${rows.map(r=>`<tr><th>${r.range}</th><td>${r.tol||''}</td><td>${r.std||''}</td></tr>`).join('')}</tbody></table></div></details>`;
 if(isNaN(d)){$('#wOut').innerHTML='<div class="hint">Chọn <b>mã vật liệu</b> và nhập <b>đường kính dây</b> để tra dung sai.</div>'+list;return}
 const hit=rows.filter(r=>{const[a,b]=wr(r.range);return d>=a-1e-9&&d<=b+1e-9});
 if(hit.length)hit.forEach(r=>{const t=parseTol(r.tol),rr=rng(t,d);o+=card(`${c} · Ø ${f(d)} mm`,[`Dải: <b>${r.range} mm</b>`,r.std?`Tiêu chuẩn: <b>${r.std}</b>`:''].filter(Boolean),`<b>${r.tol}</b> <small>mm</small>`,rr,me)});
 else o+=warn(`Đường kính <b>${f(d)} mm</b> không nằm trong dải nào của <b>${c}</b> trong bảng.`);
 const ds=[[W.t1,'Bảng 1'],[W.t2,'Bảng 2']].map(([t,n])=>{const i=t.findIndex(r=>inIv(d,r.iv));if(i<0)return warn(`<b>Dung sai & độ lệch tâm – ${n}</b>: ngoài dải (${t[0].label} … ${t.at(-1).label}).`);
  const r=t[i],rr=rng(parseTol(r.ds),d);return card(`DS & độ lệch tâm · ${n}`,[`Dải: <b>${r.label} mm</b>`],`<b>${r.ds}</b> <small>mm</small>`,rr,NaN,`<div class="ecc">Độ lệch tâm: <b>${r.ecc}</b></div>`+wTable(t,i))}).join('');
 $('#wOut').innerHTML=o+`<h3 class="sub">Dung sai đường kính &amp; độ lệch tâm theo đường kính dây</h3>`+ds+`<p class="note">${W.note}</p>`+list}
['#wcode'].forEach(s=>$(s).onchange=calcWire);['#wd','#wm'].forEach(s=>$(s).oninput=calcWire);calcWire();

/* ===== 3. ĐỘ CỨNG NL ===== */
const H=D.hard;let grp='cu';
const hs=s=>{if(s==null||s==='--'||s==='')return null;s=s.replace(',','.');let m;
 if(m=s.match(/^([\d.]+)\s*÷\s*([\d.]+)\s*(HR\w)?/))return{lo:+m[1],hi:+m[2],u:m[3]||''};
 if(m=s.match(/^min\s*([\d.]+)/i))return{lo:+m[1],u:''};if(m=s.match(/^≥\s*([\d.]+)/))return{lo:+m[1]};if(m=s.match(/^≤\s*([\d.]+)/))return{hi:+m[1]};
 if(m=s.match(/^([\d.]+)$/))return{ref:+m[1]};return null};
const hv=(sp,m,u)=>{if(!sp||isNaN(m))return'';if(sp.ref!=null)return'';const ok=(sp.lo==null||m>=sp.lo)&&(sp.hi==null||m<=sp.hi);return`<div class="vd ${ok?'ok':'ng'}">${ok?'✔ ĐẠT':'✘ KHÔNG ĐẠT'}<small>${f(m)} ${u||''} ${ok?'đạt':'không đạt'} yêu cầu</small></div>`};
const hsHtml=(s,u)=>!s?'<span class="mut">Không quy định</span>':s.ref!=null?`${s.ref} ${u||''}`:s.lo!=null&&s.hi!=null?`${s.lo} ÷ ${s.hi} ${s.u||u||''}`:s.lo!=null?`≥ ${s.lo} ${s.u||u||''}`:`≤ ${s.hi} ${u||''}`;
const mats=g=>g==='cu'?[...new Set(H.cu.map(x=>x.m))]:g==='al'?[...new Set(H.al.map(x=>x.m))]:g==='st'?[...H.s1,...H.s2].map(x=>x.m):[];
function fillHM(){const l=mats(grp);$('#hmat').innerHTML=l.map(x=>`<option>${x}</option>`).join('');$('#hmatw').hidden=grp==='oem';buildTemper()}
function buildTemper(){const tw=$('#htw');tw.hidden=!(grp==='cu'||grp==='al');if(grp==='cu'||grp==='al'){const rows=H[grp].filter(x=>x.m===$('#hmat').value);$('#htemper').innerHTML=rows.map(x=>`<option>${x.t}</option>`).join('')}
 $('#hmw').hidden=grp==='oem'||grp==='al'||grp==='st';calcHard()}
function calcHard(){const el=$('#hOut');let o='';
 if(grp==='oem'){el.innerHTML=card(H.oem.name,[],`<b>${H.oem.v}</b>`,null,0);return}
 if(grp==='cu'||grp==='al'){const m=$('#hmat').value,tp=$('#htemper').value,all=H[grp].filter(x=>x.m===m),r=all.find(x=>x.t===tp)||all[0],u=grp==='cu'?'HV':'HB',sp=hs(r.v),me=num($('#hm').value);
  o+=`<div class="res"><div class="rt">${m} · độ cứng ${r.t}</div><div class="tol big"><b>${hsHtml(sp,u)}</b></div>${hv(sp,me,sp?.u||u)}${grp==='al'?'<div class="rl">Giá trị HB tham chiếu theo bảng.</div>':''}</div>`;
  o+=`<div class="tw"><table><thead><tr><th>Mã độ cứng</th><th>${u}</th></tr></thead><tbody>${all.map(x=>`<tr class="${x===r?'hr':''}"><th>${x.t}</th><td>${hsHtml(hs(x.v),u)}</td></tr>`).join('')}</tbody></table></div>`}
 if(grp==='st'){const m=$('#hmat').value,r=H.s1.find(x=>x.m===m)||H.s2.find(x=>x.m===m),ms={HB:num($('#hmHB').value),HRB:num($('#hmHRB').value),HV:num($('#hmHV').value)};
  const P=[['Tỷ trọng','rho','g/cm³'],['σc (giới hạn chảy)','sc','N/mm²'],['σb (giới hạn bền)','sb','N/mm²'],['Độ dãn dài tương đối','el','%']];
  o+=`<div class="res"><div class="rt">Thép ${m}</div><div class="grid">${P.map(([n,k,u])=>r[k]?`<div><span>${n}</span><b>${r[k]}</b><small>${u}</small></div>`:'').join('')}</div></div>`;
  o+=['HB','HRB','HV'].map(k=>{const sp=hs(r[k]);return`<div class="res"><div class="rt">Độ cứng ${k}</div><div class="tol big"><b>${hsHtml(sp,k)}</b></div>${hv(sp,ms[k],k)}</div>`}).join('')}
 el.innerHTML=o}
$$('.seg button').forEach(b=>b.onclick=()=>{grp=b.dataset.g;$$('.seg button').forEach(x=>x.classList.toggle('on',x===b));$('#hst').hidden=grp!=='st';fillHM()});
['#hmat'].forEach(s=>$(s).onchange=buildTemper);$('#htemper').onchange=calcHard;['#hm','#hmHB','#hmHRB','#hmHV'].forEach(s=>$(s).oninput=calcHard);
$('#hst').hidden=true;fillHM();
$('#hsrc').textContent=H.src;


/* ===== 4. TIÊU CHUẨN NL ===== */
const sSel=$('#smat'),ST=D.stats;
sSel.innerHTML='<option value="">— Chọn vật liệu —</option><option value="*">★ Tất cả vật liệu ('+ST.mats+')</option>'+D.order.map(t=>{const m=D.tra[t];return`<option value="${t}">${t} · ${m.blocks.length+(m.bend.length?1:0)} bảng</option>`}).join('');
$('#sStat').innerHTML=`<b>${ST.mats}</b> vật liệu · <b>${ST.tables}</b> bảng dung sai · <b>${ST.cells}</b> ô dữ liệu — đã nạp đủ từ sheet “TIÊU CHUẨN NL”.`;
const dimTxt={'DÀY':'Dung sai DÀY (T)','ĐƯỜNG KÍNH':'Dung sai ĐƯỜNG KÍNH (D)','KÍCH THƯỚC':'Dung sai KÍCH THƯỚC (D/W)','RỘNG':'Dung sai RỘNG (W)','DÀI':'Dung sai DÀI (L)'};
const clean=v=>v==null?'':String(v).replace(/\s+/g,' ');
function stdTbl(b,ri,ci,tl){const multi=b.cols.length>1,k=b.dim==='DÀI'?'chiều dài L':'chiều rộng W';
 const head=multi?`<tr><th rowspan="2">${tl}</th><th colspan="${b.cols.length}">Cột theo ${k} (mm)</th></tr><tr>${b.cols.map((c,i)=>`<th class="${i===ci?'hc':''}">${clean(c.label)}</th>`).join('')}</tr>`:`<tr><th>${tl}</th><th>${clean(b.cols[0].label)}</th></tr>`;
 const rows=b.rows.map((r,i)=>`<tr class="${i===ri?'hr':''}"><th>${clean(r.label)}</th>${r.vals.map((v,j)=>`<td class="${i===ri&&j===ci?'hit':j===ci?'hc':''}">${clean(v)}</td>`).join('')}</tr>`).join('');
 return`<div class="tw"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>`}
function matStd(name,m,v,withTitle){const tl=m.tLabel==='DÀY'?'Dày T (mm)':m.tLabel==='ĐƯỜNG KÍNH'?'Đường kính D (mm)':'Kích thước (mm)';let o='';
 if(withTitle)o+=`<div class="res"><div class="rt" style="font-size:18px">${name}</div><div class="rl">${m.blocks.length+(m.bend.length?1:0)} bảng dung sai · đơn vị mm</div></div>`;
 m.blocks.forEach(b=>{const key=b.dim==='DÀI'?'L':'W';let ri=-1,ci=-1;
  if(v&&!isNaN(v.T)){ri=b.rows.findIndex(r=>inIv(v.T,r.iv));if(ri>=0)ci=b.cols.length===1?0:isNaN(v[key])?-1:b.cols.findIndex(c=>inIv(v[key],c.iv))}
  const hit=ri>=0&&ci>=0?`<div class="vd ok" style="font-size:16px">Dung sai: ${clean(b.rows[ri].vals[ci])||'—'}</div>`:'';
  o+=`<div class="res"><div class="rt">${dimTxt[b.dim]}</div>${b.note?`<div class="rl">${b.note}</div>`:''}${stdTbl(b,ri,ci,tl)}${hit}</div>`});
 if(m.bend.length){const ri=v&&!isNaN(v.T)?m.bend.findIndex(x=>inIv(v.T,x.iv)):-1;o+=`<div class="res"><div class="rt">Độ cong</div><div class="tw"><table><thead><tr><th>Dày T (mm)</th><th>Độ cong</th></tr></thead><tbody>${m.bend.map((r,i)=>`<tr class="${i===ri?'hr':''}"><th>${clean(r.label)}</th><td>${clean(r.v)}</td></tr>`).join('')}</tbody></table></div></div>`}
 return o}
function calcStd(){const all=sSel.value==='*';let o='';
 if(sSel.value===''){$('#sOut').innerHTML='<div class="hint">Chọn một vật liệu để xem bảng dung sai chi tiết của vật liệu đó.</div>';return}
 if(all)D.order.forEach(t=>o+=matStd(t,D.tra[t],null,true));
 else{const m=D.tra[sSel.value];o=matStd(sSel.value,m,{T:num($('#sT').value),W:num($('#sW').value),L:num($('#sL').value)},false)}
 $('#sOut').innerHTML=o}
sSel.onchange=()=>{const all=sSel.value==='*',none=sSel.value==='';$('#sIn').hidden=all||none;if(!all&&!none){const m=D.tra[sSel.value];$('#sTl').textContent=m.tLabel==='DÀY'?'Dày (T)':m.tLabel==='ĐƯỜNG KÍNH'?'Đường kính (D)':'Kích thước (D/W)';$('#sWw').hidden=!m.hasW&&!m.blocks.some(b=>b.cols.length>1);$('#sLw').hidden=!m.hasL}
 ['#sT','#sW','#sL'].forEach(x=>$(x).value='');calcStd()};
['#sT','#sW','#sL'].forEach(x=>$(x).oninput=calcStd);sSel.onchange();
})();
