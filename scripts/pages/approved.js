/* ============================================================
   PAGE — Approved Clients
   ============================================================ */

let approvedFilter = 'all';

/* ── Build table ── */
function buildApprovedTable(data) {
  const tbody = document.getElementById('approved-tbody');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <p>No records match your filter</p>
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(c => `
    <tr>
      <td>
        <div class="client-cell">
          <div class="client-avatar green">${initials(c.name)}</div>
          <div>
            <div class="client-name">${c.name}</div>
            <div class="client-id">${c.id}</div>
          </div>
        </div>
      </td>
      <td>${c.country}</td>
      <td style="color:var(--on-surface-var);font-size:13px">${c.approved}</td>
      <td style="font-size:13px;color:var(--on-surface-var)">${c.officer}</td>
      <td>${riskBadge(c.risk)}</td>
      <td><span style="font-size:12.5px;font-weight:500;color:var(--on-surface)">${c.type}</span></td>
      <td><span class="badge approved"><span class="badge-dot"></span>Active</span></td>
    </tr>`).join('');
}

/* ── Filter ── */
function applyApprovedFilter(filter) {
  approvedFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.filter === filter));

  const data = filter === 'all' || filter === 'low'
    ? DATA.approved.filter(c => filter === 'low' ? c.risk === 'Low' : true)
    : DATA.approved.filter(c => c.type === filter);
  buildApprovedTable(data);
}

/* ── Search ── */
function handleApprovedSearch(q) {
  const lower = q.toLowerCase();
  buildApprovedTable(DATA.approved.filter(c =>
    c.name.toLowerCase().includes(lower) ||
    c.id.toLowerCase().includes(lower) ||
    c.country.toLowerCase().includes(lower)));
}

/* ── Export ── */
function exportApprovedCSV() {
  const rows = [
    ['ID','Name','Country','Approved','Officer','Risk','Type'],
    ...DATA.approved.map(c => [c.id, c.name, c.country, c.approved, c.officer, c.risk, c.type]),
  ];
  downloadCSV(rows, 'approved-clients.csv');
}

/* ── Entry point ── */
function initApprovedPage() {
  renderSidebar('approved');
  renderHeader({ title: 'Approved Clients', subtitle: 'All clients that passed full KYC verification' });
  initPage();
  populateUser();

  buildApprovedTable(DATA.approved);

  document.querySelectorAll('.filter-chip').forEach(chip =>
    chip.addEventListener('click', () => applyApprovedFilter(chip.dataset.filter)));

  document.getElementById('searchInput')?.addEventListener('input', e =>
    handleApprovedSearch(e.target.value));

  document.getElementById('export-btn')?.addEventListener('click', exportApprovedCSV);
}

document.addEventListener('DOMContentLoaded', initApprovedPage);
