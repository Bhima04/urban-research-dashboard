let notesChart = null;

async function loadNotesChart() {
  const res = await fetch("/notes");
  const notes = await res.json();

  const ctx = document.getElementById("notesChart");
  if (!ctx) return;

  // destroy chart lama (anti double render)
  if (notesChart) {
    notesChart.destroy();
  }

  notesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total Notes"],
      datasets: [{
        label: "Notes Count",
        data: [notes.length],
        backgroundColor: "#2563EB"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
