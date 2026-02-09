  function initFormFlow() {
    const form = $("#momentumPartnerQuiz");
    if (!form) {
      return;
    }

    const allSteps = $$(".mq__step", form);
    const submitStep = $("#mqSubmitStep", form);
    const steps = allSteps.filter((step) => step !== submitStep);
    if (!steps.length) {
      return;
    }

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

    stepTotal.textContent = String(steps.length);

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

      const requiredTextLike = $$('input[required]:not([type="radio"]), textarea[required], select[required]', step);
      requiredTextLike.forEach((input) => {
        if (!String(input.value || "").trim()) {
          valid = false;
          markBad(input);
        }
      });

      const requiredGroups = setRequiredGroups(step);
      requiredGroups.forEach((groupName) => {
        const checked = step.querySelector(`input[type="radio"][name="${groupName}"]:checked`);
        if (!checked) {
          valid = false;
          const first = step.querySelector(`input[type="radio"][name="${groupName}"]`);
          if (first) {
            markBad(first);
          }
        }
      });

      return valid;
    };

    const showStep = (index) => {
      steps.forEach((step, i) => {
        step.classList.toggle("is-active", i === index);
      });

      if (submitStep) {
        submitStep.classList.remove("is-active");
      }

      current = index;
      const percent = ((current + 1) / steps.length) * 100;
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }
      if (progressNode) {
        progressNode.setAttribute("aria-valuenow", String(Math.round(percent)));
      }
      if (stepNow) {
        stepNow.textContent = String(current + 1);
      }
      if (hint) {
        hint.textContent = steps[current].dataset.title || "";
      }

      if (backBtn) {
        backBtn.disabled = current === 0 || submitting;
      }

      const onLast = current === steps.length - 1;
      if (nextBtn) {
        nextBtn.style.display = onLast ? "none" : "inline-flex";
        nextBtn.disabled = submitting;
      }
      if (submitBtn) {
        submitBtn.style.display = onLast ? "inline-flex" : "none";
        submitBtn.disabled = submitting;
      }
    };

    const scoreMap = {
      training_sessions_per_week: { "1-2": 1, "3-4": 2, "5+": 3 },
      session_length: { "Under 60 minutes": 1, "60-90 minutes": 2, "90+ minutes": 3 },
      games_per_week: { "0-1": 1, "2-3": 2, "4+": 3 },
      strength_conditioning: {
        "Yes (coach-led)": 3,
        "Yes (partner / trainer-led)": 2,
        No: 0,
      },
      nutrition_guidance: {
        "Yes (formal instruction)": 3,
        "Yes (informal coaching conversations)": 2,
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

      const addCheckboxPoints = (name, max) => {
        const count = data.getAll(name).length;
        score += Math.min(count, max);
      };

      addCheckboxPoints("session_includes", 3);
      addCheckboxPoints("competition_types", 2);
      addCheckboxPoints("recovery_practices", 2);
      addCheckboxPoints("nutrition_topics", 2);
      addCheckboxPoints("leadership_roles", 2);
      addCheckboxPoints("character_emphasis", 2);
      addCheckboxPoints("life_skills", 2);
      addCheckboxPoints("mental_performance", 2);

      const qualifies = score >= 14 ? "high" : score >= 8 ? "moderate" : "early";

      if (scoreField) {
        scoreField.value = String(score);
      }
      if (qualifiesField) {
        qualifiesField.value = qualifies;
      }

      return { score, qualifies };
    };

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
      return payload;
    };

    const setSubmittingUI = (isSubmitting) => {
      submitting = isSubmitting;

      if (backBtn) {
        backBtn.disabled = isSubmitting || current === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = isSubmitting;
      }
      if (submitBtn) {
        submitBtn.disabled = isSubmitting;
      }
    };

    const showSubmitStep = () => {
      steps.forEach((step) => step.classList.remove("is-active"));
      if (submitStep) {
        submitStep.classList.add("is-active");
      }
      if (submitTitle) {
        submitTitle.textContent = "Submitting your profile...";
      }
      if (submitMsg) {
        submitMsg.textContent = "Reviewing your responses for partner qualification.";
      }
      if (tryAgainBtn) {
        tryAgainBtn.style.display = "none";
      }
    };

    const showSubmitSuccess = (qualifies) => {
      if (submitTitle) {
        submitTitle.textContent = "Application received";
      }
      if (submitMsg) {
        const tierCopy = {
          high: "Your profile looks like a strong fit. Our partner team will contact you with priority next steps.",
          moderate: "Your profile is in review. We will follow up with your qualification path and recommended rollout.",
          early: "Thanks for applying. We will contact you with guidance on the best next partner steps.",
        };
        submitMsg.textContent = tierCopy[qualifies] || tierCopy.moderate;
      }
    };

    const showSubmitError = () => {
      if (submitTitle) {
        submitTitle.textContent = "We could not submit right now";
      }
      if (submitMsg) {
        submitMsg.textContent = "Please try again. Your form data is still saved in this browser session.";
      }
      if (tryAgainBtn) {
        tryAgainBtn.style.display = "inline-flex";
      }
    };

    const submitToBackend = async (payload) => {
      const supabaseUrl = window.MOMENTUM_SUPABASE_URL;
      const supabaseAnonKey = window.MOMENTUM_SUPABASE_ANON_KEY;

      if (window.supabase && supabaseUrl && supabaseAnonKey) {
        const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        const { error } = await client.from("partner_applications").insert(payload);
        if (error) {
          throw error;
        }
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
    };

    const handleSubmit = async () => {
      if (!validateStep(steps[current])) {
        return;
      }

      const { qualifies } = computeScore();
      const payload = getPayload();

      showSubmitStep();
      setSubmittingUI(true);

      try {
        await submitToBackend(payload);
        showSubmitSuccess(qualifies);
      } catch (error) {
        console.error("Momentum submit error", error);
        showSubmitError();
      } finally {
        setSubmittingUI(false);
      }
    };

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (submitting) {
          return;
        }
        if (current > 0) {
          showStep(current - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (submitting) {
          return;
        }
        const step = steps[current];
        if (!validateStep(step)) {
          return;
        }
        if (current < steps.length - 1) {
          showStep(current + 1);
        }
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
        if (holder) {
          holder.classList.remove("mq__bad");
        }
      });
      input.addEventListener("input", () => {
        const holder = input.closest(".mq__choice, .mq__chip, .mq__field");
        if (holder) {
          holder.classList.remove("mq__bad");
        }
      });
    });

    showStep(0);
  }
})();
