/* ===============================
   AUTH CHECK (FRONTEND PROTECTION)
================================ */
async function checkAuth() {
  try {
    const res = await fetch("/notes");
    if (res.status === 401) {
      window.location.href = "login.html";
    }
  } catch (err) {
    window.location.href = "login.html";
  }
}

/* ===============================
   SIDEBAR ACTIVE STATE
================================ */
function activate(btn) {
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

/* ===============================
   SECTION SWITCHER
================================ */
function showSection(section) {
  document.getElementById("dashboard-section").style.display = "none";
  document.getElementById("notes-section").style.display = "none";
  document.getElementById("audit-section").style.display = "none";

  document.getElementById(section + "-section").style.display = "block";

  if (section === "dashboard") {
    loadDashboardStats();
  }

  if (section === "notes") {
    loadNotes();
  }

  if (section === "audit") {
    loadAuditLog(); // ✅ SATU-SATUNYA TEMPAT YANG BENAR
  }
}

/* ===============================
   LOGOUT
================================ */
async function logout() {
  await fetch("/logout", { method: "POST" });
  window.location.href = "login.html";
}

/* ===============================
   DASHBOARD DATA
================================ */
async function loadDashboardStats() {
  const res = await fetch("/notes");
  const notes = await res.json();

  const counter = document.getElementById("total-notes");
  if (counter) counter.innerText = notes.length;

  if (typeof loadNotesChart === "function") {
    loadNotesChart();
  }
}

/* ===============================
   AUDIT LOG
================================ */
async function loadAuditLog() {
  const res = await fetch("/audit");
  const logs = await res.json();

  const table = document.getElementById("audit-table");
  table.innerHTML = "";

  logs.forEach(log => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${log.user}</td>
      <td>${log.action}</td>
      <td>${log.noteId}</td>
      <td>${new Date(log.time).toLocaleString()}</td>
    `;
    table.appendChild(row);
  });
}

/* ===============================
   INIT
================================ */
checkAuth();
loadDashboardStats();
