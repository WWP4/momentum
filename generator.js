const STORAGE_KEY = 'momentumClubActivationProfile';
const MOMENTUM_LOGO_PATH = 'assets/assets/momentum-logo.png';

const clubForm = document.getElementById('clubForm');
const clubInputView = document.getElementById('clubInputView');
const dashboardView = document.getElementById('dashboardView');
const parentLandingView = document.getElementById('parentLandingView');

const launchClubLogo = document.getElementById('launchClubLogo');
const clubLinkText = document.getElementById('clubLinkText');
const openLandingBtn = document.getElementById('openLandingBtn');
const copyLandingBtn = document.getElementById('copyLandingBtn');
const editProfileBtn = document.getElementById('editProfileBtn');

const activeMessageContent = document.getElementById('activeMessageContent');
const copyActiveMessageBtn = document.getElementById('copyActiveMessageBtn');
const copyFeedback = document.getElementById('copyFeedback');

const graphicCanvas = document.getElementById('graphicCanvas');
const downloadGraphicBtn = document.getElementById('downloadGraphicBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));

const state = { profile: null, messages: null, activeTab: 'text' };

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 42);
}

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

function parentUrl(profile) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  return `${url.toString()}?club=${profile.slug}-${profile.id}`;
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function readProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function makeMessages(profile, link) {
  return {
    text: `Hi ${profile.clubName} families — we partnered with Momentum to help students earn high school credit for structured ${profile.sportType.toLowerCase()} training they already complete. Learn more: ${link}`,
    email: `Subject: ${profile.clubName} x Momentum Family Credit Opportunity\n\nDear families,\n\n${profile.clubName} is partnering with Momentum to help athletes and families turn structured ${profile.sportType.toLowerCase()} training into real academic progress.\n\nHow it works:\n1) Check eligibility\n2) Enroll\n3) Complete coursework tied to training\n\nClub page: ${link}\n\nQuestions? Contact ${profile.contactName} at ${profile.contactEmail}.`,
    app: `${profile.clubName} Announcement:\nMomentum enrollment is now open for eligible student-athletes. Families can review the full partnership details and next steps here: ${link}\n\n${profile.clubMessage || 'Thank you for supporting student development in both sport and school.'}`,
  };
}

function setActiveTab(tabKey) {
  state.activeTab = tabKey;
  tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabKey));
  activeMessageContent.textContent = state.messages?.[tabKey] || '';
}

function showCopied(text = 'Copied') {
  copyFeedback.textContent = text;
  copyFeedback.classList.add('show');
  setTimeout(() => copyFeedback.classList.remove('show'), 1200);
}

function drawGraphic(profile, link) {
  const ctx = graphicCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, graphicCanvas.width, graphicCanvas.height);

  ctx.fillStyle = '#171717';
  ctx.fillRect(44, 44, 1112, 542);

  ctx.fillStyle = '#b71e2d';
  ctx.fillRect(44, 472, 1112, 114);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 48px Inter, Arial';
  ctx.fillText('MOMENTUM x ' + profile.clubName.toUpperCase(), 88, 140);
  ctx.font = '400 30px Inter, Arial';
  ctx.fillText('Turn training already happening into academic credit.', 88, 198);
  ctx.font = '500 24px Inter, Arial';
  ctx.fillText(link, 88, 548);

  const clubLogo = new Image();
  const momentumLogo = new Image();
  let loaded = 0;

  const paintLogos = () => {
    loaded += 1;
    if (loaded < 2) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(900, 92, 220, 112);
    ctx.fillRect(900, 220, 220, 112);

    ctx.drawImage(clubLogo, 914, 106, 190, 84);
    ctx.drawImage(momentumLogo, 914, 236, 190, 84);
  };

  clubLogo.onload = paintLogos;
  momentumLogo.onload = paintLogos;
  clubLogo.src = profile.logoDataUrl;
  momentumLogo.src = MOMENTUM_LOGO_PATH;
}

