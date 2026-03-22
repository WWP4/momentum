import { COURSES } from "./full-courses-data-.js";

const $ = (id) => document.getElementById(id);

const els = {
  moduleTitle: $("moduleTitle"),
  moduleCourseName: $("moduleCourseName"),
  modulePrompt: $("modulePrompt"),
  moduleGuidance: $("moduleGuidance"),
  moduleObjectives: $("moduleObjectives"),
  moduleEvidence: $("moduleEvidence"),
  moduleResponse: $("moduleResponse"),
  saveModuleBtn: $("saveModuleBtn"),
  nextModuleBtn: $("nextModuleBtn"),
  moduleNumber: $("moduleNumber"),
  backToCourseLink: $("backToCourseLink")
};

const LOGO_PATH = "./assets/assets/momentum-logo.png";

const params = new URLSearchParams(window.location.search);
const requestedCourseId = (params.get("course") || "").trim();
const requestedModuleParam = (params.get("module") || "1").trim();

const course =
  COURSES.find((item) => item.id === requestedCourseId) ||
  COURSES[0] ||
  null;

if (!course || !Array.isArray(course.modules) || course.modules.length === 0) {
  alert("Course data could not be loaded.");
  throw new Error("Missing valid course/module data.");
}

const normalizedModules = course.modules.map((module, index) => ({
  ...module,
  _position: index,
  _number: Number(module?.n) || index + 1,
  _title: module?.title || `Module ${index + 1}`
}));

let moduleIndex = resolveModuleIndex(requestedModuleParam, normalizedModules);

if (moduleIndex < 0) {
  moduleIndex = 0;
}

if (moduleIndex >= normalizedModules.length) {
  moduleIndex = normalizedModules.length - 1;
}

function resolveModuleIndex(moduleParam, modules) {
  const numeric = Number(moduleParam);

  if (!Number.isNaN(numeric)) {
    const byModuleNumber = modules.findIndex((m) => Number(m._number) === numeric);
    if (byModuleNumber >= 0) return byModuleNumber;

    const oneBasedPosition = numeric - 1;
    if (oneBasedPosition >= 0 && oneBasedPosition < modules.length) {
      return oneBasedPosition;
    }
  }

  return 0;
}

function getResponsesStorageKey() {
  return `momentum-module-responses-${course.id}`;
}

function getCompletionStorageKey() {
  return "momentum-course-completions";
}

function loadResponses() {
  try {
    const raw = localStorage.getItem(getResponsesStorageKey());
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Failed to load saved responses:", error);
    return {};
  }
}

function saveResponses(responses) {
  try {
    localStorage.setItem(getResponsesStorageKey(), JSON.stringify(responses));
  } catch (error) {
    console.error("Failed to save responses:", error);
  }
}

function getModuleStorageKey(module) {
  return String(module._number);
}

function getCurrentModule() {
  return normalizedModules[moduleIndex];
}

function setListItems(element, items, fallback = []) {
  if (!element) return;

  const values = Array.isArray(items) && items.length ? items : fallback;
  element.innerHTML = "";

  values.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function buildGuidance(module) {
  if (Array.isArray(module.guidance) && module.guidance.length) {
    return module.guidance;
  }

  if (Array.isArray(module.questions) && module.questions.length) {
    return [
      "Answer the full prompt thoughtfully and specifically.",
      "Use complete sentences and real examples from your training.",
      "Explain what happened, what changed, and what you learned."
    ];
  }

  return [
    "Be specific about your training experience.",
    "Explain what you learned and why it mattered.",
    "Use clear, complete sentences."
  ];
}

function buildObjectives(module) {
  if (Array.isArray(module.objectives) && module.objectives.length) {
    return module.objectives;
  }

  if (module.objective) {
    return [module.objective];
  }

  return [
    "Demonstrate reflection and academic understanding through training analysis."
  ];
}

function buildEvidence(module) {
  if (Array.isArray(module.evidence) && module.evidence.length) {
    return module.evidence;
  }

  return [
    "Training logs",
    "Coach notes or verification",
    "Workout records",
    "Performance data"
  ];
}

function getPromptText(module) {
  return (
    module.questions?.[0] ||
    module.prompt ||
    module.objective ||
    "Complete the written response for this module."
  );
}

function renderModule() {
  const currentModule = getCurrentModule();
  const responses = loadResponses();
  const savedText = responses[getModuleStorageKey(currentModule)] || "";

  if (els.moduleTitle) {
    els.moduleTitle.textContent = `Module ${currentModule._number}: ${currentModule._title}`;
  }

  if (els.moduleCourseName) {
    els.moduleCourseName.textContent = course.title || "Course";
  }

  if (els.moduleNumber) {
    els.moduleNumber.textContent = `${moduleIndex + 1} of ${normalizedModules.length}`;
  }

  if (els.modulePrompt) {
    els.modulePrompt.textContent = getPromptText(currentModule);
  }

  setListItems(els.moduleGuidance, currentModule.guidance, buildGuidance(currentModule));
  setListItems(els.moduleObjectives, currentModule.objectives, buildObjectives(currentModule));
  setListItems(els.moduleEvidence, currentModule.evidence, buildEvidence(currentModule));

  if (els.moduleResponse) {
    els.moduleResponse.value = savedText;
  }

  if (els.nextModuleBtn) {
    els.nextModuleBtn.textContent =
      moduleIndex === normalizedModules.length - 1 ? "Finish Course" : "Next Module";
  }

  if (els.backToCourseLink) {
    els.backToCourseLink.href = `./course.html?course=${encodeURIComponent(course.id)}`;
  }

  document.title = `${currentModule._title} | ${course.title}`;
}

function saveCurrentResponse(showMessage = true) {
  const currentModule = getCurrentModule();
  const responses = loadResponses();

  responses[getModuleStorageKey(currentModule)] = (els.moduleResponse?.value || "").trim();
  saveResponses(responses);

  if (showMessage) {
    alert("Progress saved.");
  }
}

function goToModuleByIndex(index) {
  const targetModule = normalizedModules[index];
  if (!targetModule) return;

  const url = new URL(window.location.href);
  url.searchParams.set("course", course.id);
  url.searchParams.set("module", String(targetModule._number));
  window.location.href = url.toString();
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not recorded";

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

function getStudentProfile() {
  const candidates = [
    "momentum-student-profile",
    "momentumStudentProfile",
    "selectedStudent",
    "studentProfile"
  ];

  for (const key of candidates) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const studentName =
          parsed.studentName ||
          parsed.fullName ||
          parsed.name ||
          "";

        const studentId =
          parsed.studentId ||
          parsed.id ||
          "";

        if (studentName) {
          return {
            studentName: String(studentName).trim(),
            studentId: String(studentId || "").trim()
          };
        }
      }
    } catch (error) {
      console.warn(`Could not parse ${key}:`, error);
    }
  }

  return {
    studentName: "",
    studentId: ""
  };
}

