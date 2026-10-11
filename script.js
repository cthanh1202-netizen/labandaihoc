
'use strict';

const $ = id => document.getElementById(id);

/* =========================
   1. DỮ LIỆU ĐIỂM CHUẨN DEMO
   =========================
   Chỉ thêm điểm khi có nguồn đáng tin cậy.
   Những năm/phương thức chưa có dữ liệu sẽ báo chưa có kết quả.
*/
const demoCutoffs = [
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Thương mại điện tử',
    code: '7340122',
    score: 28.62,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://neu.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Logistics và Quản lý chuỗi cung ứng',
    code: '7510605',
    score: 28.53,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://neu.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Kinh doanh quốc tế',
    code: '7340120',
    score: 28.50,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://neu.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Kinh tế quốc tế',
    code: '7310106',
    score: 28.30,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://neu.edu.vn/'
  },
  {
    school: 'Đại học Bách khoa Hà Nội',
    aliases: ['hust', 'bach khoa ha noi'],
    logo: 'HUST',
    sector: 'technology',
    major: 'Khoa học dữ liệu và Trí tuệ nhân tạo (chương trình tiên tiến)',
    code: 'IT-E10',
    score: 29.54,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, K01',
    combinationSource: 'https://ts.hust.edu.vn/',
    source: 'https://ts.hust.edu.vn/'
  },
  {
    school: 'Đại học Bách khoa Hà Nội',
    aliases: ['hust', 'bach khoa ha noi'],
    logo: 'HUST',
    sector: 'technology',
    major: 'Khoa học máy tính',
    code: 'IT1',
    score: 29.27,
    year: '2026',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, K01',
    combinationSource: 'https://ts.hust.edu.vn/',
    source: 'https://ts.hust.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Thương mại điện tử',
    code: '7340122',
    score: 28.83,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://fit.neu.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Logistics và Quản lý chuỗi cung ứng',
    code: '7510605',
    score: 28.61,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://fit.neu.edu.vn/'
  },
  {
    school: 'Đại học Kinh tế Quốc dân',
    aliases: ['neu', 'kinh te quoc dan'],
    logo: 'NEU',
    sector: 'business',
    major: 'Kinh doanh quốc tế',
    code: '7340120',
    score: 28.60,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, D01, D07',
    combinationSource: 'https://neu.edu.vn/',
    source: 'https://fit.neu.edu.vn/'
  },
  {
    school: 'Đại học Bách khoa Hà Nội',
    aliases: ['hust', 'bach khoa ha noi'],
    logo: 'HUST',
    sector: 'technology',
    major: 'Khoa học dữ liệu và Trí tuệ nhân tạo (chương trình tiên tiến)',
    code: 'IT-E10',
    score: 29.39,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, K01',
    combinationSource: 'https://soict.hust.edu.vn/',
    source: 'https://www.hust.edu.vn/'
  },
  {
    school: 'Đại học Bách khoa Hà Nội',
    aliases: ['hust', 'bach khoa ha noi'],
    logo: 'HUST',
    sector: 'technology',
    major: 'Khoa học máy tính',
    code: 'IT1',
    score: 29.19,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'A00, A01, K01',
    combinationSource: 'https://soict.hust.edu.vn/',
    source: 'https://www.hust.edu.vn/'
  },
  {
    school: 'Đại học Bách khoa Hà Nội',
    aliases: ['hust', 'bach khoa ha noi'],
    logo: 'HUST',
    sector: 'technology',
    major: 'Chương trình TROY-BA',
    code: 'TROY-BA',
    score: 19.00,
    year: '2025',
    method: 'Điểm thi tốt nghiệp THPT',
    combinations: 'D01, A00, A01, K01',
    combinationSource: 'https://www.hust.edu.vn/',
    source: 'https://www.hust.edu.vn/'
  }
];

/* =========================
   2. HÀM DÙNG CHUNG
   ========================= */
function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

let toastTimer;

