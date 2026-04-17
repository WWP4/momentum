const svg = document.getElementById('momentumLogo');
const clubForm = document.getElementById('clubForm');
const resultSection = document.getElementById('resultSection');
const messageOutput = document.getElementById('messageOutput');
const copyMessageBtn = document.getElementById('copyMessageBtn');
const editFormBtn = document.getElementById('editFormBtn');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const revealEls = document.querySelectorAll('.reveal');

function prepAndPlayLogo() {
  if (!svg) return;

  const paths = Array.from(svg.querySelectorAll('.draw'));

  const baseDelay = 450;
  const step = 160;
  const drawDur = 5200;
  const fillDur = 1500;
  const fillDelayRed = 3200;
  const fillDelayOther = 3600;

  paths.forEach((path, i) => {
    let len = 1000;

    try {
      len = Math.ceil(path.getTotalLength());
    } catch (e) {}

    path.style.setProperty('--len', len);
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    path.style.setProperty('--drawDur', `${drawDur}ms`);
    path.style.setProperty('--fillDur', `${fillDur}ms`);

    const delay = baseDelay + (i * step);
    path.style.setProperty('--delay', `${delay}ms`);

    const fillDelay = path.classList.contains('is-red')
      ? fillDelayRed
      : fillDelayOther;

    path.style.setProperty('--fillDelay', `${fillDelay}ms`);
  });

  svg.classList.remove('play');
  void svg.getBoundingClientRect();
  svg.classList.add('play');
}

function handleScrollButtons() {
  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function setupReveals() {
  if (!revealEls.length) return;

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
  if (!clubForm || !messageOutput || !resultSection) return;

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
      resultSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 80);
  });
}

function handleCopy() {
  if (!copyMessageBtn || !messageOutput) return;

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
      formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
});
