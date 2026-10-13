/* La Bàn Đại Học — JavaScript */

document.addEventListener('DOMContentLoaded',()=>{
  const cutoff=document.getElementById('cutoff');
  const filters=cutoff?.querySelector('.panel');
  if(!filters)return;
  const summary=document.createElement('div');
  summary.id='schoolSummaries';
  summary.setAttribute('aria-live','polite');
  const matchcount=document.getElementById('matchcount');
  filters.insertBefore(summary,matchcount);
  const profiles={
    VNU:{name:'Đại học Công nghệ – ĐHQG Hà Nội',logo:'https://www.google.com/s2/favicons?domain=uet.vnu.edu.vn&sz=128',fallback:'UET',detail:'Trường thành viên ĐHQG Hà Nội · Đào tạo công nghệ, kỹ thuật và nghiên cứu khoa học.',url:'https://uet.vnu.edu.vn/'},
    HUST:{name:'Đại học Bách khoa Hà Nội',logo:'https://www.google.com/s2/favicons?domain=hust.edu.vn&sz=128',fallback:'HUST',detail:'Đào tạo kỹ thuật, công nghệ và khoa học ứng dụng tại Hà Nội.',url:'https://hust.edu.vn/'}
  };
  const update=()=>{
    const selected=document.getElementById('school')?.value||'all';
    const q=(document.getElementById('q')?.value||'').trim().toLocaleLowerCase('vi');
    const matches=Object.entries(profiles).filter(([key,p])=>{
      const rows=data.filter(d=>d.key===key);
      return selected==='all'||selected===key ? (!q||p.name.toLocaleLowerCase('vi').includes(q)||rows.some(d=>[d.school,d.major,d.code].join(' ').toLocaleLowerCase('vi').includes(q))) : false;
    });
    const keys=selected==='all'?matches.map(([key])=>key):matches.filter(([key])=>key===selected).map(([key])=>key);
    summary.innerHTML=keys.map(k=>{const p=profiles[k];return `<article class="school-summary"><img src="${p.logo}" alt="Logo ${p.name}" loading="lazy" onerror="this.outerHTML='<span class=&quot;school-logo-fallback&quot; aria-label=&quot;Logo ${p.name}&quot;>${p.fallback}</span>'"><div><h3><a class="source" href="${p.url}" target="_blank" rel="noopener">${p.name}</a></h3></div></article>`}).join('');
  };
  update();
  document.getElementById('school')?.addEventListener('change',update);
  document.getElementById('q')?.addEventListener('input',update);
});

(()=>{
  const updateAdminVisibility=()=>{
    const panel=[...document.querySelectorAll('#cutoff .panel')].find(el=>el.textContent.includes('Nhập điểm chuẩn hàng loạt'));
    if(!panel)return;
    panel.style.display=location.hash==='#quantri'?'':'none';
  };
  const observer=new MutationObserver(updateAdminVisibility);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('hashchange',updateAdminVisibility);
  updateAdminVisibility();
})();

