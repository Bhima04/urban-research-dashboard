# 🧪 Urban Research Center Dashboard

A web-based Research Dashboard built with **Node.js, Express, MongoDB**, featuring
secure session login, full CRUD notes, audit logging, and analytics dashboard.

---

## ✨ Features

- 🔐 Session-based Login (secure, server-side session)
- 📝 Research Notes (Create, Read, Update, Delete)
- 🧾 Audit Log (track who did what & when in real-time)
- 📊 Dashboard Analytics (Chart.js)
- 🛡️ Protected Routes (frontend & backend)
- 🎨 Clean enterprise-style UI

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Local)
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Authentication:** Express Session
- **Chart:** Chart.js

---

## 📂 Project Structure

research-notes-app/
├── server.js
├── package.json
├── public/
│ ├── dashboard.html
│ ├── login.html
│ ├── css/
│ ├── js/
│ └── assets/

---

## 🚀 How to Run Locally

### 1. Install dependencies
```bash
npm install

2. Start MongoDB

Make sure MongoDB is running on:

mongodb://127.0.0.1:27017

3. Run the server
node server.js

4. Open in browser
http://localhost:3000
---
Login credentials (demo):
username: admin
password: admin
---
##🧠 System Highlights
- Uses session-based authentication (not localStorage)
- Audit log records:
  - CREATE_NOTE
  - UPDATE_NOTE
  - DELETE_NOTE
- Dashboard analytics loads independently (no stale state)
- Designed with security & UX considerations
---
##🎓 Use Case
This project is suitable for:
- University assignments / final projects
- Portfolio showcase
- Learning reference for full-stack web development
---
##👤 Author
Bhima Bramasta
Web Development Enthusiast
