// Momentum Parent Landing - minimal JS for premium UX (no heavy libs)

function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function setStatus(msg, type){
  const el = qs("#formStatus");
  if(!el) return;
  el.textContent = msg || "";
  el.classList.remove("is-ok", "is-error");
  if(type === "ok") el.classList.add("is-ok");
  if(type === "error") el.classList.add("is-error");
}

function serializeForm(form){
  const data = new FormData(form);
  const obj = {};
  for(const [k,v] of data.entries()) obj[k] = String(v).trim();
  return obj;
}

window.addEventListener("load", () => {
  const hero = qs(".hero");
  if(hero) hero.classList.add("is-ready");
});

// Mobile nav toggle
(function(){
  const btn = qs(".navToggle");
  const panel = qs("#mobileNav");
  if(!btn || !panel) return;

  btn.addEventListener("click", () => {
    const open = !panel.hasAttribute("hidden");
    if(open){
      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }else{
      panel.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  // Close on link click
  qsa("#mobileNav a").forEach(a => {
    a.addEventListener("click", () => {
      panel.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Smooth scroll for in-page anchors
(function(){
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if(!id || id === "#") return;

      const target = qs(id);
      if(!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
})();

// Form handling (placeholder submission)
// Replace submit logic with Formspree / Netlify Forms / your CRM endpoint when ready.
(function(){
  const form = qs("#applyForm");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", "");

    const payload = serializeForm(form);

    // Basic validation
    if(!payload.parentName || !payload.email || !payload.athleteName || !payload.grade || !payload.sport || !payload.club || !payload.schedule){
      setStatus("Please complete all required fields.", "error");
      return;
    }

    const btn = qs('button[type="submit"]', form);
    if(btn){
      btn.disabled = true;
      btn.textContent = "Submitting...";
    }

    try{
      // OPTION A (FAST): Use Formspree
      // const FORM_ENDPOINT = "https://formspree.io/f/YOUR_ID";
      // const res = await fetch(FORM_ENDPOINT, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", "Accept":"application/json" },
      //   body: JSON.stringify(payload)
      // });

      // OPTION B (NETLIFY FUNCTIONS / YOUR API):
      // const res = await fetch("/.netlify/functions/parent-apply", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload)
      // });

      // For now, simulate a successful submit:
      await new Promise(r => setTimeout(r, 650));

      setStatus("Application submitted. We will follow up with next steps shortly.", "ok");
      form.reset();
    }catch(err){
      setStatus("Something went wrong submitting the form. Please try again.", "error");
    }finally{
      if(btn){
        btn.disabled = false;
        btn.textContent = "Submit Application";
      }
    }

    window.addEventListener("load", () => {
  const hero = document.querySelector(".heroType");
  const lettersEl = document.getElementById("wordmarkLetters");
  if(!hero || !lettersEl) return;

  const text = "MOMENTUM.";
  const step = 140;      // ms between letters (slow)
  const fade = 520;      // per-letter fade duration (matches CSS var --typeFade)
  const gap = 260;       // pause after last letter before underline
  const wipeDelay = 260; // let the wipe begin immediately but feel cinematic

  // Build letters with staggered animation delays
  lettersEl.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = text[i] === " " ? "\u00A0" : text[i];
    span.style.setProperty("--d", `${(i * step) + wipeDelay}ms`);
    lettersEl.appendChild(span);
  }

  // Compute underline + copy delays based on typing duration
  const typingTotal = (text.length - 1) * step + fade + wipeDelay;
  hero.style.setProperty("--underlineDelay", `${typingTotal + gap}ms`);
  hero.style.setProperty("--copyDelay", `${typingTotal + gap + 200}ms`);

  // Trigger reveal + animations
  requestAnimationFrame(() => hero.classList.add("is-ready"));
  });
})();
