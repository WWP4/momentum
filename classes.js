const COURSES = [
  {
    id: "sports-training-performance",
    title: "Sports Training & Performance",
    credit: "1.0 Credit",
    price: "$395",
    checkoutUrl: "#checkout-sports-training-performance",
    courseUrl: "./course.html?course=sports-training-performance",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
    alt: "Student athletes training on a field",
    description:
      "A technique-driven course for athletes building discipline, skill consistency, game IQ, and stronger training habits."
  },
  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    credit: "1.0 Credit",
    price: "$395",
    checkoutUrl: "#checkout-strength-conditioning",
    courseUrl: "./course.html?course=strength-conditioning",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    alt: "Athlete training in a gym",
    description:
      "A performance science course focused on strength, conditioning, mobility, safe progression, and measurable athletic growth."
  },
  {
    id: "competitive-athletics",
    title: "Competitive Athletics",
    credit: "1.0 Credit",
    price: "$395",
    checkoutUrl: "#checkout-competitive-athletics",
    courseUrl: "./course.html?course=competitive-athletics",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Basketball players competing during a game",
    description:
      "A course for athletes competing in games, tournaments, showcases, and high-pressure performance environments."
  },
  {
    id: "health-wellness-for-athletes",
    title: "Health & Wellness for Athletes",
    credit: "1.0 Credit",
    price: "$395",
    checkoutUrl: "#checkout-health-wellness-for-athletes",
    courseUrl: "./course.html?course=health-wellness-for-athletes",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80",
    alt: "Athlete stretching and recovering",
    description:
      "A wellness-centered course covering sleep, recovery, stress, hydration, emotional regulation, and sustainable habits."
  },
  {
    id: "high-performance-athletic-development",
    title: "High-Performance Athletic Development",
    credit: "1.0 Credit",
    price: "$395",
    checkoutUrl: "#checkout-high-performance-athletic-development",
    courseUrl: "./course.html?course=high-performance-athletic-development",
    image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80",
    alt: "Athlete sprinting outdoors during training",
    description:
      "An advanced course for serious athletes focused on adaptability, cross-training, performance science, and elite habits."
  }
];

const classGrid = document.getElementById("classGrid");

function createCourseCard(course) {
  const article = document.createElement("article");
  article.className = "classCard";

  article.innerHTML = `
    <div class="classCard__image">
      <img src="${course.image}" alt="${course.alt}" loading="lazy">
      <span class="classCard__badge">${course.credit}</span>
    </div>

    <div class="classCard__body">
      <h3>${course.title}</h3>
      <p>${course.description}</p>

      <div class="classCard__meta">
        <div class="metaBlock">
          <span>Credit</span>
          <strong>${course.credit}</strong>
        </div>

        <div class="metaBlock">
          <span>Enrollment</span>
          <strong>${course.price}</strong>
        </div>
      </div>

      <div class="classCard__actions">
        <a class="btn btn--primary" href="${course.checkoutUrl}" data-checkout="${course.id}">
          Enroll Now
        </a>
        <a class="btn btn--ghost" href="${course.courseUrl}">
          Preview Class
        </a>
      </div>
    </div>
  `;

  return article;
}

function renderCourses() {
  if (!classGrid) return;
  classGrid.innerHTML = "";
  COURSES.forEach((course) => {
    classGrid.appendChild(createCourseCard(course));
  });
}

function setupCheckoutPlaceholders() {
  document.addEventListener("click", (event) => {
    const checkoutLink = event.target.closest("[data-checkout]");
    if (!checkoutLink) return;

    const href = checkoutLink.getAttribute("href") || "";
    if (!href.startsWith("#checkout")) return;

    event.preventDefault();

    const courseId = checkoutLink.dataset.checkout;
    const course = COURSES.find((item) => item.id === courseId);

    alert(
      `Checkout placeholder for ${course?.title || "this class"}.\n\nReplace checkoutUrl in classes.js with your real Stripe, Square, or payment link.`
    );
  });
}

renderCourses();
setupCheckoutPlaceholders();
