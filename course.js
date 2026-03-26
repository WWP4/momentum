import { COURSES } from "./full-courses-data-.js";

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
  moduleProgressText: $("moduleProgressText"),
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

async function verifyCourseAccess(courseId) {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  if (!courseId || !sessionId) {
    return {
      ok: false,
      error: "Missing course or session."
    };
  }

  try {
    const res = await fetch(
      `/.netlify/functions/verify-course-access?session_id=${encodeURIComponent(sessionId)}&course=${encodeURIComponent(courseId)}`
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error: data.error || "Access could not be verified."
      };
    }

    return {
      ok: true,
      data
    };
  } catch (error) {
    console.error("Course access verification failed:", error);
    return {
      ok: false,
      error: "Could not verify access right now."
    };
  }
}

function renderAccessDenied(message = "Access denied. Please complete enrollment first.") {
  document.title = "Access Denied | Momentum Course";

  setText(els.title, "Access Denied");
  setText(els.tagline, "This course page requires verified enrollment.");
  setText(els.credit, "—");
  setText(els.courseId, "verification-required");

  if (els.moduleCount) {
    setText(els.moduleCount, "0 Modules");
  }

  setText(els.description, message);
  setText(
    els.overview,
    "Your payment session could not be verified for this course. Please return to enrollment and try again."
  );

  renderList(els.learningOutcomes, ["Verified enrollment required"]);
  renderList(els.weeklyExpectations, ["Complete checkout first", "Return through the Stripe success redirect"]);
  renderList(els.creditRequirements, ["Enrollment verification required"]);
  renderList(els.qualifyingMinutes, ["Enrollment verification required"]);
  renderList(els.athleteExpectations, ["Enrollment verification required"]);
  renderList(els.requiredMaterials, ["Enrollment verification required"]);

  if (els.modules) {
    els.modules.innerHTML = `
      <div class="module-row">
        <div class="module-row-number">—</div>
        <div class="module-row-content">
          <div class="module-row-top">
            <div class="module-row-title">Locked</div>
            <span class="module-status module-status-locked">Access Denied</span>
          </div>
          <div class="module-row-text">${escapeHtml(message)}</div>
        </div>
        <div class="module-row-action"></div>
      </div>
    `;
  }

  if (els.moduleProgressText) {
    els.moduleProgressText.textContent = "0 of 0 completed";
  }

  setText(els.gradingLab, "Not available");
  setText(els.gradingReflection, "Not available");
  setText(els.gradingFinal, "Not available");
  setText(els.exitExamTitle, "Enrollment Required");
  setText(els.exitExamPrompt, "This course unlocks only after verified payment.");

  if (els.startButton) {
    els.startButton.disabled = true;
    els.startButton.textContent = "Locked";
  }
}

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
  return module?.title || `Module ${index + 1}`;
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
  return Number(module?.n || module?.number || index + 1);
}

function goToModule(courseId, moduleNumber = 1) {
  window.location.href = `./module.html?course=${encodeURIComponent(courseId)}&module=${encodeURIComponent(moduleNumber)}`;
}

function getResponsesStorageKey(courseId) {
  return `momentum-module-responses-${courseId}`;
}

