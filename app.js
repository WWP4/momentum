// app.js — Momentum landing (clean + slow cinematic hero)
// Safe guards everywhere. No heavy libraries.

function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function setStatus(msg, type) {
  const el = qs("#formStatus");
  if (!el) return;
  el.textContent = msg || "";
  el.classList.remove("is-ok", "is-error");
  if (type === "ok") el.classList.add("is-ok");
  if (type === "error") el.classList.add("is-error");
}

function serializeForm(form) {
  const data = new FormData(form);
  const obj = {};
  for (const [k, v] of data.entries()) obj[k] = String(v).trim();
  return obj;
}

/* =========================
   HERO: wipe + typewriter + underline (SLOW)
   ========================= */
function initHeroType() {
  const hero = qs(".heroType");
  const lettersEl = qs("#wordmarkLetters");
  if (!hero || !lettersEl) return;

  // Tune these for slower/faster feel
  const text = "MOMENTUM.";
  const step = 160;       // ms between letters (slower)
  const fade = 620;       // ms per letter fade-in (slower)
  const gap = 320;        // pause after last letter before underline
  const wipeDelay = 220;  // wipe begins immediately, letters start shortly after

  // Build letters with staggered delays (CSS reads --d)
  lettersEl.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const ch = document.createElement("span");
    ch.className = "ch";
    ch.textContent = text[i];
    ch.style.setProperty("--d", `${wipeDelay + (i * step)}ms`);
    lettersEl.appendChild(ch);
  }

  // Compute when underline + copy should animate
  const typingTotal = wipeDelay + ((text.length - 1) * step) + fade;
  hero.style.setProperty("--underlineDelay", `${typingTotal + gap}ms`);
  hero.style.setProperty("--copyDelay", `${typingTotal + gap + 260}ms`);

  // Trigger everything
  requestAnimationFrame(() => hero.classList.add("is-ready"));
}

/* =========================
   MOBILE NAV
   ========================= */
function initMobileNav() {
  const btn = qs(".navToggle");
  const panel = qs("#mobileNav");
  if (!btn || !panel) return;

  const close = () => {
    panel.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    panel.removeAttribute("hidden");
    btn.setAttribute("aria-expanded", "true");
  };

  btn.addEventListener("click", () => {
    const isOpen = !panel.hasAttribute("hidden");
    if (isOpen) close();
    else open();
  });

  qsa("#mobileNav a").forEach(a => a.addEventListener("click", close));
}

/* =========================
   SMOOTH SCROLL
   ========================= */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = qs(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });
}

/* =========================
   FORM (optional)
   ========================= */
function initApplyForm() {
  const form = qs("#applyForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", "");

    const payload = serializeForm(form);

    // Minimal required check (match your fields if/when you add them)
    // If your hero-only page has no form yet, this code simply won't run.
    const required = ["parentName", "email", "athleteName", "grade", "sport", "club", "schedule"];
    const missing = required.filter(k => !payload[k]);
    if (missing.length) {
      setStatus("Please complete all required fields.", "error");
      return;
    }

    const btn = qs('button[type="submit"]', form);
    const originalText = btn ? btn.textContent : "";

    try {
      if (btn) { btn.disabled = true; btn.textContent = "Submitting..."; }

      // Hook up your real endpoint here later:
      // await fetch("YOUR_ENDPOINT", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload)
      // });

      // Simulate success for now
      await new Promise(r => setTimeout(r, 750));

      setStatus("Application submitted. We will follow up with next steps shortly.", "ok");
      form.reset();
    } catch (err) {
      setStatus("Something went wrong submitting the form. Please try again.", "error");
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = originalText || "Submit Application"; }
    }
  });
}

/* =========================
   BOOT
   ========================= */
window.addEventListener("load", () => {
  initHeroType();
  initMobileNav();
  initSmoothScroll();
  initApplyForm();
});
