(function () {
  const section = document.querySelector('#whySection');
  if (!section) return;

  const stage = section.querySelector('#whyStage');
  const stepButtons = Array.from(section.querySelectorAll('.why-step'));
  const icons = Array.from(section.querySelectorAll('.why-icon'));
  const eyebrow = section.querySelector('#why-caption-eyebrow');
  const title = section.querySelector('#why-caption-title');
  const text = section.querySelector('#why-caption-text');

  const states = [
    {
      eyebrow: 'Training reality',
      title: 'Athletes are already putting in the work.',
      text: 'Practice, repetition, coaching, movement, and discipline already exist before Momentum enters the picture.',
      icon: '0'
    },
    {
      eyebrow: 'Academic structure',
      title: 'Momentum gives that effort a formal framework.',
      text: 'Training becomes organized into a clearer academic path with structure, sequence, and evaluation.',
      icon: '1'
    },
    {
      eyebrow: 'Visible outcome',
      title: 'The result becomes clearer, measurable, and more valuable.',
      text: 'What families already invest in starts to look more legible, more credible, and more academically meaningful.',
      icon: '2'
    }
  ];

  let current = -1;

  function setState(index) {
    if (!states[index] || index === current) return;
    current = index;

    const state = states[index];

    stage.setAttribute('data-step', String(index));

    stepButtons.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });

    icons.forEach((icon) => {
      icon.classList.toggle('is-live', icon.dataset.icon === state.icon);
    });

    if (eyebrow) eyebrow.textContent = state.eyebrow;
    if (title) title.textContent = state.title;
    if (text) text.textContent = state.text;
  }

  function getPinnedProgress() {
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;

    const rect = section.getBoundingClientRect();
    const scrolled = Math.min(Math.max(-rect.top, 0), total);

    return scrolled / total;
  }

  function updateFromScroll() {
    if (window.innerWidth <= 1040) {
      stage.style.setProperty('--why-progress', '0');
      setState(0);
      return;
    }

    const progress = getPinnedProgress();

    let index = 0;
    if (progress >= 0.66) index = 2;
    else if (progress >= 0.33) index = 1;

    setState(index);
    stage.style.setProperty('--why-progress', progress.toFixed(4));
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 1040) return;

      const index = Number(btn.dataset.step || 0);
      const total = section.offsetHeight - window.innerHeight;
      const targets = [0, 0.5, 1];
      const y = section.offsetTop + (total * targets[index]);

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    });
  });

  setState(0);
  updateFromScroll();

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  window.addEventListener('resize', updateFromScroll);
})();
