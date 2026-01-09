const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.static("public"));

/* ===============================
   DATABASE CONNECTION
================================ */
mongoose.connect("mongodb://127.0.0.1:27017/research_notes")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* ===============================
   MODELS
================================ */
const Note = mongoose.model("Note", {
  title: String,
  content: String
});

const Audit = mongoose.model("Audit", {
  action: String,        // CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE
  noteId: String,
  user: String,
  time: { type: Date, default: Date.now }
});

/* ===============================
   SESSION SETUP
================================ */
app.use(session({
  secret: "urban-research-secret",
  resave: false,
  saveUninitialized: false
}));

/* ===============================
   AUTH MIDDLEWARE
================================ */
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

/* ===============================
   LOGIN & LOGOUT
================================ */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session.user = { username };
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
});

/* ===============================
   NOTES ROUTES (PROTECTED)
================================ */
app.get("/notes", authMiddleware, async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", authMiddleware, async (req, res) => {
  const note = await Note.create(req.body);

  await Audit.create({
    action: "CREATE_NOTE",
    noteId: note._id.toString(),
    user: req.session.user.username
  });

  res.sendStatus(200);
});

app.put("/notes/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body);

  await Audit.create({
    action: "UPDATE_NOTE",
    noteId: req.params.id,
    user: req.session.user.username
  });

  res.sendStatus(200);
});

app.delete("/notes/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  await Audit.create({
    action: "DELETE_NOTE",
    noteId: req.params.id,
    user: req.session.user.username
  });

  res.sendStatus(200);
});

/* ===============================
   AUDIT LOG API (PROTECTED)
================================ */
app.get("/audit", authMiddleware, async (req, res) => {
  const logs = await Audit.find().sort({ time: -1 });
  res.json(logs);
});

/* ===============================
   ROOT ROUTE
================================ */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

/* ===============================
   START SERVER
================================ */
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
