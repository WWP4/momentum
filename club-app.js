/* Momentum Clubs Quiz (Partner Application)
   - Step navigation works even if Supabase loads after this script
   - Submit waits for Supabase briefly, then posts to Supabase
*/

(() => {
  "use strict";

  // ---------- Config (same as your current project) ----------
  const SUPABASE_URL = "https://qtffckzarqcnstnskegx.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZmZja3phcnFjbnN0bnNrZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTQ4MjMsImV4cCI6MjA4NTIzMDgyM30.IWAPHYfVQNuhZoe4mAtDcSYjKYGR7qdwhb6AedBzWnA";

  // Change this if your table name differs
  const TABLE_NAME = "club_applications";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function waitForSupabase({ timeoutMs = 4000, intervalMs = 100 } = {}) {
    return new Promise((resolve) => {
      const start = Date.now();
      const t = setInterval(() => {
        if (window.supabase && typeof window.supabase.createClient === "function") {
          clearInterval(t);
          resolve(true);
          return;
        }
        if (Date.now() - start >= timeoutMs) {
          clearInterval(t);
          resolve(false);
        }
      }, intervalMs);
    });
  }

  function serializeForm(form) {
    const fd = new FormData(form);
    const obj = {};
    for (const [k, v] of fd.entries()) {
      // handle multiple same-name fields
      if (obj[k] !== undefined) {
        obj[k] = Array.isArray(obj[k]) ? obj[k].concat(v) : [obj[k], v];
      } else {
        obj[k] = v;
      }
    }
    return obj;
  }

  function getStepFields(stepEl) {
    return $$("input, select, textarea", stepEl).filter((el) => !el.disabled);
  }

  function validateStep(stepEl) {
    const fields = getStepFields(stepEl);

    // Use HTML5 validity first
    for (const el of fields) {
      if (typeof el.checkValidity === "function" && !el.checkValidity()) {
        // Trigger native message UI
        if (typeof el.reportValidity === "function") el.reportValidity();
        el.focus?.();
        return false;
      }
    }
    return true;
  }

  // ---------- Main init ----------
  function initClubsQuiz() {
    const form = $("#momentumPartnerQuiz");
    if (!form) return;

    const steps = $$(".mq__step", form);
    if (!steps.length) return;

    const backBtn = $("#mqBack");
    const nextBtn = $("#mqNext");
    const submitBtn = $("#mqSubmitBtn");

    const stepNowEl = $("#mqStepNow");
    const stepTotalEl = $("#mqStepTotal");
    const hintEl = $("#mqHint");

    const bar = $(".mq__bar");
    const barFill = $(".mq__barFill");

    let idx = 0;

    function render() {
      steps.forEach((s, i) => s.classList.toggle("is-active", i === idx));

      const total = steps.length;
      const now = idx + 1;

      if (stepNowEl) stepNowEl.textContent = String(now);
      if (stepTotalEl) stepTotalEl.textContent = String(total);

      const title = steps[idx].getAttribute("data-title") || "";
      if (hintEl) hintEl.textContent = title;

      const pct = Math.round(((now - 1) / (total - 1)) * 100);
      if (bar) bar.setAttribute("aria-valuenow", String(pct));
      if (barFill) barFill.style.width = `${pct}%`;

      // Buttons
      if (backBtn) backBtn.disabled = idx === 0;

      const atLast = idx === total - 1;
      if (nextBtn) nextBtn.style.display = atLast ? "none" : "inline-flex";
      if (submitBtn) submitBtn.style.display = atLast ? "inline-flex" : "none";
    }

    function goNext() {
      if (!validateStep(steps[idx])) return;
      if (idx < steps.length - 1) idx += 1;
      render();
      // Scroll the form into view nicely
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function goBack() {
      if (idx > 0) idx -= 1;
      render();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function handleSubmit() {
      // Validate the final step
      if (!validateStep(steps[idx])) return;

      // Optionally validate all previous steps too:
      for (let i = 0; i < steps.length; i++) {
        if (!validateStep(steps[i])) {
          idx = i;
          render();
          return;
        }
      }

      // Disable buttons while submitting
      submitBtn && (submitBtn.disabled = true);
      backBtn && (backBtn.disabled = true);

      const payload = serializeForm(form);
      payload.submitted_at = new Date().toISOString();
      payload.source = "clubs";

      // Wait for Supabase even if script order is wrong
      const supaReady = await waitForSupabase({ timeoutMs: 5000 });
      if (!supaReady) {
        alert(
          "Submission failed: the Supabase library did not load. Fix by moving the Supabase <script> ABOVE app.js on this page."
        );
        submitBtn && (submitBtn.disabled = false);
        backBtn && (backBtn.disabled = false);
        return;
      }

      try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        const { error } = await client.from(TABLE_NAME).insert([payload]);

        if (error) throw error;

        // Success: send to thank-you / success step if you have one
        // If you have a success panel with id="mqSuccess", show it:
        const success = $("#mqSuccess");
        if (success) {
          steps.forEach((s) => s.classList.remove("is-active"));
          success.classList.add("is-active");
        } else {
          alert("Application submitted successfully.");
        }
      } catch (err) {
        console.error("Supabase submit error:", err);
        alert("Something went wrong submitting the application. Please try again.");
        submitBtn && (submitBtn.disabled = false);
        backBtn && (backBtn.disabled = false);
      }
    }

    // Wire buttons
    backBtn && backBtn.addEventListener("click", (e) => { e.preventDefault(); goBack(); });
    nextBtn && nextBtn.addEventListener("click", (e) => { e.preventDefault(); goNext(); });
    submitBtn && submitBtn.addEventListener("click", (e) => { e.preventDefault(); handleSubmit(); });

    // Prevent native submit (we handle it)
    form.addEventListener("submit", (e) => e.preventDefault());

    // Start
    idx = 0;
    render();
  }

  document.addEventListener("DOMContentLoaded", initClubsQuiz);
})();
