/* Momentum Landing ā€” animations (safe + premium) */

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

  // If you already have timeline logic elsewhere, you can keep it ā€” but avoid duplicates.
  if (timeline && railFill && !prefersReduced) {
    // Observe each step to compute progress.
    // We will look for elements with [data-step] OR fallback to .step
    const steps = qsa("[data-step]", timeline);
    const fallbackSteps = steps.length ? steps : qsa(".step", timeline);
    const stepEls = fallbackSteps.length ? fallbackSteps : [];

    if (stepEls.length) {
      const progress = {
        current: 0,
        target: 0,
        raf: null
      };

      // Smoothly animate fill height (premium)
      const animateFill = () => {
        progress.current += (progress.target - progress.current) * 0.12; // smoothing
        railFill.style.height = `${progress.current}%`;

        // mark complete near end
        if (progress.current > 92) timeline.classList.add("is-complete");

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
        (entries) => {
          // Count how many steps are in view or passed
          // Weā€™ll treat a step as "reached" when it intersects enough.
          let reached = 0;
          for (const el of stepEls) {
            const rect = el.getBoundingClientRect();
            // reached if top is above mid viewport (feels natural)
            if (rect.top < window.innerHeight * 0.55) reached++;
          }
          const pct = (reached / stepEls.length) * 100;
          setTarget(pct);
        },
        { threshold: [0.1, 0.25, 0.4] }
      );

      stepEls.forEach((el) => stepIO.observe(el));

      // Initialize once
      setTarget(0);
    }
  } else if (timeline && railFill) {
    // Reduced motion: just set it full/none depending on scroll position
    railFill.style.height = "100%";
    timeline.classList.add("is-complete");
  }

  // ----------------------------
  // 2) Sync into WHY section (title sweep + card pulse)
  // ----------------------------
  const why = qs(".why");
  const whyCards = qsa("[data-why]");

  // Add a tiny pulse class when we enter
  const pulseCards = () => {
    if (!whyCards.length) return;
    // staggered pulse, subtle and quick
    whyCards.forEach((card, i) => {
      card.style.setProperty("--pulse-delay", `${i * 70}ms`);
      card.classList.add("is-pulsing");
    });
    // cleanup class after
    window.setTimeout(() => {
      whyCards.forEach((card) => card.classList.remove("is-pulsing"));
    }, 1200);
  };

  if (why) {
    const whyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Always trigger the section activation
          why.classList.add("is-active");

          // If timeline is complete, run the nice sync moment
          const timelineComplete = timeline && timeline.classList.contains("is-complete");

          if (!prefersReduced) {
            if (timelineComplete) {
              // Short delay feels like the "energy" arrives
              setTimeout(() => pulseCards(), 140);
            } else {
              // still do a tiny pulse, but softer
              setTimeout(() => pulseCards(), 60);
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
  // 3) Optional: Reveal WHY cards on scroll (premium)
  // ----------------------------
  if (whyCards.length) {
    // Start hidden (CSS handles actual visuals)
    whyCards.forEach((c) => c.classList.add("reveal-ready"));

    const cardIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          cardIO.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    whyCards.forEach((c) => cardIO.observe(c));
  }
})();
