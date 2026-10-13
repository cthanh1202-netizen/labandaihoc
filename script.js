
"use strict";

const $ = (id) => document.getElementById(id);

// Dữ liệu mẫu để kiểm tra giao diện.
// Không phải điểm chuẩn chính thức.
// Chỉ thêm dữ liệu thật khi có nguồn xác minh.
const admissions = [
  {
    school: "Đại học Kinh tế Quốc dân",
    short: "NEU",
    major: "Kinh doanh quốc tế",
    code: "7340120",
    year: 2025,
    method: "THPT",
    combination: "A01",
    score: null,
    source: "https://neu.edu.vn/"
  },
  {
    school: "Đại học Kinh tế Quốc dân",
    short: "NEU",
    major: "Tài chính - Ngân hàng",
    code: "7340201",
    year: 2025,
    method: "THPT",
    combination: "A00",
    score: null,
    source: "https://neu.edu.vn/"
  },
  {
    school: "Đại học Quốc gia Hà Nội",
    short: "VNU",
    major: "Công nghệ tài chính",
    code: "",
    year: 2025,
    method: "THPT",
    combination: "A01",
    score: null,
    source: "https://vnu.edu.vn/"
  },
  {
    school: "Đại học Bách khoa Hà Nội",
    short: "HUST",
    major: "Khoa học dữ liệu và trí tuệ nhân tạo",
    code: "",
    year: 2025,
    method: "TSA",
    combination: "",
    score: null,
    source: "https://hust.edu.vn/"
  },
  {
    school: "Đại học Kinh tế Quốc dân",
    short: "NEU",
    major: "Kinh doanh quốc tế",
    code: "7340120",
    year: 2024,
    method: "THPT",
    combination: "A01",
    score: null,
    source: "https://neu.edu.vn/"
  },
  {
    school: "Đại học Quốc gia Hà Nội",
    short: "VNU",
    major: "Công nghệ tài chính",
    code: "",
    year: 2024,
    method: "THPT",
    combination: "A01",
    score: null,
    source: "https://vnu.edu.vn/"
  }
];

const methodNames = {
  THPT: "Điểm thi tốt nghiệp THPT",
  "Học bạ": "Xét học bạ",
  ĐGNL: "Đánh giá năng lực",
  TSA: "Đánh giá tư duy (TSA)",
  Khác: "Phương thức khác"
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function renderResults() {
  const keyword = $("keyword").value.trim().toLocaleLowerCase("vi");
  const year = Number($("year").value);
  const method = $("method").value;
  const combination = $("combination").value;

  const filtered = admissions.filter((item) => {
    const haystack = [
      item.school, item.major, item.code, item.short
    ].join(" ").toLocaleLowerCase("vi");

    return (!keyword || haystack.includes(keyword))
      && item.year === year
      && (!method || item.method === method)
      && (!combination || item.combination === combination);
  });

  $("resultCount").textContent = `${filtered.length} kết quả`;
  $("empty").hidden = filtered.length > 0;

  $("results").innerHTML = filtered.map((item) => `
    <article class="result-card">
      <div class="school-row">
        <div class="school-logo">${escapeHTML(item.short)}</div>
        <div>
          <div class="school-name">${escapeHTML(item.school)}</div>
          <div class="meta">Năm tuyển sinh ${item.year}</div>
        </div>
      </div>

      <h3 class="major-name">${escapeHTML(item.major)}</h3>
      <div class="meta">
        Mã ngành: ${item.code ? escapeHTML(item.code) : "Chưa cập nhật"}
      </div>
      <span class="tag">${escapeHTML(methodNames[item.method] || item.method)}</span>
      <span class="tag">${item.combination
        ? "Tổ hợp " + escapeHTML(item.combination)
        : "Không áp dụng tổ hợp THPT"}</span>

      <div class="score-row">
        <div>
          <div class="meta">Điểm chuẩn</div>
          <div class="score">${item.score == null
            ? "Chưa cập nhật"
            : Number(item.score).toLocaleString("vi-VN")}</div>
        </div>
        <span class="meta">Thang điểm theo nguồn</span>
      </div>

      <div class="source">
        Nguồn tham khảo:
        <a href="${escapeHTML(item.source)}" target="_blank"
           rel="noopener noreferrer">Trang trường ↗</a>
      </div>
    </article>
  `).join("");
}

$("searchBtn").addEventListener("click", renderResults);
$("keyword").addEventListener("input", renderResults);
$("year").addEventListener("change", renderResults);
$("method").addEventListener("change", renderResults);
$("combination").addEventListener("change", renderResults);

// Tính điểm tham khảo.
$("calculateBtn").addEventListener("click", () => {
  const ids = ["math", "literature", "english"];
  const values = ids.map((id) => $(id).value.trim());

  if (values.some((value) => value === "")) {
    $("scoreResult").innerHTML =
      "<small>CHƯA ĐỦ DỮ LIỆU</small><p>Hãy nhập điểm cả 3 môn.</p>";
    return;
  }

  const scores = values.map(Number);
  const priority = Number($("priority").value || 0);

  if (
    scores.some((score) => !Number.isFinite(score) ||
      score < 0 || score > 10) ||
    !Number.isFinite(priority) || priority < 0 || priority > 3
  ) {
    $("scoreResult").innerHTML =
      "<small>ĐIỂM KHÔNG HỢP LỆ</small><p>Kiểm tra lại điểm môn và điểm ưu tiên.</p>";
    return;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  const finalScore = Math.min(30, total + priority);

  $("scoreResult").innerHTML = `
    <small>TỔNG ĐIỂM THAM KHẢO</small>
    <strong>${finalScore.toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })} / 30</strong>
    <p>Tổng 3 môn: ${total.toLocaleString("vi-VN")} điểm.
    Điểm ưu tiên nhập vào: ${priority} điểm.</p>
  `;
});

// Chế độ sáng / tối.
$("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  $("themeBtn").textContent =
    document.body.classList.contains("dark") ? "☀" : "☾";
});

renderResults();
