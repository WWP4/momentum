(function () {
  const section = document.querySelector('.why-section');
  if (!section) return;

  const runner = section.querySelector('.why-icon--runner');
  const structure = section.querySelector('.why-icon--structure');
  const result = section.querySelector('.why-icon--result');

  const title = section.querySelector('.why-title');
  const copy = section.querySelector('.why-copy');

  const states = [
    {
      title: "Athletes are already doing the work.",
      copy:
        "Structured training, repetition, coaching, and discipline already exist before Momentum.",
      show: runner
    },
    {
      title: "Momentum brings structure to that effort.",
      copy:
        "Training becomes organized into modules, evaluation, and a defined academic pathway.",
      show: structure
    },
    {
      title: "The result is real academic credit.",
      copy:
        "What was already happening now leads to something measurable, recognized, and valuable.",
      show: result
    }
  ];

  let currentState = -1;

  function setState(index) {
    if (index === currentState) return;
    currentState = index;

    // hide all icons
    [runner, structure, result].forEach((el) => {
      if (!el) return;
      el.style.opacity = 0;
      el.style.transform = "translateY(10px) scale(0.98)";
    });

    const state = states[index];

    // show active icon
    if (state.show) {
      state.show.style.opacity = 1;
      state.show.style.transform = "translateY(0) scale(1)";
    }

    // update text (fade out → in)
    if (title && copy) {
      title.style.opacity = 0;
      copy.style.opacity = 0;

      setTimeout(() => {
        title.textContent = state.title;
        copy.textContent = state.copy;

        title.style.opacity = 1;
        copy.style.opacity = 1;
      }, 120);
    }
  }

  function handleScroll() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress 0 → 1 through section
    const progress = Math.min(
      Math.max((vh - rect.top) / (vh + rect.height), 0),
      1
    );

    let index = 0;

    if (progress < 0.33) {
      index = 0;
    } else if (progress < 0.66) {
      index = 1;
    } else {
      index = 2;
    }

    setState(index);
  }

  // initial
  setState(0);

  // scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // also run on load in case already in view
  window.addEventListener('load', handleScroll);
})();
