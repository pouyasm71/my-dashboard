/* ============================================================
   PAGE — Rejected Applications
   ============================================================ */

let rejectedFilter = 'all';

/* ── Build table ── */
function buildRejectedTable(data) {
  const tbody = document.getElementById('rejected-tbody');
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
          <div class="client-avatar red">${initials(c.name)}</div>
          <div>
            <div class="client-name">${c.name}</div>
            <div class="client-id">${c.id}</div>
          </div>
        </div>
      </td>
      <td>${c.country}</td>
      <td style="color:var(--on-surface-var);font-size:13px">${c.rejected}</td>
      <td style="font-size:12.5px;color:var(--on-error-cont)">${c.reason}</td>
      <td>${riskBadge(c.risk)}</td>
      <td>
        <span style="font-size:12.5px;font-weight:600;color:${c.resubmit === 'Yes' ? 'var(--success)' : 'var(--on-surface-var)'}">
          ${c.resubmit}
        </span>
      </td>
      <td>
        <div class="actions">
          <button class="btn-sm btn-view">Details</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ── Filter ── */
function applyRejectedFilter(filter) {
  rejectedFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.filter === filter));

  const map = {
    all:  () => DATA.rejected,
    yes:  () => DATA.rejected.filter(c => c.resubmit === 'Yes'),
    no:   () => DATA.rejected.filter(c => c.resubmit === 'No'),
    high: () => DATA.rejected.filter(c => c.risk === 'High'),
  };
  buildRejectedTable((map[filter] || map.all)());
}

/* ── Search ── */
function handleRejectedSearch(q) {
  const lower = q.toLowerCase();
  buildRejectedTable(DATA.rejected.filter(c =>
    c.name.toLowerCase().includes(lower) ||
    c.id.toLowerCase().includes(lower) ||
    c.country.toLowerCase().includes(lower)));
}

/* ── Export ── */
function exportRejectedCSV() {
  const rows = [
    ['ID','Name','Country','Rejected','Reason','Risk','Resubmit'],
    ...DATA.rejected.map(c => [c.id, c.name, c.country, c.rejected, c.reason, c.risk, c.resubmit]),
  ];
  downloadCSV(rows, 'rejected-applications.csv');
}

/* ── Entry point ── */
function initRejectedPage() {
  renderSidebar('rejected');
  renderHeader({ title: 'Rejected Applications', subtitle: 'Review rejection reasons and resubmission eligibility', searchPlaceholder: 'Search applicants…' });
  initPage();
  populateUser();

  buildRejectedTable(DATA.rejected);

  document.querySelectorAll('.filter-chip').forEach(chip =>
    chip.addEventListener('click', () => applyRejectedFilter(chip.dataset.filter)));

  document.getElementById('searchInput')?.addEventListener('input', e =>
    handleRejectedSearch(e.target.value));

  document.getElementById('export-btn')?.addEventListener('click', exportRejectedCSV);
}

document.addEventListener('DOMContentLoaded', initRejectedPage);
