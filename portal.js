import { COURSES } from './courses-data.js';

const data = JSON.parse(localStorage.getItem('momentum_portal_data') || '{}');

const clubLogo = document.getElementById('clubLogo');
const clubLogoWrap = document.getElementById('clubLogoWrap');
const sport = document.getElementById('sport');
const headline = document.getElementById('headline');
const copy = document.getElementById('copy');
const partnerContact = document.getElementById('partnerContact');
const portalMeta = document.getElementById('portalMeta');
const coursesStats = document.getElementById('coursesStats');
const grid = document.getElementById('coursesGrid');

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatPrice(price) {
  const numeric = Number(price);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 'Partner Rate';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(numeric);
}

function renderMeta() {
  const parts = [
    data.clubName || 'Club Partner',
    data.sportType || 'Athlete Development',
    data.termLabel || 'Open Enrollment'
  ];

  portalMeta.innerHTML = parts
    .filter(Boolean)
    .map((part) => `<span class="utilityBar__item">${part}</span>`)
    .join('<span class="utilityBar__divider" aria-hidden="true"></span>');
}

function renderHero() {
  sport.textContent = `${data.clubName || 'Club Partner'} · ${data.sportType || 'Momentum Academy'}`;
  headline.textContent = data.heroHeadline || 'A partnership portal built for your athletes.';
  copy.textContent =
    data.clubMessage ||
    'Your club and Momentum are aligned on one goal: helping every student-athlete thrive in school and sport with flexible, real-world coursework.';

  const contactName = data.contactName || 'your club coordinator';
  const contactEmail = data.contactEmail || 'partnerships@momentumacademy.org';
  partnerContact.innerHTML = `Questions? Connect with <strong>${contactName}</strong> at <a href="mailto:${contactEmail}">${contactEmail}</a>.`;

  if (data.clubLogo) {
    clubLogo.src = data.clubLogo;
    clubLogoWrap.hidden = false;
  }
}

function renderCourses() {
  const selectedIds = asArray(data.selectedCourses);
  const visibleCourses = selectedIds.length
    ? COURSES.filter((course) => selectedIds.includes(course.id))
    : COURSES.slice(0, 6);

  const partnerPrice = formatPrice(data.portalPrice);
  const credits = visibleCourses.reduce((sum, course) => sum + (Number(course.credit) || 0), 0);

  coursesStats.innerHTML = [
    `<span class="statPill">${visibleCourses.length} Featured Courses</span>`,
    `<span class="statPill">${credits || 'Flexible'} Total Credits</span>`,
    `<span class="statPill">${partnerPrice} Preferred Rate</span>`
  ].join('');

  if (!visibleCourses.length) {
    grid.innerHTML = '<div class="emptyState">No courses are currently configured. Please refresh after your administrator updates the partnership catalog.</div>';
    return;
  }

  grid.innerHTML = visibleCourses
    .map(
      (course) => `
        <article class="courseCard">
          <div class="courseCard__credit">${course.credit || 'Flexible'} Credit</div>
          <h3>${course.title}</h3>
          <p class="courseCard__tagline">${course.tagline || 'Built for student-athlete success'}</p>
          <p class="courseCard__description">${course.description || 'Course details coming soon.'}</p>
          <div class="cardFooter">
            <strong class="cardPrice">${partnerPrice}</strong>
            <a class="cardCta" href="course-enrollment.html">Enroll Now</a>
          </div>
        </article>
      `
    )
    .join('');
}

function init() {
  renderMeta();
  renderHero();
  renderCourses();
}

init();