function toast(message) {
  const el = $('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function formatScore(value) {
  return Number(value).toLocaleString('vi-VN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* =========================
   3. GIAO DIỆN SÁNG / TỐI
   ========================= */
const themeToggle = $('themeToggle');

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  $('themeIcon').textContent = isDark ? '☀' : '☾';
  $('themeLabel').textContent = isDark ? 'Giao diện sáng' : 'Giao diện tối';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark'));
});

applyTheme(false);

/* =========================
   4. TỰ ĐỘNG GỢI Ý TÊN TRƯỜNG
   ========================= */
const schoolNames = [
  'Đại học Kinh tế Quốc dân',
  'Đại học Quốc gia Hà Nội',
  'Trường Quốc tế - ĐHQGHN',
  'Đại học Bách khoa Hà Nội',
  'Đại học Ngoại thương',
  'Đại học Kinh tế - ĐHQGHN',
  'Trường Đại học Thương mại',
  'Học viện Tài chính',
  'Học viện Ngân hàng',
  'Đại học Hà Nội',
  'Đại học Giao thông vận tải',
  'Đại học Xây dựng Hà Nội',
  'Đại học Công nghiệp Hà Nội',
  'Đại học Phenikaa',
  'Đại học FPT',
  'Đại học Kinh tế TP.HCM',
  'Đại học Quốc gia TP.HCM',
  'Đại học Bách khoa TP.HCM',
  'Đại học Cần Thơ',
  'Đại học Đà Nẵng',
  'Đại học Duy Tân',
  'Đại học Vinh',
  'Học viện Công nghệ Bưu chính Viễn thông',
  'Đại học Thủy lợi',
  'Đại học Luật Hà Nội'
];

const schoolInput = $('schoolSearch');
const schoolField = schoolInput.closest('.field');
const suggestionBox = document.createElement('div');

suggestionBox.id = 'schoolSuggestions';
suggestionBox.setAttribute('role', 'listbox');
suggestionBox.hidden = true;
schoolField.style.position = 'relative';
schoolField.appendChild(suggestionBox);

function renderSchoolSuggestions() {
  const query = normalize(schoolInput.value);
  suggestionBox.replaceChildren();

  if (!query) {
    suggestionBox.hidden = true;
    return;
  }

  const matches = schoolNames
    .filter(name => normalize(name).includes(query))
    .slice(0, 8);

  if (!matches.length) {
    suggestionBox.hidden = true;
    return;
  }

  matches.forEach(name => {
    const option = document.createElement('button');
    option.type = 'button';
    option.setAttribute('role', 'option');
    option.textContent = name;

    option.addEventListener('mousedown', event => event.preventDefault());

    option.addEventListener('click', () => {
      schoolInput.value = name;
      suggestionBox.hidden = true;
      schoolInput.focus();
    });

    suggestionBox.appendChild(option);
  });

  suggestionBox.hidden = false;
}

schoolInput.addEventListener('input', renderSchoolSuggestions);
schoolInput.addEventListener('focus', renderSchoolSuggestions);

schoolInput.addEventListener('keydown', event => {
  const options = [...suggestionBox.querySelectorAll('button')];

  if (event.key === 'Escape') {
    suggestionBox.hidden = true;
  } else if (event.key === 'ArrowDown' && options.length) {
    event.preventDefault();
    options[0].focus();
  } else if (event.key === 'Enter' && !suggestionBox.hidden && options.length) {
    event.preventDefault();
    options[0].click();
  }
});

document.addEventListener('click', event => {
  if (!schoolField.contains(event.target)) {
    suggestionBox.hidden = true;
  }
});

/* =========================
   5. TRA CỨU ĐIỂM CHUẨN
   ========================= */
function getSchoolLogo(item) {
  const logo = item.logo || 'ĐH';
  const className = logo === 'NEU' ? 'neu' :
    logo === 'HUST' ? 'hust' : 'vnu';

  return `<div class="school-logo ${className}" aria-label="${escapeHTML(item.school)}">${escapeHTML(logo)}</div>`;
}

function getCutoffResults() {
  const schoolQuery = normalize($('schoolSearch').value);
  const majorQuery = normalize($('majorSearch').value);
  const year = $('year').value;
  const method = $('method').value;
  const sector = $('sectorFilter').value;

  return demoCutoffs.filter(item => {
    const matchesYear = item.year === year;
    const matchesMethod = method === 'all' || item.method === method;
    const matchesSector = sector === 'all' || item.sector === sector;

    const schoolText = normalize(item.school + ' ' + item.aliases.join(' '));
    const matchesSchool = !schoolQuery || schoolText.includes(schoolQuery);

    const majorText = normalize(item.major + ' ' + item.code);
    const matchesMajor = !majorQuery || majorText.includes(majorQuery);

    return matchesYear && matchesMethod && matchesSector &&
      matchesSchool && matchesMajor;
  });
}

function renderCutoffs() {
  const school = $('schoolSearch').value.trim();
  const major = $('majorSearch').value.trim();
  const year = $('year').value;
  const method = $('method').value;
  const sector = $('sectorFilter');

  $('resultTitle').textContent =
    school || major
      ? `${school || 'Tất cả trường'}${major ? ' · ' + major : ''}`
      : 'Kết quả tra cứu điểm chuẩn';

  $('resultCount').textContent =
    `Năm ${year} · ${method === 'all' ? 'Tất cả phương thức' : method}`;

  const results = getCutoffResults();
  const container = $('results');

  if (!results.length) {
    container.innerHTML = `
      <div class="noresult">
        <strong>Chưa có dữ liệu phù hợp.</strong><br>
        Bản demo hiện có một số ngành của NEU và Bách khoa Hà Nội,
        chủ yếu theo phương thức điểm thi tốt nghiệp THPT năm 2025–2026.
        Năm 2024, các phương thức khác và các trường/ngành chưa được nạp.
        Hãy đổi bộ lọc hoặc bổ sung dữ liệu có nguồn chính thức.
      </div>`;
    return;
  }

  container.innerHTML = results.map(item => `
    <article class="result">
      ${getSchoolLogo(item)}
      <div>
        <h3>${escapeHTML(item.school)} — ${escapeHTML(item.major)}</h3>
        <p>Mã ngành/chương trình: <strong>${escapeHTML(item.code)}</strong></p>
        <p>Năm ${escapeHTML(item.year)} · ${escapeHTML(item.method)}</p>
        <p><strong>Tổ hợp: ${escapeHTML(item.combinations)}</strong></p>
        <p>
          <a href="${escapeHTML(item.combinationSource)}" target="_blank" rel="noopener noreferrer">
            Nguồn thông tin tổ hợp ↗
          </a>
          ·
          <a href="${escapeHTML(item.source)}" target="_blank" rel="noopener noreferrer">
            Trang nguồn điểm chuẩn ↗
          </a>
        </p>
      </div>
      <div class="score">
        ${formatScore(item.score)}
        <small>điểm demo</small>
      </div>
    </article>
  `).join('');
}

$('searchBtn').addEventListener('click', renderCutoffs);

['year', 'method', 'sectorFilter'].forEach(id => {
  $(id).addEventListener('change', renderCutoffs);
});

$('majorSearch').addEventListener('keydown', event => {
  if (event.key === 'Enter') renderCutoffs();
});

schoolInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && suggestionBox.hidden) renderCutoffs();
});

