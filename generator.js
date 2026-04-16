const STORAGE_KEY = 'momentumClubActivationProfile';

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

const state = {
  profile: null,
  messages: null,
  activeTab: 'text',
};

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
    email: `Subject: ${profile.clubName} x Momentum Family Credit Opportunity\n\nDear families,\n\n${profile.clubName} has partnered with Momentum to provide a clear, institutionally credible pathway for students to earn academic credit for verified ${profile.sportType.toLowerCase()} training.\n\nHow it works:\n1) Review the club page\n2) Check eligibility\n3) Enroll if fit\n\nClub page: ${link}\n\nQuestions? Contact ${profile.contactName} at ${profile.contactEmail}.`,
    app: `${profile.clubName} Announcement:\nMomentum enrollment is open for eligible student-athletes. Families can review details and enroll here: ${link}\n\n${profile.clubMessage || 'Thank you for supporting student development in both sport and school.'}`,
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

  ctx.fillStyle = '#151515';
  ctx.fillRect(46, 46, 1108, 538);

  ctx.fillStyle = '#b71e2d';
  ctx.fillRect(46, 484, 1108, 100);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 50px Inter, Arial';
  ctx.fillText('MOMENTUM x ' + profile.clubName.toUpperCase(), 88, 140);

  ctx.font = '400 30px Inter, Arial';
  ctx.fillText('Send families to your enrollment page this week.', 88, 202);

  ctx.font = '500 24px Inter, Arial';
  ctx.fillText(link, 88, 548);

  if (profile.logoDataUrl) {
    const logo = new Image();
    logo.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(910, 108, 200, 200);
      ctx.drawImage(logo, 920, 118, 180, 180);
    };
    logo.src = profile.logoDataUrl;
  }
}

function buildParentLanding(profile, link) {
  return `
    <article class="parent-landing" data-aos="fade-up" data-aos-duration="760">
      <div class="parent-hero">
        <img src="${profile.logoDataUrl}" alt="${profile.clubName} logo" />
        <div>
          <h2>${profile.clubName} + Momentum</h2>
          <p>Student-athlete credit pathway for ${profile.sportType} families.</p>
        </div>
      </div>

      <h3>Why ${profile.clubName} partnered with Momentum</h3>
      <p class="callout">Our club wants families to receive formal academic recognition for structured training athletes already complete each week.</p>

      <h3>How it works in three steps</h3>
      <ol class="steps">
        <li>Check eligibility using Momentum's intake process.</li>
        <li>Submit training details and enrollment information.</li>
        <li>Receive support to convert verified training into credit options.</li>
      </ol>

      <h3>Momentum for families</h3>
      <p>Momentum supports a professional, academically credible process that fits club schedules and keeps communication clear.</p>

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

  doc.text(doc.splitTextToSize(body.join('\n'), 180), 14, 30);
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
    const value = state.messages?.[state.activeTab] || '';
    await navigator.clipboard.writeText(value);
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
    window.AOS.init({
      duration: 780,
      easing: 'ease-out-cubic',
      once: true,
      offset: 20,
      mirror: false,
    });
  }

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
