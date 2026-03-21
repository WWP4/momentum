import { COURSES } from "./courses-data.js";

const $ = (id) => document.getElementById(id);

const els = {
  title: $("moduleTitle"),
  courseName: $("moduleCourseName"),
  moduleNumber: $("moduleNumber"),
  prompt: $("modulePrompt"),
  response: $("moduleResponse"),
  objectives: $("moduleObjectives"),
  guidance: $("moduleGuidance"),
  evidence: $("moduleEvidence"),
  saveButton: $("saveModuleBtn"),
  nextButton: $("nextModuleBtn"),
  backToCourseLink: $("backToCourseLink")
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

function getParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    courseId: (params.get("course") || params.get("id") || params.get("courseId") || "").trim(),
    moduleParam: (params.get("module") || "1").trim()
  };
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

function getModuleIndex(moduleParam) {
  const parsed = parseInt(moduleParam, 10);
  if (Number.isNaN(parsed) || parsed < 1) return 0;
  return parsed - 1;
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

  el.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function getModuleTitle(module, index) {
  return module?.title || `Module ${index + 1}`;
}

function getModulePrompt(module) {
  return (
    module?.prompt ||
    module?.description ||
    module?.summary ||
    "Module prompt coming soon."
  );
}

function getModuleObjectives(module) {
  return (
    module?.objectives ||
    [
      "Connect training activity to academic reflection",
      "Demonstrate analysis of effort, discipline, and performance",
      "Document measurable learning from athletic training"
    ]
  );
}

function getModuleGuidance(module) {
  return (
    module?.guidance ||
    [
      "Be specific about the training session or time period",
      "Explain what you worked on and why it mattered",
      "Describe challenges, adjustments, and takeaways"
    ]
  );
}

function getModuleEvidence(module) {
  return (
    module?.evidence ||
    [
      "Training logs",
      "Coach notes or verification",
      "Workout records",
      "Performance data"
    ]
  );
}

function getStorageKey(courseId, moduleNumber) {
  return `momentum:${courseId}:module:${moduleNumber}:response`;
}

function saveResponse(courseId, moduleNumber) {
  if (!els.response) return;

  try {
    localStorage.setItem(
      getStorageKey(courseId, moduleNumber),
      els.response.value || ""
    );
  } catch (error) {
    console.warn("Could not save response.", error);
  }
}

function loadResponse(courseId, moduleNumber) {
  if (!els.response) return;

  try {
    els.response.value =
      localStorage.getItem(getStorageKey(courseId, moduleNumber)) || "";
  } catch (error) {
    console.warn("Could not load response.", error);
    els.response.value = "";
  }
}

function goToModule(courseId, moduleNumber) {
  window.location.href = `./module.html?course=${encodeURIComponent(courseId)}&module=${encodeURIComponent(moduleNumber)}`;
}

function goToCourse(courseId) {
  window.location.href = `./course.html?course=${encodeURIComponent(courseId)}`;
}

function renderNotFound(message) {
  document.title = "Module Not Found | Momentum";

  setText(els.title, "Module Not Found");
  setText(els.courseName, "Unavailable");
  setText(els.moduleNumber, "—");
  setText(
    els.prompt,
    message || "This module could not be loaded."
  );

  renderList(els.guidance, [
    "Check the course ID in the URL",
    "Check the module number in the URL",
    "Confirm the module exists in courses-data.js"
  ]);

  renderList(els.objectives, ["Module unavailable"]);
  renderList(els.evidence, ["Module unavailable"]);

  if (els.response) {
    els.response.value = "";
    els.response.disabled = true;
    els.response.placeholder = "Module unavailable.";
  }

  if (els.saveButton) {
    els.saveButton.disabled = true;
  }

  if (els.nextButton) {
    els.nextButton.disabled = true;
    els.nextButton.textContent = "Unavailable";
  }
}

function renderModule(course, module, moduleIndex) {
  const moduleNumber = moduleIndex + 1;
  const totalModules = Array.isArray(course.modules) ? course.modules.length : 0;

  document.title = `${getModuleTitle(module, moduleIndex)} | ${course.title}`;

  setText(els.title, getModuleTitle(module, moduleIndex));
  setText(els.courseName, course.title);
  setText(els.moduleNumber, `${moduleNumber} of ${totalModules}`);
  setText(els.prompt, getModulePrompt(module));

  renderList(els.guidance, getModuleGuidance(module));
  renderList(els.objectives, getModuleObjectives(module));
  renderList(els.evidence, getModuleEvidence(module));

  if (els.backToCourseLink) {
    els.backToCourseLink.href = `./course.html?course=${encodeURIComponent(course.id)}`;
  }

  if (els.response) {
    els.response.disabled = false;
    els.response.placeholder = "Write your response here...";
    loadResponse(course.id, moduleNumber);
  }

  if (els.saveButton) {
    els.saveButton.disabled = false;
    els.saveButton.onclick = () => {
      saveResponse(course.id, moduleNumber);
      els.saveButton.textContent = "Saved";
      setTimeout(() => {
        els.saveButton.textContent = "Save Progress";
      }, 1000);
    };
  }

  if (els.nextButton) {
    els.nextButton.disabled = false;

    if (moduleNumber < totalModules) {
      els.nextButton.textContent = "Next Module";
      els.nextButton.onclick = () => {
        saveResponse(course.id, moduleNumber);
        goToModule(course.id, moduleNumber + 1);
      };
    } else {
      els.nextButton.textContent = "Return to Course";
      els.nextButton.onclick = () => {
        saveResponse(course.id, moduleNumber);
        goToCourse(course.id);
      };
    }
  }
}

function initModulePage() {
  const { courseId, moduleParam } = getParams();
  const course = findCourse(courseId);

  if (!course) {
    renderNotFound("The requested course could not be found.");
    return;
  }

  const modules = Array.isArray(course.modules) ? course.modules : [];
  const moduleIndex = getModuleIndex(moduleParam);
  const module = modules[moduleIndex];

  if (!module) {
    renderNotFound("The requested module does not exist for this course.");
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
    console.warn("Could not store selected course.", error);
  }

  renderModule(course, module, moduleIndex);
}

document.addEventListener("DOMContentLoaded", initModulePage);
