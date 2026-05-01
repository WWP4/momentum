import { COURSES } from "./full-courses-data-.js";

const classGrid = document.getElementById("classGrid");

const CLASS_LIMIT = 21;
const CLASS_PRICE = "$395";

const HIGH_SCHOOL_IMAGES = [
  "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80"
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function iconSvg(type) {
  const icons = {
    credit: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"></path>
        <path d="M8 9h8M8 13h5M8 17h3"></path>
      </svg>
    `,
    time: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
        <path d="M12 7v5l3 2"></path>
      </svg>
    `,
    student: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10 12 6l8 4-8 4-8-4Z"></path>
        <path d="M7 12v4c1.3 1.3 3 2 5 2s3.7-.7 5-2v-4"></path>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
    `
  };

  return icons[type] || icons.check;
}

function getModuleNumber(module, index) {
  return Number(module?.n || module?.number || index + 1);
}

function getImage(index) {
  return HIGH_SCHOOL_IMAGES[index] || HIGH_SCHOOL_IMAGES[0];
}

function getClassTimeEstimate() {
  return "Self-paced • 2–4 weeks";
}

function getCreditText(course) {
  return course?.credit ? `${course.credit} Available` : "Credit Available";
}

function getOverview(module, course) {
  return (
    module?.subtitle ||
    module?.prompt ||
    course?.description ||
    "A guided Momentum class built around athlete development, reflection, and real training experience."
  );
}

function getBulletPoints(module, course) {
  const title = `${module?.title || ""} ${course?.title || ""}`.toLowerCase();

  if (title.includes("wellness") || title.includes("sleep") || title.includes("recovery") || title.includes("stress")) {
    return [
      "Builds healthier routines around training and school life",
      "Helps students reflect on sleep, stress, recovery, and habits",
      "Designed for athletes who need balance, structure, and self-awareness"
    ];
  }

  if (title.includes("strength") || title.includes("conditioning") || title.includes("mobility")) {
    return [
      "Connects workouts to academic reflection and measurable progress",
      "Covers effort, consistency, safe training, and performance habits",
      "Helpful for athletes training in gyms, teams, or independent programs"
    ];
  }

  if (title.includes("competitive") || title.includes("game") || title.includes("pressure") || title.includes("tournament")) {
    return [
      "Built for athletes involved in games, tournaments, or showcases",
      "Helps students reflect on preparation, pressure, and performance",
      "Turns real competition experience into structured class work"
    ];
  }

  if (title.includes("performance") || title.includes("development") || title.includes("elite")) {
    return [
      "Focused on higher-level athlete growth and long-term development",
      "Connects training habits, mindset, and performance planning",
      "Good fit for serious athletes balancing sport and academics"
    ];
  }

  return [
    "Uses real athletic training as the foundation for class work",
    "Guides students through reflection, growth, and written responses",
    "Designed for high school athletes, clubs, and school programs"
  ];
}

function buildIndividualClasses() {
  if (!Array.isArray(COURSES)) return [];

  let globalIndex = 0;
  const items = [];

  COURSES.forEach((course) => {
    const modules = Array.isArray(course.modules) ? course.modules : [];

    modules.forEach((module, moduleIndex) => {
      if (items.length >= CLASS_LIMIT) return;

      const moduleNumber = getModuleNumber(module, moduleIndex);

      items.push({
        id: `${course.id}-module-${moduleNumber}`,
        courseId: course.id,
        courseTitle: course.title || "Momentum Course",
        moduleNumber,
        title: module?.title || `Class ${globalIndex + 1}`,
        overview: getOverview(module, course),
        bullets: getBulletPoints(module, course),
        credit: getCreditText(course),
        time: getClassTimeEstimate(),
        studentLevel: "Grades 9–12",
        price: CLASS_PRICE,
        image: getImage(globalIndex),
        checkoutUrl: `#checkout-${course.id}-module-${moduleNumber}`,
        classUrl: `./module.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(moduleNumber)}`
      });

      globalIndex += 1;
    });
  });

  return items;
}

function createBulletList(bullets = []) {
  return bullets
    .map((bullet) => {
      return `
        <li>
          <span class="classBullet__icon">${iconSvg("check")}</span>
          <span>${escapeHtml(bullet)}</span>
        </li>
      `;
    })
    .join("");
}

function createClassCard(item, index) {
  const article = document.createElement("article");
  article.className = "classCard";
  article.setAttribute("data-aos", "fade-up");
  article.setAttribute("data-aos-delay", String((index % 3) * 80));

  article.innerHTML = `
    <div class="classCard__image">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
      <span class="classCard__badge">High School Class</span>
    </div>

    <div class="classCard__body">
      <div class="classCard__kicker">
        Class ${index + 1} • ${escapeHtml(item.courseTitle)}
      </div>

      <h3>${escapeHtml(item.title)}</h3>

      <p class="classCard__overview">${escapeHtml(item.overview)}</p>

      <div class="classDetails">
        <div class="classDetail">
          <span class="classDetail__icon">${iconSvg("credit")}</span>
          <span>
            <small>Credit</small>
            <strong>${escapeHtml(item.credit)}</strong>
          </span>
        </div>

        <div class="classDetail">
          <span class="classDetail__icon">${iconSvg("time")}</span>
          <span>
            <small>Time</small>
            <strong>${escapeHtml(item.time)}</strong>
          </span>
        </div>

        <div class="classDetail">
          <span class="classDetail__icon">${iconSvg("student")}</span>
          <span>
            <small>Student Level</small>
            <strong>${escapeHtml(item.studentLevel)}</strong>
          </span>
        </div>
      </div>

      <div class="classHoverPanel">
        <div class="classHoverPanel__title">What this class helps with</div>
        <ul class="classBullet">
          ${createBulletList(item.bullets)}
        </ul>
      </div>

      <div class="classCard__meta">
        <div class="metaBlock">
          <span>Enrollment</span>
          <strong>${escapeHtml(item.price)}</strong>
        </div>

        <div class="metaBlock">
          <span>Format</span>
          <strong>Online Portal</strong>
        </div>
      </div>

      <div class="classCard__actions">
        <a class="btn btn--primary" href="${escapeHtml(item.checkoutUrl)}" data-checkout="${escapeHtml(item.id)}">
          Enroll in This Class
        </a>

        <a class="btn btn--ghost" href="${escapeHtml(item.classUrl)}">
          Preview Class
        </a>
      </div>
    </div>
  `;

  return article;
}

function renderClasses() {
  if (!classGrid) return;

  const classes = buildIndividualClasses();

  classGrid.innerHTML = "";

  classes.forEach((item, index) => {
    classGrid.appendChild(createClassCard(item, index));
  });
}

function setupCheckoutPlaceholders() {
  document.addEventListener("click", (event) => {
    const checkoutLink = event.target.closest("[data-checkout]");
    if (!checkoutLink) return;

    const href = checkoutLink.getAttribute("href") || "";

    if (!href.startsWith("#checkout")) return;

    event.preventDefault();

    alert(
      "Checkout placeholder.\n\nReplace checkoutUrl in classes.js with the real payment link for this individual class."
    );
  });
}

renderClasses();
setupCheckoutPlaceholders();

if (window.AOS) {
  window.AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
  });
}
