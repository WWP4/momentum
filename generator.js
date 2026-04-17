const svg = document.getElementById('momentumLogo');
const clubForm = document.getElementById('clubForm');
const resultSection = document.getElementById('resultSection');
const messageOutput = document.getElementById('messageOutput');
const copyMessageBtn = document.getElementById('copyMessageBtn');
const editFormBtn = document.getElementById('editFormBtn');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const revealEls = document.querySelectorAll('.reveal');

function setupScrollButtons() {
  if (!scrollButtons.length) return;

  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (!target) return;

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function setupReveals() {
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  revealEls.forEach((el) => observer.observe(el));
}

function revealLogo() {
  if (!svg) return;

  svg.classList.add('logo-ready');

  const logoObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      svg.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.3
  });

  logoObserver.observe(svg);
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

    requestAnimationFrame(() => {
      resultSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function handleCopy() {
  if (!copyMessageBtn || !messageOutput) return;

  copyMessageBtn.addEventListener('click', async () => {
    const text = messageOutput.textContent || '';

    try {
      await navigator.clipboard.writeText(text);
      copyMessageBtn.textContent = 'Copied';
    } catch (err) {
      copyMessageBtn.textContent = 'Copy Failed';
    }

    window.setTimeout(() => {
      copyMessageBtn.textContent = 'Copy Message';
    }, 1400);
  });
}

function handleEdit() {
  if (!editFormBtn) return;

  editFormBtn.addEventListener('click', () => {
    const formSection = document.getElementById('formSection');
    if (!formSection) return;

    formSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  revealLogo();
  setupScrollButtons();
  setupReveals();
  handleForm();
  handleCopy();
  handleEdit();
});
