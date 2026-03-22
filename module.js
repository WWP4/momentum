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

// Treat URL module as 1-based for cleaner routing
let moduleIndex = Number(params.get("module") || 1) - 1;

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

function getResponseStorageKey() {
  return `momentum-module-responses-${course.id}`;
}

function getCompletionStorageKey() {
  return "momentum-course-completions";
}

function loadResponses() {
  try {
    return JSON.parse(localStorage.getItem(getResponseStorageKey())) || {};
  } catch (error) {
    console.error("Failed to load saved responses:", error);
    return {};
  }
}

function saveResponses(responses) {
  localStorage.setItem(getResponseStorageKey(), JSON.stringify(responses));
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
  url.searchParams.set("module", String(index + 1));
  window.location.href = url.toString();
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function generateTranscriptId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `MMT-${year}-${random}`;
}

function getStudentRecord() {
  // Replace this later with real enrollment/student data
  let studentName = "Momentum Student";
  let studentId = `STU-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    const saved = JSON.parse(localStorage.getItem("momentum-student-profile")) || {};
    if (saved.studentName) studentName = saved.studentName;
    if (saved.studentId) studentId = saved.studentId;
  } catch (error) {
    console.warn("Could not read student profile.", error);
  }

  return { studentName, studentId };
}

function markCourseComplete() {
  const { studentName, studentId } = getStudentRecord();
  const transcriptId = generateTranscriptId();
  const completionDate = new Date().toISOString();

  let completions = [];
  try {
    completions = JSON.parse(localStorage.getItem(getCompletionStorageKey())) || [];
  } catch (error) {
    console.warn("Could not load completions.", error);
    completions = [];
  }

  const completionRecord = {
    courseId: course.id,
    courseTitle: course.title,
    studentName,
    studentId,
    credit: course.credit || "1.0",
    completionDate,
    transcriptId,
    totalModules: course.modules.length,
    completedModules: course.modules.map((module, idx) => module.n || idx + 1),
    finalStatus: "Completed",
    issuingProgram: "Momentum Academic Course Platform",
    instructionalFormat: "Training-Based Academic Coursework",
    exitRequirement: course.exitExam?.title || "Final Written Summary"
  };

  const existingIndex = completions.findIndex(
    (item) => item.courseId === course.id && item.studentId === studentId
  );

  if (existingIndex >= 0) {
    completions[existingIndex] = completionRecord;
  } else {
    completions.push(completionRecord);
  }

  localStorage.setItem(getCompletionStorageKey(), JSON.stringify(completions));
  return completionRecord;
}

function generateTranscriptPDF(course, record) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library not loaded. Add the jsPDF CDN script to module.html.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const left = 54;
  const right = pageWidth - 54;
  let y = 54;

  const line = (yPos) => {
    doc.setDrawColor(210, 210, 210);
    doc.line(left, yPos, right, yPos);
  };

  const textBlock = (label, value, x, yPos, width = 220) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text(label, x, yPos);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);

    const lines = doc.splitTextToSize(String(value || ""), width);
    doc.text(lines, x, yPos + 14);
    return yPos + 14 + lines.length * 13;
  };

  // Header
  doc.setTextColor(180, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("MOMENTUM", left, y);

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Academic Course Platform", left + 88, y);

  y += 26;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text("Official Course Completion Transcript", left, y);

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text("Issued upon successful completion of all required coursework.", left, y);

  y += 18;
  line(y);
  y += 28;

  // Student / transcript info
  const leftColX = left;
  const rightColX = 315;

  let leftY = y;
  let rightY = y;

  leftY = textBlock("Student Name", record.studentName, leftColX, leftY, 220);
  leftY = textBlock("Student ID", record.studentId, leftColX, leftY + 10, 220);
  leftY = textBlock("Transcript ID", record.transcriptId, leftColX, leftY + 10, 220);

  rightY = textBlock("Issue Date", formatDate(record.completionDate), rightColX, rightY, 220);
  rightY = textBlock("Final Status", record.finalStatus, rightColX, rightY + 10, 220);
  rightY = textBlock("Credits Earned", record.credit, rightColX, rightY + 10, 220);

  y = Math.max(leftY, rightY) + 20;
  line(y);
  y += 28;

  // Course info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text("Course Record", left, y);

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const courseInfo = [
    ["Course Title", course.title],
    ["Course ID", course.id],
    ["Instructional Format", "Training-Based Academic Coursework"],
    ["Total Modules", String(course.modules.length)],
    ["Exit Requirement", course.exitExam?.title || "Final Written Summary"]
  ];

  courseInfo.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, left, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(String(value), 360);
    doc.text(lines, left + 125, y);
    y += Math.max(18, lines.length * 13 + 4);
  });

  y += 8;
  line(y);
  y += 26;

  // Module completion section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Completed Modules", left, y);

  y += 20;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("#", left, y);
  doc.text("Module Title", left + 30, y);
  doc.text("Status", right - 80, y);

  y += 8;
  line(y);
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  course.modules.forEach((module, index) => {
    if (y > 700) {
      doc.addPage();
      y = 54;
    }

    const number = String(module.n || index + 1);
    const title = module.title || `Module ${index + 1}`;

    doc.text(number, left, y);

    const wrappedTitle = doc.splitTextToSize(title, 360);
    doc.text(wrappedTitle, left + 30, y);

    doc.text("Completed", right - 80, y);

    y += Math.max(18, wrappedTitle.length * 12 + 6);
  });

  y += 18;
  line(y);
  y += 24;

  // Footer
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Certification", left, y);

  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const certText =
    "This transcript certifies that the student successfully completed the listed Momentum course requirements. Credit recognition and final acceptance are determined by the issuing or enrolling institution according to its academic policies.";

  const certLines = doc.splitTextToSize(certText, 500);
  doc.text(certLines, left, y);

  y += certLines.length * 12 + 24;

  doc.setFont("helvetica", "normal");
  doc.text("Authorized by: Momentum Academic Course Platform", left, y);
  y += 14;
  doc.text(`Verification ID: ${record.transcriptId}`, left, y);

  const safeFileName = `${record.studentName}-${course.id}-transcript`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  doc.save(`${safeFileName}.pdf`);
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
    return;
  }

  const completionRecord = markCourseComplete();
  generateTranscriptPDF(course, completionRecord);

  alert("Course completed. Your transcript has been downloaded.");
  window.location.href = `./course.html?course=${encodeURIComponent(course.id)}`;
});

renderModule();
