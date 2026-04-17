const body = document.body;
const svg = document.getElementById('momentumLogo');
const clubForm = document.getElementById('clubForm');
const resultSection = document.getElementById('resultSection');
const messageOutput = document.getElementById('messageOutput');
const copyMessageBtn = document.getElementById('copyMessageBtn');
const editFormBtn = document.getElementById('editFormBtn');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const revealEls = document.querySelectorAll('.reveal');
const logoConfig = window.generatorLogoConfig || {};

function prepAndPlayLogo() {
  if (!svg) return;

  const paths = Array.from(svg.querySelectorAll('.draw'));
  const baseDelay = 300;
  const step = 120;
  const drawDur = 1850;
  const fillDur = 520;
  const fillDelay = 1420;
  const strokeFadeDelay = 1780;

  paths.forEach((p, i) => {
    let len = 1000;
    try {
      len = Math.ceil(p.getTotalLength());
    } catch (e) {}

    p.style.setProperty('--len', len);
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.style.setProperty('--drawDur', `${drawDur}ms`);
    p.style.setProperty('--fillDur', `${fillDur}ms`);

    const delay = baseDelay + (i * step);
    p.style.setProperty('--delay', `${delay}ms`);
    p.style.setProperty('--fillDelay', `${fillDelay}ms`);
    p.style.setProperty('--strokeFadeDelay', `${strokeFadeDelay}ms`);
  });

  svg.classList.remove('play');
  void svg.getBoundingClientRect();
  svg.classList.add('play');
}

function finishIntro() {
  body.classList.add('intro-complete');
}

function handleScrollButtons() {
  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setupReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.18
  });

  revealEls.forEach((el) => observer.observe(el));
}

function buildMessage(data) {
  const clubMessageBlock = data.clubMessage
    ? `${data.clubMessage}\n\n`
    : '';

  return `Hi ${data.clubName} families,

${data.clubName} is now partnering with Momentum to help athletes turn the training they are already doing into academic progress.

${clubMessageBlock}Momentum provides a clear path for families to understand how structured training may connect to academic credit opportunities.

Next step:
[INSERT CLUB LANDING PAGE LINK]

Contact:
${data.contactName}
${data.contactEmail}`;
}

function handleForm() {
  if (!clubForm) return;

  clubForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(clubForm);
    const data = {
      clubName: formData.get('clubName')?.toString().trim() || '',
      sportType: formData.get('sportType')?.toString().trim() || '',
      contactName: formData.get('contactName')?.toString().trim() || '',
      contactEmail: formData.get('contactEmail')?.toString().trim() || '',
      clubMessage: formData.get('clubMessage')?.toString().trim() || ''
    };

    const message = buildMessage(data);
    messageOutput.textContent = message;
    resultSection.hidden = false;

    setTimeout(() => {
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  });
}

function handleCopy() {
  if (!copyMessageBtn) return;

  copyMessageBtn.addEventListener('click', async () => {
    const text = messageOutput.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      copyMessageBtn.textContent = 'Copied';
      setTimeout(() => {
        copyMessageBtn.textContent = 'Copy Message';
      }, 1400);
    } catch (err) {
      copyMessageBtn.textContent = 'Copy Failed';
      setTimeout(() => {
        copyMessageBtn.textContent = 'Copy Message';
      }, 1400);
    }
  });
}

function handleEdit() {
  if (!editFormBtn) return;

  editFormBtn.addEventListener('click', () => {
    const formSection = document.getElementById('formSection');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

window.addEventListener('load', () => {
  prepAndPlayLogo();
  handleScrollButtons();
  setupReveals();
  handleForm();
  handleCopy();
  handleEdit();

  setTimeout(() => {
    finishIntro();
  }, 4300);
});
