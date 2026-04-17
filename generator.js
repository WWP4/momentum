import { COURSES } from './courses-data.js';

const svg = document.getElementById('momentumLogo');
const clubForm = document.getElementById('clubForm');
const editFormBtn = document.getElementById('editFormBtn');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const revealEls = document.querySelectorAll('.reveal');
const courseSelector = document.getElementById('courseSelector');

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

function buildCourseSelector() {
  if (!courseSelector) return;
  if (!Array.isArray(COURSES)) return;

  const starterIds = [
    'sports-training-performance',
    'strength-conditioning',
    'competitive-athletics'
  ];

  courseSelector.innerHTML = COURSES.map((course) => {
    const checked = starterIds.includes(course.id) ? 'checked' : '';

    return `
      <label class="courseOption">
        <input type="checkbox" name="selectedCourses" value="${course.id}" ${checked}>
        <span class="courseOption__body">
          <span class="courseOption__title">${course.title}</span>
          <span class="courseOption__meta">${course.credit} Credit · ${course.tagline}</span>
        </span>
      </label>
    `;
  }).join('');
}

function readLogoFile(file) {
  return new Promise((resolve) => {
    if (!(file instanceof File) || file.size === 0) {
      resolve('');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result?.toString() || '');
    };

    reader.onerror = () => {
      resolve('');
    };

    reader.readAsDataURL(file);
  });
}

function saveAndRedirect(data) {
  localStorage.setItem('momentum_portal_data', JSON.stringify(data));
  window.location.href = 'portal.html';
}

function handleForm() {
  if (!clubForm) return;

  clubForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(clubForm);
    const clubLogoFile = formData.get('clubLogo');

    const data = {
      clubName: formData.get('clubName')?.toString().trim() || '',
      sportType: formData.get('sportType')?.toString().trim() || '',
      contactName: formData.get('contactName')?.toString().trim() || '',
      contactEmail: formData.get('contactEmail')?.toString().trim() || '',
      clubMessage: formData.get('clubMessage')?.toString().trim() || '',
      heroHeadline: formData.get('heroHeadline')?.toString().trim() || '',
      portalPrice: formData.get('portalPrice')?.toString().trim() || '395',
      buttonText: formData.get('buttonText')?.toString().trim() || 'Enroll Now',
      selectedCourses: formData.getAll('selectedCourses'),
      clubLogo: await readLogoFile(clubLogoFile)
    };

    saveAndRedirect(data);
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
  buildCourseSelector();
  handleForm();
  handleEdit();
});
