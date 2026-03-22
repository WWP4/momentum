import { COURSES } from "./ full-courses-data-.js";

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
  startButton: $("startCourseBtn"),

  modal: $("studentIntakeModal"),
  modalBackdrop: $("studentIntakeBackdrop"),
  closeModalBtn: $("closeStudentIntakeBtn"),
  cancelModalBtn: $("cancelStudentIntakeBtn"),
  intakeForm: $("studentIntakeForm"),
  studentNameInput: $("studentNameInput"),
  studentEmailInput: $("studentEmailInput"),
  studentIdInput: $("studentIdInput"),
  intakeError: $("studentIntakeError")
};

let activeCourse = null;

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
    module?.questions?.[0] ||
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
      <div class="module-row">
        <div class="module-row-number">—</div>
        <div class="module-row-content">
          <div class="module-row-title">Modules coming soon</div>
          <div class="module-row-text">This course does not have module data loaded yet.</div>
        </div>
        <div class="module-row-action"></div>
      </div>
    `;
    return;
  }

  el.innerHTML = modules
    .map((module, index) => {
      const number = getModuleNumber(module, index);
      const title = getModuleTitle(module, index);
      const prompt = getModulePrompt(module);

      return `
        <div class="module-row" data-module="${escapeHtml(String(number))}">
          <div class="module-row-number">${escapeHtml(String(number))}</div>
          <div class="module-row-content">
            <div class="module-row-title">${escapeHtml(title)}</div>
            <div class="module-row-text">${escapeHtml(prompt)}</div>
          </div>
          <div class="module-row-action">
            <button type="button" class="open-module-btn" data-module="${escapeHtml(String(number))}">
              Open
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  const buttons = el.querySelectorAll(".open-module-btn");

  buttons.forEach((button) => {
    const moduleNumber = button.dataset.module;

    button.addEventListener("click", () => {
      goToModule(course.id, moduleNumber);
    });
  });
}

function renderCourse(course) {
  activeCourse = course;
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
    els.startButton.textContent = "Begin Course";
    els.startButton.dataset.courseId = course.id;
    els.startButton.onclick = () => openStudentIntakeModal();
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
    "This usually means the course ID in the URL does not match your course data file."
  );
  setText(
    els.overview,
    "Check that the selected course ID matches the course object id exactly."
  );

  renderList(els.learningOutcomes, [
    "Confirm the URL contains ?course=your-course-id",
    "Confirm that id exists in  full-courses-data-.js",
    "Confirm the file import path for  full-courses-data-.js is correct"
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
      <div class="module-row">
        <div class="module-row-number">—</div>
        <div class="module-row-content">
          <div class="module-row-title">Course unavailable</div>
          <div class="module-row-text">No modules can load until a valid course ID is passed into the URL.</div>
        </div>
        <div class="module-row-action"></div>
      </div>
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

function getStoredStudentProfile() {
  try {
    const raw = localStorage.getItem("momentum-student-profile");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return parsed;
  } catch (error) {
    console.warn("Could not parse momentum-student-profile.", error);
    return null;
  }
}

function generateStudentId() {
  return `STU-${Math.floor(100000 + Math.random() * 900000)}`;
}

function showIntakeError(message) {
  if (!els.intakeError) return;
  els.intakeError.hidden = false;
  els.intakeError.textContent = message;
}

function clearIntakeError() {
  if (!els.intakeError) return;
  els.intakeError.hidden = true;
  els.intakeError.textContent = "";
}

function prefillStudentProfile() {
  const profile = getStoredStudentProfile();
  if (!profile) return;

  if (els.studentNameInput && profile.studentName) {
    els.studentNameInput.value = profile.studentName;
  }

  if (els.studentEmailInput && profile.studentEmail) {
    els.studentEmailInput.value = profile.studentEmail;
  }

  if (els.studentIdInput && profile.studentId) {
    els.studentIdInput.value = profile.studentId;
  }
}

function openStudentIntakeModal() {
  if (!activeCourse || !els.modal) return;

  clearIntakeError();
  prefillStudentProfile();

  els.modal.classList.remove("hidden");
  els.modal.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    els.studentNameInput?.focus();
  }, 0);
}

function closeStudentIntakeModal() {
  if (!els.modal) return;

  els.modal.classList.add("hidden");
  els.modal.setAttribute("aria-hidden", "true");
  clearIntakeError();
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function saveStudentProfileAndStartCourse(event) {
  event.preventDefault();

  if (!activeCourse) {
    showIntakeError("No course is currently loaded.");
    return;
  }

  const studentName = els.studentNameInput?.value.trim() || "";
  const studentEmail = els.studentEmailInput?.value.trim() || "";
  let studentId = els.studentIdInput?.value.trim() || "";

  if (!studentName) {
    showIntakeError("Please enter the student's full name.");
    return;
  }

  if (!studentEmail) {
    showIntakeError("Please enter the student's email.");
    return;
  }

  if (!validateEmail(studentEmail)) {
    showIntakeError("Please enter a valid email address.");
    return;
  }

  if (!studentId) {
    studentId = generateStudentId();
  }

  const studentProfile = {
    studentName,
    studentEmail,
    studentId,
    courseId: activeCourse.id,
    courseTitle: activeCourse.title,
    startedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(
      "momentum-student-profile",
      JSON.stringify(studentProfile)
    );
  } catch (error) {
    console.warn("Could not save student profile.", error);
    showIntakeError("Could not save student information. Please try again.");
    return;
  }

  closeStudentIntakeModal();
  goToModule(activeCourse.id, 1);
}

function initModalEvents() {
  els.closeModalBtn?.addEventListener("click", closeStudentIntakeModal);
  els.cancelModalBtn?.addEventListener("click", closeStudentIntakeModal);
  els.modalBackdrop?.addEventListener("click", closeStudentIntakeModal);
  els.intakeForm?.addEventListener("submit", saveStudentProfileAndStartCourse);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.modal && !els.modal.classList.contains("hidden")) {
      closeStudentIntakeModal();
    }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  initModalEvents();
  initCoursePage();
});
