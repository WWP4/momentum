import { COURSES } from "./full-courses-data-.js";

const classGrid = document.getElementById("classGrid");

const CLASS_LIMIT = 21;
const CLASS_PRICE = "$395";

const CLASS_IMAGES = [
  "./assets/classes/class-01.jpg",
  "./assets/classes/class-02.jpg",
  "./assets/classes/class-03.jpg",
  "./assets/classes/class-04.jpg",
  "./assets/classes/class-05.jpg",
  "./assets/classes/class-06.jpg",
  "./assets/classes/class-07.jpg",
  "./assets/classes/class-08.jpg",
  "./assets/classes/class-09.jpg",
  "./assets/classes/class-10.jpg",
  "./assets/classes/class-11.jpg",
  "./assets/classes/class-12.jpg",
  "./assets/classes/class-13.jpg",
  "./assets/classes/class-14.jpg",
  "./assets/classes/class-15.jpg",
  "./assets/classes/class-16.jpg",
  "./assets/classes/class-17.jpg",
  "./assets/classes/class-18.jpg",
  "./assets/classes/class-19.jpg",
  "./assets/classes/class-20.jpg",
  "./assets/classes/class-21.jpg"
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function icon(type) {
  const icons = {
    check: `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v5l3 2"/></svg>`,
    credit: `<svg viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"/><path d="M8 9h8M8 13h5M8 17h3"/></svg>`
  };

  return icons[type] || icons.check;
}

function getModuleNumber(module, index) {
  return Number(module?.n || module?.number || index + 1);
}

function getOverview(module, course) {
  return (
    module?.subtitle ||
    module?.prompt ||
    course?.description ||
    "A guided Momentum class built around athlete development, reflection, and real training experience."
  );
}

function getBullets(module, course) {
  const text = `${module?.title || ""} ${course?.title || ""}`.toLowerCase();

  if (text.includes("wellness") || text.includes("sleep") || text.includes("recovery") || text.includes("stress")) {
    return ["Build healthier routines", "Reflect on stress and recovery", "Support balance and self-awareness"];
  }

  if (text.includes("strength") || text.includes("conditioning") || text.includes("mobility")) {
    return ["Track training progress", "Connect workouts to academics", "Build safer performance habits"];
  }

  if (text.includes("competitive") || text.includes("game") || text.includes("pressure") || text.includes("tournament")) {
    return ["Reflect on competition", "Understand pressure moments", "Turn games into class work"];
  }

  return ["Use real athletic training", "Complete guided reflection", "Build academic credit through sport"];
}

function buildClasses() {
  const items = [];
  let globalIndex = 0;

  COURSES.forEach((course) => {
    const modules = Array.isArray(course.modules) ? course.modules : [];

    modules.forEach((module, moduleIndex) => {
      if (items.length >= CLASS_LIMIT) return;

      const moduleNumber = getModuleNumber(module, moduleIndex);

      items.push({
        title: module?.title || `Class ${globalIndex + 1}`,
        courseTitle: course.title || "Momentum Course",
        overview: getOverview(module, course),
        bullets: getBullets(module, course),
        image: CLASS_IMAGES[globalIndex],
        credit: course.credit || "1.0 Credit",
        time: "Self-paced • 2–4 weeks",
        price: CLASS_PRICE,
        checkoutUrl: `#checkout-${course.id}-module-${moduleNumber}`,
        classUrl: `./module.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(moduleNumber)}`
      });

      globalIndex += 1;
    });
  });

  return items;
}

function bulletHtml(bullets) {
  return bullets.map((item) => `
    <li>
      <span>${icon("check")}</span>
      ${escapeHtml(item)}
    </li>
  `).join("");
}

function createCard(item, index) {
  const card = document.createElement("article");
  card.className = "classCard cleanClassCard";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", String((index % 3) * 80));

  card.innerHTML = `
    <div class="cleanCardImage">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
    </div>

    <div class="cleanCardFront">
      <span class="cleanCardLabel">Class ${index + 1}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.courseTitle)}</p>
    </div>

    <div class="cleanCardOverlay">
      <span class="cleanCardLabel">Overview</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.overview)}</p>

      <div class="cleanCardStats">
        <div>${icon("credit")} <strong>${escapeHtml(item.credit)}</strong></div>
        <div>${icon("clock")} <strong>${escapeHtml(item.time)}</strong></div>
      </div>

      <ul class="cleanCardBullets">
        ${bulletHtml(item.bullets)}
      </ul>

      <div class="cleanCardActions">
        <a class="btn btn--primary" href="${escapeHtml(item.checkoutUrl)}" data-checkout>
          Enroll
        </a>
        <a class="btn btn--ghost" href="${escapeHtml(item.classUrl)}">
          Preview
        </a>
      </div>
    </div>
  `;

  return card;
}

function renderClasses() {
  if (!classGrid) return;

  classGrid.innerHTML = "";

  buildClasses().forEach((item, index) => {
    classGrid.appendChild(createCard(item, index));
  });
}

document.addEventListener("click", (event) => {
  const checkout = event.target.closest("[data-checkout]");
  if (!checkout) return;

  const href = checkout.getAttribute("href") || "";
  if (!href.startsWith("#checkout")) return;

  event.preventDefault();
  alert("Replace this placeholder with the real payment link for this class.");
});

renderClasses();

if (window.AOS) {
  window.AOS.init({
    duration: 650,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
  });
}
