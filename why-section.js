(function () {
  const section = document.querySelector('.why-section');
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
  let ticking = false;

  function setState(index) {
    if (index === current || !states[index]) return;
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

  function getScrollIndex() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    const progress = Math.min(
      Math.max((vh - rect.top) / (vh + rect.height), 0),
      1
    );

    if (progress < 0.34) return 0;
    if (progress < 0.68) return 1;
    return 2;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      setState(getScrollIndex());
      ticking = false;
    });
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.step || 0);
      setState(index);
    });
  });

  setState(0);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', onScroll);
})();
