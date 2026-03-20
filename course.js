import { COURSES } from "./courses-data.js";

const $ = (id) => document.getElementById(id);

const els = {
  title: $("courseTitle"),
  tagline: $("courseTagline"),
  credit: $("courseCredit"),
  courseId: $("courseId"),
  description: $("courseDescription"),
  overview: $("courseOverview"),
  learningOutcomes: $("learningOutcomes"),
  weeklyExpectations: $("weeklyExpectations"),
  modules: $("courseModules"),
  exitExamTitle: $("exitExamTitle"),
  exitExamPrompt: $("exitExamPrompt"),
  creditRequirements: $("creditRequirements"),
  qualifyingMinutes: $("qualifyingMinutes"),
  athleteExpectations: $("athleteExpectations"),
  gradingLab: $("gradingLab"),
  gradingReflection: $("gradingReflection"),
  gradingFinal: $("gradingFinal"),
  requiredMaterials: $("requiredMaterials"),
  startButton: document.querySelector(".primary-btn")
};

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCourseIdFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return (
    params.get("course") ||
    params.get("id") ||
    params.get("courseId") ||
    ""
  ).trim();
}

function getStoredCourseId() {
  try {
    const selectedCourseRaw = sessionStorage.getItem("selectedCourse");
    if (selectedCourseRaw) {
      const selectedCourse = JSON.parse(selectedCourseRaw);
      if (selectedCourse?.id) return selectedCourse.id;
      if (selectedCourse?.courseId) return selectedCourse.courseId;
      if (selectedCourse?.title) return slugify(selectedCourse.title);
    }
  } catch (err) {
    console.warn("Could not parse selectedCourse from sessionStorage.", err);
  }

  try {
    const directId = sessionStorage.getItem("selectedCourseId");
    if (directId) return directId.trim();
  } catch (err) {
    console.warn("Could not read selectedCourseId from sessionStorage.", err);
  }

  return "";
}

function findCourse(courseId) {
  if (!courseId) return null;

  const normalizedId = slugify(courseId);

  return (
    COURSES.find((course) => course.id === courseId) ||
    COURSES.find((course) => slugify(course.id) === normalizedId) ||
    COURSES.find((course) => slugify(course.title) === normalizedId) ||
    null
  );
}

function setText(el, value, fallback = "Not provided yet.") {
  if (!el) return;
  el.textContent = value || fallback;
}

function renderList(el, items = []) {
  if (!el) return;

  if (!Array.isArray(items) || items.length === 0) {
    el.innerHTML = `<li>Not provided yet.</li>`;
    return;
  }

  el.innerHTML = items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function renderModules(el, modules = []) {
  if (!el) return;

  if (!Array.isArray(modules) || modules.length === 0) {
    el.innerHTML = `
      <article class="module-card">
        <div class="module-number">—</div>
        <h3>Modules coming soon</h3>
        <p>This course does not have module data loaded yet.</p>
      </article>
    `;
    return;
  }

  el.innerHTML = modules
    .map((module) => {
      const number = module.n ?? module.number ?? "";
      const title = module.title || `Module ${number}`;
      const prompt = module.prompt || "";

      return `
        <article class="module-card">
          <div class="module-number">${escapeHtml(String(number || "•"))}</div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(prompt)}</p>
        </article>
      `;
    })
    .join("");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCourse(course) {
  document.title = `${course.title} | Momentum Course`;

  setText(els.title, course.title);
  setText(els.tagline, course.tagline);
  setText(els.credit, course.credit);
  setText(els.courseId, course.id);
  setText(els.description, course.description);
  setText(els.overview, course.syllabus?.overview);

  renderList(els.learningOutcomes, course.syllabus?.outcomes);
  renderList(els.weeklyExpectations, course.syllabus?.weekly);
  renderList(els.creditRequirements, course.requirements?.credit);
  renderList(els.qualifyingMinutes, course.requirements?.qualifyingMinutes);
  renderList(els.athleteExpectations, course.requirements?.expectations);
  renderList(els.requiredMaterials, course.syllabus?.materials);
  renderModules(els.modules, course.modules);

  setText(els.gradingLab, course.grading?.lab);
  setText(els.gradingReflection, course.grading?.reflection);
  setText(els.gradingFinal, course.grading?.final);
  setText(els.exitExamTitle, course.exitExam?.title || "Exit Exam");
  setText(els.exitExamPrompt, course.exitExam?.prompt);

  if (els.startButton) {
    els.startButton.dataset.courseId = course.id;
    els.startButton.addEventListener("click", () => {
      alert(`Course unlocked: ${course.title}\n\nNext step: connect this button to your lesson/module view.`);
    });
  }
}

function renderNotFound(requestedId) {
  document.title = "Course Not Found | Momentum Course";

  setText(els.title, "Course Not Found");
  setText(
    els.tagline,
    "We could not find the course tied to this enrollment."
  );
  setText(els.credit, "—");
  setText(els.courseId, requestedId || "missing-course-id");
  setText(
    els.description,
    "This usually means the course ID in the URL does not match your courses-data.js file."
  );
  setText(
    els.overview,
    "Check that the selected course ID matches the course object id exactly."
  );

  renderList(els.learningOutcomes, [
    "Confirm the URL contains ?course=your-course-id",
    "Confirm that id exists in courses-data.js",
    "Confirm the file import path for courses-data.js is correct"
  ]);

  renderList(els.weeklyExpectations, [
    "Fix the course ID mismatch",
    "Reload the page",
    "Test enrollment flow again"
  ]);

  renderList(els.creditRequirements, ["No course loaded"]);
  renderList(els.qualifyingMinutes, ["No course loaded"]);
  renderList(els.athleteExpectations, ["No course loaded"]);
  renderList(els.requiredMaterials, ["No course loaded"]);
  renderModules(els.modules, []);

  setText(els.gradingLab, "Not available");
  setText(els.gradingReflection, "Not available");
  setText(els.gradingFinal, "Not available");
  setText(els.exitExamTitle, "Exit Exam");
  setText(
    els.exitExamPrompt,
    "Once the correct course ID is passed into the page, the real course content will load here."
  );

  if (els.startButton) {
    els.startButton.disabled = true;
    els.startButton.textContent = "Course Unavailable";
    els.startButton.style.opacity = "0.6";
    els.startButton.style.cursor = "not-allowed";
  }
}

function initCoursePage() {
  const urlCourseId = getCourseIdFromUrl();
  const storedCourseId = getStoredCourseId();
  const resolvedCourseId = urlCourseId || storedCourseId;

  const course = findCourse(resolvedCourseId);

  if (!course) {
    console.warn("No matching course found for:", resolvedCourseId);
    renderNotFound(resolvedCourseId);
    return;
  }

  renderCourse(course);
}

document.addEventListener("DOMContentLoaded", initCoursePage);