const data=[
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN1',major:'Công nghệ thông tin',combo:'A00, A01, D01 (xác nhận theo đề án trường)',combos:['A00','A01','D01'],method:'THPT',year:2026,score:25,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN2',major:'Kỹ thuật máy tính',combo:'A00, A01, D01 (xác nhận theo đề án trường)',combos:['A00','A01','D01'],method:'THPT',year:2026,score:26.63,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN3',major:'Vật lý kỹ thuật',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:25.41,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN4',major:'Cơ kỹ thuật',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:26.13,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN6',major:'Kỹ thuật cơ điện tử',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:26.86,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN8',major:'Khoa học máy tính',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:26.86,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN11',major:'Kỹ thuật điều khiển và tự động hóa',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:27.78,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN12',major:'Trí tuệ nhân tạo',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:26.26,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN14',major:'Hệ thống thông tin',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:25.85,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Công nghệ – ĐHQG Hà Nội',key:'VNU',code:'CN20',major:'Khoa học dữ liệu',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:26.85,source:'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'IT-E10',major:'Khoa học dữ liệu và Trí tuệ nhân tạo (CT tiên tiến)',combo:'A00, A01 (cần đối chiếu mã tổ hợp trong đề án)',combos:['A00','A01'],method:'THPT',year:2026,score:29.54,source:'https://ts.hust.edu.vn/index.php/tin-tuc/diem-chuan-dai-hoc-bach-khoa-ha-noi-nam-2026'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'IT1',major:'Khoa học máy tính',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:29.27,source:'https://ts.hust.edu.vn/index.php/tin-tuc/diem-chuan-dai-hoc-bach-khoa-ha-noi-nam-2026'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'EE2',major:'Kỹ thuật Điều khiển – Tự động hóa',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:28.98,source:'https://ts.hust.edu.vn/index.php/tin-tuc/diem-chuan-dai-hoc-bach-khoa-ha-noi-nam-2026'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'ET1',major:'Kỹ thuật Điện tử – Viễn thông',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:28.57,source:'https://ts.hust.edu.vn/index.php/tin-tuc/diem-chuan-dai-hoc-bach-khoa-ha-noi-nam-2026'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'ME1',major:'Kỹ thuật Cơ điện tử',combo:'Điểm thi tốt nghiệp THPT',method:'THPT',year:2026,score:28.47,source:'https://ts.hust.edu.vn/index.php/tin-tuc/diem-chuan-dai-hoc-bach-khoa-ha-noi-nam-2026'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'EE2',major:'Kỹ thuật Điều khiển – Tự động hóa',combo:'Đánh giá tư duy TSA (thang 100)',method:'TSA',year:2026,score:76.5,source:'https://seee.hust.edu.vn/vi/tin-tuc/2026-08-09_diem-chuan-2026-chao-tan-sinh-vien-k71/'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'ET1',major:'Kỹ thuật Điện tử – Viễn thông',combo:'Đánh giá tư duy TSA (thang 100)',method:'TSA',year:2026,score:73.13,source:'https://seee.hust.edu.vn/vi/tin-tuc/2026-08-09_diem-chuan-2026-chao-tan-sinh-vien-k71/'},
{school:'Đại học Bách khoa Hà Nội',key:'HUST',code:'EE1',major:'Kỹ thuật Điện',combo:'Đánh giá tư duy TSA (thang 100)',method:'TSA',year:2026,score:70.95,source:'https://seee.hust.edu.vn/vi/tin-tuc/2026-08-09_diem-chuan-2026-chao-tan-sinh-vien-k71/'}
];

const $=id=>document.getElementById(id);
const fmt=n=>Number(n).toLocaleString('vi-VN',{minimumFractionDigits:2,maximumFractionDigits:2});
const schoolProfiles={
  VNU:{name:'Đại học Công nghệ – ĐHQG Hà Nội',logo:'https://uet.vnu.edu.vn/wp-content/uploads/2021/10/logo.png',detail:'Trường thành viên ĐHQG Hà Nội · Định hướng đào tạo và nghiên cứu công nghệ, kỹ thuật'},
  HUST:{name:'Đại học Bách khoa Hà Nội',logo:'https://hust.edu.vn/uploads/sys/logo-dhbk-1.png',detail:'Trường đại học kỹ thuật · Đào tạo kỹ thuật, công nghệ và khoa học ứng dụng'}
};
function show(id){
  document.querySelectorAll('main section').forEach(s=>s.classList.toggle('hidden',s.id!==id));
  document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.go===id));
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='cutoff')renderRows();
}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>show(b.dataset.jump));

function renderRows(){
  const q=$('q').value.trim().toLocaleLowerCase('vi');
  const year=+$('year').value,method=$('method').value,school=$('school').value,combo=$('cutcombo').value,max=$('cutmax').value;
  const found=data.filter(d=>d.year===year&&(method==='all'||d.method===method)&&(school==='all'||d.key===school)&&(combo==='all'||(d.combos||[]).includes(combo)||(combo==='K00'&&d.method==='TSA')||(combo==='K01'&&d.combo.includes('K01')))&&(max==='all'||d.score<=Number(max))&&[d.school,d.major,d.code,d.combo].join(' ').toLocaleLowerCase('vi').includes(q));
  $('rows').innerHTML=found.map(d=>`<tr><td><b>${d.code}</b></td><td>${d.major}</td><td>${d.combo}</td><td>${d.method==='TSA'?'ĐGTD (TSA)':'Điểm thi tốt nghiệp THPT'}</td><td class="score">${fmt(d.score)}</td><td><a class="source" href="${d.source}" target="_blank" rel="noopener">Xem nguồn ↗</a></td></tr>`).join('');
  $('matchcount').textContent=`Hiển thị ${found.length} bản ghi phù hợp trong năm ${year}`;
  $('empty').classList.toggle('hidden',found.length>0);
}
const schoolSuggestions=document.createElement('datalist');
schoolSuggestions.id='schoolSuggestions';
document.body.appendChild(schoolSuggestions);
$('q').setAttribute('list','schoolSuggestions');
$('q').setAttribute('type','search');
$('q').placeholder='Gõ tên trường để tìm, ví dụ Bách khoa...';
$('q').previousElementSibling.textContent='Tìm trường, ngành hoặc mã';
[...new Set(data.map(d=>d.school))].sort().forEach(name=>{
  const option=document.createElement('option');
  option.value=name;
  schoolSuggestions.appendChild(option);
});
const renderRowsOriginal=renderRows;
renderRows=function(){
  renderRowsOriginal();
  const head=document.querySelector('#cutoff .table thead');
  if(head)head.innerHTML='<tr><th>Mã ngành</th><th>Ngành / chương trình</th><th>Tổ hợp môn</th><th>Phương thức</th><th>Điểm chuẩn</th><th>Nguồn</th></tr>';
};
['q','year','method','school','cutcombo','cutmax'].forEach(id=>$(id).addEventListener(id==='q'?'input':'change',renderRows));
renderRows();

