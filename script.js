```javascript
"use strict";

const $ = id => document.getElementById(id);
const STORE_KEY = "labandaihoc_cutoffs_v1";

const baseData = [
  {school:"Đại học Công nghệ – ĐHQG Hà Nội",key:"VNU",code:"CN1",major:"Công nghệ thông tin",combo:"A00",method:"THPT",year:2025,score:25.5,source:"https://uet.vnu.edu.vn/"},
  {school:"Đại học Công nghệ – ĐHQG Hà Nội",key:"VNU",code:"CN2",major:"Kỹ thuật máy tính",combo:"A00",method:"THPT",year:2025,score:26,source:"https://uet.vnu.edu.vn/"},
  {school:"Đại học Bách khoa Hà Nội",key:"HUST",code:"IT1",major:"Khoa học máy tính",combo:"A00",method:"THPT",year:2025,score:28,source:"https://hust.edu.vn/"},
  {school:"Đại học Bách khoa Hà Nội",key:"HUST",code:"EE2",major:"Kỹ thuật điều khiển và tự động hóa",combo:"A01",method:"TSA",year:2025,score:75,source:"https://hust.edu.vn/"},
  {school:"Đại học Công nghệ – ĐHQG Hà Nội",key:"VNU",code:"CN1",major:"Công nghệ thông tin",combo:"A00",method:"THPT",year:2024,score:25,source:"https://uet.vnu.edu.vn/"},
  {school:"Đại học Bách khoa Hà Nội",key:"HUST",code:"IT1",major:"Khoa học máy tính",combo:"A00",method:"THPT",year:2024,score:27.5,source:"https://hust.edu.vn/"}
];

const methods = {
  THPT:"Điểm thi tốt nghiệp THPT",
  TSA:"ĐGTD (TSA)",
  HSA:"ĐGNL (HSA)",
  HOCBA:"Học bạ",
  OTHER:"Phương thức khác"
};

function readExtra(){
  try {
    const data = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeExtra(data){
  localStorage.setItem(STORE_KEY,JSON.stringify(data));
}

function allData(){
  return [...baseData,...readExtra()];
}

function esc(value){
  return String(value ?? "").replace(/[&<>"']/g,c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[c]);
}

function showSection(id){
  document.querySelectorAll("main section").forEach(section=>{
    section.classList.toggle("hidden",section.id!==id);
  });
  document.querySelectorAll("[data-go]").forEach(button=>{
    button.classList.toggle("active",button.dataset.go===id);
  });
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="cutoff") renderRows();
}

document.querySelectorAll("[data-go]").forEach(button=>{
  button.addEventListener("click",()=>showSection(button.dataset.go));
});

function renderRows(){
  const q=($("q").value||"").trim().toLocaleLowerCase("vi");
  const year=Number($("year").value);
  const method=$("method").value;
  const school=$("school").value;
  const combo=$("cutcombo").value;
  const max=$("cutmax").value;

  const found=allData().filter(d=>{
    const text=[d.school,d.major,d.code,d.combo,d.method].join(" ").toLocaleLowerCase("vi");
    return d.year===year &&
      (method==="all"||d.method===method) &&
      (school==="all"||d.key===school) &&
      (combo==="all"||d.combo===combo||(combo==="K00"&&d.method==="TSA")) &&
      (max==="all"||d.score<=Number(max)) &&
      text.includes(q);
  });

  $("rows").innerHTML=found.map(d=>`
    <tr>
      <td><b>${esc(d.code)}</b></td>
      <td>${esc(d.major)}<div class="subtle">${esc(d.school)}</div></td>
      <td>${esc(d.combo)}</td>
      <td>${esc(methods[d.method]||d.method)}</td>
      <td class="score">${Number(d.score).toLocaleString("vi-VN")}</td>
      <td><a class="source" href="${esc(d.source)}" target="_blank" rel="noopener noreferrer">Xem nguồn ↗</a></td>
    </tr>
  `).join("");

  $("matchcount").textContent=`Có ${found.length} kết quả phù hợp trong năm ${year}.`;
  $("empty").classList.toggle("hidden",found.length>0);
}

["q","year","method","school","cutcombo","cutmax"].forEach(id=>{
  $(id).addEventListener(id==="q"?"input":"change",renderRows);
});

const subjects={
  A00:["Toán","Vật lí","Hóa học"],
  A01:["Toán","Vật lí","Tiếng Anh"],
  B00:["Toán","Hóa học","Sinh học"],
  C00:["Ngữ văn","Lịch sử","Địa lí"],
  D01:["Toán","Ngữ văn","Tiếng Anh"],
  D07:["Toán","Hóa học","Tiếng Anh"]
};

function updateSubjects(){
  const selected=subjects[$("combo").value]||subjects.A00;
  ["l1","l2","l3"].forEach((id,i)=>$(id).textContent=selected[i]);
}

$("combo").addEventListener("change",updateSubjects);

$("calc").addEventListener("click",()=>{
  const scores=["s1","s2","s3"].map(id=>Number($(id).value));
  const priority=Number($("priority").value||0);
  const bonus=Number($("bonus").value||0);

  const invalid=["s1","s2","s3"].some(id=>$(id).value==="")||
    scores.some(score=>!Number.isFinite(score)||score<0||score>10)||
    priority<0||priority>3||bonus<0||bonus>3;

  $("calcresult").classList.remove("hidden");

  if(invalid){
    $("calcresult").textContent="Nhập đủ ba điểm từ 0 đến 10, điểm ưu tiên và điểm cộng từ 0 đến 3.";
    return;
  }

  const sum=scores.reduce((a,b)=>a+b,0);
  const adjustedPriority=priority*(sum>=22.5?(30-sum)/7.5:1);
  const total=Math.min(30,sum+bonus+adjustedPriority);

  $("calcresult").innerHTML=`
    <span class="subtle">Tổng điểm tham khảo · Tổ hợp ${esc($("combo").value)}</span>
    <strong class="big">${total.toLocaleString("vi-VN",{maximumFractionDigits:2})} / 30</strong>
    <p>Điểm ba môn: ${sum.toLocaleString("vi-VN")}.</p>
    <p>Điểm cộng: ${bonus}; điểm ưu tiên ước tính: ${adjustedPriority.toLocaleString("vi-VN",{maximumFractionDigits:2})}.</p>
    <p class="subtle">Công thức thực tế phụ thuộc quy chế tuyển sinh và đề án từng trường.</p>`;
});

const careers={
  data:[
    ["💻","Công nghệ thông tin","Phần mềm, hệ thống và an ninh mạng.","Toán · Công nghệ"],
    ["📊","Khoa học dữ liệu","Phân tích dữ liệu và thống kê.","Toán · Phân tích"],
    ["💳","Công nghệ tài chính (FinTech)","Giao thoa giữa tài chính và công nghệ.","Tài chính · Công nghệ"]
  ],
  business:[
    ["💳","Công nghệ tài chính (FinTech)","Công nghệ trong thanh toán và dịch vụ tài chính.","Tài chính · Công nghệ"],
    ["📈","Tài chính – Ngân hàng","Phân tích tài chính và quản trị rủi ro.","Toán · Kinh tế"],
    ["🛍️","Marketing","Nghiên cứu thị trường và truyền thông.","Kinh doanh · Sáng tạo"]
  ],
  people:[
    ["🌐","Ngôn ngữ","Biên phiên dịch và nội dung đa ngôn ngữ.","Ngoại ngữ"],
    ["🧑‍🏫","Giáo dục","Dạy học và phát triển học liệu.","Giao tiếp"],
    ["🤝","Quản trị nhân lực","Tuyển dụng và phát triển nhân sự.","Con người"]
  ],
  design:[
    ["🎨","Thiết kế đồ họa","Thiết kế thương hiệu và sản phẩm số.","Sáng tạo"],
    ["📣","Truyền thông","Nội dung và quan hệ công chúng.","Viết · Sáng tạo"],
    ["🛍️","Marketing","Kết hợp nghiên cứu và sáng tạo.","Thị trường"]
  ],
  science:[
    ["🧪","Công nghệ sinh học","Ứng dụng sinh học trong nghiên cứu.","Sinh · Hóa"],
    ["🌱","Khoa học môi trường","Môi trường và phát triển bền vững.","Khoa học"],
    ["⚗️","Kỹ thuật hóa học","Vật liệu và quy trình công nghiệp.","Hóa học"]
  ]
};

function renderCareers(){
  const list=careers[$("interest").value]||careers.data;
  $("careerresults").innerHTML=list.map(c=>`
    <article class="career">
      <div class="emoji">${c[0]}</div>
      <h3>${esc(c[1])}</h3>
      <p>${esc(c[2])}</p>
      <span class="pill">${esc(c[3])}</span>
    </article>`).join("");
}

$("suggest").addEventListener("click",renderCareers);
$("interest").addEventListener("change",renderCareers);

function tick(){
  const date=$("examdate").value;
  if(!date)return;
  const diff=Math.max(0,new Date(date+"T00:00:00").getTime()-Date.now());
  $("days").textContent=Math.floor(diff/86400000);
  $("hours").textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,"0");
  $("minutes").textContent=String(Math.floor(diff%3600000/60000)).padStart(2,"0");
  $("seconds").textContent=String(Math.floor(diff%60000/1000)).padStart(2,"0");
}

$("examdate").addEventListener("change",tick);
setInterval(tick,1000);

$("saveplan").addEventListener("click",()=>{
  const plan=$("plan").value.trim();
  $("planresult").classList.remove("hidden");
  $("planresult").textContent=plan
    ?`Mục tiêu hôm nay: ${plan}. Hãy cố gắng hoàn thành từng bước nhé.`
    :"Nhập mục tiêu học tập trước nhé.";
});

/* Quản lý điểm chuẩn: nhập CSV, xuất CSV và xóa dữ liệu do người dùng thêm. */
function parseCSVLine(line){
  const values=[];
  let current="",quoted=false;

  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'&&line[i+1]==='"'&&quoted){
      current+='"';i++;
    }else if(c==='"'){
      quoted=!quoted;
    }else if(c===","&&!quoted){
      values.push(current.trim());current="";
    }else{
      current+=c;
    }
  }
  values.push(current.trim());
  return values;
}

function importCSV(){
  const lines=$("bulkCsv").value.trim().split(/\r?\n/).filter(Boolean);
  const imported=[];
  const errors=[];
  const defaultYear=Number($("bulkYear").value);
  const defaultMethod=$("bulkMethod").value;
  const defaultSchool=$("bulkSchool").value.trim();

  lines.forEach((line,index)=>{
    const cells=parseCSVLine(line);
    if(index===0&&/trường|school/i.test(cells[0]))return;

    let d;

    if(cells.length>=9){
      d={
        school:cells[0]||defaultSchool,
        key:cells[1]||"OTHER",
        code:cells[2],
        major:cells[3],
        combo:cells[4]||"Chưa ghi",
        method:cells[5]||defaultMethod,
        year:Number(cells[6]||defaultYear),
        score:Number(cells[7]),
        source:cells[8]
      };
    }else if(cells.length>=4){
      d={
        school:cells[0]||defaultSchool,
        key:"OTHER",
        code:cells[1],
        major:cells[2],
        combo:cells[3]||"Chưa ghi",
        method:defaultMethod,
        year:defaultYear,
        score:Number(cells[4]),
        source:cells[5]
      };
    }else{
      errors.push(index+1);
      return;
    }

    if(!d.school||!d.major||!d.code||!Number.isFinite(d.score)||
       !Number.isInteger(d.year)||!d.source||
       !/^https?:\/\//i.test(d.source)){
      errors.push(index+1);
      return;
    }

    imported.push(d);
  });

  if(imported.length){
    writeExtra([...readExtra(),...imported]);
    renderRows();
  }

  $("bulkStatus").classList.remove("hidden");
  $("bulkStatus").textContent=
    `Đã nhập ${imported.length} dòng hợp lệ.`+
    (errors.length?` Bỏ qua các dòng chưa hợp lệ: ${errors.join(", ")}.`:"");
}

$("importBulk").addEventListener("click",importCSV);

$("csvExample").addEventListener("click",()=>{
  $("bulkCsv").value=
    "Trường,Mã trường,Mã ngành,Ngành,Tổ hợp,Phương thức,Năm,Điểm chuẩn,URL nguồn\n"+
    "Tên trường ABC,ABC,IT01,Công nghệ thông tin,A00,THPT,2025,25.5,https://example.edu.vn";
  $("bulkStatus").classList.remove("hidden");
  $("bulkStatus").textContent="Đây là dòng minh họa. Thay bằng dữ liệu thật và nguồn chính thức trước khi nhập.";
});

$("downloadBulk").addEventListener("click",()=>{
  const rows=readExtra();
  const csv=[
    ["Trường","Mã trường","Mã ngành","Ngành","Tổ hợp","Phương thức","Năm","Điểm chuẩn","URL nguồn"],
    ...rows.map(d=>[d.school,d.key,d.code,d.major,d.combo,d.method,d.year,d.score,d.source])
  ].map(row=>row.map(value=>'"'+String(value??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");

  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="du-lieu-diem-chuan.csv";
  a.click();
  URL.revokeObjectURL(url);
});

$("clearBulk").addEventListener("click",()=>{
  if(!confirm("Xóa toàn bộ dữ liệu điểm chuẩn đã nhập trên trình duyệt này?"))return;
  writeExtra([]);
  renderRows();
  $("bulkStatus").classList.remove("hidden");
  $("bulkStatus").textContent="Đã xóa dữ liệu đã nhập. Dữ liệu mẫu tích hợp trong code vẫn còn.";
});

updateSubjects();
renderRows();
renderCareers();
tick();
```
