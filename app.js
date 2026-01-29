/* Momentum Landing — animations (safe + premium) */

(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Helpers
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----------------------------
  // 1) Timeline fill on scroll (and mark complete)
  // ----------------------------
  const timeline = qs(".timeline");
  const railFill = qs(".rail__fill"); // change this selector if your fill uses a different class

  if (timeline && railFill && !prefersReduced) {
    const steps = qsa("[data-step]", timeline);
    const fallbackSteps = steps.length ? steps : qsa(".step", timeline);
    const stepEls = fallbackSteps.length ? fallbackSteps : [];

    if (stepEls.length) {
      const progress = { current: 0, target: 0, raf: null };

      const animateFill = () => {
        progress.current += (progress.target - progress.current) * 0.12; // smoothing
        railFill.style.height = `${progress.current}%`;

        // mark complete / handoff-ready
        if (progress.current > 92) timeline.classList.add("is-complete");
        if (progress.current > 78) timeline.classList.add("handoff-ready"); // NEW: pre-arm the transition

        if (Math.abs(progress.target - progress.current) > 0.1) {
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

      const stepIO = new IntersectionObserver(
        () => {
          let reached = 0;
          for (const el of stepEls) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.55) reached++;
          }
          setTarget((reached / stepEls.length) * 100);
        },
        { threshold: [0.1, 0.25, 0.4] }
      );

      stepEls.forEach((el) => stepIO.observe(el));
      setTarget(0);
    }
  } else if (timeline && railFill) {
    railFill.style.height = "100%";
    timeline.classList.add("is-complete");
    timeline.classList.add("handoff-ready");
  }

  // ----------------------------
  // 2) Sync into WHY section (title sweep + card pulse)
  // ----------------------------
  const why = qs(".why");
  const whyCards = qsa("[data-why]");

  const pulseCards = () => {
    if (!whyCards.length) return;
    whyCards.forEach((card, i) => {
      card.style.setProperty("--pulse-delay", `${i * 85}ms`); // slower stagger = more premium
      card.classList.add("is-pulsing");
    });
    window.setTimeout(() => {
      whyCards.forEach((card) => card.classList.remove("is-pulsing"));
    }, 1200);
  };

  if (why) {
    const whyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Turn on title sweep / section activation
          why.classList.add("is-active");

          const handoffReady = timeline && timeline.classList.contains("handoff-ready");
          const timelineComplete = timeline && timeline.classList.contains("is-complete");

          if (!prefersReduced) {
            // NEW: create a one-time "handoff moment" hook for optional CSS
            if (handoffReady) {
              document.body.classList.add("handoff-fire");
              window.setTimeout(() => document.body.classList.remove("handoff-fire"), 700);
            }

            // Pulse timing
            if (timelineComplete) {
              setTimeout(() => pulseCards(), 160);
            } else if (handoffReady) {
              setTimeout(() => pulseCards(), 110);
            } else {
              setTimeout(() => pulseCards(), 70);
            }
          }

          whyIO.unobserve(why);
        });
      },
      { threshold: 0.22 }
    );

    whyIO.observe(why);
  }

  // ----------------------------
  // 3) Reveal WHY cards on scroll (premium)
  // ----------------------------
  if (whyCards.length) {
    whyCards.forEach((c) => c.classList.add("reveal-ready"));

    const cardIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // NEW: stagger reveal based on index
          const idx = whyCards.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 120}ms`;

          entry.target.classList.add("is-in");
          cardIO.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    whyCards.forEach((c) => cardIO.observe(c));
  }
})();
