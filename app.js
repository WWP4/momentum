// Momentum Landing — Hero + Steps Animation (clean + safe)

document.addEventListener("DOMContentLoaded", () => {

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
     HOW IT WORKS (REVEAL)
     ========================= */
  const steps = document.querySelectorAll("[data-step]");
  if (steps.length) {
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
  }

});
