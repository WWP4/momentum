import { COURSES } from "./full-courses-data-.js";

const moduleTitle = document.getElementById("moduleTitle");
const moduleCourseName = document.getElementById("moduleCourseName");
const modulePrompt = document.getElementById("modulePrompt");
const moduleGuidance = document.getElementById("moduleGuidance");
const moduleObjectives = document.getElementById("moduleObjectives");
const moduleEvidence = document.getElementById("moduleEvidence");
const moduleResponse = document.getElementById("moduleResponse");
const saveModuleBtn = document.getElementById("saveModuleBtn");
const nextModuleBtn = document.getElementById("nextModuleBtn");
const moduleNumber = document.getElementById("moduleNumber");
const backToCourseLink = document.getElementById("backToCourseLink");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("course") || COURSES[0]?.id;
let moduleIndex = Number(params.get("module") || 0);

const course = COURSES.find((item) => item.id === courseId) || COURSES[0];

if (!course || !Array.isArray(course.modules) || course.modules.length === 0) {
  console.error("No valid course/modules found.");
  alert("Course data could not be loaded.");
  throw new Error("Missing course data.");
}

if (Number.isNaN(moduleIndex) || moduleIndex < 0) {
  moduleIndex = 0;
}

if (moduleIndex >= course.modules.length) {
  moduleIndex = course.modules.length - 1;
}

function getStorageKey() {
  return `momentum-module-responses-${course.id}`;
}

function loadResponses() {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey())) || {};
  } catch (error) {
    console.error("Failed to load saved responses:", error);
    return {};
  }
}

function saveResponses(responses) {
  localStorage.setItem(getStorageKey(), JSON.stringify(responses));
}

function setListItems(element, items, fallback = []) {
  const values = Array.isArray(items) && items.length ? items : fallback;
  element.innerHTML = "";

  values.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function buildGuidance(module) {
  const guidance = [];

  if (module.questions && module.questions.length) {
    guidance.push("Answer the prompt thoughtfully and specifically.");
    guidance.push("Use complete sentences and real examples from training.");
    guidance.push("Address the full question, not just part of it.");
  }

  if (guidance.length === 0) {
    guidance.push("Be specific about your training experience.");
    guidance.push("Explain what you learned and why it mattered.");
    guidance.push("Use clear, complete sentences.");
  }

  return guidance;
}

function buildObjectives(module) {
  const objectives = [];

  if (module.objective) {
    objectives.push(module.objective);
  } else {
    objectives.push("Demonstrate reflection and academic understanding through training analysis.");
  }

  return objectives;
}

function buildEvidence() {
  return [
    "Training logs",
    "Coach notes or verification",
    "Workout records",
    "Performance data"
  ];
}

function renderModule() {
  const currentModule = course.modules[moduleIndex];
  const savedResponses = loadResponses();
  const savedText = savedResponses[moduleIndex] || "";

  moduleTitle.textContent = `Module ${moduleIndex + 1}: ${currentModule.title || "Untitled Module"}`;
  moduleCourseName.textContent = course.title || "Course";
  moduleNumber.textContent = `${moduleIndex + 1} of ${course.modules.length}`;

  const promptText =
    currentModule.questions?.[0] ||
    currentModule.prompt ||
    currentModule.objective ||
    "Complete the written response for this module.";

  modulePrompt.textContent = promptText;

  setListItems(moduleGuidance, currentModule.guidance, buildGuidance(currentModule));
  setListItems(moduleObjectives, currentModule.objectives, buildObjectives(currentModule));
  setListItems(moduleEvidence, currentModule.evidence, buildEvidence());

  moduleResponse.value = savedText;

  nextModuleBtn.textContent =
    moduleIndex === course.modules.length - 1 ? "Finish Course" : "Next Module";

  backToCourseLink.href = `./course.html?course=${encodeURIComponent(course.id)}`;
}

function saveCurrentResponse(showMessage = true) {
  const responses = loadResponses();
  responses[moduleIndex] = moduleResponse.value.trim();
  saveResponses(responses);

  if (showMessage) {
    alert("Progress saved.");
  }
}

function goToModule(index) {
  const url = new URL(window.location.href);
  url.searchParams.set("course", course.id);
  url.searchParams.set("module", String(index));
  window.location.href = url.toString();
}

saveModuleBtn.addEventListener("click", () => {
  saveCurrentResponse(true);
});

nextModuleBtn.addEventListener("click", () => {
  const response = moduleResponse.value.trim();

  if (!response) {
    alert("Please write a response before continuing.");
    return;
  }

  saveCurrentResponse(false);

  if (moduleIndex < course.modules.length - 1) {
    goToModule(moduleIndex + 1);
  } else {
    alert("You completed this course module sequence.");
    window.location.href = `./course.html?course=${encodeURIComponent(course.id)}`;
  }
});

renderModule();
