function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not recorded";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function loadStudentProfile() {
  try {
    return JSON.parse(localStorage.getItem("momentum-student-profile")) || {};
  } catch {
    return {};
  }
}

function loadCompletions() {
  try {
    const parsed = JSON.parse(localStorage.getItem("momentum-course-completions")) || [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getLatestCompletion() {
  const completions = loadCompletions();
  if (!completions.length) return null;

  return completions
    .slice()
    .sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))[0];
}

function setText(id, value, fallback = "Not available") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value || fallback;
}

document.addEventListener("DOMContentLoaded", () => {
  const student = loadStudentProfile();
  const latestCompletion = getLatestCompletion();

  setText("studentName", latestCompletion?.studentName || student?.studentName, "Student");
  setText("courseTitle", latestCompletion?.courseTitle, "Completed Course");
  setText("transcriptId", latestCompletion?.transcriptId, "Pending");
  setText("completionDate", formatDate(latestCompletion?.completionDate));
});
