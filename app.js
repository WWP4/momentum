/* Momentum — Combined App JS
   - Hero typing
   - Timeline reveal + rail fill
   - Steps reveal
   - Timeline -> WhyV2 arrival trigger
   - Parent quiz (Supabase insert)
*/

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     HERO TYPE
     ========================= */
  const hero = document.querySelector(".heroType");
  const letters = document.getElementById("wordmarkLetters");

  if (hero && letters) {
    const WORD = "MOMENTUM.";
    const TYPE_SPEED = 90;
    const FADE_SPEED = 260;
    const UNDERLINE_GAP = 160;
    const WIPE_DELAY = 140;

    letters.innerHTML = "";

    [...WORD].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = char;
      span.style.setProperty("--d", `${WIPE_DELAY + i * TYPE_SPEED}ms`);
      letters.appendChild(span);
    });

    const typingDuration = WIPE_DELAY + (WORD.length * TYPE_SPEED) + FADE_SPEED;
    hero.style.setProperty("--underlineDelay", `${typingDuration + UNDERLINE_GAP}ms`);
    hero.style.setProperty("--copyDelay", `${typingDuration + UNDERLINE_GAP + 180}ms`);

    requestAnimationFrame(() => hero.classList.add("is-ready"));
  }

  /* =========================
     TIMELINE REVEAL + FILL
     ========================= */
  const events = Array.from(document.querySelectorAll("[data-event]"));
  const fill = document.getElementById("railFill");

  if (events.length && "IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in", "is-active");
        events.forEach(e => { if (e !== entry.target) e.classList.remove("is-active"); });

        const idx = events.indexOf(entry.target);
        const pct = ((idx + 1) / events.length) * 100;
        if (fill) fill.style.height = `${pct}%`;
      });
    }, { threshold: 0.45 });

    events.forEach((el, i) => {
      el.style.transitionDelay = `${i * 160}ms`;
      io.observe(el);
    });
  } else {
    events.forEach((el) => el.classList.add("is-in"));
    if (fill) fill.style.height = "100%";
  }

  /* =========================
     HOW IT WORKS (REVEAL)
     ========================= */
  const steps = Array.from(document.querySelectorAll("[data-step]"));
  if (steps.length && "IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    steps.forEach((el, idx) => {
      el.style.transitionDelay = `${idx * 140}ms`;
      io.observe(el);
    });
  } else {
    steps.forEach((el) => el.classList.add("is-in"));
  }

  /* =========================
     HANDOFF: Timeline -> WhyV2 arrival
     (adds .is-arrived on .whyV2)
     ========================= */
  (function initWhyV2Arrival(){
    const whyV2 = document.querySelector(".whyV2");
    if (!whyV2 || prefersReduced || !("IntersectionObserver" in window)) return;

    // Prefer the LAST timeline event as the trigger
    const lastEvent = events.length ? events[events.length - 1] : (document.querySelector(".timeline") || null);
    if (!lastEvent) return;

    let fired = false;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || fired) return;
        fired = true;

        // premium micro pause so completion "lands"
        setTimeout(() => {
          whyV2.classList.add("is-arrived");
        }, 180);

        io.disconnect();
      });
    }, { threshold: 0.6 });

    io.observe(lastEvent);
  })();

  /* =========================
     QUIZ (Supabase)
     Requires supabase-js loaded in HTML BEFORE app.js
     ========================= */
  (function initParentQuiz(){
    const form = document.getElementById("momentumParentQuiz");
    if (!form) return;

    const SUPABASE_URL = "https://qtffckzarqcnstnskegx.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZmZja3phcnFjbnN0bnNrZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTQ4MjMsImV4cCI6MjA4NTIzMDgyM30.IWAPHYfVQNuhZoe4mAtDcSYjKYGR7qdwhb6AedBzWnA";

    if (!window.supabase) {
      console.warn("Supabase library not loaded. Include supabase-js script BEFORE app.js");
      return;
    }

    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const steps = Array.from(form.querySelectorAll(".mq__step")).filter(s => s.id !== "mqSubmitStep");
    const submitStep = document.getElementById("mqSubmitStep");

    const backBtn = document.getElementById("mqBack");
    const nextBtn = document.getElementById("mqNext");
    const submitBtn = document.getElementById("mqSubmitBtn");

    const stepNowEl = document.getElementById("mqStepNow");
    const stepTotalEl = document.getElementById("mqStepTotal");
    const hintEl = document.getElementById("mqHint");

    const barFill = document.querySelector(".mq__barFill");
    const bar = document.querySelector(".mq__bar");

    const submitTitle = document.getElementById("mqSubmitTitle");
    const submitMsg = document.getElementById("mqSubmitMsg");
    const tryAgain = document.getElementById("mqTryAgain");
    const spinner = submitStep ? submitStep.querySelector(".mq__spinner") : null;

    const scoreEl = document.getElementById("mqScore");
    const qualifiesEl = document.getElementById("mqQualifies");

    if (!steps.length || !submitStep || !backBtn || !nextBtn || !submitBtn) {
      console.warn("Quiz elements missing (steps/buttons/submitStep).");
      return;
    }

    let idx = 0;
    if (stepTotalEl) stepTotalEl.textContent = String(steps.length);

    function show(i){
      idx = Math.max(0, Math.min(steps.length - 1, i));
      form.querySelectorAll(".mq__step").forEach(s => s.classList.remove("is-active"));
      steps[idx].classList.add("is-active");

      const pct = steps.length === 1 ? 100 : Math.round((idx / (steps.length - 1)) * 100);
      if (barFill) barFill.style.width = `${pct}%`;
      if (bar) bar.setAttribute("aria-valuenow", String(pct));

      if (stepNowEl) stepNowEl.textContent = String(idx + 1);
      if (hintEl) hintEl.textContent = steps[idx].dataset.title || "";

      backBtn.disabled = idx === 0;

      const isLast = idx === steps.length - 1;
      nextBtn.style.display = isLast ? "none" : "inline-flex";
      submitBtn.style.display = isLast ? "inline-flex" : "none";
    }

    function getRadio(name){
      const el = form.querySelector(`input[name="${name}"]:checked`);
      return el ? el.value : "";
    }
    function getText(name){
      const el = form.querySelector(`[name="${name}"]`);
      return el ? String(el.value || "").trim() : "";
    }
    function getArray(name){
      return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
    }

    function validateStep(){
      const cur = steps[idx];
      cur.querySelectorAll(".mq__bad").forEach(el => el.classList.remove("mq__bad"));

      const required = Array.from(cur.querySelectorAll("[required]"));
      let firstBad = null;

      for (const el of required){
        if (el.type === "radio"){
          const name = el.name;
          if (!cur.querySelector(`input[name="${name}"]:checked`)){
            const group = el.closest(".mq__field") || el.closest(".mq__q") || cur;
            group.classList.add("mq__bad");
            firstBad = firstBad || group;
          }
        } else {
          if (!String(el.value || "").trim()){
            el.classList.add("mq__bad");
            firstBad = firstBad || el;
          }
        }
      }

      if (firstBad){
        firstBad.scrollIntoView({ behavior:"smooth", block:"center" });
        return false;
      }
      return true;
    }

    function computeScore(payload){
      let score = 0;

      if (payload.training_sessions_per_week === "5+") score += 3;
      else if (payload.training_sessions_per_week === "3–4") score += 2;
      else if (payload.training_sessions_per_week === "1–2") score += 1;

      if (payload.session_length === "90+ minutes") score += 2;
      else if (payload.session_length === "60–90 minutes") score += 1;

      score += Math.min(3, (payload.session_includes || []).length);

      if (payload.games_per_week === "4+") score += 2;
      else if (payload.games_per_week === "2–3") score += 1;

      score += Math.min(2, (payload.competition_types || []).length);
      if (payload.strength_conditioning && payload.strength_conditioning !== "No") score += 1;
      score += Math.min(2, (payload.recovery_practices || []).length);
      score += Math.min(2, (payload.nutrition_topics || []).length);
      score += Math.min(2, (payload.leadership_roles || []).length);
      score += Math.min(2, (payload.mental_performance || []).length);

      return score;
    }

    async function submit(){
      form.querySelectorAll(".mq__step").forEach(s => s.classList.remove("is-active"));
      submitStep.classList.add("is-active");

      if (spinner) spinner.style.display = "block";
      if (tryAgain) tryAgain.style.display = "none";
      if (submitTitle) submitTitle.textContent = "Submitting…";
      if (submitMsg) submitMsg.textContent = "Saving your answers.";

      const payload = {
        parent_name: getText("parent_name"),
        email: getText("email"),
        phone: getText("phone"),
        athlete_name: getText("athlete_name"),
        athlete_age_group: getRadio("athlete_age_group"),
        primary_sport: getText("primary_sport"),
        city: getText("city"),
        state: getText("state"),

        training_sessions_per_week: getRadio("training_sessions_per_week"),
        session_length: getRadio("session_length"),
        session_includes: getArray("session_includes"),

        games_per_week: getRadio("games_per_week"),
        competition_types: getArray("competition_types"),

        strength_conditioning: getRadio("strength_conditioning"),
        recovery_practices: getArray("recovery_practices"),

        nutrition_guidance: getRadio("nutrition_guidance"),
        nutrition_topics: getArray("nutrition_topics"),

        leadership_roles: getArray("leadership_roles"),
        character_emphasis: getArray("character_emphasis"),
        life_skills: getArray("life_skills"),
        mental_performance: getArray("mental_performance"),

        notes: getText("notes"),
        source: getText("source") || "momentum-site"
      };

      const score = computeScore(payload);
      const qualifies = score >= 8;

      payload.score = score;
      payload.qualifies = qualifies;

      if (scoreEl) scoreEl.value = String(score);
      if (qualifiesEl) qualifiesEl.value = qualifies ? "true" : "false";

      const { error } = await supabase.from("parent_applications").insert(payload);
      if (error) throw error;

      if (spinner) spinner.style.display = "none";
      if (submitTitle) submitTitle.textContent = "Submitted.";
      if (submitMsg) {
        submitMsg.textContent = qualifies
          ? "You’re a strong fit. We’ll follow up with next steps and confirm credit options."
          : "We received your application. We’ll follow up with next steps and recommendations.";
      }
    }

    backBtn.addEventListener("click", () => show(idx - 1));
    nextBtn.addEventListener("click", () => { if (validateStep()) show(idx + 1); });

    submitBtn.addEventListener("click", async () => {
      if (!validateStep()) return;
      submitBtn.disabled = true;
      try { await submit(); }
      catch (e){
        if (spinner) spinner.style.display = "none";
        if (submitTitle) submitTitle.textContent = "Couldn’t submit.";
        if (submitMsg) submitMsg.textContent = e?.message || "Please try again.";
        if (tryAgain) tryAgain.style.display = "inline-flex";
        submitBtn.disabled = false;
      }
    });

    if (tryAgain){
      tryAgain.addEventListener("click", () => {
        submitBtn.disabled = false;
        show(steps.length - 1);
      });
    }

    // Tap-to-select on choice cards
    form.addEventListener("click", (e) => {
      const choice = e.target.closest(".mq__choice");
      if (choice){
        const input = choice.querySelector("input");
        if (input && input.type === "radio") input.checked = true;
      }
    });

    show(0);
  })();
});
