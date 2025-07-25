# Smart Academic Dashboard

An AI-enhanced academic dashboard built with **Next.js 15**, **Firebase Firestore**, and **Tailwind CSS**. It allows teachers to monitor multiple students’ performance metrics (attendance, grades, assignments) in real-time, with insights and visual charts.

---

## Features

### Teacher Features
- View **all students** with attendance, grades, and study progress.
- Real-time updates using **Firestore onSnapshot**.
- Visual charts for:
  - Assignment completion (Bar Chart).
  - Performance trends (Line Chart).
- Insights section providing AI-powered study recommendations.

### Student Data
- Displays key metrics:
  - Attendance percentage
  - Assignments completed
  - Average grade
  - Study hours logged

### Additional Features
- Upcoming tests and assignments overview.
- AI-powered study tips (Daily revision, Weekly goals).
- Fully responsive design with Tailwind CSS.
- Firestore seeding script to populate **20 dummy students**.

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **State/Animation:** Framer Motion
- **Charts:** Recharts
- **Backend (DB/Auth):** Firebase Firestore & Firebase Authentication
- **Language:** TypeScript

---

## Project Structure

```plaintext
dashboard/
│
├── src/
│   ├── app/
│   │   └── page.tsx          # Main dashboard page
│   ├── components/           # Reusable UI components
│   │   ├── assignment-progress.tsx
│   │   ├── performance-chart.tsx
│   │   ├── study-insights.tsx
│   │   └── upcoming-tests.tsx
│   └── lib/
│       └── firebase.ts       # Firebase configuration
│
├── students.json             # Dummy student data
├── seedStudents.ts           # Script to seed Firestore
├── package.json
├── tsconfig.json
└── README.md

