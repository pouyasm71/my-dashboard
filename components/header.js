/* ============================================================
   COMPONENT — Header
   Injected into #header-root by renderHeader(config)
   config: { title: string, subtitle: string, search?: boolean }
   ============================================================ */

const HEADER_ICON = {
  menu: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
  sun:  `<svg class="sun-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/></svg>`,
  moon: `<svg class="moon-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`,
  logout:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>`,
  search:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
};

function renderHeader({ title, subtitle, searchPlaceholder = 'Search clients…' }) {
  const root = document.getElementById('header-root');
  if (!root) return;

  root.innerHTML = `
    <header class="header">
      <div class="header-left">
        <button class="hamburger" id="menuBtn" aria-label="Open menu">${HEADER_ICON.menu}</button>
        <div>
          <div class="header-title">${title}</div>
          <div class="header-subtitle">${subtitle}</div>
        </div>
      </div>

      <div class="header-right">
        <div class="header-search">
          <span class="search-icon">${HEADER_ICON.search}</span>
          <input type="text" class="search-input" id="searchInput" placeholder="${searchPlaceholder}" autocomplete="off">
        </div>

        <button class="icon-btn theme-btn" id="themeBtn" aria-label="Toggle dark mode" title="Toggle dark mode">
          ${HEADER_ICON.sun}${HEADER_ICON.moon}
        </button>

        <button class="icon-btn" aria-label="Notifications" title="Notifications">
          ${HEADER_ICON.bell}
          <span class="notif-dot"></span>
        </button>

        <div class="header-user">
          <div class="avatar js-user-avatar">PS</div>
          <div class="user-text">
            <span class="user-name js-user-name">Pouya SM</span>
            <span class="user-role">KYC Officer</span>
          </div>
        </div>

        <button class="icon-btn" id="logoutBtn" title="Sign out" aria-label="Sign out">
          ${HEADER_ICON.logout}
        </button>
      </div>
    </header>`;

  _initHeaderEvents();
}

function _initHeaderEvents() {
  document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}
