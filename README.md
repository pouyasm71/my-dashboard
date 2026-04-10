# ForexKYC Compliance Portal

A production-ready, frontend-only KYC (Know Your Customer) compliance dashboard for forex brokers. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools required.

---

## Overview

ForexKYC is a multi-page compliance dashboard that lets KYC officers review client identity submissions, approve or reject applications, track document review queues, and monitor risk flags — all from a clean Material 3-styled interface with full dark mode support.

---

## Features

- **Login & Sign-up** — Auth pages with session-based access control
- **Overview Dashboard** — Stats, risk distribution, recent activity feed
- **Pending Verifications** — Action table with approve/reject buttons and CSV export
- **Approved Clients** — Filtered view of verified clients with account type breakdown
- **Rejected Applications** — Rejection log with reason analysis and resubmission eligibility
- **Document Review** — Card-based document queue (sub-section of dashboard)
- **Risk Checks** — Flagged accounts with risk scores and EDD indicators
- **Dark Mode** — Global, persisted via `localStorage`, toggled from the header
- **Responsive** — Mobile drawer sidebar, adaptive grid layouts for all breakpoints

---

## Project Structure

```
my-dashboard/
├── index.html              # Login page (entry point)
├── signup.html             # Registration page
│
├── pages/                  # All dashboard pages
│   ├── dashboard.html      # Overview + Document Review + Risk Checks (tabbed)
│   ├── pending.html        # Pending verifications table
│   ├── approved.html       # Approved clients table
│   └── rejected.html       # Rejected applications table
│
├── components/             # Reusable injected UI components
│   ├── sidebar.js          # Sidebar nav — renderSidebar(activeItem)
│   └── header.js           # Top header — renderHeader({ title, subtitle })
│
├── scripts/
│   ├── shared.js           # Auth guard, theme, user, toast, badges, downloadCSV
│   ├── data.js             # Mock data (pending, approved, rejected, documents, risk)
│   └── pages/
│       ├── dashboard.js    # Overview/docs/risk tab logic
│       ├── pending.js      # Pending table, approve/reject actions, search, export
│       ├── approved.js     # Approved table, filters, search, export
│       └── rejected.js     # Rejected table, filters, search, export
│
└── styles/
    ├── main.css            # Entry point — imports all partials in order
    ├── variables.css       # Material 3 design tokens (light + dark theme)
    ├── base.css            # Reset, typography, scrollbar
    ├── auth.css            # Login / signup page styles
    ├── layout.css          # Sidebar, header, main shell
    ├── components.css      # Cards, tables, badges, buttons, toasts, etc.
    └── responsive.css      # Breakpoints: 1200px, 960px, 768px, 480px
```

---

## Design System

This project follows **Material Design 3** principles:

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#1565C0` | Buttons, active nav, links |
| `--error` | `#B3261E` | Reject actions, risk flags |
| `--success` | `#1B6B3A` | Approve actions, low-risk badges |
| `--warning` | `#7B5800` | Pending badges, medium-risk |
| `--r-md` | `12px` | Cards, badges |
| `--r-xl` | `28px` | Pills, inputs, primary buttons |
| `--elev-1/2/3` | box-shadows | Cards, headers, toasts |

Dark mode tokens live under `[data-theme="dark"]` in `variables.css` and flip all surface/on-surface colors automatically.

---

## How to Run

This project requires **no build step**. Open it directly in a browser:

```bash
# Option 1 — Python (recommended, handles CSS @import)
cd my-dashboard
python3 -m http.server 8080
# Then open: http://localhost:8080

# Option 2 — Node (npx)
npx serve .
# Then open the URL shown in the terminal

# Option 3 — VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

> **Note:** Opening `index.html` directly via `file://` may block CSS `@import` in some browsers. Use a local server.

### Demo Login

Any email + any password will log you in. No backend exists — session state is stored in `sessionStorage`.

---

## Shared Utilities (`scripts/shared.js`)

All dashboard pages load `shared.js` first. Key functions available globally:

| Function | Description |
|---|---|
| `initPage()` | Run once on load: auth guard + theme + user |
| `authGuard()` | Redirects to login if not authenticated |
| `toggleTheme()` | Switches light/dark, persists in `localStorage` |
| `populateUser()` | Injects name/initials from session into `.js-user-name` / `.js-user-avatar` |
| `toast(msg, type)` | Shows a toast notification. `type`: `'success'` or `'error'` |
| `riskBadge(risk)` | Returns HTML for a colored risk badge (Low/Medium/High) |
| `statusBadge(status)` | Returns HTML for a status badge (pending/review/approved/rejected) |
| `downloadCSV(rows, filename)` | Triggers a CSV file download from a 2D array |
| `initials(name)` | Returns 2-letter initials from a full name |

---

## Adding a New Page

1. Create `pages/your-page.html` — copy any existing page as a template
2. Add your script at `scripts/pages/your-page.js`
3. In your JS entry point, call:
   ```js
   renderSidebar('your-page');           // sets active nav item
   renderHeader({ title: '...', subtitle: '...' });
   initPage();                           // auth + theme + user
   ```
4. Add a nav item in `components/sidebar.js` inside `renderSidebar()`

---

## Commit & Push Changes

```bash
# Stage your changes
git add pages/your-page.html scripts/pages/your-page.js

# Commit with a descriptive message
git commit -m "feat: add your-page with XYZ functionality"

# Push to remote
git push origin main
```

**Branch workflow** (recommended for teams):

```bash
git checkout -b feature/your-feature
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin feature/your-feature
# Then open a Pull Request on GitHub
```

---

## Browser Support

Modern evergreen browsers (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+). CSS custom properties and `@import` are required.

---

## License

Internal tool — all rights reserved. &copy; 2026 ForexKYC Portal.
