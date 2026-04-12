# FieldSight AI

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.7-1B222D?logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Resend](https://img.shields.io/badge/Resend-Email-black)](https://resend.com/)

FieldSight AI is an advanced, AI-powered agricultural monitoring platform built with Next.js. It helps farmers and agricultural users monitor field conditions, detect drainage problems, identify crop stress, and make smarter, data-driven decisions.

## Features

- **AI-Powered Field Insights:** Automated analysis of crop health and field conditions.
- **Drainage & Issue Detection:** Intelligent detection of drainage problems and crop stress.
- **Automated Reporting:** Generates AI-driven field reports and sends automatic notifications when reports are ready.
- **Email Notifications:** Built-in email integration via [Resend](https://resend.com) for onboarding and report alerts.
- **Data Management:** Robust schema supporting Farmers, Fields, Analysis Reports, and Issue Detections, utilizing Prisma and BetterSQLite3.
- **Modern UI:** Built with Tailwind CSS v4 to ensure a sleek and responsive dashboard.

## Tech Stack

- **Framework:** Next.js 16.1 (App Router)
- **Frontend:** React 19, Tailwind CSS v4
- **Database / ORM:** BetterSQLite3, Prisma
- **Email Provider:** Resend

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

## Core Workflows

- **User Onboarding:** Users can navigate to `/signup` to register. Upon submission, they will automatically receive a welcome email with their next steps.
- **Report Generation:** Users or background jobs trigger field analysis. Test this by navigating to `/report-test` to generate mock reports and trigger an alert email.

## License

© 2026 FieldSight AI. All rights reserved. Helping farmers make smarter decisions with AI.
