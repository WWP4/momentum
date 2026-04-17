import { COURSES } from './courses-data.js';

const data = JSON.parse(localStorage.getItem('momentum_portal_data') || '{}');

/* ELEMENTS */
const clubLogo = document.getElementById('clubLogo');
const clubLogoWrap = document.getElementById('clubLogoWrap');

const clubNameText = document.getElementById('clubNameText');
const sport = document.getElementById('sport');
const headline = document.getElementById('headline');
const copy = document.getElementById('copy');
const partnerContact = document.getElementById('partnerContact');

const portalMeta = document.getElementById('portalMeta');
const coursesStats = document.getElementById('coursesStats');
const grid = document.getElementById('coursesGrid');

/* HELPERS */
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

/* META BAR */
function renderMeta() {
  if (!portalMeta) return;

  const parts = [
    data.clubName || 'Club Partner',
    data.sportType || 'Athlete Development',
    data.termLabel || 'Open Enrollment'
  ];

  portalMeta.innerHTML = parts
    .filter(Boolean)
    .map((part) => `<span class="utilityBar__item">${part}</span>`)
    .join('<span class="utilityBar__divider"></span>');
}

/* HERO */
function renderHero() {
  const clubName = data.clubName || 'Club Partner';
  const sportType = data.sportType || 'Momentum Academy';

  if (clubNameText) {
    clubNameText.textContent = clubName;
  }

  if (sport) {
    sport.textContent = `${clubName} · ${sportType}`;
  }

  if (headline) {
    headline.textContent =
      data.heroHeadline ||
      `Welcome to the ${clubName} × Momentum partner portal.`;
  }

  if (copy) {
    copy.textContent =
      data.clubMessage ||
      `This portal was created to help ${clubName} families understand the Momentum partnership, explore available courses, and move forward with clarity.`;
  }

  if (partnerContact) {
    const contactName = data.contactName || 'your club coordinator';
    const contactEmail = data.contactEmail || 'partnerships@momentumacademy.org';

    partnerContact.innerHTML = `
      Questions? Connect with <strong>${contactName}</strong> at 
      <a href="mailto:${contactEmail}">${contactEmail}</a>.
    `;
  }

  if (data.clubLogo && clubLogo && clubLogoWrap) {
    clubLogo.src = data.clubLogo;
    clubLogoWrap.hidden = false;
  }
}

/* COURSES */
function renderCourses() {
  if (!grid || !coursesStats) return;

  const selectedIds = asArray(data.selectedCourses);

  const visibleCourses = selectedIds.length
    ? COURSES.filter((c) => selectedIds.includes(c.id))
    : COURSES.slice(0, 6);

  const partnerPrice = formatPrice(data.portalPrice);

  const credits = visibleCourses.reduce(
    (sum, c) => sum + (Number(c.credit) || 0),
    0
  );

  coursesStats.innerHTML = `
    <span class="statPill">${visibleCourses.length} Courses</span>
    <span class="statPill">${credits || 'Flexible'} Credits</span>
    <span class="statPill">${partnerPrice}</span>
  `;

  if (!visibleCourses.length) {
    grid.innerHTML = `
      <div class="emptyState">
        No courses are currently available for this partner portal.
      </div>
    `;
    return;
  }

  grid.innerHTML = visibleCourses
    .map(
      (course) => `
        <article class="courseCard">
          <div class="courseCard__credit">
            ${course.credit || 'Flexible'} Credit
          </div>

          <h3>${course.title}</h3>

          <p class="courseCard__tagline">
            ${course.tagline || 'Built for student-athlete success'}
          </p>

          <p class="courseCard__description">
            ${course.description || ''}
          </p>

          <div class="cardFooter">
            <strong class="cardPrice">${partnerPrice}</strong>
            <a class="cardCta" href="course.html?course=${course.id}">
              Enroll
            </a>
          </div>
        </article>
      `
    )
    .join('');
}

/* INIT */
function init() {
  renderMeta();
  renderHero();
  renderCourses();
}

init();
