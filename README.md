# ForexKYC Compliance Portal

A full-stack KYC (Know Your Customer) compliance dashboard for forex brokerages. KYC agents can manage client identity submissions, approve or reject applications, and track document review queues — all through a clean Material 3-styled interface with full dark mode support.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JS (no framework, no build step) |
| Backend | Node.js + Express |
| ORM | Prisma 7 |
| Database | PostgreSQL 16 |
| Password hashing | bcrypt |

---

## Features

- **Login & Sign Up** — Real auth via `/api/auth/login` and `/api/auth/register` with bcrypt-hashed passwords
- **KYC Submissions** — Full CRUD table: create, view, edit, and delete client verification records
- **Overview Dashboard** — Stats, risk distribution, recent activity feed
- **Pending / Approved / Rejected** — Filtered views with approve/reject actions and CSV export
- **Document Review** — Card-based document queue
- **Risk Checks** — Flagged accounts with risk scores and EDD indicators
- **Dark Mode** — Persisted via `localStorage`, toggled from the header
- **Responsive** — Mobile drawer sidebar, adaptive layouts for all breakpoints

---

## Project Structure

```
my-dashboard/
├── .gitignore
├── README.md
│
├── frontend/               # All static frontend files (no build step)
│   ├── index.html          # Login page (entry point)
│   ├── signup.html         # Registration page
│   ├── components/
│   │   ├── sidebar.js      # renderSidebar(activeItem)
│   │   └── header.js       # renderHeader({ title, subtitle })
│   ├── pages/
│   │   ├── dashboard.html  # Overview + Document Review + Risk + KYC Submissions
│   │   ├── pending.html
│   │   ├── approved.html
│   │   └── rejected.html
│   ├── scripts/
│   │   ├── config.js       # API_BASE URL — edit this for your environment
│   │   ├── shared.js       # Auth guard, theme, user, toast, badges, CSV export
│   │   ├── data.js         # Static mock data (risk, documents, activity)
│   │   └── pages/
│   │       ├── dashboard.js
│   │       ├── pending.js
│   │       ├── approved.js
│   │       └── rejected.js
│   └── styles/
│       ├── main.css        # Entry point — imports all partials
│       ├── variables.css   # Material 3 design tokens (light + dark)
│       ├── base.css
│       ├── auth.css
│       ├── layout.css
│       ├── components.css
│       └── responsive.css
│
├── backend/                # Node.js + Express API
│   ├── index.js            # Express server entry point
│   ├── .env                # Local credentials — never committed
│   ├── .env.example        # Template for required environment variables
│   ├── prisma/
│   │   ├── schema.prisma   # Database models (User, KycSubmission)
│   │   └── migrations/     # Committed migration history
│   ├── prisma.config.ts    # Prisma 7 datasource + adapter config
│   ├── lib/
│   │   └── prisma.js       # Shared PrismaClient instance (pg adapter)
│   ├── controllers/
│   │   ├── authController.js
│   │   └── kycController.js
│   └── routes/
│       ├── auth.js         # POST /api/auth/register, /api/auth/login
│       └── kyc.js          # GET/POST/PUT/DELETE /api/kyc_submissions
│
└── styles/
    ├── main.css            # Entry point — imports all partials
    ├── variables.css       # Material 3 design tokens (light + dark)
    ├── base.css            # Reset, typography, scrollbar
    ├── auth.css            # Login / signup styles
    ├── layout.css          # Sidebar, header, main shell
    ├── components.css      # Cards, tables, badges, buttons, modals, toasts
    └── responsive.css      # Breakpoints: 1200px, 960px, 768px, 480px
```

---

## Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL 16 running locally

### 1. Clone and set up the database

```bash
git clone https://github.com/pouyasm71/my-dashboard.git
cd my-dashboard
```

Create a PostgreSQL user and database:

```sql
-- Run inside psql as superuser
CREATE USER dashboard_user WITH PASSWORD 'your_password' CREATEDB;
CREATE DATABASE dashboard_db OWNER dashboard_user;
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO dashboard_user;
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your actual credentials:

```env
DATABASE_URL="postgresql://dashboard_user:your_password@localhost:5432/dashboard_db"
PORT=3000
```

### 3. Install dependencies and run migrations

```bash
npm install
npx prisma migrate deploy   # applies all committed migrations
npm run dev                 # starts the server with live reload
```

The API will be available at `http://localhost:3000`.

### 4. Configure the frontend

If your backend runs on a different port, edit `scripts/config.js`:

```js
const API_BASE = 'http://localhost:3000';  // change if needed
```

### 5. Serve the frontend

The frontend is plain HTML — no build step required:

```bash
# From the repo root
python3 -m http.server 8080
# Open: http://localhost:8080/frontend/
```

Or use the VS Code **Live Server** extension (right-click `frontend/index.html` → Open with Live Server).

> **Note:** Don't open `index.html` directly via `file://` — use a local server so CSS `@import` works correctly.

---

## API Endpoints

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `name, email, password, role` | Create account |
| POST | `/api/auth/login` | `email, password` | Authenticate |

### KYC Submissions

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/kyc_submissions` | List all, newest first |
| POST | `/api/kyc_submissions` | Create new submission |
| PUT | `/api/kyc_submissions/:id` | Update submission by id |
| DELETE | `/api/kyc_submissions/:id` | Delete submission by id |

All responses follow: `{ success: true/false, data: ..., message: ... }`

---

## Database Models

### `users`
| Column | Type | Notes |
|---|---|---|
| id | integer | PK, auto-increment |
| name | text | required |
| email | text | unique, required |
| password_hash | text | bcrypt, never plain text |
| role | text | e.g. `kyc`, `support`, `sales` |
| created_at | timestamp | auto |

### `kyc_submissions`
| Column | Type | Notes |
|---|---|---|
| id | integer | PK, auto-increment |
| client_name | text | required |
| client_email | text | required |
| document_type | text | `passport`, `national_id`, `drivers_license`, `utility_bill` |
| document_number | text | required |
| country | text | required |
| status | text | `pending` → `under_review` → `approved` / `rejected` |
| rejection_reason | text | optional |
| reviewed_by | integer | FK → users.id |
| submitted_at | timestamp | auto |
| reviewed_at | timestamp | set on review |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Full PostgreSQL connection string |
| `PORT` | Port the Express server listens on (default: 3000) |

See `backend/.env.example` for the exact format.

---

## License

Internal tool — all rights reserved. &copy; 2026 ForexKYC Portal.