/* =========================
   6. MÁY TÍNH ĐIỂM TỔ HỢP
   ========================= */
const comboConfig = {
  A00: ['Toán', 'Vật lí', 'Hóa học'],
  A01: ['Toán', 'Vật lí', 'Tiếng Anh'],
  B00: ['Toán', 'Hóa học', 'Sinh học'],
  C00: ['Ngữ văn', 'Lịch sử', 'Địa lí'],
  C01: ['Toán', 'Ngữ văn', 'Vật lí'],
  C02: ['Toán', 'Ngữ văn', 'Hóa học'],
  D01: ['Toán', 'Ngữ văn', 'Tiếng Anh'],
  D07: ['Toán', 'Hóa học', 'Tiếng Anh'],
  D14: ['Ngữ văn', 'Lịch sử', 'Tiếng Anh'],
  D15: ['Ngữ văn', 'Địa lí', 'Tiếng Anh']
};

const subjectIds = ['subject1', 'subject2', 'subject3'];

function updateComboLabels() {
  const names = comboConfig[$('comboSelect').value];

  subjectIds.forEach((id, index) => {
    document.querySelector(`label[for="${id}"]`).textContent = names[index];
  });

  $('calcNote').textContent =
    `Tổ hợp ${$('comboSelect').value}: ${names.join(' – ')}. ` +
    'Nhập điểm từ 0 đến 10 cho từng môn.';
}

$('comboSelect').addEventListener('change', updateComboLabels);
updateComboLabels();

