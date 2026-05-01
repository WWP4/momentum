import { COURSES } from "./full-courses-data-.js";

const classGrid = document.getElementById("classGrid");

const CLASS_LIMIT = 21;
const CLASS_PRICE = "$395";

const COURSE_IMAGE_MAP = {
  "sports-training-performance":
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop",

  "strength-conditioning":
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",

  "high-performance-athletic-development":
    "https://images.unsplash.com/photo-1571019613914-85f342c1d4b6?q=80&w=1200&auto=format&fit=crop",

  "competitive-athletics":
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop",

  "health-wellness-for-athletes":
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop",

  "athletic-health-recovery":
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",

  "nutrition-for-athletes":
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",

  "sports-leadership":
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",

  "sportsmanship-character-development":
    "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop",

  "team-dynamics-communication":
    "https://images.unsplash.com/photo-1505842465776-3d6b5d58d99c?q=80&w=1200&auto=format&fit=crop",

  "coaching-skills-athlete-mentorship":
    "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop",

  "sports-theory-analysis":
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200&auto=format&fit=crop",

  "sports-psychology-basics":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",

  "intro-to-coaching-theory":
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",

  "kinesiology-human-movement":
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",

  "exercise-science-foundations":
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1200&auto=format&fit=crop",

  "student-athlete-college-readiness":
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop",

  "leadership-in-sports-communities":
    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&auto=format&fit=crop",

  "time-management-high-performance-students":
    "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop",

  "personal-responsibility-goal-setting":
    "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",

  "health-fitness-foundations":
    "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop"
};

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
