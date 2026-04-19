/* ============================================================
   SHARED — Core utilities used across all dashboard pages
   Context: loaded from /pages/*.html, so root is ../
   ============================================================ */

/* ── Auth Guard ── */
function authGuard() {
  if (!sessionStorage.getItem('kyc_logged_in')) {
    window.location.href = '../index.html';
  }
}

/* ── Theme ── */
function initTheme() {
  const saved = localStorage.getItem('kyc_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('kyc_theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('kyc_theme', 'dark');
  }
}

/* ── User ── */
function getUser() {
  const email = sessionStorage.getItem('kyc_user_email') || 'officer@forexbroker.com';
  const name  = sessionStorage.getItem('kyc_user_name')  || 'Pouya SM';
  const role  = sessionStorage.getItem('kyc_user_role')  || 'KYC Officer';
  const inits = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return { email, name, role, initials: inits };
}

function populateUser() {
  const user = getUser();
  document.querySelectorAll('.js-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.js-user-avatar').forEach(el => el.textContent = user.initials);
  document.querySelectorAll('.js-user-role').forEach(el => el.textContent = user.role);
}

/* ── Logout ── */
function logout() {
  sessionStorage.clear();
  window.location.href = '../index.html';
}

/* ── Toast ── */
function toast(msg, type = '') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }

  const icons = {
    success: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
    error:   '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>',
    default: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
  };
  const iconPath = icons[type] || icons.default;

  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' ' + type : '');
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">${iconPath}</svg><span>${msg}</span>`;
  wrap.appendChild(el);

  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity .3s';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

/* ── Render Helpers ── */
function riskBadge(r) {
  const cls = { High: 'risk-high', Medium: 'risk-medium', Low: 'risk-low' }[r] || 'risk-low';
  return `<span class="risk-badge ${cls}">${r}</span>`;
}

function statusBadge(s) {
  const map = {
    pending:  `<span class="badge pending"><span class="badge-dot"></span>Pending</span>`,
    review:   `<span class="badge review"><span class="badge-dot"></span>In Review</span>`,
    approved: `<span class="badge approved"><span class="badge-dot"></span>Approved</span>`,
    rejected: `<span class="badge rejected"><span class="badge-dot"></span>Rejected</span>`,
  };
  return map[s] || s;
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ── SVG Icon Libraries ── */
const ICONS = {
  doc: {
    ID:      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`,
    PoA:     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    Finance: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>`,
  },
  activity: {
    green:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    red:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`,
    yellow: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
    blue:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>`,
  },
};

/* ── CSV Export ── */
function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  Object.assign(document.createElement('a'), {
    href: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv),
    download: filename,
  }).click();
}

/* ── Page initializer (call once per page after DOM ready) ── */
function initPage() {
  authGuard();
  initTheme();
  populateUser();
}
