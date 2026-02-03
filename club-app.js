/* Momentum — Club App JS (Partner Application)
   - Hero typing
   - Timeline reveal + rail fill
   - Steps reveal
   - Timeline -> WhyV2 arrival trigger
   - Club quiz (Supabase insert) with "wait for supabase" safety
*/

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     HELPERS
     ========================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function waitForSupabase({ timeoutMs = 6000, intervalMs = 120 } = {}) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const t = setInterval(() => {
        const ok =
          window.supabase &&
          typeof window.supabase.createClient === "function";
        if (ok) {
          clearInterval(t);
          resolve(true);
          return;
        }
        if (Date.now() - start >= timeoutMs) {
          clearInterval(t);
          reject(new Error("Supabase library not loaded (timed out)."));
        }
      }, intervalMs);
    });
  }

  function safeAddClass(el, ...cls) {
    if (!el) return;
    el.classList.add(...cls);
  }

  /* =========================
     HERO TYPE
     ========================= */
  (function initHeroType() {
    const hero = $(".heroType");
    const letters = $("#wordmarkLetters");
    if (!hero || !letters) return;

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

    const typingDuration = WIPE_DELAY + WORD.length * TYPE_SPEED + FADE_SPEED;
    hero.style.setProperty(
      "--underlineDelay",
      `${typingDuration + UNDERLINE_GAP}ms`
    );
    hero.style.setProperty(
      "--copyDelay",
      `${typingDuration + UNDERLINE_GAP + 180}ms`
    );

    requestAnimationFrame(() => hero.classList.add("is-ready"));
  })();

  /* =========================
     TIMELINE REVEAL + FILL
     ========================= */
  const events = $$("[data-event]");
  const fill = $("#railFill");

  (function initTimeline() {
    if (!events.length) return;

    if ("IntersectionObserver" in window && !prefersReduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-in", "is-active");
            events.forEach((e) => {
              if (e !== entry.target) e.classList.remove("is-active");
            });

            const idx = events.indexOf(entry.target);
            const pct = ((idx + 1) / events.length) * 100;
            if (fill) fill.style.height = `${pct}%`;
          });
        },
        { threshold: 0.45 }
      );

      events.forEach((el, i) => {
        el.style.transitionDelay = `${i * 160}ms`;
        io.observe(el);
      });
    } else {
      events.forEach((el) => el.classList.add("is-in"));
      if (fill) fill.style.height = "100%";
    }
  })();

  /* =========================
     HOW IT WORKS (REVEAL)
     ========================= */
  (function initStepsReveal() {
    const steps = $$("[data-step]");
    if (!steps.length) return;

    if ("IntersectionObserver" in window && !prefersReduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.18 }
      );

      steps.forEach((el, idx) => {
        el.style.transitionDelay = `${idx * 140}ms`;
        io.observe(el);
      });
    } else {
      steps.forEach((el) => el.classList.add("is-in"));
    }
  })();

  /* =========================
     HANDOFF: Timeline -> WhyV2 arrival
     ========================= */
  (function initWhyV2Arrival() {
    const whyV2 = $(".whyV2");
    if (!whyV2 || prefersReduced || !("IntersectionObserver" in window)) return;

    const lastEvent = events.length
      ? events[events.length - 1]
      : $(".timeline") || null;
    if (!lastEvent) return;

    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || fired) return;
          fired = true;

          setTimeout(() => {
            whyV2.classList.add("is-arrived");
          }, 180);

          io.disconnect();
        });
      },
      { threshold: 0.6 }
    );

    io.observe(lastEvent);
  })();

  /* =========================
     CLUB QUIZ (Supabase)
     ========================= */
  (function initClubQuiz() {
    const form = $("#momentumPartnerQuiz");
    if (!form) return;

    const SUPABASE_URL = "https://qtffckzarqcnstnskegx.supabase.co";
    const SUPABASE_ANON_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZmZja3phcnFjbnN0bnNrZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTQ4MjMsImV4cCI6MjA4NTIzMDgyM30.IWAPHYfVQNuhZoe4mAtDcSYjKYGR7qdwhb6AedBzWnA";

    const steps = $$(".mq__step", form).filter((s) => s.id !== "mqSubmitStep");
    const submitStep = $("#mqSubmitStep");

    const backBtn = $("#mqBack");
    const nextBtn = $("#mqNext");
    const submitBtn = $("#mqSubmitBtn");

    const stepNowEl = $("#mqStepNow");
    const stepTotalEl = $("#mqStepTotal");
    const hintEl = $("#mqHint");

    const barFill = $(".mq__barFill");
    const bar = $(".mq__bar");

    const submitTitle = $("#mqSubmitTitle");
    const submitMsg = $("#mqSubmitMsg");
    const tryAgain = $("#mqTryAgain");
    const spinner = submitStep ? $(".mq__spinner", submitStep) : null;

    const scoreEl = $("#mqScore");
    const qualifiesEl = $("#mqQualifies");

    if (!steps.length || !submitStep || !backBtn || !nextBtn || !submitBtn) {
      console.warn("Club quiz elements missing (steps/buttons/submitStep).");
      return;
    }

    let idx = 0;
    if (stepTotalEl) stepTotalEl.textContent = String(steps.length);

    function show(i) {
      idx = Math.max(0, Math.min(steps.length - 1, i));

      $$(".mq__step", form).forEach((s) => s.classList.remove("is-active"));
      steps[idx].classList.add("is-active");

      const pct =
        steps.length === 1
          ? 100
          : Math.round((idx / (steps.length - 1)) * 100);

      if (barFill) barFill.style.width = `${pct}%`;
      if (bar) bar.setAttribute("aria-valuenow", String(pct));

      if (stepNowEl) stepNowEl.textContent = String(idx + 1);
      if (hintEl) hintEl.textContent = steps[idx].dataset.title || "";

      backBtn.disabled = idx === 0;

      const isLast = idx === steps.length - 1;
      nextBtn.style.display = isLast ? "none" : "inline-flex";
      submitBtn.style.display = isLast ? "inline-flex" : "none";
    }

    function getRadio(name) {
      const el = form.querySelector(`input[name="${name}"]:checked`);
      return el ? el.value : "";
    }
    function getText(name) {
      const el = form.querySelector(`[name="${name}"]`);
      return el ? String(el.value || "").trim() : "";
    }
    function getArray(name) {
      return $$( `input[name="${name}"]:checked`, form).map((i) => i.value);
    }

    function validateStep() {
      const cur = steps[idx];
      // remove previous error marks
      $$(".mq__bad", cur).forEach((el) => el.classList.remove("mq__bad"));

      const required = $$("[required]", cur);
      let firstBad = null;

      for (const el of required) {
        if (el.type === "radio") {
          const name = el.name;
          if (!cur.querySelector(`input[name="${name}"]:checked`)) {
            const group = el.closest(".mq__field") || el.closest(".mq__q") || cur;
            group.classList.add("mq__bad");
            firstBad = firstBad || group;
          }
        } else {
          if (!String(el.value || "").trim()) {
            el.classList.add("mq__bad");
            firstBad = firstBad || el;
          }
        }
      }

      if (firstBad) {
        firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
      }
      return true;
    }

    function computeScore(payload) {
      // Same scoring style as your parent quiz, tuned for partner eligibility signal
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
      if (payload.strength_conditioning && payload.strength_conditioning !== "No")
        score += 1;

      score += Math.min(2, (payload.recovery_practices || []).length);
      score += Math.min(2, (payload.nutrition_topics || []).length);
      score += Math.min(2, (payload.leadership_roles || []).length);
      score += Math.min(2, (payload.mental_performance || []).length);

      return score;
    }

    async function submit() {
      // swap to submit screen
      $$(".mq__step", form).forEach((s) => s.classList.remove("is-active"));
      submitStep.classList.add("is-active");

      if (spinner) spinner.style.display = "block";
      if (tryAgain) tryAgain.style.display = "none";
      if (submitTitle) submitTitle.textContent = "Submitting…";
      if (submitMsg) submitMsg.textContent = "Saving your answers.";

      // Make sure Supabase exists even if it loads after this file
      await waitForSupabase({ timeoutMs: 8000, intervalMs: 120 });
      const supabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );

      const payload = {
        // Step 1
        facility_name: getText("facility_name"),
        contact_name: getText("contact_name"),
        email: getText("email"),
        phone: getText("phone"),
        primary_sports: getText("primary_sports"),
        age_range: getRadio("age_range"),
        city: getText("city"),
        state: getText("state"),

        // Step 2–7 (names match your HTML)
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
        source: getText("source") || "momentum-site",
      };

      const score = computeScore(payload);
      const qualifies = score >= 8;
      payload.score = score;
      payload.qualifies = qualifies;

      if (scoreEl) scoreEl.value = String(score);
      if (qualifiesEl) qualifiesEl.value = qualifies ? "true" : "false";

      const { error } = await supabase.from("club_applications").insert(payload);
      if (error) throw error;

      // Optional: if you add a Netlify Function later, keep this.
      // It will not break if the function doesn't exist (we swallow 404).
    try {
  const res = await fetch("/.netlify/functions/momentum-club-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      contact_name: payload.contact_name,
      facility_name: payload.facility_name,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Email function failed:", txt);
    alert("Email failed to send — check console.");
  } else {
    console.log("Email sent successfully");
  }

} catch (err) {
  console.error("Email fetch error:", err);
  alert("Network error sending email");
}


      // success redirect
      window.location.href = "/redirect.html";
    }

    // NAV wiring
    backBtn.addEventListener("click", () => show(idx - 1));

    nextBtn.addEventListener("click", () => {
      if (validateStep()) show(idx + 1);
    });

    submitBtn.addEventListener("click", async () => {
      if (!validateStep()) return;
      submitBtn.disabled = true;

      try {
        await submit();
      } catch (e) {
        if (spinner) spinner.style.display = "none";
        if (submitTitle) submitTitle.textContent = "Couldn’t submit.";
        if (submitMsg)
          submitMsg.textContent = e?.message || "Please try again.";
        if (tryAgain) tryAgain.style.display = "inline-flex";
        submitBtn.disabled = false;
      }
    });

    if (tryAgain) {
      tryAgain.addEventListener("click", () => {
        submitBtn.disabled = false;
        show(steps.length - 1);
      });
    }

    // Tap-to-select on choice cards
    form.addEventListener("click", (e) => {
      const choice = e.target.closest(".mq__choice");
      if (!choice) return;
      const input = $("input", choice);
      if (input && input.type === "radio") input.checked = true;
    });

    show(0);
  })();
});
