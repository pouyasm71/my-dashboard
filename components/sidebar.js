/* ============================================================
   COMPONENT — Sidebar
   Injected into #sidebar-root by renderSidebar(activeItem)
   All href values are relative to /pages/ (same directory)
   ============================================================ */

const SIDEBAR_ICON = {
  overview: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`,
  pending:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
  approved: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  rejected: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`,
  documents:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
  risk:     `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.47 6 2s-2.13 2-6 2-6-1.47-6-2 2.13-2 6-2zm6 12c0 .53-2.13 2-6 2s-6-1.47-6-2v-2.23C7.61 15.55 9.72 16 12 16s4.39-.45 6-1.23V17zm0-4.5c0 .53-2.13 2-6 2s-6-1.47-6-2v-2.23C7.61 11.05 9.72 11.5 12 11.5s4.39-.45 6-1.23V12.5z"/></svg>`,
  close:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  shield:   `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/></svg>`,
};

function _navItem(href, icon, label, chip, active) {
  const chipHtml = chip
    ? `<span class="nav-chip ${chip.color || ''}">${chip.count}</span>`
    : '';
  return `
    <a href="${href}" class="nav-item${active ? ' active' : ''}">
      <span class="nav-icon">${SIDEBAR_ICON[icon]}</span>
      <span class="nav-label">${label}</span>
      ${chipHtml}
    </a>`;
}

function renderSidebar(activeItem) {
  const root = document.getElementById('sidebar-root');
  if (!root) return;

  root.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo-wrap">
          <div class="sidebar-logo-mark">${SIDEBAR_ICON.shield}</div>
          <div>
            <span class="sidebar-logo-name">ForexKYC</span>
            <span class="sidebar-logo-sub">Compliance Portal</span>
          </div>
        </div>
        <button class="sidebar-close" id="sidebarClose" aria-label="Close menu">
          ${SIDEBAR_ICON.close}
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="nav-section-label">Main</span>
          ${_navItem('dashboard.html', 'overview', 'Overview', null, activeItem === 'dashboard')}
        </div>

        <div class="nav-section">
          <span class="nav-section-label">Verification</span>
          ${_navItem('pending.html',  'pending',  'Pending Verifications', { count:23 },          activeItem === 'pending')}
          ${_navItem('approved.html', 'approved', 'Approved Clients',      { count:142, color:'success' }, activeItem === 'approved')}
          ${_navItem('rejected.html', 'rejected', 'Rejected Applications', { count:7,   color:'danger'  }, activeItem === 'rejected')}
        </div>

        <div class="nav-section">
          <span class="nav-section-label">Review</span>
          ${_navItem('dashboard.html#documents',    'documents', 'Document Review',  { count:11, color:'warning' }, activeItem === 'documents')}
          ${_navItem('dashboard.html#risk',         'risk',      'Risk Checks',       { count:4,  color:'danger'  }, activeItem === 'risk')}
          ${_navItem('dashboard.html#submissions',  'database',  'KYC Submissions',   null,                         activeItem === 'submissions')}
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="avatar js-user-avatar">PS</div>
          <div>
            <span class="user-name js-user-name">Pouya SM</span>
            <span class="user-role">KYC Officer</span>
          </div>
        </div>
      </div>
    </aside>`;

  _initSidebarEvents();
}

function _initSidebarEvents() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const closeBtn = document.getElementById('sidebarClose');
  const menuBtn  = document.getElementById('menuBtn');

  const open  = () => { sidebar?.classList.add('open'); backdrop?.classList.add('open'); };
  const close = () => { sidebar?.classList.remove('open'); backdrop?.classList.remove('open'); };

  menuBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
}
