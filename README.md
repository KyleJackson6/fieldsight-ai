# FieldSight AI 🌾
**AI-Powered Drone Imagery Analytics for Modern Precision Agriculture**

FieldSight AI is an intelligent web application designed to help agronomists and farmers automatically detect and analyze hazardous field conditions such as water pooling and poor drainage. Using high-definition drone imagery and state-of-the-art computer vision models, FieldSight isolates risk sectors, calculates affected areas, and provides intelligent actionable insights.

---

## 🛠️ Architecture Overview

The system is built on a highly-scalable, decoupled architecture separating the fast client UI from the heavy machine-learning workloads.

- **Frontend Application:** Built with **Next.js 16** (App Router) and React 19. Styled entirely via native **Tailwind CSS** for a professional dark-glass theme.
- **Inference Engine Backend:** Powered by a **FastAPI** Python service seamlessly running a trained **Ultralytics YOLO11** model to process imagery dynamically.
- **Database & Storage:** **Prisma ORM** locally tethered to **SQLite** for robust authentication. Heavy batched analysis imagery is dynamically cached inside the browser using asynchronous **IndexedDB**.
- **Transactional Delivery:** Natively integrated with **Resend** to dispatch live, visually structured HTML metrics securely via email.

---

## 💻 Prerequisites

Before running the application locally, ensure your machine has the following tools installed:
- **Node.js:** (v18 or higher) - [Download Node](https://nodejs.org/)
- **Docker Desktop:** Required for running the Python Inference API. - [Download Docker](https://www.docker.com/products/docker-desktop/)
- **Git**

---

## 🚀 Setup & Installation

Follow these steps to spin up the entire application stack:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fieldsight-ai.git
cd fieldsight-ai
```

### 2. Configure Environment Variables
Create a `.env` file at the root of the project to initialize the database and connect the API keys.
```env
DATABASE_URL="file:./dev.db"
RESEND_API_KEY="re_your_api_key_here"

# Inference Service Configuration
MODEL_WEIGHTS_PATH="/weights/capstone_weights/best (4).pt"
NEXT_PUBLIC_INFERENCE_API_URL="http://localhost:8000"
```

### 3. Install Node Dependencies
```bash
npm install
```

### 4. Push Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 5. Start the ML Inference Container
You must securely boot the Python backend to provide the YOLO model endpoints via Docker:
```bash
docker-compose up -d --build
```
> **Note:** The `docker-compose.yml` mounts your local `./capstone_weights` directory securely into the container. Ensure your YOLO `.pt` files are located correctly natively on your disk.

### 6. Start the Next.js Server
```bash
npm run dev
```

You can now visit http://localhost:3000 to interact with the frontend, log in, and begin securely running automated field scans!

---

## ⚙️ Operating System Specifics

FieldSight natively supports both Windows and macOS local deployments. Due to Docker environment integrations, keep these paths in mind:

### Windows
- Ensure **Docker Desktop** is deeply integrated with **WSL 2** (Windows Subsystem for Linux) in the settings.
- Run all commands inside a robust terminal like PowerShell 7 or Git Bash.
- Docker natively handles Windows-to-Linux path conversions for mounting your `capstone_weights`.

### macOS (Intel & Apple Silicon M1/M2/M3)
- Ensure Docker Desktop has "VirtioFS" toggled on under settings for improved I/O speeds when analyzing heavy map image sets cleanly.
- If the YOLO11 model (`ultralytics>=8.3.0`) fails to run tensor operations correctly on standard ARM arrays, Docker seamlessly emulates x86 parameters behind the scenes.

---

## 📊 Core Usage
1. **Account Creation:** Sign up or access the application via the local secure Prisma endpoint.
2. **Uploading Scans:** Toggle between **Single Photo** testing or full **Bulk Dataset** orchestration. Drops your images in the respective zones.
3. **Execution:** Ensure `docker-compose` is actively running. Click **Run Field Scan** — your photos will securely transmit to the local Docker FastAPI cluster, append bounding boxes, calculate pooling percentages, and return asynchronously to the main viewer!
4. **Dynamic History:** Navigate to the **My Reports** tab to pull detailed granular data, review securely archived IndexedDB photos via the gallery popup, or permanently push field notifications via **Email Delivery**!

---
*Created and maintained under the FieldSight project infrastructure.*