const comboSubjects={
  A00:['Toán','Vật lí','Hóa học'],
  A01:['Toán','Vật lí','Tiếng Anh'],
  B00:['Toán','Hóa học','Sinh học'],
  C00:['Ngữ văn','Lịch sử','Địa lí'],
  D01:['Toán','Ngữ văn','Tiếng Anh'],
  D07:['Toán','Hóa học','Tiếng Anh'],
  K01:['Toán','Ngữ văn','Môn thứ ba theo đề án']
};
function updateCombo(){
  const subjects=comboSubjects[$('combo').value]||comboSubjects.A00;
  ['l1','l2','l3'].forEach((id,i)=>$(id).textContent=subjects[i]);
  $('calcresult').classList.add('hidden');
}
$('combo').addEventListener('change',updateCombo);
updateCombo();

let calcMode='thpt';
document.querySelectorAll('[data-calc]').forEach(b=>b.onclick=()=>{
  calcMode=b.dataset.calc;
  document.querySelectorAll('[data-calc]').forEach(x=>x.classList.toggle('active',x===b));
  $('calc').textContent=calcMode==='thpt'?'Tính tổng điểm':'Tính điểm học bạ (ước tính)';
});
$('calc').onclick=()=>{
  const vals=['s1','s2','s3'].map(id=>Number($(id).value));
  const p=Number($('priority').value||0),b=Number($('bonus').value||0);
  if(vals.some((v,i)=>$(['s1','s2','s3'][i]).value===''||v<0||v>10)||p<0||b<0||p>3||b>3){
    $('calcresult').classList.remove('hidden');
    $('calcresult').textContent='Hãy nhập đủ 3 điểm từ 0 đến 10, điểm ưu tiên và điểm cộng trong khoảng 0–3.';
    return;
  }
  const base=vals.reduce((a,c)=>a+c,0),eligible=Math.min(30,base+b);
  const priority=p*(base>=22.5?(30-base)/7.5:1),total=Math.min(30,eligible+priority);
  const combo=$('combo').value,school=$('calcschool').value;
  const matches=data.filter(d=>d.year===+$('year').value&&(school==='all'||d.key===school)&&(d.combos||[]).includes(combo)&&d.method==='THPT');
  const matchingHtml=matches.length
    ?`<p><b>Điểm chuẩn tham khảo cùng tổ hợp trong dữ liệu năm ${$('year').value}:</b></p>${matches.map(d=>`<p>${d.school} — ${d.major}: <b>${fmt(d.score)}</b> <a class="source" href="${d.source}" target="_blank" rel="noopener">Nguồn ↗</a></p>`).join('')}`
    :'<p>Chưa có dữ liệu điểm chuẩn đã gắn chính xác với tổ hợp này trong bản mẫu. Không suy đoán điểm chuẩn.</p>';
  $('calcresult').classList.remove('hidden');
  $('calcresult').innerHTML=`<span class="subtle">${calcMode==='thpt'?'Tổng điểm tổ hợp '+combo:'Tổng điểm học bạ tham khảo — tổ hợp '+combo}</span><strong class="big">${fmt(Math.round(total*100)/100)} / 30</strong><span>Điểm 3 môn: ${fmt(base)} · Điểm cộng: ${fmt(b)} · Điểm ưu tiên ước tính: ${fmt(Math.round(priority*100)/100)}.</span>${matchingHtml}<span class="subtle">Ước tính đơn giản; cách tính ưu tiên và công thức chính thức có thể khác theo quy chế, trường và ngành.</span>`;
};

