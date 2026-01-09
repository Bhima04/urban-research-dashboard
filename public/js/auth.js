async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid credentials";
  }
}

async function logout() {
  await fetch("/logout", { method: "POST" });
  window.location.href = "login.html";
}
