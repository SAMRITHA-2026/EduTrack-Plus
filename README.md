# Smart Academic Dashboard

An AI-enhanced academic dashboard built with **Next.js 15**, **Firebase Firestore**, and **Tailwind CSS**. It allows teachers to monitor multiple students’ performance metrics (attendance, grades, assignments) in real-time, with insights and visual charts.


<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/86ddfcc3-6553-47c0-ab6c-5fc776a14ac5" />

---

## Features

### Teacher Features
- View **all students** with attendance, grades, and study progress.
- Real-time updates using **Firestore onSnapshot**.
- Visual charts for:
  - Assignment completion (Bar Chart).
  - Performance trends (Line Chart).
- Insights section providing AI-powered study recommendations.

*LOGIN PAGE:*
<img width="1600" height="736" alt="image" src="https://github.com/user-attachments/assets/ff99fdc2-c35d-4765-a6b9-8ef1bcbdfc2e" />

<img width="1600" height="671" alt="image" src="https://github.com/user-attachments/assets/10fbad4a-ba42-456a-b09f-f0d4185dbea1" />

### Student Data
- Displays key metrics:
  - Attendance percentage
  - Assignments completed
  - Average grade
  - Study hours logged
  - 
*LOGIN PAGE:*
<img width="1600" height="738" alt="image" src="https://github.com/user-attachments/assets/6e073e2a-ba11-40a6-8a89-d7c69425c610" />


<img width="1600" height="646" alt="image" src="https://github.com/user-attachments/assets/2ae4a45a-0cc4-416c-9b9c-30d3ed885bcf" />
<img width="1600" height="759" alt="image" src="https://github.com/user-attachments/assets/5d1beaa5-47b8-4e83-b9c7-8f471bf3e99a" />

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

