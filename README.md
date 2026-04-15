# FieldSight AI

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.7-1B222D?logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-black)](https://resend.com/)

FieldSight AI is an advanced, AI-powered agricultural monitoring platform built with Next.js. It helps farmers and agricultural users monitor field conditions, detect drainage problems, identify crop stress, and make smarter, data-driven decisions via modern simulated drone scans.

## Features

- **Global Authentication System:** A fully simulated Contextual Authentication flow tracking logged-in states globally without requiring immediate backend setups. Automatically protects sensitive views.
- **Dual-Mode Analysis Hub:** A unified `/analyze` workspace equipped with a smooth UI toggle for handling either *Single Photo* focus checks, or comprehensive *Bulk Dataset* processing.
- **Dynamic Field Summary Dashboards:** Generates interactive report dashboards natively supplying precise pooling intensity logic, flagged zone mapping, and high-contrast (cool aquatic colored) field heatmaps per unique scan.
- **Secure Report Archives:** The `/reports` route safely stores past scans locking viewing access strictly to the currently logged in user context. Expand individual records to observe specifically targeted visualizations on dynamic routes.
- **Automated Email Integration:** Built-in direct linkages with the [Resend](https://resend.com) API allowing users to seamlessly bounce full reports directly to their authenticated emails safely with single click executions!

## Tech Stack

- **Framework:** Next.js 16.1 (App Router)
- **Frontend:** React 19, Tailwind CSS v4
- **Database / ORM:** BetterSQLite3, Prisma
- **Email Provider:** Resend API

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/KyleJackson6/fieldsight-ai.git
cd fieldsight-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following keys. You must provide a valid Resend API key for the email workflows to function.

```env
# Resend API Key for Email functionality
RESEND_API_KEY=your_resend_api_key

# Prisma Database connection URL (for SQLite)
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup

Initialize the SQLite database and run Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Running the Application

Start the development server:

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Core Workflows Explorer

- **Sign Up / Log In (`/signup`, `/login`):** Users must establish a mock session logic utilizing localized contextual states to generate actual secure reports.
- **Field Analysis (`/analyze`):** Trigger batch processes securely analyzing dummy images generating deep metrics dashboards mimicking machine learning outputs. 
- **View Reports (`/reports`):** Automatically protected endpoint logging past activities securely and allowing a dynamically loaded custom-mapped Heatmap Visualization (`/reports/[id]`) highlighting potential water threats clearly utilizing cyan/deep-blue coloring against base earth mapping.
- **Email Dispatch (`/api/report-ready`):** Hitting the "Send Field Report" button automatically retrieves the user's logged-in identity and triggers an official automated Resend notification seamlessly to your inbox.

## License

© 2026 FieldSight AI. All rights reserved. Helping farmers make smarter decisions with AI.
