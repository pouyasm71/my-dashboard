/* ===== SHARED UTILITIES FOR ALL DASHBOARD PAGES ===== */

/* Auth guard */
function authGuard() {
  if (!sessionStorage.getItem('kyc_logged_in')) {
    window.location.href = 'index.html';
  }
}

/* User display */
function initUser() {
  const email = sessionStorage.getItem('kyc_user_email') || 'officer@forexbroker.com';
  const name  = sessionStorage.getItem('kyc_user_name')  || 'Pouya SM';
  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  document.querySelectorAll('.js-user-name').forEach(el => el.textContent = name);
  document.querySelectorAll('.js-user-avatar').forEach(el => el.textContent = initials);
}

/* Dark mode */
function initTheme() {
  const saved = localStorage.getItem('kyc_theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme','dark');
  document.getElementById('themeBtn')?.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('kyc_theme','light');
    } else {
      document.documentElement.setAttribute('data-theme','dark');
      localStorage.setItem('kyc_theme','dark');
    }
  });
}

/* Mobile sidebar */
function initSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const backdrop  = document.getElementById('sidebarBackdrop');
  const menuBtn   = document.getElementById('menuBtn');
  const closeBtn  = document.getElementById('sidebarClose');

  function open()  { sidebar?.classList.add('open'); backdrop?.classList.add('open'); }
  function close() { sidebar?.classList.remove('open'); backdrop?.classList.remove('open'); }

  menuBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
}

/* Logout */
function initLogout() {
  document.getElementById('logoutBtn')?.addEventListener('click', function() {
    sessionStorage.clear();
    window.location.href = 'index.html';
  });
}

/* Toast */
function toast(msg, type = '') {
  let wrap = document.getElementById('toastWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toastWrap';
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
    ${type === 'success'
      ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
      : type === 'error'
        ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'
        : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'}
  </svg><span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3200);
}

/* Render helpers */
function riskBadge(r) {
  const cls = r === 'High' ? 'risk-high' : r === 'Medium' ? 'risk-medium' : 'risk-low';
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
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}

/* Init all */
function initPage() {
  authGuard();
  initUser();
  initTheme();
  initSidebar();
  initLogout();
}