function loadResponses(courseId) {
  try {
    const raw = localStorage.getItem(getResponsesStorageKey(courseId));
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Could not load saved module responses.", error);
    return {};
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

function isProfileForCurrentCourse(profile, course) {
  if (!profile || !course) return false;
  return String(profile.courseId || "").trim() === String(course.id || "").trim();
}

function getCompletedModuleNumbers(course) {
  const responses = loadResponses(course.id);
  const modules = Array.isArray(course?.modules) ? course.modules : [];

  return modules
    .map((module, index) => {
      const moduleNumber = getModuleNumber(module, index);
      const byNumber = responses[String(moduleNumber)];
      const byIndex = responses[String(index)];
      const savedValue = typeof byNumber === "string" && byNumber.trim()
        ? byNumber
        : typeof byIndex === "string" && byIndex.trim()
          ? byIndex
          : "";

      return savedValue ? moduleNumber : null;
    })
    .filter(Boolean);
}

function getNextAvailableModuleNumber(course) {
  const modules = Array.isArray(course?.modules) ? course.modules : [];
  const completed = new Set(getCompletedModuleNumbers(course));

  for (let i = 0; i < modules.length; i += 1) {
    const moduleNumber = getModuleNumber(modules[i], i);
    if (!completed.has(moduleNumber)) {
      return moduleNumber;
    }
  }

  return modules.length ? getModuleNumber(modules[modules.length - 1], modules.length - 1) : 1;
}

function getModuleState(course, module, index) {
  const profile = getStoredStudentProfile();
  const hasStartedThisCourse = isProfileForCurrentCourse(profile, course);
  const moduleNumber = getModuleNumber(module, index);
  const completedModules = new Set(getCompletedModuleNumbers(course));
  const completed = completedModules.has(moduleNumber);

  if (completed) {
    return {
      state: "completed",
      label: "Completed",
      buttonText: "Review",
      locked: false
    };
  }

  if (!hasStartedThisCourse) {
    return {
      state: "locked",
      label: "Locked",
      buttonText: "Locked",
      locked: true
    };
  }

  const nextAvailable = getNextAvailableModuleNumber(course);

  if (moduleNumber === nextAvailable) {
    return {
      state: "open",
      label: completedModules.size === 0 ? "Start Here" : "Available",
      buttonText: completedModules.size === 0 ? "Start" : "Open",
      locked: false
    };
  }

  return {
    state: "locked",
    label: "Locked",
    buttonText: "Locked",
    locked: true
  };
}

function renderModules(el, course) {
  if (!el) return;

  const modules = Array.isArray(course?.modules) ? course.modules : [];
  const completedCount = getCompletedModuleNumbers(course).length;

  if (els.moduleProgressText) {
    els.moduleProgressText.textContent = `${completedCount} of ${modules.length} completed`;
  }

  if (modules.length === 0) {
    el.innerHTML = `
      <div class="module-row">
        <div class="module-row-number">—</div>
        <div class="module-row-content">
          <div class="module-row-top">
            <div class="module-row-title">Modules coming soon</div>
            <span class="module-status module-status-locked">Unavailable</span>
          </div>
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
      const moduleState = getModuleState(course, module, index);

      return `
        <div class="module-row module-row-${escapeHtml(moduleState.state)}" data-module="${escapeHtml(String(number))}">
          <div class="module-row-number">${escapeHtml(String(number))}</div>

          <div class="module-row-content">
            <div class="module-row-top">
              <div class="module-row-title">${escapeHtml(title)}</div>
              <span class="module-status module-status-${escapeHtml(moduleState.state)}">
                ${escapeHtml(moduleState.label)}
              </span>
            </div>

            <div class="module-row-text">${escapeHtml(prompt)}</div>
          </div>

          <div class="module-row-action">
            <button
              type="button"
              class="module-btn module-btn-${escapeHtml(moduleState.state)}"
              data-module="${escapeHtml(String(number))}"
              ${moduleState.locked ? "disabled" : ""}
            >
              ${escapeHtml(moduleState.buttonText)}
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  const buttons = el.querySelectorAll(".module-btn");

  buttons.forEach((button) => {
    const moduleNumber = button.dataset.module;
    const isDisabled = button.hasAttribute("disabled");

    button.addEventListener("click", () => {
      if (isDisabled) return;
      goToModule(course.id, moduleNumber);
    });
  });
}

function updateStartButton(course) {
  if (!els.startButton) return;

  const profile = getStoredStudentProfile();
  const hasStartedThisCourse = isProfileForCurrentCourse(profile, course);
  const modules = Array.isArray(course?.modules) ? course.modules : [];
  const completedCount = getCompletedModuleNumbers(course).length;
  const nextAvailable = getNextAvailableModuleNumber(course);

  els.startButton.disabled = modules.length === 0;
  els.startButton.dataset.courseId = course.id;

  if (!hasStartedThisCourse) {
    els.startButton.textContent = "Begin Course";
    els.startButton.onclick = () => openStudentIntakeModal();
    return;
  }

  if (completedCount >= modules.length && modules.length > 0) {
    els.startButton.textContent = "Review Final Module";
    els.startButton.onclick = () => goToModule(course.id, nextAvailable);
    return;
  }

  els.startButton.textContent = completedCount > 0 ? "Continue Course" : "Start Course";
  els.startButton.onclick = () => goToModule(course.id, nextAvailable);
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

  updateStartButton(course);
}

function renderNotFound(requestedId) {
  document.title = "Course Not Found | Momentum Course";

  setText(els.title, "Course Not Found");
  setText(els.tagline, "We could not find the course tied to this enrollment.");
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
    "Confirm that id exists in full-courses-data-.js",
    "Confirm the file import path for full-courses-data-.js is correct"
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
          <div class="module-row-top">
            <div class="module-row-title">Course unavailable</div>
            <span class="module-status module-status-locked">Unavailable</span>
          </div>
          <div class="module-row-text">No modules can load until a valid course ID is passed into the URL.</div>
        </div>
        <div class="module-row-action"></div>
      </div>
    `;
  }

  if (els.moduleProgressText) {
    els.moduleProgressText.textContent = "0 of 0 completed";
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
    localStorage.setItem("momentum-student-profile", JSON.stringify(studentProfile));
  } catch (error) {
    console.warn("Could not save student profile.", error);
    showIntakeError("Could not save student information. Please try again.");
    return;
  }

  closeStudentIntakeModal();
  renderCourse(activeCourse);
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

async function initCoursePage() {
  const urlCourseId = getCourseIdFromUrl();
  const storedCourseId = getStoredCourseId();
  const resolvedCourseId = urlCourseId || storedCourseId;

  if (!resolvedCourseId) {
    renderAccessDenied("No course was provided.");
    return;
  }

  const verification = await verifyCourseAccess(resolvedCourseId);

  if (!verification.ok) {
    renderAccessDenied(verification.error || "Enrollment could not be verified.");
    return;
  }

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
document.addEventListener("DOMContentLoaded", async () => {
  initModalEvents();
  await initCoursePage();
});
