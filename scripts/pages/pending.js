/* ============================================================
   PAGE — Pending Verifications
   ============================================================ */

let pendingData = [];        // mutable copy
let pendingFilter = 'all';
let approvedTodayCount = 8;

/* ── Build table ── */
function buildPendingTable(data) {
  const tbody = document.getElementById('pending-tbody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <p>No records match your filter</p>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map((c, idx) => `
    <tr id="row-${idx}">
      <td>
        <div class="client-cell">
          <div class="client-avatar">${initials(c.name)}</div>
          <div>
            <div class="client-name">${c.name}</div>
            <div class="client-id">${c.id}</div>
          </div>
        </div>
      </td>
      <td>${c.country}</td>
      <td style="color:var(--on-surface-var);font-size:13px">${c.submitted}</td>
      <td style="color:var(--on-surface-var);font-size:12.5px">${c.docs}</td>
      <td>${riskBadge(c.risk)}</td>
      <td>${statusBadge(c.status)}</td>
      <td>
        <div class="actions">
          <button class="btn-sm btn-approve" data-idx="${idx}" data-action="approved">Approve</button>
          <button class="btn-sm btn-reject"  data-idx="${idx}" data-action="rejected">Reject</button>
          <button class="btn-sm btn-view">View</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ── Filter ── */
function applyPendingFilter(filter) {
  pendingFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.filter === filter));

  const map = {
    all:     () => pendingData,
    pending: () => pendingData.filter(c => c.status === 'pending'),
    review:  () => pendingData.filter(c => c.status === 'review'),
    high:    () => pendingData.filter(c => c.risk === 'High'),
  };
  buildPendingTable((map[filter] || map.all)());
}

/* ── Action (approve / reject) ── */
function handleAction(idx, action) {
  const realIdx = pendingData.findIndex((_, i) => i === idx);
  if (realIdx === -1) return;
  pendingData.splice(realIdx, 1);

  // Update counters
  const count = pendingData.length;
  const pendingChip = document.getElementById('pending-chip');
  const statPending = document.getElementById('stat-pending');
  if (pendingChip) pendingChip.textContent = count;
  if (statPending) statPending.textContent = count;
  document.getElementById('page-subtitle').textContent =
    `${count} applications awaiting your review — sorted by submission date`;

  if (action === 'approved') {
    approvedTodayCount++;
    const el = document.getElementById('stat-approved-today');
    if (el) el.textContent = approvedTodayCount;
    toast('Client approved successfully', 'success');
  } else {
    toast('Application rejected', 'error');
  }

  applyPendingFilter(pendingFilter);
}

/* ── Search ── */
function handleSearch(q) {
  const lower = q.toLowerCase();
  const filtered = pendingData.filter(c =>
    c.name.toLowerCase().includes(lower) ||
    c.id.toLowerCase().includes(lower) ||
    c.country.toLowerCase().includes(lower));
  buildPendingTable(filtered);
}

/* ── Export CSV ── */
function exportPendingCSV() {
  const rows = [
    ['ID','Name','Country','Submitted','Documents','Risk','Status'],
    ...pendingData.map(c => [c.id, c.name, c.country, c.submitted, c.docs, c.risk, c.status]),
  ];
  downloadCSV(rows, 'pending-kyc.csv');
}

/* ── Entry point ── */
function initPendingPage() {
  renderSidebar('pending');
  renderHeader({ title: 'Pending Verifications', subtitle: 'Review and process incoming KYC submissions' });
  initPage();
  populateUser();

  // Clone data so we can mutate
  pendingData = DATA.pending.map(c => ({ ...c }));

  buildPendingTable(pendingData);

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip =>
    chip.addEventListener('click', () => applyPendingFilter(chip.dataset.filter)));

  // Table delegation (approve/reject)
  document.getElementById('pending-tbody').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    handleAction(+btn.dataset.idx, btn.dataset.action);
  });

  // Search
  document.getElementById('searchInput')?.addEventListener('input', e => handleSearch(e.target.value));

  // Export
  document.getElementById('export-btn')?.addEventListener('click', exportPendingCSV);
}

document.addEventListener('DOMContentLoaded', initPendingPage);
