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

/* ============================================================
   KYC SUBMISSIONS — CRUD
   ============================================================ */

const DOC_LABELS = {
  passport: 'Passport', national_id: 'National ID',
  drivers_license: "Driver's License", utility_bill: 'Utility Bill',
};

let _editingId = null;

function _showSubmissionsError(msg) {
  const el = document.getElementById('submissionsError');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
}
function _clearSubmissionsError() {
  const el = document.getElementById('submissionsError');
  if (el) el.classList.remove('visible');
}

function _showModalError(msg) {
  const el = document.getElementById('modalError');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
}
function _clearModalError() {
  const el = document.getElementById('modalError');
  if (el) el.classList.remove('visible');
}

function _formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

function _statusBadgeKyc(s) {
  const map = {
    pending:      `<span class="badge pending"><span class="badge-dot"></span>Pending</span>`,
    under_review: `<span class="badge review"><span class="badge-dot"></span>Under Review</span>`,
    approved:     `<span class="badge approved"><span class="badge-dot"></span>Approved</span>`,
    rejected:     `<span class="badge rejected"><span class="badge-dot"></span>Rejected</span>`,
  };
  return map[s] || `<span class="badge">${s}</span>`;
}

async function loadSubmissions() {
  _clearSubmissionsError();
  const tbody = document.getElementById('submissionsTbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:var(--on-surface-var)">Loading…</td></tr>`;

  try {
    const res  = await fetch(`${API_BASE}/api/kyc_submissions`);
    const json = await res.json();
    if (!res.ok) { _showSubmissionsError(json.message || 'Failed to load submissions.'); tbody.innerHTML = ''; return; }

    const rows = json.data;
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:var(--on-surface-var)">No submissions yet. Click "Add New" to create one.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map(r => `
      <tr>
        <td style="color:var(--on-surface-var);font-size:12px">#${r.id}</td>
        <td>
          <div class="client-cell">
            <div class="client-avatar">${initials(r.clientName)}</div>
            <span class="client-name">${r.clientName}</span>
          </div>
        </td>
        <td style="color:var(--on-surface-var)">${r.clientEmail}</td>
        <td>${DOC_LABELS[r.documentType] || r.documentType}</td>
        <td style="font-family:monospace;font-size:12.5px">${r.documentNumber}</td>
        <td>${r.country}</td>
        <td>${_statusBadgeKyc(r.status)}</td>
        <td style="color:var(--on-surface-var)">${_formatDate(r.submittedAt)}</td>
        <td>
          <div class="actions">
            <button class="btn-sm btn-edit"   onclick="openEditModal(${r.id})">Edit</button>
            <button class="btn-sm btn-delete" onclick="deleteSubmission(${r.id})">Delete</button>
          </div>
        </td>
      </tr>`).join('');
  } catch (err) {
    console.error(err);
    _showSubmissionsError('Unable to reach the server. Is the backend running?');
    tbody.innerHTML = '';
  }
}

function openAddModal() {
  _editingId = null;
  document.getElementById('modalTitle').textContent = 'New Submission';
  document.getElementById('modalSave').textContent  = 'Save Submission';
  ['clientName','clientEmail','documentNumber','country','rejectionReason'].forEach(f => {
    document.getElementById('f-' + f).value = '';
  });
  document.getElementById('f-documentType').value = '';
  document.getElementById('f-status').value = 'pending';
  _clearModalError();
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.getElementById('f-clientName').focus();
}

function openEditModal(id) {
  _editingId = id;
  const tbody = document.getElementById('submissionsTbody');
  // Re-fetch the row from the API for accuracy
  fetch(`${API_BASE}/api/kyc_submissions`)
    .then(r => r.json())
    .then(json => {
      const row = (json.data || []).find(r => r.id === id);
      if (!row) { toast('Record not found.', 'error'); return; }
      document.getElementById('modalTitle').textContent = `Edit Submission #${id}`;
      document.getElementById('modalSave').textContent  = 'Update Submission';
      document.getElementById('f-clientName').value      = row.clientName;
      document.getElementById('f-clientEmail').value     = row.clientEmail;
      document.getElementById('f-documentType').value    = row.documentType;
      document.getElementById('f-documentNumber').value  = row.documentNumber;
      document.getElementById('f-country').value         = row.country;
      document.getElementById('f-status').value          = row.status;
      document.getElementById('f-rejectionReason').value = row.rejectionReason || '';
      _clearModalError();
      document.getElementById('modalOverlay').classList.remove('hidden');
      document.getElementById('f-clientName').focus();
    })
    .catch(() => toast('Failed to load record.', 'error'));
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  _editingId = null;
}

async function saveSubmission() {
  _clearModalError();
  const body = {
    clientName:      document.getElementById('f-clientName').value.trim(),
    clientEmail:     document.getElementById('f-clientEmail').value.trim(),
    documentType:    document.getElementById('f-documentType').value,
    documentNumber:  document.getElementById('f-documentNumber').value.trim(),
    country:         document.getElementById('f-country').value.trim(),
    status:          document.getElementById('f-status').value,
    rejectionReason: document.getElementById('f-rejectionReason').value.trim() || null,
  };

  const saveBtn = document.getElementById('modalSave');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving…';

  try {
    const url    = _editingId ? `${API_BASE}/api/kyc_submissions/${_editingId}` : `${API_BASE}/api/kyc_submissions`;
    const method = _editingId ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json   = await res.json();

    if (!res.ok) {
      _showModalError(json.message || 'Failed to save. Please check your input.');
      saveBtn.disabled = false;
      saveBtn.textContent = _editingId ? 'Update Submission' : 'Save Submission';
      return;
    }
    closeModal();
    toast(_editingId ? 'Submission updated.' : 'Submission created.', 'success');
    loadSubmissions();
  } catch (err) {
    console.error(err);
    _showModalError('Unable to reach the server. Is the backend running?');
    saveBtn.disabled = false;
    saveBtn.textContent = _editingId ? 'Update Submission' : 'Save Submission';
  }
}

async function deleteSubmission(id) {
  if (!confirm(`Delete submission #${id}? This cannot be undone.`)) return;
  try {
    const res  = await fetch(`${API_BASE}/api/kyc_submissions/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) { toast(json.message || 'Delete failed.', 'error'); return; }
    toast('Submission deleted.', 'success');
    loadSubmissions();
  } catch (err) {
    console.error(err);
    toast('Unable to reach the server.', 'error');
  }
}

function initSubmissions() {
  document.getElementById('btnAddNew')?.addEventListener('click', openAddModal);
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalCancel')?.addEventListener('click', closeModal);
  document.getElementById('modalSave')?.addEventListener('click', saveSubmission);
  document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
}

/* ── Tab switching ── */
const TABS = {
  overview:     { title:'Overview',           sub:'KYC Compliance Dashboard' },
  documents:    { title:'Document Review',    sub:'11 documents awaiting inspection' },
  risk:         { title:'Risk Checks',        sub:'4 accounts flagged for enhanced due diligence' },
  submissions:  { title:'KYC Submissions',    sub:'All client verification submissions' },
};

function switchTab(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + name)?.classList.add('active');

  const tab = TABS[name] || TABS.overview;
  document.querySelector('.header-title').textContent    = tab.title;
  document.querySelector('.header-subtitle').textContent = tab.sub;

  // Sync sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.getAttribute('href') === `dashboard.html#${name}`
      || (name === 'overview' && n.getAttribute('href') === 'dashboard.html'));
  });

  if (name === 'submissions') loadSubmissions();
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
  initSubmissions();
  initTabs();
}

document.addEventListener('DOMContentLoaded', initDashboard);
