"use strict";

// ===== TIỆN ÍCH CHUNG =====
const $ = (id) => document.getElementById(id);
let toastTimer;

function toast(message) {
  const element = $("toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("show"), 2800);
}

function formatNumber(number) {
  return Number(number).toLocaleString("vi-VN", {
    maximumFractionDigits: 2
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

// ===== ĐỒNG HỒ VIỆT NAM =====
function updateClock() {
  const clock = $("liveClock");
  if (!clock) return;

  clock.textContent = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

updateClock();
setInterval(updateClock, 1000);

// ===== CƠ SỞ DỮ LIỆU ĐIỂM CHUẨN =====
let admissionData = [];

const methodNames = {
  all: "Tất cả phương thức",
  THPT: "Điểm thi tốt nghiệp THPT",
  HSA: "Đánh giá năng lực (HSA)",
  TSA: "Đánh giá tư duy (TSA)",
  HB: "Xét học bạ",
  OTHER: "Phương thức khác"
};

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function showEmptyState(message) {
  const results = $("results");
  if (!results) return;

  results.innerHTML = `
    <div class="empty-state">
      <span>⌕</span>
      <strong>${escapeHTML(message)}</strong>
      <p>Thử thay đổi từ khóa, năm hoặc phương thức xét tuyển.</p>
      <small>
        Điểm chuẩn chỉ hiển thị khi có bản ghi phù hợp trong cơ sở dữ liệu.
      </small>
    </div>
  `;
}

function renderAdmissionResults(records) {
  const results = $("results");
  if (!results) return;

  if (records.length === 0) {
    showEmptyState("Chưa tìm thấy dữ liệu điểm chuẩn phù hợp");
    return;
  }

  results.innerHTML = records.map((item) => {
    const sourceURL = safeSourceURL(item.source);
    const sourceLink = sourceURL
      ? `<a href="${escapeHTML(sourceURL)}"
            target="_blank"
            rel="noopener noreferrer">Xem nguồn dữ liệu ↗</a>`
      : `<span>Chưa có liên kết nguồn</span>`;

    const score = Number(item.score);
    const scoreText = Number.isFinite(score)
      ? `${formatNumber(score)}${item.scoreScale ? ` / ${escapeHTML(item.scoreScale)}` : ""}`
      : "Chưa có điểm";

    return `
      <article class="cutoff-card">
        <div class="cutoff-card-header">
          <div>
            <h3>${escapeHTML(item.school)}</h3>
            <p>${escapeHTML(item.major)}</p>
          </div>
          <strong class="cutoff-score">${scoreText}</strong>
        </div>

        <div class="cutoff-card-details">
          <p><b>Mã ngành:</b> ${escapeHTML(item.majorCode || "Chưa cập nhật")}</p>
          <p><b>Năm:</b> ${escapeHTML(item.year)}</p>
          <p><b>Phương thức:</b> ${escapeHTML(
            item.methodLabel || methodNames[item.method] || item.method || "Chưa cập nhật"
          )}</p>
          <p><b>Tổ hợp:</b> ${escapeHTML(item.combinations || "Chưa cập nhật")}</p>
          <p><b>Nguồn:</b> ${sourceLink}</p>
        </div>
      </article>
    `;
  }).join("");
}

function safeSourceURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function runAdmissionSearch() {
  const school = $("schoolSearch")?.value.trim() || "";
  const major = $("majorSearch")?.value.trim() || "";
  const year = $("yearSelect")?.value || "2026";
  const method = $("methodSelect")?.value || "all";

  const schoolQuery = normalizeText(school);
  const majorQuery = normalizeText(major);

  const filtered = admissionData.filter((item) => {
    const schoolText = normalizeText(
      `${item.school || ""} ${item.schoolCode || ""}`
    );

    const majorText = normalizeText(
      `${item.major || ""} ${item.majorCode || ""}`
    );

    const matchesSchool =
      !schoolQuery || schoolText.includes(schoolQuery);

    const matchesMajor =
      !majorQuery || majorText.includes(majorQuery);

    const matchesYear =
      String(item.year) === String(year);

    const matchesMethod =
      method === "all" || item.method === method;

    return matchesSchool && matchesMajor && matchesYear && matchesMethod;
  });

  if ($("resultTitle")) {
    $("resultTitle").textContent =
      [school || "Toàn quốc", major].filter(Boolean).join(" · ");
  }

  if ($("resultCount")) {
    $("resultCount").textContent =
      `${year} · ${methodNames[method] || method} · ${filtered.length} kết quả`;
  }

  renderAdmissionResults(filtered);
}

// Khởi tạo tìm kiếm, lọc lại khi người dùng thay đổi bộ lọc.
if ($("searchForm")) {
  $("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    runAdmissionSearch();
  });
}

["schoolSearch", "majorSearch", "yearSelect", "methodSelect"].forEach((id) => {
  const element = $(id);
  if (!element) return;

  element.addEventListener("change", runAdmissionSearch);

  if (id === "schoolSearch" || id === "majorSearch") {
    element.addEventListener("input", runAdmissionSearch);
  }
});

// Tải dữ liệu từ file JSON đặt cùng thư mục với index.html.
async function loadAdmissionData() {
  try {
    const response = await fetch("./admission-data.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Không tải được dữ liệu (${response.status})`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Dữ liệu phải là một mảng JSON.");
    }

    admissionData = data.filter((item) => {
      return item &&
        item.school &&
        item.major &&
        item.year &&
        item.method &&
        item.source &&
        item.verified === true &&
        Number.isFinite(Number(item.score));
    });

    runAdmissionSearch();

    if ($("resultCount")) {
      $("resultCount").textContent +=
        ` · ${admissionData.length} bản ghi có nguồn đã kiểm tra`;
    }
  } catch (error) {
    console.error("Lỗi tải dữ liệu điểm chuẩn:", error);
    admissionData = [];
    showEmptyState("Chưa tải được cơ sở dữ liệu điểm chuẩn");

    if ($("resultCount")) {
      $("resultCount").textContent =
        "Kiểm tra file admission-data.json trên GitHub";
    }
  }
}

loadAdmissionData();

// ===== MÁY TÍNH ĐIỂM =====
const combinations = {
  A00: ["Toán", "Vật lí", "Hóa học"],
  A01: ["Toán", "Vật lí", "Tiếng Anh"],
  B00: ["Toán", "Hóa học", "Sinh học"],
  C00: ["Ngữ văn", "Lịch sử", "Địa lí"],
  C01: ["Toán", "Ngữ văn", "Vật lí"],
  C02: ["Toán", "Ngữ văn", "Hóa học"],
  D01: ["Toán", "Ngữ văn", "Tiếng Anh"],
  D07: ["Toán", "Hóa học", "Tiếng Anh"],
  D14: ["Ngữ văn", "Lịch sử", "Tiếng Anh"],
  D15: ["Ngữ văn", "Địa lí", "Tiếng Anh"]
};

function updateSubjectLabels() {
  const comboSelect = $("comboSelect");
  if (!comboSelect) return;

  const subjects = combinations[comboSelect.value];
  if (!subjects) return;

  ["label1", "label2", "label3"].forEach((id, index) => {
    if ($(id)) $(id).textContent = subjects[index];
  });
}

if ($("comboSelect")) {
  $("comboSelect").addEventListener("change", updateSubjectLabels);
  updateSubjectLabels();
}

if ($("calculateButton")) {
  $("calculateButton").addEventListener("click", () => {
    const values = ["score1", "score2", "score3"].map(
      (id) => $(id)?.value.trim() ?? ""
    );

    if (values.some((value) => value === "")) {
      toast("Nhập đủ điểm của cả 3 môn nhé.");
      return;
    }

    const scores = values.map(Number);

    if (scores.some((score) =>
      !Number.isFinite(score) || score < 0 || score > 10
    )) {
      toast("Mỗi môn phải nằm trong khoảng 0–10.");
      return;
    }

    const bonus = Number($("bonusInput")?.value || 0);
    const priorityMax = Number($("prioritySelect")?.value || 0);

    if (!Number.isFinite(bonus) || bonus < 0 || bonus > 10) {
      toast("Điểm cộng khác phải nằm trong khoảng 0–10.");
      return;
    }

    const rawTotal = scores.reduce((sum, score) => sum + score, 0);

    // Công thức tham khảo, không đại diện quy tắc mọi năm/trường.
    const priority = rawTotal <= 22.5
      ? priorityMax
      : priorityMax * (30 - rawTotal) / 7.5;

    const total = Math.min(30, rawTotal + priority + bonus);

    if ($("totalScore")) {
      $("totalScore").textContent = `${formatNumber(total)} / 30`;
    }

    if ($("scoreDetails")) {
      $("scoreDetails").textContent =
        `Tổ hợp ${$("comboSelect").value}: tổng 3 môn ${formatNumber(rawTotal)}; ` +
        `ưu tiên ước tính +${formatNumber(priority)}; điểm cộng nhập vào +${formatNumber(bonus)}. ` +
        "Kết quả chỉ để tham khảo, cần kiểm tra quy định chính thức.";
    }
  });
}

// ===== GỢI Ý NHÓM NGÀNH =====
const careerSuggestions = {
  data: [
    "Tài chính – Ngân hàng",
    "Công nghệ tài chính (FinTech)",
    "Phân tích kinh doanh / Khoa học dữ liệu"
  ],
  tech: [
    "Công nghệ thông tin",
    "Kỹ thuật phần mềm",
    "Hệ thống thông tin"
  ],
  people: [
    "Quản trị nhân lực",
    "Marketing",
    "Tâm lý học / Công tác xã hội"
  ],
  creative: [
    "Thiết kế đồ họa",
    "Truyền thông đa phương tiện",
    "Marketing / Sáng tạo nội dung"
  ],
  science: [
    "Khoa học dữ liệu",
    "Khoa học cơ bản",
    "Kỹ thuật và công nghệ"
  ]
};

if ($("careerButton")) {
  $("careerButton").addEventListener("click", () => {
    const selected = $("interestSelect")?.value;
    const suggestions = careerSuggestions[selected];

    if (!suggestions || !$("careerResults")) return;

    $("careerResults").innerHTML = `
      <strong>Nhóm ngành bạn có thể tìm hiểu</strong>
      <ul>${suggestions.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
      <p class="disclaimer">
        Đây là gợi ý khám phá ban đầu, không phải kết luận ngành phù hợp.
        Hãy xem chương trình học, môn học và cơ hội nghề nghiệp thực tế.
      </p>
    `;
  });
}

// ===== ĐẾM NGƯỢC NGÀY THI =====
let countdownInterval = null;

if ($("countdownButton")) {
  $("countdownButton").addEventListener("click", () => {
    const dateValue = $("examDate")?.value;

    if (!dateValue) {
      toast("Chọn ngày thi trước nhé.");
      return;
    }

    const target = new Date(`${dateValue}T00:00:00`);

    if (Number.isNaN(target.getTime()) || target.getTime() <= Date.now()) {
      toast("Hãy chọn một ngày trong tương lai.");
      return;
    }

    if (countdownInterval) clearInterval(countdownInterval);

    if ($("countdownNote")) {
      $("countdownNote").textContent =
        `Đang đếm đến ${target.toLocaleDateString("vi-VN")}. ` +
        "Đây là ngày bạn tự chọn, không phải lịch thi đã được xác nhận.";
    }

    function updateCountdown() {
      let remaining = target.getTime() - Date.now();

      if (remaining <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach((id) => {
          if ($(id)) $(id).textContent = "0";
        });

        if ($("countdownNote")) {
          $("countdownNote").textContent = "Đã đến ngày bạn chọn.";
        }

        clearInterval(countdownInterval);
        countdownInterval = null;
        return;
      }

      const days = Math.floor(remaining / 86400000);
      remaining %= 86400000;

      const hours = Math.floor(remaining / 3600000);
      remaining %= 3600000;

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      if ($("days")) $("days").textContent = days.toLocaleString("vi-VN");
      if ($("hours")) $("hours").textContent = String(hours).padStart(2, "0");
      if ($("minutes")) $("minutes").textContent = String(minutes).padStart(2, "0");
      if ($("seconds")) $("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
}