function buildParentLanding(profile, link) {
  return `
    <article class="parent-landing">
      <section class="pl-hero" data-aos="fade-up" data-aos-duration="720">
        <div class="pl-logos">
          <img src="${profile.logoDataUrl}" alt="${profile.clubName} logo" />
          <span>x</span>
          <img src="${MOMENTUM_LOGO_PATH}" alt="Momentum logo" />
        </div>
        <p class="pl-eyebrow">${profile.clubName} Partnership Launch</p>
        <h2>Turn the training your athlete is already doing into academic credit.</h2>
        <p>${profile.clubName} is partnering with Momentum to help athletes and families turn structured ${profile.sportType.toLowerCase()} training into real academic progress.</p>
        <div class="row-actions">
          <a class="btn" href="#" onclick="alert('Eligibility flow placeholder.');return false;">Check Eligibility</a>
          <a class="btn btn-outline" href="#how-it-works">Learn How It Works</a>
        </div>
      </section>

      <section class="pl-section pl-split" data-aos="fade-up" data-aos-duration="760" data-aos-delay="90">
        <div>
          <h3>Why this partnership exists</h3>
          <p>Athletes are already putting in disciplined work every week. This partnership helps that work carry academic meaning with a pathway families can trust.</p>
          <p>${profile.clubMessage || `Our goal is to support each ${profile.sportType.toLowerCase()} athlete with stronger alignment between training and long-term student progress.`}</p>
        </div>
        <aside class="pl-highlight">
          <strong>For families</strong>
          <p>Clear process. Credible academics. Built around training already happening.</p>
        </aside>
      </section>

      <section class="pl-section" id="how-it-works" data-aos="fade-up" data-aos-duration="760" data-aos-delay="120">
        <h3>How it works</h3>
        <ol class="pl-steps">
          <li><span>1</span><div><strong>Check eligibility</strong><p>Families complete a quick intake to confirm fit.</p></div></li>
          <li><span>2</span><div><strong>Enroll in course</strong><p>Students enroll in the Momentum course pathway.</p></div></li>
          <li><span>3</span><div><strong>Complete modules</strong><p>Training + reflection modules are completed online.</p></div></li>
          <li><span>4</span><div><strong>Earn academic credit</strong><p>Verified work supports academic progress outcomes.</p></div></li>
        </ol>
      </section>

      <section class="pl-section" data-aos="fade-up" data-aos-duration="760" data-aos-delay="150">
        <h3>What families receive</h3>
        <div class="pl-features">
          <div><strong>Structured coursework</strong><p>Clear framework aligned with athlete development.</p></div>
          <div><strong>Flexible online format</strong><p>Designed to fit club schedules and family life.</p></div>
          <div><strong>Academic transcript value</strong><p>A more meaningful bridge between athletics and school.</p></div>
          <div><strong>Club-supported pathway</strong><p>${profile.contactName} is available for parent questions.</p></div>
        </div>
      </section>

      <section class="pl-section" data-aos="fade-up" data-aos-duration="760" data-aos-delay="180">
        <h3>Parent confidence / FAQ</h3>
        <div class="pl-faq">
          <details><summary>What is Momentum?</summary><p>Momentum is an academic pathway that helps students earn credit for structured training they are already doing.</p></details>
          <details><summary>Who qualifies?</summary><p>Students are reviewed through the eligibility process before enrollment.</p></details>
          <details><summary>How long do courses take?</summary><p>Course pacing is flexible and designed around active training schedules.</p></details>
          <details><summary>How does the credit work?</summary><p>Credit options are tied to verified coursework and program requirements.</p></details>
          <details><summary>Why did ${profile.clubName} partner with Momentum?</summary><p>To give families a trusted way to connect athletic effort with academic progress.</p></details>
        </div>
      </section>

      <section class="pl-section pl-final" data-aos="fade-up" data-aos-duration="760" data-aos-delay="220">
        <h3>Help your athlete turn existing training into academic progress.</h3>
        <div class="row-actions">
          <a class="btn" href="#" onclick="alert('Eligibility flow placeholder.');return false;">Get Started</a>
          <button class="btn btn-outline" id="parentPdfBtn" type="button">Download Parent PDF</button>
        </div>
        <p><strong>Club contact:</strong> ${profile.contactName} • ${profile.contactEmail}</p>
        <p><strong>Share this link with all families:</strong> ${link}</p>
      </section>
    </article>
  `;
}

function downloadGraphic(profile) {
  const a = document.createElement('a');
  a.href = graphicCanvas.toDataURL('image/png');
  a.download = `${profile.slug}-momentum-graphic.png`;
  a.click();
}

