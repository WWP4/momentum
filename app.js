// Momentum Landing — Hero + Steps + Timeline + Handoff Wash (clean + safe)

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     HERO TYPE
     ========================= */
  const hero = document.querySelector(".heroType");
  const letters = document.getElementById("wordmarkLetters");

  if (hero && letters) {
    const WORD = "MOMENTUM.";

    // Faster typing, still premium
    const TYPE_SPEED = 90;   // ms between letters
    const FADE_SPEED = 260;  // per-letter fade
    const UNDERLINE_GAP = 160;
    const WIPE_DELAY = 140;

    letters.innerHTML = "";

    [...WORD].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = char;
      span.style.setProperty("--d", `${WIPE_DELAY + i * TYPE_SPEED}ms`);
      letters.appendChild(span);
    });

    const typingDuration = WIPE_DELAY + (WORD.length * TYPE_SPEED) + FADE_SPEED;

    hero.style.setProperty("--underlineDelay", `${typingDuration + UNDERLINE_GAP}ms`);
    hero.style.setProperty("--copyDelay", `${typingDuration + UNDERLINE_GAP + 180}ms`);

    requestAnimationFrame(() => hero.classList.add("is-ready"));
  }

  /* =========================
     TIMELINE REVEAL + FILL
     ========================= */
  const events = document.querySelectorAll("[data-event]");
  const fill = document.getElementById("railFill");

  if (events.length && "IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in");
        entry.target.classList.add("is-active");

        // remove active from others
        events.forEach(e => { if (e !== entry.target) e.classList.remove("is-active"); });

        // fill height based on index
        const idx = [...events].indexOf(entry.target);
        const pct = ((idx + 1) / events.length) * 100;
        if (fill) fill.style.height = `${pct}%`;
      });
    }, { threshold: 0.45 });

    events.forEach((el, i) => {
      el.style.transitionDelay = `${i * 160}ms`;
      io.observe(el);
    });
  } else {
    // Fallback: show all, fill full
    events.forEach((el) => el.classList.add("is-in"));
    if (fill) fill.style.height = "100%";
  }

  /* =========================
     HOW IT WORKS (REVEAL)
     ========================= */
  const steps = document.querySelectorAll("[data-step]");
  if (steps.length && "IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    steps.forEach((el, idx) => {
      // Slow stagger, premium feel
      el.style.transitionDelay = `${idx * 140}ms`;
      io.observe(el);
    });
  } else {
    steps.forEach((el) => el.classList.add("is-in"));
  }

  /* =========================
     HANDOFF WASH: Timeline -> Why section
     ========================= */
  const why = document.querySelector(".why");
  if (why && "IntersectionObserver" in window && !prefersReduced) {
    const whyIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // activates any title sweep styles you have
        why.classList.add("is-active");

        // triggers the CSS overlay wash for ~800ms
        document.body.classList.add("handoff-fire");
        setTimeout(() => document.body.classList.remove("handoff-fire"), 800);

        whyIO.unobserve(why);
      });
    }, { threshold: 0.22 });

    whyIO.observe(why);
  } else if (why) {
    // Reduced motion: still activate the section styling
    why.classList.add("is-active");
  }
  
});
