import { COURSES } from "./full-courses-data-.js";

const classGrid = document.getElementById("classGrid");

const CLASS_LIMIT = 21;
const CLASS_PRICE = "$395";

const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1200&q=80"
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getModuleNumber(module, index) {
  return Number(module?.n || module?.number || index + 1);
}

function getModuleTitle(module, index) {
  return module?.title || `Class ${index + 1}`;
}

function getModuleDescription(module, course) {
  return (
    module?.subtitle ||
    module?.prompt ||
    module?.description ||
    course?.description ||
    "Momentum athlete development class."
  );
}

function getImage(index) {
  return STOCK_IMAGES[index % STOCK_IMAGES.length];
}

function buildIndividualClasses() {
  if (!Array.isArray(COURSES)) return [];

  return COURSES.flatMap((course) => {
    const modules = Array.isArray(course.modules) ? course.modules : [];

    return modules.map((module, moduleIndex) => {
      const moduleNumber = getModuleNumber(module, moduleIndex);

      return {
        id: `${course.id}-module-${moduleNumber}`,
        courseId: course.id,
        courseTitle: course.title,
        moduleNumber,
        title: getModuleTitle(module, moduleIndex),
        description: getModuleDescription(module, course),
        credit: course.credit || "1.0 Credit",
        price: CLASS_PRICE,
        image: getImage(moduleIndex),
        checkoutUrl: `#checkout-${course.id}-module-${moduleNumber}`,
        classUrl: `./module.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(moduleNumber)}`
      };
    });
  }).slice(0, CLASS_LIMIT);
}

function createClassCard(item, index) {
  const article = document.createElement("article");
  article.className = "classCard";

  article.innerHTML = `
    <div class="classCard__image">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
      <span class="classCard__badge">Class ${index + 1}</span>
    </div>

    <div class="classCard__body">
      <h3>${escapeHtml(item.title)}</h3>

      <p>${escapeHtml(item.description)}</p>

      <div class="classCard__meta">
        <div class="metaBlock">
          <span>Program</span>
          <strong>${escapeHtml(item.courseTitle)}</strong>
        </div>

        <div class="metaBlock">
          <span>Enrollment</span>
          <strong>${escapeHtml(item.price)}</strong>
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
