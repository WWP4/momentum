import { COURSES } from './courses-data.js';

const svg = document.getElementById('momentumLogo');
const clubForm = document.getElementById('clubForm');
const resultSection = document.getElementById('resultSection');
const editFormBtn = document.getElementById('editFormBtn');
const scrollButtons = document.querySelectorAll('[data-scroll]');
const revealEls = document.querySelectorAll('.reveal');

const courseSelector = document.getElementById('courseSelector');
const portalSport = document.getElementById('portalSport');
const portalHeadline = document.getElementById('portalHeadline');
const portalCopy = document.getElementById('portalCopy');
const portalContact = document.getElementById('portalContact');
const portalCoursesGrid = document.getElementById('portalCoursesGrid');
const portalClubLogo = document.getElementById('portalClubLogo');
const portalClubLogoWrap = document.getElementById('portalClubLogoWrap');

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

function getSelectedCourses(formData) {
  const selectedIds = formData.getAll('selectedCourses');

  return COURSES.filter((course) => selectedIds.includes(course.id));
}

function readLogoFile(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

function renderPortal(data) {
  if (!portalHeadline || !portalCopy || !portalCoursesGrid) return;

  portalSport.textContent = `${data.clubName} · ${data.sportType}`;
  portalHeadline.textContent = data.heroHeadline;
  portalCopy.textContent = data.clubMessage || `${data.clubName} families can explore Momentum courses designed to connect structured athletic training to real academic progress.`;
  portalContact.textContent = `Questions? Contact ${data.contactName} at ${data.contactEmail}`;

  if (data.clubLogo) {
    portalClubLogo.src = data.clubLogo;
    portalClubLogo.alt = `${data.clubName} logo`;
    portalClubLogoWrap.hidden = false;
  } else {
    portalClubLogo.removeAttribute('src');
    portalClubLogoWrap.hidden = true;
  }

  if (!data.selectedCourses.length) {
    portalCoursesGrid.innerHTML = `<div class="portalEmpty">No courses selected yet. Choose at least one course for this club.</div>`;
    return;
  }

  portalCoursesGrid.innerHTML = data.selectedCourses.map((course) => {
    return `
      <article class="portalCourseCard">
        <div class="portalCourseCard__top">
          <h4 class="portalCourseCard__title">${course.title}</h4>
          <span class="portalCourseCard__credit">${course.credit} Credit</span>
        </div>

        <p class="portalCourseCard__tagline">${course.tagline}</p>
        <p class="portalCourseCard__desc">${course.description}</p>

        <div class="portalCourseCard__footer">
          <div class="portalCourseCard__price">$${data.portalPrice}</div>
          <button class="portalCourseCard__btn" type="button" data-course-id="${course.id}">
            ${data.buttonText}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function handleForm() {
  if (!clubForm || !resultSection) return;

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
      selectedCourses: getSelectedCourses(formData),
      clubLogo: await readLogoFile(clubLogoFile instanceof File ? clubLogoFile : null)
    };

    renderPortal(data);
    resultSection.hidden = false;

    requestAnimationFrame(() => {
      resultSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
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
