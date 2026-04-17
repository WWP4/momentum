import { COURSES } from './courses-data.js';

const data = JSON.parse(localStorage.getItem('momentum_portal_data') || '{}');

const clubLogo = document.getElementById('clubLogo');
const clubLogoWrap = document.getElementById('clubLogoWrap');

const sport = document.getElementById('sport');
const headline = document.getElementById('headline');
const copy = document.getElementById('copy');
const contact = document.getElementById('contact');

const grid = document.getElementById('coursesGrid');

function init() {
  if (!data || !data.clubName) {
    document.body.innerHTML = '<p>No portal data found.</p>';
    return;
  }

  // HERO
  sport.textContent = `${data.clubName} · ${data.sportType}`;
  headline.textContent = data.heroHeadline;
  copy.textContent = data.clubMessage;
  contact.textContent = `Contact ${data.contactName} at ${data.contactEmail}`;

  if (data.clubLogo) {
    clubLogo.src = data.clubLogo;
    clubLogoWrap.hidden = false;
  }

  // COURSES
  const visibleCourses = COURSES.filter(c =>
    data.selectedCourses.includes(c.id)
  );

  grid.innerHTML = visibleCourses.map(course => `
    <div class="card">
      <h3>${course.title}</h3>
      <span>${course.credit} Credit</span>
      <p>${course.tagline}</p>
      <p>${course.description}</p>

      <div class="cardFooter">
        <strong>$${data.portalPrice}</strong>
        <button>Enroll Now</button>
      </div>
    </div>
  `).join('');
}

init();
