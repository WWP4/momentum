// Momentum Landing — Hero + Steps + Timeline + Why Sync (clean + safe)

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     HERO TYPE
     ========================= */
  const hero = document.querySelector(".heroType");
  const letters = document.getElementById("wordmarkLetters");

  if (hero && letters) {
    const WORD = "MOMENTUM.";

    // Your request: slow overall feel, but hero info loads quickly
    const TYPE_SPEED = 90;   // ms between letters (fast enough)
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
     (uses your real DOM: [data-event] + #railFill)
     ========================= */
  const events = document.querySelectorAll("[data-event]");
  const fill = document.getElementById("railFill");
  const timelineWrap = document.querySelector(".timeline");

  if (events.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in");
        entry.target.classList.add("is-active");

        // remove active from others
        events.forEach((e) => { if (e !== entry.target) e.classList.remove("is-active"); });

        // fill height based on index
        const idx = [...events].indexOf(entry.target);
        const pct = ((idx + 1) / events.length) * 100;
        if (fill) fill.style.height = `${pct}%`;

        // mark handoff states (for syncing into WHY)
        if (timelineWrap) {
          if (pct > 70) timelineWrap.classList.add("handoff-ready");
          if (pct > 92) timelineWrap.classList.add("is-complete");
        }
      });
    }, { threshold: 0.45 });

    events.forEach((el, i) => {
      el.style.transitionDelay = `${i * 160}ms`;
      io.observe(el);
    });
  } else {
    // no observer support: show all, set fill to full
    events.forEach((el) => el.classList.add("is-in"));
    if (fill) fill.style.height = "100%";
    if (timelineWrap) {
      timelineWrap.classList.add("handoff-ready");
      timelineWrap.classList.add("is-complete");
    }
  }

  /* =========================
     HOW IT WORKS (REVEAL)
     ========================= */
  const steps = document.querySelectorAll("[data-step]");
  if (steps.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    steps.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 140}ms`;
      io.observe(el);
    });
  } else {
    steps.forEach((el) => el.classList.add("is-in"));
  }

  /* =========================
     WHY SECTION: sync from timeline + glow pulse
     (requires .why + cards marked [data-why])
     ========================= */
  const why = document.querySelector(".why");
  const whyCards = document.querySelectorAll("[data-why]");

  const pulseWhyCards = () => {
    if (!whyCards.length || prefersReduced) return;

    whyCards.forEach((card, i) => {
      card.style.setProperty("--pulse-delay", `${i * 90}ms`); // premium stagger
      card.classList.add("is-pulsing");
    });

    window.setTimeout(() => {
      whyCards.forEach((card) => card.classList.remove("is-pulsing"));
    }, 1100);
  };

  if (why && "IntersectionObserver" in window) {
    const whyIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // trigger sweep / header effects in CSS
        why.classList.add("is-active");

        const handoffReady = timelineWrap && timelineWrap.classList.contains("handoff-ready");
        const isComplete = timelineWrap && timelineWrap.classList.contains("is-complete");

        if (!prefersReduced) {
          // optional: a tiny global handoff moment hook
          if (handoffReady) {
            document.body.classList.add("handoff-fire");
            window.setTimeout(() => document.body.classList.remove("handoff-fire"), 650);
          }

          // pulse timing
          if (isComplete) setTimeout(pulseWhyCards, 150);
          else if (handoffReady) setTimeout(pulseWhyCards, 110);
          else setTimeout(pulseWhyCards, 70);
        }

        whyIO.unobserve(why);
      });
    }, { threshold: 0.22 });

    whyIO.observe(why);
  } else if (why) {
    why.classList.add("is-active");
  }

  // Reveal why cards on scroll (nice, safe)
  if (whyCards.length && "IntersectionObserver" in window) {
    whyCards.forEach((c) => c.classList.add("reveal-ready"));

    const cardIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const idx = [...whyCards].indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 120}ms`;
        entry.target.classList.add("is-in");

        cardIO.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    whyCards.forEach((c) => cardIO.observe(c));
  } else {
    whyCards.forEach((c) => c.classList.add("is-in"));
  }
});
