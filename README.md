# 🎓 Student Portal – Add Student

A modern consultancy student onboarding portal built with React + Vite.

---

## 🚀 Quick Start (Run in VS Code)

### Prerequisites
- **Node.js** v18 or above → https://nodejs.org/
- **npm** (comes with Node.js)

---

### Steps to Run

1. **Extract** the zip file to a folder

2. **Open** the folder in VS Code
   ```
   File → Open Folder → select "student-portal"
   ```

3. **Open terminal** in VS Code  
   `` Ctrl + ` `` (backtick) or go to **Terminal → New Terminal**

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start the dev server**
   ```bash
   npm run dev
   ```

6. **Open in browser** → http://localhost:5173

---

## 📁 Project Structure

```
student-portal/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── AddStudent/
│   │       ├── AddStudent.jsx      ← Main form component
│   │       └── AddStudent.css      ← All styles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧩 Features

| Step | Section | Description |
|------|---------|-------------|
| 1 | Personal Info | Name, email, gender, consultant assignment, lead source |
| 2 | Contact & Address | Phone, WhatsApp, address, country/state/city |
| 3 | Passport & Identity | Passport details, national ID |
| 4 | Education | Qualifications, proficiency tests, work experience |
| 5 | Study Preferences | Destinations, academic level, budget, accommodation |
| 6 | Background & Visa | Emergency contact, visa history, declarations |
| 7 | Documents | Drag & drop file upload with checklist |
| 8 | Application | Multi-application creator with summary |

---

## 🛠 Build for Production

```bash
npm run build
```
Output goes to `dist/` folder.

---

## 💡 Tech Stack

- **React 18** – UI framework
- **Vite 5** – Dev server & build tool
- **CSS** – Custom design system (no external UI library)
- **Google Fonts** – Fraunces (display) + DM Sans (body)