const careers={
  data:[['💻','Công nghệ thông tin','Lập trình, hệ thống, an ninh mạng.','Toán · Tin'],['📊','Khoa học dữ liệu','Phân tích dữ liệu, thống kê, mô hình.','Toán · Thống kê'],['💳','Công nghệ tài chính (FinTech)','Kết hợp tài chính, dữ liệu và công nghệ.','Tài chính · Công nghệ']],
  business:[['💳','Công nghệ tài chính (FinTech)','Giao thoa tài chính, phần mềm và dữ liệu.','Tài chính · Công nghệ'],['📈','Tài chính – Ngân hàng','Phân tích tài chính, quản trị rủi ro, dịch vụ ngân hàng.','Toán · Kinh tế'],['🛍️','Marketing / Kinh doanh số','Nghiên cứu thị trường, thương mại điện tử.','Kinh doanh · Sáng tạo']],
  people:[['🌐','Ngôn ngữ','Biên phiên dịch, nội dung đa ngôn ngữ, đối ngoại.','Ngoại ngữ · Giao tiếp'],['🧑‍🏫','Giáo dục','Dạy học, thiết kế học liệu, đào tạo.','Giao tiếp · Chuyên môn'],['🤝','Quản trị nhân lực','Tuyển dụng, phát triển nhân sự, văn hóa tổ chức.','Con người · Tổ chức']],
  design:[['🎨','Thiết kế đồ họa','Thiết kế hình ảnh, thương hiệu và sản phẩm số.','Sáng tạo · Thị giác'],['📣','Truyền thông','Nội dung, truyền thông số, quan hệ công chúng.','Viết · Sáng tạo'],['🛍️','Marketing','Kết hợp nghiên cứu người dùng và sáng tạo.','Thị trường · Nội dung']],
  science:[['🧪','Công nghệ sinh học','Ứng dụng sinh học trong nghiên cứu và sản xuất.','Sinh · Hóa'],['🌱','Khoa học môi trường','Đánh giá môi trường, phát triển bền vững.','Khoa học · Thực địa'],['⚗️','Hóa học / Kỹ thuật hóa học','Phân tích, vật liệu, quy trình công nghiệp.','Hóa · Thực hành']]
};
function renderCareer(){
  const arr=careers[$('interest').value];
  $('careerresults').innerHTML=arr.map(c=>`<article class="career"><div class="emoji">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p><span class="pill">${c[3]}</span></article>`).join('');
}
$('suggest').onclick=renderCareer;
renderCareer();