$('calcBtn').addEventListener('click', () => {
  const values = subjectIds.map(id => $(id).value.trim());

  if (values.some(value => value === '')) {
    toast('Nhập đủ điểm của cả ba môn nhé.');
    return;
  }

  const scores = values.map(Number);

  if (scores.some(score => !Number.isFinite(score) || score < 0 || score > 10)) {
    toast('Mỗi môn phải có điểm từ 0 đến 10.');
    return;
  }

  if ($('priorityArea').value === 'unknown') {
    toast('Hãy xác định khu vực ưu tiên trước khi tính.');
    return;
  }

  const bonus = Number($('bonusPoints').value || 0);

  if (!Number.isFinite(bonus) || bonus < 0 || bonus > 10) {
    toast('Điểm cộng phải nằm trong khoảng 0 đến 10.');
    return;
  }

  const raw = scores.reduce((sum, score) => sum + score, 0);
  const maxPriority = Number($('priorityArea').value);

  // Công thức ước tính cho mục đích tham khảo.
  // Cần kiểm tra quy chế tuyển sinh áp dụng cho từng năm.
  const priority = raw <= 22.5
    ? maxPriority
    : maxPriority * (30 - raw) / 7.5;

  const total = Math.min(30, raw + priority + bonus);

  $('totalScore').textContent =
    `${formatScore(total)} / 30`;

  $('calcNote').textContent =
    `Tổ hợp ${$('comboSelect').value}. Đây là tổng tham khảo, ` +
    'chưa thay thế công thức chính thức của từng trường.';

  $('calcBreakdown').innerHTML = `
    <div>Tổng 3 môn<strong>${formatScore(raw)}</strong></div>
    <div>Ưu tiên ước tính<strong>+${formatScore(priority)}</strong></div>
    <div>Điểm cộng đã nhập<strong>+${formatScore(bonus)}</strong></div>
  `;
});

/* =========================
   7. GỢI Ý NGÀNH NGHỀ
   ========================= */
const careerSuggestions = {
  data: [
    'Tài chính – Ngân hàng',
    'Công nghệ tài chính (FinTech)',
    'Phân tích kinh doanh / Khoa học dữ liệu'
  ],
  tech: [
    'Công nghệ thông tin',
    'Kỹ thuật phần mềm',
    'Hệ thống thông tin'
  ],
  people: [
    'Quản trị nhân lực',
    'Marketing',
    'Tâm lý học / Công tác xã hội'
  ],
  creative: [
    'Thiết kế đồ họa',
    'Truyền thông đa phương tiện',
    'Marketing / Sáng tạo nội dung'
  ],
  science: [
    'Khoa học dữ liệu',
    'Khoa học tự nhiên',
    'Kỹ thuật / Công nghệ'
  ]
};

$('careerBtn').addEventListener('click', () => {
  const items = careerSuggestions[$('interestPick').value];

  $('careerResult').className = 'noresult';
  $('careerResult').innerHTML =
    '<strong>Nhóm ngành bạn có thể tìm hiểu</strong><ul>' +
    items.map(item => `<li>${escapeHTML(item)}</li>`).join('') +
    '</ul>';
});

/* =========================
   8. ĐẾM NGƯỢC NGÀY THI
   ========================= */
let countdownInterval = null;

$('startCountdown').addEventListener('click', () => {
  const value = $('examDatePick').value;

  if (!value) {
    $('examDateNote').textContent = 'Hãy chọn ngày thi trước nhé.';
    return;
  }

  const target = new Date(`${value}T00:00:00`).getTime();

  if (!Number.isFinite(target) || target <= Date.now()) {
    $('examDateNote').textContent = 'Ngày thi cần nằm trong tương lai.';
    return;
  }

  if (countdownInterval) clearInterval(countdownInterval);

  $('examDateNote').textContent =
    'Đang đếm đến ' + new Date(target).toLocaleDateString('vi-VN') +
    '. Đây là ngày bạn chọn, hãy đối chiếu với lịch thi chính thức.';

  const updateCountdown = () => {
    let remaining = target - Date.now();

    if (remaining <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        $(id).textContent = '00';
      });
      $('examDateNote').textContent = 'Đã đến ngày bạn chọn.';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(remaining / 86400000);
    remaining %= 86400000;

    const hours = Math.floor(remaining / 3600000);
    remaining %= 3600000;

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    $('days').textContent = days.toLocaleString('vi-VN');
    $('hours').textContent = String(hours).padStart(2, '0');
    $('minutes').textContent = String(minutes).padStart(2, '0');
    $('seconds').textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 250);
});
