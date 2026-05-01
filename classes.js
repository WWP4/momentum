import { COURSES } from "./full-courses-data-.js";

const classGrid = document.getElementById("classGrid");

const CLASS_LIMIT = 21;
const CLASS_PRICE = "$395";

const COURSE_META = {
  "sports-training-performance": {
    category: "Performance",
    path: "Performance",
    bestFor: "Athletes who want to turn regular training into structured academic progress.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop"
  },
  "strength-conditioning": {
    category: "Performance",
    path: "Performance",
    bestFor: "Students focused on strength, conditioning, and disciplined preparation.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
  },
  "high-performance-athletic-development": {
    category: "Performance",
    path: "Performance",
    bestFor: "High-commitment athletes training in a rigorous, year-round environment.",
    image: "https://images.unsplash.com/photo-1571019613914-85f342c1d4b6?q=80&w=1200&auto=format&fit=crop"
  },
  "competitive-athletics": {
    category: "Performance",
    path: "Performance",
    bestFor: "Athletes using competition, games, and performance review as learning material.",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop"
  },
  "health-wellness-for-athletes": {
    category: "Wellness",
    path: "Wellness",
    bestFor: "Students building healthier routines around training, school, and recovery.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop"
  },
  "athletic-health-recovery": {
    category: "Wellness",
    path: "Wellness",
    bestFor: "Athletes learning how recovery supports long-term performance.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop"
  },
  "nutrition-for-athletes": {
    category: "Wellness",
    path: "Wellness",
    bestFor: "Students learning how fueling habits connect to energy, training, and consistency.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
  },
  "sports-leadership": {
    category: "Leadership",
    path: "Leadership",
    bestFor: "Captains, emerging leaders, and athletes taking more responsibility.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop"
  },
  "sportsmanship-character-development": {
    category: "Leadership",
    path: "Leadership",
    bestFor: "Students developing discipline, integrity, and accountability through sport.",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop"
  },
  "team-dynamics-communication": {
    category: "Leadership",
    path: "Leadership",
    bestFor: "Athletes learning how communication affects team performance.",
    image: "https://images.unsplash.com/photo-1505842465776-3d6b5d58d99c?q=80&w=1200&auto=format&fit=crop"
  },
  "coaching-skills-athlete-mentorship": {
    category: "Leadership",
    path: "Leadership",
    bestFor: "Students who mentor others, help younger players, or assist coaches.",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop"
  },
  "sports-theory-analysis": {
    category: "Academic Study",
    path: "Academic Study",
    bestFor: "Students who want to analyze sport, strategy, performance, and training decisions.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200&auto=format&fit=crop"
  },
  "sports-psychology-basics": {
    category: "Academic Study",
    path: "Academic Study",
    bestFor: "Athletes working on mindset, confidence, pressure, and focus.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
  },
  "intro-to-coaching-theory": {
    category: "Academic Study",
    path: "Academic Study",
    bestFor: "Students interested in coaching, instruction, and athlete development.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
  },
  "kinesiology-human-movement": {
    category: "Academic Study",
    path: "Academic Study",
    bestFor: "Students interested in movement, mechanics, and how the body performs.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
  },
  "exercise-science-foundations": {
    category: "Academic Study",
    path: "Academic Study",
    bestFor: "Students who want a foundation in exercise, training, and physical development.",
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1200&auto=format&fit=crop"
  },
  "student-athlete-college-readiness": {
    category: "Student Success",
    path: "Student Success",
    bestFor: "Students preparing for higher expectations in academics and athletics.",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop"
  },
  "leadership-in-sports-communities": {
    category: "Leadership",
    path: "Leadership",
    bestFor: "Athletes ready to connect leadership with service and community impact.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&auto=format&fit=crop"
  },
  "time-management-high-performance-students": {
    category: "Student Success",
    path: "Student Success",
    bestFor: "Busy students balancing training, schoolwork, and personal expectations.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop"
  },
  "personal-responsibility-goal-setting": {
    category: "Student Success",
    path: "Student Success",
    bestFor: "Students who need more ownership, planning, and goal structure.",
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop"
  },
  "health-fitness-foundations": {
    category: "Wellness",
    path: "Wellness",
    bestFor: "Students who need a broad, approachable entry point into health and fitness.",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop"
  }
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

function getMeta(course, index) {
  return COURSE_META[course?.id] || {
    category: "Momentum Course",
    path: "All",
    bestFor: "Students looking for structured academic credit through sport.",
    image: `./assets/classes/class-${String(index + 1).padStart(2, "0")}.jpg`
  };
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

function getBullets(module, course, meta) {
  const text = `${module?.title || ""} ${course?.title || ""} ${meta?.category || ""}`.toLowerCase();

  if (text.includes("wellness") || text.includes("recovery") || text.includes("nutrition") || text.includes("health")) {
    return [
      "Build healthier athlete routines",
      "Reflect on recovery, fueling, and balance",
      "Support sustainable performance habits"
    ];
  }

  if (text.includes("strength") || text.includes("conditioning") || text.includes("performance")) {
    return [
      "Track training progress",
      "Connect effort to academic reflection",
      "Build structured performance habits"
    ];
  }

  if (text.includes("leadership") || text.includes("team") || text.includes("communication") || text.includes("mentorship")) {
    return [
      "Develop leadership through sport",
      "Practice communication and accountability",
      "Reflect on team responsibility"
    ];
  }

  if (text.includes("psychology") || text.includes("theory") || text.includes("science") || text.includes("movement")) {
    return [
      "Study sport through an academic lens",
      "Connect concepts to athletic experience",
      "Complete guided analysis and reflection"
    ];
  }

  if (text.includes("college") || text.includes("time") || text.includes("goal") || text.includes("responsibility")) {
    return [
      "Build stronger student habits",
      "Set goals with structure",
      "Connect discipline to real outcomes"
    ];
  }

  return [
    "Use real athletic training",
    "Complete guided reflection",
    "Build academic credit through sport"
  ];
}

function buildClasses() {
  const items = [];
  let globalIndex = 0;

  COURSES.forEach((course) => {
    const modules = Array.isArray(course.modules) ? course.modules : [];
    const meta = getMeta(course, globalIndex);

    if (modules.length > 0) {
      modules.forEach((module, moduleIndex) => {
        if (items.length >= CLASS_LIMIT) return;

        const moduleNumber = getModuleNumber(module, moduleIndex);

        items.push({
          id: `${course.id}-${moduleNumber}`,
          courseId: course.id,
          title: module?.title || course.title || `Class ${globalIndex + 1}`,
          courseTitle: course.title || "Momentum Course",
          category: meta.category,
          path: meta.path,
          bestFor: meta.bestFor,
          overview: getOverview(module, course),
          bullets: getBullets(module, course, meta),
          image: meta.image,
          credit: course.credit || "1.0 Credit",
          time: "Self-paced • 2–4 weeks",
          price: CLASS_PRICE,
          checkoutUrl: `./course-enrollment.html?course=${encodeURIComponent(course.id)}`,
          classUrl: `./module.html?course=${encodeURIComponent(course.id)}&module=${encodeURIComponent(moduleNumber)}`
        });

        globalIndex += 1;
      });
    } else {
      if (items.length >= CLASS_LIMIT) return;

      items.push({
        id: course.id,
        courseId: course.id,
        title: course.title || `Class ${globalIndex + 1}`,
        courseTitle: course.category || "Momentum Course",
        category: meta.category,
        path: meta.path,
        bestFor: meta.bestFor,
        overview: course.description || "A guided Momentum class built around athlete development.",
        bullets: getBullets({}, course, meta),
        image: meta.image,
        credit: course.credit || "1.0 Credit",
        time: "Self-paced • 2–4 weeks",
        price: CLASS_PRICE,
        checkoutUrl: `./course-enrollment.html?course=${encodeURIComponent(course.id)}`,
        classUrl: `./module.html?course=${encodeURIComponent(course.id)}`
      });

      globalIndex += 1;
    }
  });

  return items;
}

const allClasses = buildClasses();

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
  card.dataset.category = item.category;
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", String((index % 3) * 70));

  card.innerHTML = `
    <div class="cleanCardImage">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
    </div>

    <div class="cleanCardFront">
      <span class="cleanCardLabel">${escapeHtml(item.category)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.bestFor)}</p>
    </div>

    <div class="cleanCardOverlay">
      <span class="cleanCardLabel">Best fit</span>
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
        <a class="btn btn--primary" href="${escapeHtml(item.checkoutUrl)}">Choose This Class</a>
        <button class="btn btn--ghost" type="button" data-open-details="${escapeHtml(item.id)}">
          Details
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderClasses(filter = "All") {
  if (!classGrid) return;

  classGrid.innerHTML = "";

  const visible = filter === "All"
    ? allClasses
    : allClasses.filter((item) => item.category === filter || item.path === filter);

  visible.forEach((item, index) => {
    classGrid.appendChild(createCard(item, index));
  });

  if (window.AOS) {
    window.AOS.refreshHard?.();
  }
}

function setActiveFilter(filter) {
  document.querySelectorAll(".filterBtn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });

  renderClasses(filter);

  document.getElementById("classes")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function openModal(item) {
  const modal = document.getElementById("courseModal");
  if (!modal) return;

  document.getElementById("modalCategory").textContent = item.category;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalOverview").textContent = item.overview;
  document.getElementById("modalCredit").textContent = item.credit;
  document.getElementById("modalTime").textContent = item.time;
  document.getElementById("modalBestFor").textContent = item.bestFor;

  const bulletList = document.getElementById("modalBullets");
  bulletList.innerHTML = item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");

  document.getElementById("modalEnroll").href = item.checkoutUrl;
  document.getElementById("modalPreview").href = item.classUrl;

  modal.hidden = false;
  document.body.classList.add("modalOpen");
}

function closeModal() {
  const modal = document.getElementById("courseModal");
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("modalOpen");
}

document.addEventListener("click", (event) => {
  const filterBtn = event.target.closest(".filterBtn");
  if (filterBtn) {
    setActiveFilter(filterBtn.dataset.filter);
    return;
  }

  const focusBtn = event.target.closest("[data-focus]");
  if (focusBtn) {
    setActiveFilter(focusBtn.dataset.focus);
    return;
  }

  const detailBtn = event.target.closest("[data-open-details]");
  if (detailBtn) {
    const item = allClasses.find((course) => course.id === detailBtn.dataset.openDetails);
    if (item) openModal(item);
    return;
  }

  if (event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
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
