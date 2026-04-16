const STORAGE_KEY = 'momentumClubActivationProfile';

const clubForm = document.getElementById('clubForm');
const clubInputView = document.getElementById('clubInputView');
const dashboardView = document.getElementById('dashboardView');
const parentLandingView = document.getElementById('parentLandingView');

const clubLinkText = document.getElementById('clubLinkText');
const openLandingBtn = document.getElementById('openLandingBtn');
const copyLandingBtn = document.getElementById('copyLandingBtn');
const editProfileBtn = document.getElementById('editProfileBtn');

const textMessage = document.getElementById('textMessage');
const emailMessage = document.getElementById('emailMessage');
const appMessage = document.getElementById('appMessage');

const graphicCanvas = document.getElementById('graphicCanvas');
const downloadGraphicBtn = document.getElementById('downloadGraphicBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

const state = {
  profile: null,
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 42);
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
  const t1 = `Hi ${profile.clubName} families — we partnered with Momentum to help students earn high school credit for structured ${profile.sportType.toLowerCase()} training they already complete. Learn more: ${link}`;

  const t2 = `Subject: ${profile.clubName} x Momentum Family Credit Opportunity\n\nDear families,\n\n${profile.clubName} has partnered with Momentum to provide a simple, credible pathway for students to earn academic credit for verified ${profile.sportType.toLowerCase()} training.\n\nHow it works:\n1) Review the club page\n2) Check eligibility\n3) Enroll if fit\n\nClub page: ${link}\n\nQuestions? Contact ${profile.contactName} at ${profile.contactEmail}.`;

  const t3 = `${profile.clubName} Announcement:\nMomentum enrollment is now open for eligible student-athletes. Families can review details and enroll here: ${link}\n\n${profile.clubMessage || 'Thank you for supporting student development in sport and school.'}`;

  return { t1, t2, t3 };
}

function drawGraphic(profile, link) {
  const ctx = graphicCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, graphicCanvas.width, graphicCanvas.height);

  ctx.fillStyle = '#090909';
  ctx.fillRect(40, 40, 1120, 550);

  ctx.fillStyle = '#be1e2d';
  ctx.fillRect(40, 480, 1120, 110);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px Arial';
  ctx.fillText('MOMENTUM x ' + profile.clubName.toUpperCase(), 80, 150);

  ctx.font = '32px Arial';
  ctx.fillText('Earn credit for structured training already happening.', 80, 215);

  ctx.font = '28px Arial';
  ctx.fillText('Check eligibility and enroll', 80, 540);

  ctx.font = '24px Arial';
  ctx.fillText(link, 80, 575);

  if (profile.logoDataUrl) {
    const logo = new Image();
    logo.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(905, 100, 210, 210);
      ctx.drawImage(logo, 920, 115, 180, 180);
    };
    logo.src = profile.logoDataUrl;
  }
}

function buildParentLanding(profile, link) {
  return `
    <article class="parent-landing">
      <div class="parent-hero">
        <img src="${profile.logoDataUrl}" alt="${profile.clubName} logo" />
        <div>
          <h2>${profile.clubName} + Momentum</h2>
          <p>Student-athlete credit pathway for ${profile.sportType} families.</p>
        </div>
      </div>

      <h3>Why ${profile.clubName} partnered with Momentum</h3>
      <p class="callout">Our club wants families to get formal academic recognition for the structured training athletes are already completing each week.</p>

      <h3>How it works</h3>
      <ol class="steps">
        <li>Check eligibility using Momentum's quick intake process.</li>
        <li>Submit training details and enrollment information.</li>
        <li>Receive guidance to convert verified training into credit options.</li>
      </ol>

      <h3>Momentum for families</h3>
      <p>Momentum supports a professional, academically credible process that fits club schedules and keeps communication clear for parents.</p>

      ${profile.clubMessage ? `<h3>Message from ${profile.clubName}</h3><p>${profile.clubMessage}</p>` : ''}

      <div class="row-actions">
        <a class="btn" href="#" onclick="alert('Eligibility flow placeholder.');return false;">Check eligibility / enroll</a>
        <button class="btn btn-outline" id="parentPdfBtn" type="button">Download parent PDF</button>
      </div>

      <p><strong>Direct link:</strong> ${link}</p>
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
  const body = [
    'Parent Information Packet',
    '',
    'What is Momentum?',
    'Momentum provides a professional process for students to pursue credit for structured training they already complete through club participation.',
    '',
    `Why ${profile.clubName} partnered with Momentum:`,
    'To support families with a clear, academically credible pathway connecting sport participation to educational outcomes.',
    '',
    'How students can earn credit:',
    '1) Complete the eligibility intake',
    '2) Verify training activity and schedule',
    '3) Follow Momentum enrollment guidance',
    '',
    'FAQ',
    '• Is this extra training? No, this focuses on training already happening.',
    '• Is this only for elite athletes? No, students are evaluated by eligibility criteria.',
    `• Who can answer questions? ${profile.contactName} (${profile.contactEmail})`,
    '',
    `Learn more / enroll: ${link}`,
  ];

  const wrapped = doc.splitTextToSize(body.join('\n'), 180);
  doc.text(wrapped, 14, 30);

  doc.addPage();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Next Steps for Families', 14, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const page2 = [
    '1. Review the club landing page information.',
    '2. Complete the eligibility/enrollment process.',
    '3. Keep communication open with your club contact and Momentum support.',
    '',
    'This handout is intended to remain concise, clear, and institutionally credible.',
    '',
    'Momentum',
  ];
  doc.text(doc.splitTextToSize(page2.join('\n'), 180), 14, 32);

  doc.save(`${profile.slug}-momentum-parent-packet.pdf`);
}

function copyElementText(id) {
  const target = document.getElementById(id);
  navigator.clipboard.writeText(target.textContent || '');
}

function renderDashboard(profile) {
  const link = parentUrl(profile);
  clubLinkText.textContent = link;
  openLandingBtn.href = link;

  const messages = makeMessages(profile, link);
  textMessage.textContent = messages.t1;
  emailMessage.textContent = messages.t2;
  appMessage.textContent = messages.t3;

  drawGraphic(profile, link);

  copyLandingBtn.onclick = () => navigator.clipboard.writeText(link);
  downloadGraphicBtn.onclick = () => downloadGraphic(profile);
  downloadPdfBtn.onclick = () => downloadPdf(profile, link);

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.onclick = () => copyElementText(btn.dataset.copy);
  });
}

function showDashboard(profile) {
  clubInputView.classList.add('hidden');
  parentLandingView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  renderDashboard(profile);
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

(function init() {
  const existing = readProfile();
  const clubQuery = new URLSearchParams(window.location.search).get('club');

  if (existing) {
    state.profile = existing;
    if (clubQuery) {
      showParentLanding(existing);
      return;
    }
    showDashboard(existing);
    return;
  }

  showForm();
})();
