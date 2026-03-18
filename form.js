(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  document.addEventListener("DOMContentLoaded", () => {
    initFormFlow();
  });

  function initFormFlow() {
    const form = $("#momentumPartnerQuiz");
    if (!form) return;

    const allSteps = $$(".mq__step", form);
    const submitStep = $("#mqSubmitStep", form);
    const steps = allSteps.filter((step) => step !== submitStep);
    if (!steps.length) return;

    const progressBar = $(".mq__barFill");
    const progressNode = $(".mq__bar");
    const stepNow = $("#mqStepNow");
    const stepTotal = $("#mqStepTotal");
    const hint = $("#mqHint");
    const scoreField = $("#mqScore");
    const qualifiesField = $("#mqQualifies");

    const backBtn = $("#mqBack");
    const nextBtn = $("#mqNext");
    const submitBtn = $("#mqSubmitBtn");
    const tryAgainBtn = $("#mqTryAgain");
    const submitTitle = $("#mqSubmitTitle");
    const submitMsg = $("#mqSubmitMsg");

    let current = 0;
    let submitting = false;

    if (stepTotal) stepTotal.textContent = String(steps.length);

    /* ---------- Validation ---------- */

    const setRequiredGroups = (step) => {
      const requiredRadios = new Set(
        $$("input[type='radio'][required]", step).map((input) => input.name)
      );
      return [...requiredRadios];
    };

    const clearBadStates = (step) => {
      $$(".mq__bad", step).forEach((el) => el.classList.remove("mq__bad"));
    };

    const markBad = (field) => {
      const target = field.closest(".mq__choice, .mq__chip, .mq__field") || field;
      target.classList.add("mq__bad");
    };

    const validateStep = (step) => {
      clearBadStates(step);
      let valid = true;

      const requiredTextLike = $$(
        'input[required]:not([type="radio"]):not([type="checkbox"]), textarea[required], select[required]',
        step
      );

      requiredTextLike.forEach((input) => {
        if (!String(input.value || "").trim()) {
          valid = false;
          markBad(input);
        }
      });

      const requiredGroups = setRequiredGroups(step);
      requiredGroups.forEach((groupName) => {
        const checked = step.querySelector(
          `input[type="radio"][name="${CSS.escape(groupName)}"]:checked`
        );
        if (!checked) {
          valid = false;
          const first = step.querySelector(
            `input[type="radio"][name="${CSS.escape(groupName)}"]`
          );
          if (first) markBad(first);
        }
      });

      return valid;
    };

    /* ---------- Step UI ---------- */

    const showStep = (index) => {
      steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
      if (submitStep) submitStep.classList.remove("is-active");

      current = index;

      const percent = ((current + 1) / steps.length) * 100;
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressNode) {
        progressNode.setAttribute("aria-valuenow", String(Math.round(percent)));
      }
      if (stepNow) stepNow.textContent = String(current + 1);
      if (hint) hint.textContent = steps[current].dataset.title || "";

      if (backBtn) backBtn.disabled = current === 0 || submitting;

      const onLast = current === steps.length - 1;
      if (nextBtn) {
        nextBtn.style.display = onLast ? "none" : "inline-flex";
        nextBtn.disabled = submitting;
      }
      if (submitBtn) {
        submitBtn.style.display = onLast ? "inline-flex" : "none";
        submitBtn.disabled = submitting;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ---------- Scoring ---------- */

    const scoreMap = {
      training_sessions_per_week: {
        "1-2": 1,
        "3-4": 2,
        "5+": 3,
      },
      session_length: {
        "Under 60 minutes": 1,
        "60-90 minutes": 2,
        "90+ minutes": 3,
      },
      games_per_week: {
        "0-1": 1,
        "2-3": 2,
        "4+": 3,
      },
      nutrition_guidance_level: {
        "Yes - formal instruction": 3,
        "Yes — formal instruction": 3,
        "Yes - informal coaching conversations": 2,
        "Yes — informal coaching conversations": 2,
        No: 0,
      },
      assist_coaches_younger_players: {
        "Yes regularly": 3,
        Occasionally: 2,
        No: 0,
      },
      coach_led: {
        Yes: 2,
        "Not sure": 1,
        No: 0,
      },
      can_verify: {
        Yes: 3,
        "Not sure": 1,
        No: 0,
      },
    };

    const computeScore = () => {
      const data = new FormData(form);
      let score = 0;

      Object.entries(scoreMap).forEach(([field, map]) => {
        const value = data.get(field);
        if (value && Object.prototype.hasOwnProperty.call(map, value)) {
          score += map[value];
        }
      });

      const weeksPerYear = Number(data.get("weeks_per_year"));
      if (Number.isFinite(weeksPerYear)) {
        if (weeksPerYear >= 40) score += 3;
        else if (weeksPerYear >= 24) score += 2;
        else if (weeksPerYear >= 10) score += 1;
      }

      const addCheckboxPoints = (name, max) => {
        const count = data.getAll(name).length;
        score += Math.min(count, max);
      };

      addCheckboxPoints("recovery_guidance", 2);
      addCheckboxPoints("nutrition_education", 2);
      addCheckboxPoints("leadership_responsibilities", 2);
      addCheckboxPoints("character_development", 2);
      addCheckboxPoints("life_skills", 2);
      addCheckboxPoints("mental_performance", 2);

      const qualifies = score >= 16 ? "high" : score >= 9 ? "moderate" : "early";

      if (scoreField) scoreField.value = String(score);
      if (qualifiesField) qualifiesField.value = qualifies;

      return { score, qualifies };
    };

    /* ---------- Payload ---------- */

    const getPayload = () => {
      const data = new FormData(form);
      const payload = {};

      data.forEach((value, key) => {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          if (Array.isArray(payload[key])) {
            payload[key].push(value);
          } else {
            payload[key] = [payload[key], value];
          }
        } else {
          payload[key] = value;
        }
      });

      payload.created_at = new Date().toISOString();
      payload.source = payload.source || "eligibility";
      return payload;
    };

    /* ---------- Submit UI ---------- */

    const setSubmittingUI = (isSubmitting) => {
      submitting = isSubmitting;
      if (backBtn) backBtn.disabled = isSubmitting || current === 0;
      if (nextBtn) nextBtn.disabled = isSubmitting;
      if (submitBtn) submitBtn.disabled = isSubmitting;
    };

    const showSubmitStep = () => {
      steps.forEach((step) => step.classList.remove("is-active"));
      if (submitStep) submitStep.classList.add("is-active");

      if (submitTitle) submitTitle.textContent = "Submitting your profile...";
      if (submitMsg) submitMsg.textContent = "Reviewing your responses.";
      if (tryAgainBtn) tryAgainBtn.style.display = "none";
    };

    const showSubmitSuccess = (qualifies) => {
      if (submitTitle) submitTitle.textContent = "Submitted";
      if (submitMsg) {
        const tierCopy = {
          high: "Submission received. Preparing your credit estimate…",
          moderate: "Submission received. Preparing your credit estimate…",
          early: "Submission received. Preparing your credit estimate…",
        };
        submitMsg.textContent = tierCopy[qualifies] || tierCopy.moderate;
      }

      setTimeout(() => {
        window.location.href = "/credits.html";
      }, 900);
    };

    const showSubmitError = () => {
      if (submitTitle) submitTitle.textContent = "We could not submit right now";
      if (submitMsg) {
        submitMsg.textContent =
          "Please try again. Your form data is still saved in this browser session.";
      }
      if (tryAgainBtn) tryAgainBtn.style.display = "inline-flex";
    };

    /* ---------- DB payload mapper ---------- */

    const toArrayOrNull = (value) => {
      if (Array.isArray(value)) return value.length ? value : null;
      if (typeof value === "string" && value.trim()) return [value.trim()];
      return null;
    };

    const buildDbPayload = (payload, qualifiesTier, score) => {
      return {
        created_at: new Date().toISOString(),

        facility_name: payload.facility_name ?? null,
        contact_name: payload.contact_name ?? null,
        email: payload.email ?? null,
        phone: payload.phone ?? null,

        primary_sports: payload.primary_sports ?? null,
        age_range: payload.age_range ?? null,
        city: payload.city ?? null,
        state: payload.state ?? null,

        training_sessions_per_week: payload.training_sessions_per_week ?? null,
        session_length: payload.session_length ?? null,
        weeks_per_year: payload.weeks_per_year
          ? Number(payload.weeks_per_year)
          : null,

        session_includes: null,

        games_per_week: payload.games_per_week ?? null,
        competition_types: null,

        strength_conditioning: null,
        recovery_practices: toArrayOrNull(payload.recovery_guidance),

        nutrition_guidance: payload.nutrition_guidance_level ?? null,
        nutrition_topics: toArrayOrNull(payload.nutrition_education),

        leadership_roles: toArrayOrNull(payload.leadership_responsibilities),
        character_emphasis: toArrayOrNull(payload.character_development),
        life_skills: toArrayOrNull(payload.life_skills),
        mental_performance: toArrayOrNull(payload.mental_performance),

        assist_coaches_younger_players:
          payload.assist_coaches_younger_players ?? null,

        coach_led: payload.coach_led ?? null,
        can_verify: payload.can_verify ?? null,

        notes: payload.notes ?? null,

        qualifies: qualifiesTier === "high" || qualifiesTier === "moderate",
        score: Number.isFinite(score) ? score : null,

        source: payload.source ?? "eligibility",
      };
    };

    /* ---------- Backend insert (Supabase) ---------- */

    const submitToBackend = async (dbPayload) => {
      const supabaseUrl = window.SUPABASE_URL;
      const supabaseAnonKey = window.SUPABASE_API;

      if (!window.supabase || !supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          "Supabase not configured properly (missing SUPABASE_URL or SUPABASE_API)."
        );
      }

      const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await client
        .from("partner_applications")
        .insert([dbPayload]);

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
    };

    /* ---------- Automated email ---------- */

    const sendAutomatedEmail = async (payload, qualifiesTier, score) => {
      try {
        const body = {
          ...payload,
          qualifies: qualifiesTier,
          score,
          source: payload.source || "eligibility",
          email_type: "customer_next_steps",
        };

        const res = await fetch("/.netlify/functions/momentum-club-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const out = await res.json().catch(() => ({}));
          console.warn("Automated email function error:", out);
        }
      } catch (err) {
        console.warn("Automated email failed:", err);
      }
    };

    /* ---------- Submit handler ---------- */

    const handleSubmit = async () => {
      if (!validateStep(steps[current])) return;

      const { qualifies, score } = computeScore();
      const payload = getPayload();

      sessionStorage.setItem(
        "mqEligibilityPayload",
        JSON.stringify({ ...payload, qualifies, score })
      );

      showSubmitStep();
      setSubmittingUI(true);

      try {
        const dbPayload = buildDbPayload(payload, qualifies, score);

        await submitToBackend(dbPayload);

        sendAutomatedEmail(payload, qualifies, score);

        showSubmitSuccess(qualifies);
      } catch (error) {
        console.error("Momentum submit error", error);
        showSubmitError();
      } finally {
        setSubmittingUI(false);
      }
    };

    /* ---------- Events ---------- */

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (submitting) return;
        if (current > 0) showStep(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (submitting) return;
        const step = steps[current];
        if (!validateStep(step)) return;
        if (current < steps.length - 1) showStep(current + 1);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", handleSubmit);
    }

    if (tryAgainBtn) {
      tryAgainBtn.addEventListener("click", () => {
        showStep(current);
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    $$("input, textarea, select", form).forEach((input) => {
      input.addEventListener("change", () => {
        const holder = input.closest(".mq__choice, .mq__chip, .mq__field");
        if (holder) holder.classList.remove("mq__bad");
      });

      input.addEventListener("input", () => {
        const holder = input.closest(".mq__choice, .mq__chip, .mq__field");
        if (holder) holder.classList.remove("mq__bad");
      });
    });

    showStep(0);
  }
})();