function downloadPdf(profile, link) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(`${profile.clubName} + Momentum`, 14, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  const lines = [
    'Parent Partnership Brief',
    '',
    `${profile.clubName} partnered with Momentum to help athletes convert structured ${profile.sportType.toLowerCase()} training into academic progress.`,
    '',
    'How it works:',
    '1) Check eligibility',
    '2) Enroll in course',
    '3) Complete modules tied to training',
    '4) Earn academic credit outcomes',
    '',
    'Why families care:',
    '• Professional, credible structure',
    '• Built around existing athlete workload',
    '• Clear contact and support process',
    '',
    `Club contact: ${profile.contactName} (${profile.contactEmail})`,
    `Launch page: ${link}`,
  ];

  doc.text(doc.splitTextToSize(lines.join('\n'), 178), 14, 30);
  doc.save(`${profile.slug}-momentum-parent-packet.pdf`);
}

function renderDashboard(profile) {
  const link = parentUrl(profile);
  launchClubLogo.src = profile.logoDataUrl;
  launchClubLogo.alt = `${profile.clubName} logo`;

  clubLinkText.textContent = link;
  openLandingBtn.href = link;

  state.messages = makeMessages(profile, link);
  setActiveTab(state.activeTab);
  drawGraphic(profile, link);

  copyLandingBtn.onclick = async () => {
    await navigator.clipboard.writeText(link);
    showCopied('Link copied');
  };

  copyActiveMessageBtn.onclick = async () => {
    await navigator.clipboard.writeText(state.messages?.[state.activeTab] || '');
    showCopied('Message copied');
  };

  downloadGraphicBtn.onclick = () => downloadGraphic(profile);
  downloadPdfBtn.onclick = () => downloadPdf(profile, link);
}

function showDashboard(profile) {
  clubInputView.classList.add('hidden');
  parentLandingView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  renderDashboard(profile);
  if (window.AOS) window.AOS.refreshHard();
}

function showForm(profile) {
  dashboardView.classList.add('hidden');
  parentLandingView.classList.add('hidden');
  clubInputView.classList.remove('hidden');

  if (!profile) return;
  clubForm.clubName.value = profile.clubName || '';
  clubForm.sportType.value = profile.sportType || '';
  clubForm.contactName.value = profile.contactName || '';
  clubForm.contactEmail.value = profile.contactEmail || '';
  clubForm.clubMessage.value = profile.clubMessage || '';
}

function showParentLanding(profile) {
  const link = parentUrl(profile);
  clubInputView.classList.add('hidden');
  dashboardView.classList.add('hidden');
  parentLandingView.classList.remove('hidden');
  parentLandingView.innerHTML = buildParentLanding(profile, link);

  const btn = document.getElementById('parentPdfBtn');
  if (btn) btn.onclick = () => downloadPdf(profile, link);
  if (window.AOS) window.AOS.refreshHard();
}

clubForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const logoFile = document.getElementById('clubLogo').files[0];
  if (!logoFile) return;

  const logoDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(logoFile);
  });

  const profile = {
    id: uid(),
    clubName: clubForm.clubName.value.trim(),
    sportType: clubForm.sportType.value.trim(),
    contactName: clubForm.contactName.value.trim(),
    contactEmail: clubForm.contactEmail.value.trim(),
    clubMessage: clubForm.clubMessage.value.trim(),
    logoDataUrl,
  };

  profile.slug = slugify(profile.clubName || 'club');
  state.profile = profile;
  saveProfile(profile);
  window.history.replaceState({}, '', parentUrl(profile));
  showDashboard(profile);
});

editProfileBtn.addEventListener('click', () => {
  showForm(state.profile);
  window.history.replaceState({}, '', window.location.pathname);
});

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});

(function init() {
  if (window.AOS) {
    window.AOS.init({ duration: 780, easing: 'ease-out-cubic', once: true, offset: 20, mirror: false });
  }

  const existing = readProfile();
  const clubQuery = new URLSearchParams(window.location.search).get('club');
  if (existing) {
    state.profile = existing;
    if (clubQuery) return showParentLanding(existing);
    return showDashboard(existing);
  }

  showForm();
})();
