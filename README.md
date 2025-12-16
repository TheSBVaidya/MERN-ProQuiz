# 🎓 ProQuiz - Advanced Exam & Assessment Platform

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

**ProQuiz** is a full-stack quiz application designed to simulate professional exam environments. It features a modern, glassmorphism-inspired UI and a highly scalable backend architecture that supports unlimited attempts, detailed question-wise analysis, and comprehensive history tracking.

---

## 📸 Screenshots

|                                    **Interactive Dashboard**                                    |                                   **History View**                                    |
| :---------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|     ![Dashboard](https://github.com/TheSBVaidya/MERN-ProQuiz/blob/main/Docs/Dashboard.png)      |  ![History](https://github.com/TheSBVaidya/MERN-ProQuiz/blob/main/Docs/History.png)   |
|                                       **Focus-Mode Quiz**                                       |                             **Detailed Result Analysis**                              |
| ![Quiz Interface](https://github.com/TheSBVaidya/MERN-ProQuiz/blob/main/Docs/QuizInterface.png) | ![Result Page](https://github.com/TheSBVaidya/MERN-ProQuiz/blob/main/Docs/Result.png) |

---

## ✨ Key Features

### 🎨 Frontend (React.js)

- **Modern UI/UX:** Built with **Bootstrap 5** and custom CSS, featuring glassmorphism cards, vibrant gradients, and smooth hover effects.
- **User Authentication:** Secure Login and Registration pages with visual validation.
- **Interactive Dashboard:** Quick access to quizzes (20, 50, 100 questions) and a Custom Quiz mode.
- **Focus-Mode Quiz Interface:**
  - Visual Progress Bar.
  - Question Palette (Active, Answered, Flagged, Not Visited status).
  - Flag-for-later functionality.
- **Detailed Results:** "Report Card" style results with circular score indicators and color-coded question analysis (Green for correct, Red for wrong).
- **History Tracking:** A creative timeline view of all past attempts with pass/fail status.

### ⚙️ Backend (Node.js & SQL)

- **Scalable Architecture:** Controllers, Services, and Models separation for clean code.
- **Bulk Answer Submission:** Optimized `POST` endpoint that handles bulk inserts to prevent server lag.
- **SQL-Based Scoring:** Efficient scoring logic using `CASE WHEN` SQL queries to calculate results on the fly without heavy application-side processing.
- **Unlimited Retakes:** The database schema is designed to allow users to retake quizzes indefinitely without data collisions.

---

## 🛠️ Tech Stack

**Frontend:**

- React.js (Vite)
- Bootstrap 5
- Axios

**Backend:**

- Node.js & Express.js
- MySQL

---

## 🗄️ Database Schema

The backend relies on a normalized relational database structure consisting of four main tables:

1.  **`users`**: Stores user credentials.

- _(id, name, email, password)_

2.  **`quiz`**: The central question bank.

- _(id, question, options [a,b,c,d], correct_answer)_

3.  **`attempts`**: Logs every exam session initiated by a user.

- _(attempt_id, user_id, created_at)_

4.  **`attempt_answers`**: Stores individual answers linked to a specific attempt.

- _(id, attempt_id, quiz_id, answer)_

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone [https://github.com/TheSBVaidya/MERN-ProQuiz.git)
   cd proquiz

   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install

   # Configure your .env file with DB credentials
   npm run dev

   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 🤝 Contribution

Contributions are welcome! Please fork the repository and create a pull request.
