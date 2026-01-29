// Momentum Landing — Premium Animation Controller (SAFE)

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================
     1) HERO: MOMENTUM type + underline
     Faster typing, slower overall pacing
     ========================= */

  const hero = qs(".heroType");
  const letters = qs("#wordmarkLetters");

  if (hero && letters) {
    const WORD = "MOMENTUM.";

    // You asked: slower page feel, faster typing so info appears sooner
    const TYPE_SPEED = prefersReduced ? 0 : 65;  // faster than before
    const FADE_SPEED = prefersReduced ? 0 : 220; // quick fade
    const UNDERLINE_GAP = prefersReduced ? 0 : 220; // slow/premium pause
    const WIPE_DELAY = prefersReduced ? 0 : 180; // slower start

    letters.innerHTML = "";

    [...WORD].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = char;
      span.style.setProperty("--d", `${WIPE_DELAY + i * TYPE_SPEED}ms`);
      letters.appendChild(span);
    });

    const typingDuration = WIPE_DELAY + (WORD.length * TYPE_SPEED) + FADE_SPEED;

    // These CSS variables must be used by your hero CSS animation timing
    hero.style.setProperty("--underlineDelay", `${typingDuration + UNDERLINE_GAP}ms`);
    hero.style.setProperty("--copyDelay", `${typingDuration + UNDERLINE_GAP + 140}ms`);

    requestAnimationFrame(() => hero.classList.add("is-ready"));
  }

  /* =========================
     2) TIMELINE fill on scroll (optional)
     Requires: .timeline and .rail__fill exist
     ========================= */

  const timeline = qs(".timeline");
  const railFill = qs(".rail__fill");

  if (!prefersReduced && timeline && railFill) {
    const stepEls =
      qsa("[data-step]", timeline).length ? qsa("[data-step]", timeline) :
      qsa(".step", timeline);

    if (stepEls.length) {
      const progress = { current: 0, target: 0, raf: null };

      const animateFill = () => {
        progress.current += (progress.target - progress.current) * 0.12;
        railFill.style.height = `${progress.current}%`;

        if (progress.current > 92) timeline.classList.add("is-complete");

        if (Math.abs(progress.target - progress.current) > 0.15) {
          progress.raf = requestAnimationFrame(animateFill);
        } else {
          railFill.style.height = `${progress.target}%`;
          progress.raf = null;
        }
      };

      const setTarget = (pct) => {
        progress.target = Math.max(0, Math.min(100, pct));
        if (!progress.raf) progress.raf = requestAnimationFrame(animateFill);
      };

      const updateProgress = () => {
        let reached = 0;
        for (const el of stepEls) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.58) reached++;
        }
        setTarget((reached / stepEls.length) * 100);
      };

      // Use scroll + rAF (more reliable than watching each step)
      let ticking = false;
      window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      }, { passive: true });

      // Initial
      updateProgress();
    }
  } else if (timeline && railFill) {
    // Reduced motion: no scroll animation
    railFill.style.height = "100%";
    timeline.classList.add("is-complete");
  }

  /* =========================
     3) HOW IT WORKS: step reveal (optional)
     Requires: [data-step]
     ========================= */

  const steps = qsa("[data-step]");
  if (!prefersReduced && steps.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    steps.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 120}ms`; // slow/premium stagger
      io.observe(el);
    });
  } else {
    // Fallback: just show them
    steps.forEach((el) => el.classList.add("is-in"));
  }

  /* =========================
     4) SYNC: timeline -> WHY section
     Requires: .why and [data-why] on cards
     ========================= */

  const why = qs(".why");
  const whyCards = qsa("[data-why]");

  const pulseWhyCards = () => {
    if (!whyCards.length) return;
    whyCards.forEach((card, i) => {
      card.style.setProperty("--pulse-delay", `${i * 70}ms`);
      card.classList.add("is-pulsing");
    });
    setTimeout(() => whyCards.forEach((c) => c.classList.remove("is-pulsing")), 1100);
  };

  if (!prefersReduced && why && "IntersectionObserver" in window) {
    const whyIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // activates your underline sweep (.why.is-active ...)
        why.classList.add("is-active");

        const timelineComplete = timeline && timeline.classList.contains("is-complete");
        setTimeout(() => pulseWhyCards(), timelineComplete ? 140 : 70);

        whyIO.unobserve(why);
      });
    }, { threshold: 0.22 });

    whyIO.observe(why);
  } else if (why) {
    why.classList.add("is-active");
  }

  /* =========================
     5) WHY cards: reveal on scroll (optional)
     Requires: [data-why]
     ========================= */

  if (!prefersReduced && whyCards.length && "IntersectionObserver" in window) {
    whyCards.forEach((c) => c.classList.add("reveal-ready"));

    const cardIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        cardIO.unobserve(entry.target);
      });
    }, { threshold: 0.16 });

    whyCards.forEach((c) => cardIO.observe(c));
  } else {
    whyCards.forEach((c) => c.classList.add("is-in"));
  }
});
