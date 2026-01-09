async function saveNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Title and content must be filled");
    return;
  }

  await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadNotes();
}

async function loadNotes() {
  const res = await fetch("/notes");
  const notes = await res.json();

  const container = document.getElementById("notes");
  container.innerHTML = "";

let editingId = null;

notes.forEach(note => {
  const card = document.createElement("div");
  card.className = "note-card";

  card.innerHTML = `
    <h4>${note.title}</h4>
    <p>${note.content}</p>

    <button onclick="openEdit('${note._id}', '${note.title}', '${note.content}')">
      Edit
    </button>
    <button class="delete-btn" onclick="deleteNote('${note._id}')">
      Delete
    </button>
  `;

  container.appendChild(card);
});


  // update dashboard counter
  if (typeof loadDashboardStats === "function") {
    loadDashboardStats();
  }
}

async function updateNote(id, newTitle, newContent) {
  const data = {};
  if (newTitle !== null) data.title = newTitle;
  if (newContent !== null) data.content = newContent;

  await fetch(`/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;

  await fetch(`/notes/${id}`, {
    method: "DELETE"
  });

  loadNotes();
}

function openEdit(id, title, content) {
  editingId = id;
  document.getElementById("edit-title").value = title;
  document.getElementById("edit-content").value = content;
  document.getElementById("edit-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("edit-modal").style.display = "none";
}

async function saveEdit() {
  const title = document.getElementById("edit-title").value;
  const content = document.getElementById("edit-content").value;

  await fetch(`/notes/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  closeModal();
  loadNotes();
}