function ensureStudentProfile() {
  const existing = getStudentProfile();

  let studentName = existing.studentName;
  let studentId = existing.studentId;

  if (!studentName) {
    studentName = window.prompt("Enter the student's full name for the transcript:")?.trim() || "";
  }

  if (!studentName) {
    alert("A student name is required to issue the transcript.");
    return null;
  }

  if (!studentId) {
    studentId =
      window.prompt("Enter the student ID (or leave blank to auto-generate):")?.trim() || "";
  }

  if (!studentId) {
    studentId = `STU-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  const profile = { studentName, studentId };

  try {
    localStorage.setItem("momentum-student-profile", JSON.stringify(profile));
  } catch (error) {
    console.warn("Could not save student profile:", error);
  }

  return profile;
}

function getCompletedModuleNumbers() {
  return normalizedModules.map((module) => module._number);
}

function markCourseComplete(studentProfile) {
  let completions = [];

  try {
    const raw = localStorage.getItem(getCompletionStorageKey());
    completions = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(completions)) completions = [];
  } catch (error) {
    console.warn("Could not load course completions:", error);
    completions = [];
  }

  const existingIndex = completions.findIndex(
    (item) =>
      item.courseId === course.id &&
      item.studentId === studentProfile.studentId
  );

  const completionRecord = {
    courseId: course.id,
    courseTitle: course.title || "Untitled Course",
    studentName: studentProfile.studentName,
    studentId: studentProfile.studentId,
    credit: course.credit || "1.0",
    completionDate: new Date().toISOString(),
    transcriptId: generateTranscriptId(),
    totalModules: normalizedModules.length,
    completedModules: getCompletedModuleNumbers(),
    finalStatus: "Completed",
    issuingProgram: "Momentum Academic Course Platform",
    instructionalFormat: "Training-Based Academic Coursework",
    exitRequirement: course.exitExam?.title || "Final Written Summary"
  };

  if (existingIndex >= 0) {
    const existingTranscriptId = completions[existingIndex]?.transcriptId;
    if (existingTranscriptId) {
      completionRecord.transcriptId = existingTranscriptId;
    }
    completions[existingIndex] = completionRecord;
  } else {
    completions.push(completionRecord);
  }

  try {
    localStorage.setItem(getCompletionStorageKey(), JSON.stringify(completions));
  } catch (error) {
    console.warn("Could not save course completion:", error);
  }

  return completionRecord;
}

function generateTranscriptPDF(courseRecord, completionRecord, onDone) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library is missing. Add jsPDF to your module.html before module.js.");
    return;
  }

  const img = new Image();
  img.src = LOGO_PATH;

  img.onload = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const left = 54;
    const right = pageWidth - 54;
    let y = 0;

    const drawRule = (yPos) => {
      doc.setDrawColor(220, 220, 220);
      doc.line(left, yPos, right, yPos);
    };

    const drawSectionHeading = (title, yPos) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(180, 0, 0);
      doc.text(String(title).toUpperCase(), left, yPos);
      drawRule(yPos + 8);
      return yPos + 28;
    };

    const drawField = (label, value, x, yPos, width = 220) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(115, 115, 115);
      doc.text(String(label).toUpperCase(), x, yPos);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      const lines = doc.splitTextToSize(String(value || ""), width);
      doc.text(lines, x, yPos + 14);

      return yPos + 14 + lines.length * 13;
    };

    // Top red bar
    doc.setFillColor(180, 0, 0);
    doc.rect(0, 0, pageWidth, 10, "F");

    // Logo
    doc.addImage(img, "PNG", left, 24, 220, 60);

    // Document title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(20, 20, 20);
    doc.text("Official Course Completion Transcript", left, 102);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Issued upon successful completion of all required Momentum coursework.",
      left,
      118
    );

    drawRule(134);
    y = 160;

    // Student / transcript info
    y = drawSectionHeading("Student Information", y);

    const leftColX = left;
    const rightColX = 320;
    let leftY = y;
    let rightY = y;

    leftY = drawField("Student Name", completionRecord.studentName, leftColX, leftY, 220);
    leftY = drawField("Student ID", completionRecord.studentId, leftColX, leftY + 10, 220);

    rightY = drawField("Transcript ID", completionRecord.transcriptId, rightColX, rightY, 180);
    rightY = drawField("Issue Date", formatDate(completionRecord.completionDate), rightColX, rightY + 10, 180);
    rightY = drawField("Final Status", completionRecord.finalStatus, rightColX, rightY + 10, 180);

    y = Math.max(leftY, rightY) + 24;

    // Course record
    y = drawSectionHeading("Course Record", y);

    const courseFields = [
      ["Course Title", completionRecord.courseTitle],
      ["Course ID", completionRecord.courseId],
      ["Credits Earned", completionRecord.credit],
      ["Completion Date", formatDate(completionRecord.completionDate)],
      ["Instructional Format", completionRecord.instructionalFormat],
      ["Total Modules", String(completionRecord.totalModules)],
      ["Exit Requirement", completionRecord.exitRequirement],
      ["Issuing Program", completionRecord.issuingProgram]
    ];

    courseFields.forEach(([label, value]) => {
      y = drawField(label, value, left, y, 470) + 8;
    });

    y += 10;

    // Module table
    y = drawSectionHeading("Completed Modules", y);

    doc.setFillColor(246, 246, 246);
    doc.rect(left, y - 14, right - left, 22, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text("#", left + 8, y);
    doc.text("Module Title", left + 34, y);
    doc.text("Status", right - 74, y);

    y += 10;
    drawRule(y);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    normalizedModules.forEach((module, index) => {
      if (y > pageHeight - 110) {
        doc.addPage();
        y = 54;
      }

      const wrappedTitle = doc.splitTextToSize(module._title, 340);

      doc.setTextColor(20, 20, 20);
      doc.text(String(module._number || index + 1), left + 8, y);
      doc.text(wrappedTitle, left + 34, y);
      doc.text("Completed", right - 74, y);

      y += Math.max(20, wrappedTitle.length * 12 + 6);
      doc.setDrawColor(235, 235, 235);
      doc.line(left, y, right, y);
      y += 12;
    });

    y += 10;

    // Certification
    if (y > pageHeight - 150) {
      doc.addPage();
      y = 54;
    }

    y = drawSectionHeading("Certification", y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    const certificationText =
      "This transcript certifies that the student successfully completed the listed Momentum course requirements. Credit recognition and final award are determined by the issuing institution according to its academic policies.";

    const certLines = doc.splitTextToSize(certificationText, 500);
    doc.text(certLines, left, y);
    y += certLines.length * 12 + 30;

    // Signature / verification area
    doc.setDrawColor(180, 180, 180);
    doc.line(left, y, left + 180, y);
    doc.line(right - 180, y, right, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text("Authorized Signature", left, y + 14);
    doc.text("Issue Date", right - 180, y + 14);

    y += 42;

    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(225, 225, 225);
    doc.rect(right - 190, y, 190, 46, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 115);
    doc.text("VERIFICATION ID", right - 178, y + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    doc.text(completionRecord.transcriptId, right - 178, y + 34);

    const safeFileName = `${completionRecord.studentName}-${completionRecord.courseId}-transcript`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    doc.save(`${safeFileName}.pdf`);

    if (typeof onDone === "function") {
      onDone();
    }
  };

  img.onerror = function () {
    alert("The transcript logo could not be loaded. Check your logo file path.");
  };
}

function handleSaveClick() {
  saveCurrentResponse(true);
}

function handleNextClick() {
  const response = (els.moduleResponse?.value || "").trim();

  if (!response) {
    alert("Please write a response before continuing.");
    return;
  }

  saveCurrentResponse(false);

  if (moduleIndex < normalizedModules.length - 1) {
    goToModuleByIndex(moduleIndex + 1);
    return;
  }

  const studentProfile = ensureStudentProfile();
  if (!studentProfile) return;

  const completionRecord = markCourseComplete(studentProfile);

 generateTranscriptPDF(course, completionRecord, () => {
  window.location.href = "./thank-you.html";
});

if (els.saveModuleBtn) {
  els.saveModuleBtn.addEventListener("click", handleSaveClick);
}

if (els.nextModuleBtn) {
  els.nextModuleBtn.addEventListener("click", handleNextClick);
}

renderModule();