function tick(){
  let target=new Date(($('examdate').value||'2027-06-01')+'T00:00:00').getTime()-Date.now();
  if(target<0)target=0;
  const day=Math.floor(target/86400000),hour=Math.floor(target%86400000/3600000),min=Math.floor(target%3600000/60000),sec=Math.floor(target%60000/1000);
  $('days').textContent=day;
  $('hours').textContent=String(hour).padStart(2,'0');
  $('minutes').textContent=String(min).padStart(2,'0');
  $('seconds').textContent=String(sec).padStart(2,'0');
}
setInterval(tick,1000);
$('examdate').addEventListener('change',tick);
tick();
$('saveplan').onclick=()=>{
  const plan=$('plan').value.trim();
  $('planresult').classList.remove('hidden');
  $('planresult').textContent=plan?`Mục tiêu hôm nay: ${plan} — hãy ghi lại vào lịch cá nhân để không quên.`:'Nhập mục tiêu ôn tập của bạn trước nhé.';
};// Công cụ nhập và quản lý dữ liệu điểm chuẩn
(()=>{
  const key='labandaihoc_extra_cutoffs_v1';
  const load=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}};
  const save=rows=>localStorage.setItem(key,JSON.stringify(rows));
  const section=document.getElementById('cutoff');
  if(!section)return;

  const panel=document.createElement('div');
  panel.className='panel';
  panel.style.marginTop='16px';
  panel.innerHTML=`
    <div class="sectionhead" style="margin-top:0">
      <div>
        <h2>Nhập điểm chuẩn hàng loạt</h2>
        <p>Dán bảng CSV để bổ sung dữ liệu. Dữ liệu lưu trong trình duyệt hiện tại.</p>
      </div>
      <span class="pill">Công cụ quản lý dữ liệu</span>
    </div>
    <div class="notice">
      Chỉ nhập điểm đã kiểm tra từ nguồn chính thức. Điểm THPT, TSA, HSA và học bạ có thể dùng thang điểm khác nhau.
    </div>
    <div class="fields" style="margin-top:12px">
      <div>
        <label for="bulkYear">Năm tuyển sinh</label>
        <select id="bulkYear">
          <option>2026</option><option>2025</option><option>2024</option>
        </select>
      </div>
      <div>
        <label for="bulkMethod">Phương thức mặc định</label>
        <select id="bulkMethod">
          <option value="THPT">Điểm thi tốt nghiệp THPT</option>
          <option value="TSA">ĐGTD (TSA)</option>
          <option value="HSA">ĐGNL (HSA)</option>
          <option value="HOCBA">Học bạ</option>
          <option value="OTHER">Phương thức khác</option>
        </select>
      </div>
      <div>
        <label for="bulkSchool">Tên trường mặc định</label>
        <input id="bulkSchool" placeholder="Tên trường đại học">
      </div>
    </div>
    <label for="bulkCsv" style="margin-top:12px">
      CSV: Trường, mã trường, mã ngành, ngành, tổ hợp, phương thức, năm, điểm, URL nguồn
    </label>
    <textarea id="bulkCsv" rows="7" style="width:100%;margin-top:4px;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:12px;font:13px ui-monospace,monospace" placeholder="Đại học Ví dụ,ABC,IT01,Công nghệ thông tin,A00,THPT,2025,25.5,https://example.edu.vn"></textarea>
    <div class="fields two">
      <button class="btn" id="importBulk">Nhập dữ liệu</button>
      <button class="btn secondary" id="downloadBulk">Xuất CSV</button>
    </div>
    <div class="subtle" id="bulkStatus" style="margin-top:10px"></div>
    <div class="fields two" style="margin-top:12px">
      <button class="btn secondary" id="clearBulk">Xóa dữ liệu đã nhập</button>
      <button class="btn secondary" id="csvExample">Điền dòng mẫu</button>
    </div>
  `;
  section.querySelector('.panel').after(panel);

  const parseLine=line=>{
    const out=[];
    let cur='',quoted=false;
    for(let i=0;i<line.length;i++){
      const c=line[i];
      if(c==='"'&&line[i+1]==='"'&&quoted){cur+='"';i++}
      else if(c==='"')quoted=!quoted;
      else if(c===','&&!quoted){out.push(cur.trim());cur=''}
      else cur+=c;
    }
    out.push(cur.trim());
    return out;
  };

  const esc=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const csvHeaders=['Trường','Mã trường','Mã ngành','Ngành','Tổ hợp','Phương thức','Năm','Điểm chuẩn','URL nguồn'];

  function renderExtra(){
    const q=(document.getElementById('q').value||'').trim().toLocaleLowerCase('vi');
    const year=+document.getElementById('year').value;
    const method=document.getElementById('method').value;
    const school=document.getElementById('school').value;
    const combo=document.getElementById('cutcombo').value;
    const max=document.getElementById('cutmax').value;

    const extra=load().filter(d=>
      d.year===year&&
      (method==='all'||d.method===method)&&
      (school==='all'||d.key===school)&&
      (combo==='all'||(d.combos||[]).includes(combo)||(combo==='K00'&&d.method==='TSA'))&&
      (max==='all'||d.score<=Number(max))&&
      [d.school,d.major,d.code,d.combo].join(' ').toLocaleLowerCase('vi').includes(q)
    );

    const rows=document.getElementById('rows');
    extra.forEach(d=>{
      const tr=document.createElement('tr');
      const values=[
        d.school,d.score,d.code,d.combo,
        ({THPT:'Điểm thi tốt nghiệp THPT',TSA:'ĐGTD (TSA)',HSA:'ĐGNL (HSA)',HOCBA:'Học bạ',OTHER:'Phương thức khác'})[d.method]||d.method,
        d.major,d.source
      ];
      values.forEach((v,i)=>{
        const td=document.createElement('td');
        if(i===1){
          td.className='score';
          td.textContent=String(v).replace('.',',');
        }else if(i===6&&v){
          const a=document.createElement('a');
          a.className='source';
