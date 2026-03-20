import { COURSES } from "./courses-data.js";

const $ = (id) => document.getElementById(id);

const els = {
  title: $("courseTitle"),
  tagline: $("courseTagline"),
  credit: $("courseCredit"),
  courseId: $("courseId"),
  moduleCount: $("courseModuleCount"),
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
  startButton: $("startCourseBtn") || document.querySelector(".primary-btn")
};

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
  } catch (error) {
    console.warn("Could not parse selectedCourse from sessionStorage.", error);
  }

  try {
    const directId = sessionStorage.getItem("selectedCourseId");
    if (directId) return directId.trim();
  } catch (error) {
    console.warn("Could not read selectedCourseId from sessionStorage.", error);
  }

  return "";
}

function findCourse(courseId) {
  if (!courseId || !Array.isArray(COURSES)) return null;

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

function renderList(el, items = [], emptyText = "Not provided yet.") {
  if (!el) return;

  if (!Array.isArray(items) || items.length === 0) {
    el.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
    return;
  }

  el.innerHTML = items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function getModuleTitle(module, index) {
  if (module?.title) return module.title;
  return `Module ${index + 1}`;
}

function getModulePrompt(module) {
  return (
    module?.prompt ||
    module?.description ||
    module?.summary ||
    "Module prompt coming soon."
  );
}

function getModuleNumber(module, index) {
  return module?.n || module?.number || index + 1;
}

function goToModule(courseId, moduleNumber = 1) {
  window.location.href = `./module.html?course=${encodeURIComponent(courseId)}&module=${encodeURIComponent(moduleNumber)}`;
}

function renderModules(el, course) {
  if (!el) return;

  const modules = Array.isArray(course?.modules) ? course.modules : [];

  if (modules.length === 0) {
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
    .map((module, index) => {
      const number = getModuleNumber(module, index);
      const title = getModuleTitle(module, index);
      const prompt = getModulePrompt(module);

      return `
        <article class="module-card" data-module="${escapeHtml(String(number))}" tabindex="0" role="button" aria-label="Open ${escapeHtml(title)}">
          <div class="module-number">${escapeHtml(String(number))}</div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(prompt)}</p>
        </article>
      `;
    })
    .join("");

  const cards = el.querySelectorAll(".module-card[data-module]");

  cards.forEach((card) => {
    const moduleNumber = card.dataset.module;

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      goToModule(course.id, moduleNumber);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToModule(course.id, moduleNumber);
      }
    });
  });
}

function renderCourse(course) {
  document.title = `${course.title} | Momentum Course`;

  setText(els.title, course.title);
  setText(els.tagline, course.tagline || course.description);
  setText(els.credit, course.credit || "1.0");
  setText(els.courseId, course.id);

  if (els.moduleCount) {
    const count = Array.isArray(course.modules) ? course.modules.length : 0;
    setText(els.moduleCount, `${count} Modules`, "0 Modules");
  }

  setText(els.description, course.description);
  setText(els.overview, course.syllabus?.overview);

  renderList(els.learningOutcomes, course.syllabus?.outcomes);
  renderList(els.weeklyExpectations, course.syllabus?.weekly);
  renderList(els.creditRequirements, course.requirements?.credit);
  renderList(els.qualifyingMinutes, course.requirements?.qualifyingMinutes);
  renderList(els.athleteExpectations, course.requirements?.expectations);
  renderList(els.requiredMaterials, course.syllabus?.materials);

  renderModules(els.modules, course);

  setText(els.gradingLab, course.grading?.lab);
  setText(els.gradingReflection, course.grading?.reflection);
  setText(els.gradingFinal, course.grading?.final);
  setText(els.exitExamTitle, course.exitExam?.title || "Exit Exam");
  setText(els.exitExamPrompt, course.exitExam?.prompt);

  if (els.startButton) {
    els.startButton.disabled = false;
    els.startButton.textContent = "Start Course";
    els.startButton.dataset.courseId = course.id;
    els.startButton.onclick = () => goToModule(course.id, 1);
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

  if (els.moduleCount) {
    setText(els.moduleCount, "0 Modules");
  }

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
    "Test the enrollment flow again"
  ]);

  renderList(els.creditRequirements, ["No course loaded"]);
  renderList(els.qualifyingMinutes, ["No course loaded"]);
  renderList(els.athleteExpectations, ["No course loaded"]);
  renderList(els.requiredMaterials, ["No course loaded"]);

  if (els.modules) {
    els.modules.innerHTML = `
      <article class="module-card">
        <div class="module-number">—</div>
        <h3>Course unavailable</h3>
        <p>No modules can load until a valid course ID is passed into the URL.</p>
      </article>
    `;
  }

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

  try {
    sessionStorage.setItem("selectedCourseId", course.id);
    sessionStorage.setItem(
      "selectedCourse",
      JSON.stringify({
        id: course.id,
        title: course.title
      })
    );
  } catch (error) {
    console.warn("Could not save selected course to sessionStorage.", error);
  }

  renderCourse(course);
}

document.addEventListener("DOMContentLoaded", initCoursePage);
