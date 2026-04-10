/* ============================================================
   PAGE — Dashboard (Overview + Documents + Risk tabs)
   ============================================================ */

/* ── Build document grid ── */
function buildDocGrid() {
  const grid = document.getElementById('doc-grid');
  if (!grid) return;
  grid.innerHTML = DATA.documents.map(d => `
    <div class="doc-card">
      <div class="doc-icon">${ICONS.doc[d.type] || ICONS.doc.ID}</div>
      <div class="doc-name">${d.name}</div>
      <div class="doc-client">${d.client} &middot; ${d.id}</div>
      <div class="doc-meta">
        <span class="doc-date">${d.date}</span>
        <span class="badge review" style="font-size:11px;padding:2px 8px">
          <span class="badge-dot"></span>Pending
        </span>
      </div>
    </div>`).join('');
}

/* ── Build risk grid ── */
function buildRiskGrid() {
  const grid = document.getElementById('risk-grid');
  if (!grid) return;
  grid.innerHTML = DATA.riskAccounts.map(r => `
    <div class="risk-card flagged">
      <div class="risk-avatar">${r.initials}</div>
      <div style="flex:1">
        <div class="risk-name">${r.name}</div>
        <div class="risk-country">${r.country}</div>
        <div class="score-bar-wrap">
          <div class="score-label"><span>Risk Score</span><span>${r.score}/100</span></div>
          <div class="score-bar"><div class="score-fill" style="width:${r.score}%"></div></div>
        </div>
        <div class="risk-flags">${r.flags.map(f => `<span class="risk-flag">${f}</span>`).join('')}</div>
      </div>
    </div>`).join('');
}

/* ── Build activity feed ── */
function buildActivity(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = DATA.activity.map(a => `
    <div class="activity-item">
      <div class="activity-icon ${a.color}">${ICONS.activity[a.color]}</div>
      <div>
        <div class="activity-title">${a.label} — <strong>${a.name}</strong></div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>`).join('');
}

/* ── Tab switching ── */
const TABS = {
  overview:  { title:'Overview',         sub:'KYC Compliance Dashboard' },
  documents: { title:'Document Review',  sub:'11 documents awaiting inspection' },
  risk:      { title:'Risk Checks',      sub:'4 accounts flagged for enhanced due diligence' },
};

function switchTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + name)?.classList.add('active');

  const tab = TABS[name] || TABS.overview;
  document.querySelector('.header-title').textContent    = tab.title;
  document.querySelector('.header-subtitle').textContent = tab.sub;

  // Sync sidebar active state for document/risk tabs
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.getAttribute('href') === `dashboard.html#${name}`
      || (name === 'overview' && n.getAttribute('href') === 'dashboard.html'));
  });
}

function initTabs() {
  // Handle hash on load
  const hash = window.location.hash.replace('#', '') || 'overview';
  switchTab(hash);

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'overview';
    switchTab(h);
  });
}

/* ── Entry point ── */
function initDashboard() {
  renderSidebar('dashboard');
  renderHeader({ title: 'Overview', subtitle: 'KYC Compliance Dashboard' });
  initPage();       // auth guard, theme, user
  populateUser();   // re-run after components injected

  buildDocGrid();
  buildRiskGrid();
  buildActivity('activity-overview');
  buildActivity('activity-docs');
  initTabs();
}

document.addEventListener('DOMContentLoaded', initDashboard);
