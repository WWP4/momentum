(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const CREDIT_HOURS = 116;
  const PAYLOAD_KEY = "mqEligibilityPayload";
  const QUALIFY_CREDITS_MIN = 1.0;
  const THANKS_SHOWN_KEY = "mqThanksShown";

  const fmtInt = (n) => new Intl.NumberFormat().format(Math.round(n));

  const readPayload = () => {
    try {
      return JSON.parse(sessionStorage.getItem(PAYLOAD_KEY) || "null");
    } catch {
      return null;
    }
  };

  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) return [value];
    return [];
  };

  const lengthToMinutes = (label) => {
    if (!label) return 0;
    if (label.includes("Under 60")) return 50;
    if (label.includes("60-90") || label.includes("60–90")) return 75;
    if (label.includes("90+")) return 95;
    return 60;
  };

  const sessionsToNumber = (v) => {
    if (!v) return 0;
    if (v === "1-2" || v === "1–2") return 2;
    if (v === "3-4" || v === "3–4") return 4;
    if (v === "5+") return 5;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const noteFor = (credits) => {
    if (credits >= 2) {
      return "Strong volume. Your program may support multiple credits pending verification.";
    }
    if (credits >= 1) {
      return "Good fit range. Next step is an advisory call to confirm verification requirements.";
    }
    if (credits >= 0.5) {
      return "Partial credit range. You may qualify depending on documentation and training structure.";
    }
    return "Low estimated volume. You can still proceed — an advisor can outline pathways to qualify.";
  };

  const shouldShowThanks = (credits) => {
    if (!Number.isFinite(credits)) return false;
    if (credits < QUALIFY_CREDITS_MIN) return false;
    return sessionStorage.getItem(THANKS_SHOWN_KEY) !== "1";
  };

  const markThanksShown = () => {
    sessionStorage.setItem(THANKS_SHOWN_KEY, "1");
  };

  const setDepositAmountOnLink = (aEl, amount) => {
    if (!aEl) return;

    try {
      const raw = aEl.getAttribute("href") || "";
      if (!raw) return;

      if (raw.includes("{amount}")) {
        aEl.setAttribute(
          "href",
          raw.replaceAll("{amount}", encodeURIComponent(String(amount)))
        );
        return;
      }

      const u = new URL(raw, window.location.origin);
      u.searchParams.set("amount", String(amount));
      aEl.setAttribute("href", u.toString());
    } catch {
      const raw = aEl.getAttribute("href") || "";
      const sep = raw.includes("?") ? "&" : "?";
      aEl.setAttribute(
        "href",
        `${raw}${sep}amount=${encodeURIComponent(String(amount))}`
      );
    }
  };

  const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
  };

  const getQualificationLabel = (payload) => {
    if (!payload) return "Early fit";
    if (payload.qualifies === "high") return "Strong match";
    if (payload.qualifies === "moderate") return "Good match";
    return "Early fit";
  };

  const matchCourses = (payload) => {
    const courses = [
      {
        id: "sports-training-performance",
        title: "Sports Training & Performance",
        category: "Performance",
        shortDescription:
          "Structured study of training volume, consistency, performance habits, and measurable growth.",
        reasons: [],
        score: 0,
      },
      {
        id: "strength-conditioning",
        title: "Strength & Conditioning",
        category: "Performance",
        shortDescription:
          "Focuses on athletic preparation, physical development, and disciplined conditioning work.",
        reasons: [],
        score: 0,
      },
      {
        id: "high-performance-athletic-development",
        title: "High-Performance Athletic Development",
        category: "Advanced Performance",
        shortDescription:
          "For athletes in rigorous year-round environments with strong structure and accountability.",
        reasons: [],
        score: 0,
      },
      {
        id: "competitive-athletics",
        title: "Competitive Athletics",
        category: "Competition",
        shortDescription:
          "Explores competition, training application, and performance development in active sport settings.",
        reasons: [],
        score: 0,
      },
      {
        id: "health-wellness-for-athletes",
        title: "Health & Wellness for Athletes",
        category: "Wellness",
        shortDescription:
          "Covers athlete wellness, healthy habits, and the broader health side of training.",
        reasons: [],
        score: 0,
      },
      {
        id: "athletic-health-recovery",
        title: "Athletic Health & Recovery",
        category: "Recovery",
        shortDescription:
          "Built around recovery practices, body care, and sustainable athletic development.",
        reasons: [],
        score: 0,
      },
      {
        id: "nutrition-for-athletes",
        title: "Nutrition for Athletes",
        category: "Nutrition",
        shortDescription:
          "Centers on athlete fueling, nutrition education, and performance-supporting habits.",
        reasons: [],
        score: 0,
      },
      {
        id: "sports-leadership",
        title: "Sports Leadership",
        category: "Leadership",
        shortDescription:
          "Highlights leadership development through responsibility, example, and team influence.",
        reasons: [],
        score: 0,
      },
      {
        id: "sportsmanship-character-development",
        title: "Sportsmanship & Character Development",
        category: "Character",
        shortDescription:
          "Connects athletics to integrity, discipline, accountability, and character growth.",
        reasons: [],
        score: 0,
      },
      {
        id: "team-dynamics-communication",
        title: "Team Dynamics & Communication",
        category: "Communication",
        shortDescription:
          "Focuses on communication, teamwork, collaboration, and interpersonal growth in sport.",
        reasons: [],
        score: 0,
      },
      {
        id: "coaching-skills-athlete-mentorship",
        title: "Coaching Skills & Athlete Mentorship",
        category: "Mentorship",
        shortDescription:
          "Designed for athletes who help guide, support, or mentor younger players.",
        reasons: [],
        score: 0,
      },
      {
        id: "sports-theory-analysis",
        title: "Sports Theory & Analysis",
        category: "Academic Study",
        shortDescription:
          "Applies academic analysis to athletic training, performance, and sport systems.",
        reasons: [],
        score: 0,
      },
      {
        id: "sports-psychology-basics",
        title: "Sports Psychology Basics",
        category: "Mental Performance",
        shortDescription:
          "Explores confidence, focus, mindset, and mental performance development.",
        reasons: [],
        score: 0,
      },
      {
        id: "intro-to-coaching-theory",
        title: "Intro to Coaching Theory",
        category: "Coaching",
        shortDescription:
          "Introduces coaching concepts, athlete development, and instruction fundamentals.",
        reasons: [],
        score: 0,
      },
      {
        id: "kinesiology-human-movement",
        title: "Kinesiology & Human Movement",
        category: "Movement Science",
        shortDescription:
          "Studies athletic movement, mechanics, and the body in training contexts.",
        reasons: [],
        score: 0,
      },
      {
        id: "exercise-science-foundations",
        title: "Exercise Science Foundations",
        category: "Exercise Science",
        shortDescription:
          "Foundational academic study of exercise, training, and physical development.",
        reasons: [],
        score: 0,
      },
      {
        id: "student-athlete-college-readiness",
        title: "Student–Athlete College Readiness",
        category: "Readiness",
        shortDescription:
          "Supports students in preparing for higher expectations as serious student-athletes.",
        reasons: [],
        score: 0,
      },
      {
        id: "leadership-in-sports-communities",
        title: "Leadership in Sports Communities",
        category: "Leadership",
        shortDescription:
          "Expands leadership into influence, service, and responsibility within sports environments.",
        reasons: [],
        score: 0,
      },
      {
        id: "time-management-high-performance-students",
        title: "Time Management for High-Performance Students",
        category: "Life Skills",
        shortDescription:
          "Built around balancing training, academics, and disciplined scheduling.",
        reasons: [],
        score: 0,
      },
      {
        id: "personal-responsibility-goal-setting",
        title: "Personal Responsibility & Goal Setting",
        category: "Life Skills",
        shortDescription:
          "Focuses on ownership, self-management, and growth through intentional goal setting.",
        reasons: [],
        score: 0,
      },
      {
        id: "health-fitness-foundations",
        title: "Health & Fitness Foundations",
        category: "Foundations",
        shortDescription:
          "A broad entry point into health, fitness, and structured athletic development.",
        reasons: [],
        score: 0,
      },
    ];

    const courseMap = Object.fromEntries(courses.map((c) => [c.id, c]));

    const addScore = (id, points, reason) => {
      const course = courseMap[id];
      if (!course) return;
      course.score += points;
      if (reason && !course.reasons.includes(reason)) {
        course.reasons.push(reason);
      }
    };

    const sessions = sessionsToNumber(payload.training_sessions_per_week);
    const minutes = lengthToMinutes(payload.session_length);
    const weeks = Number(payload.weeks_per_year || 0);
    const games = sessionsToNumber(payload.games_per_week);

    const recovery = toArray(payload.recovery_guidance);
    const nutrition = toArray(payload.nutrition_education);
    const leadership = toArray(payload.leadership_responsibilities);
    const character = toArray(payload.character_development);
    const lifeSkills = toArray(payload.life_skills);
    const mental = toArray(payload.mental_performance);

    const trainingLoadHigh = sessions >= 4 && minutes >= 75 && weeks >= 24;
    const trainingLoadModerate = sessions >= 2 && weeks >= 12;
    const competitiveVolume = games >= 2;

    if (trainingLoadHigh) {
      addScore(
        "sports-training-performance",
        4,
        "Strong training volume and consistency"
      );
      addScore(
        "strength-conditioning",
        3,
        "Training structure supports physical development study"
      );
      addScore(
        "high-performance-athletic-development",
        4,
        "Year-round structure suggests advanced athletic development"
      );
      addScore(
        "competitive-athletics",
        2,
        "Training structure aligns with competitive athletics"
      );
      addScore(
        "exercise-science-foundations",
        2,
        "Training volume supports applied exercise science"
      );
      addScore(
        "kinesiology-human-movement",
        2,
        "Sustained training supports movement-based study"
      );
    } else if (trainingLoadModerate) {
      addScore(
        "sports-training-performance",
        3,
        "Consistent training supports structured performance study"
      );
      addScore(
        "strength-conditioning",
        2,
        "Regular training supports conditioning concepts"
      );
      addScore(
        "competitive-athletics",
        2,
        "Active participation supports athletics coursework"
      );
      addScore(
        "health-fitness-foundations",
        2,
        "Training base supports health and fitness coursework"
      );
    } else {
      addScore(
        "health-fitness-foundations",
        3,
        "Entry-level fit based on current training volume"
      );
      addScore(
        "health-wellness-for-athletes",
        2,
        "Broad wellness study fits current development stage"
      );
    }

    if (competitiveVolume) {
      addScore(
        "competitive-athletics",
        3,
        "Competition schedule supports athletics-focused coursework"
      );
      addScore(
        "sports-theory-analysis",
        1,
        "Competition creates context for analysis and reflection"
      );
    }

    if (recovery.length) {
      addScore(
        "athletic-health-recovery",
        4,
        "Recovery practices were included in the training profile"
      );
      addScore(
        "health-wellness-for-athletes",
        2,
        "Recovery habits support athlete wellness coursework"
      );
    }

    if (
      payload.nutrition_guidance_level === "Yes - formal instruction" ||
      payload.nutrition_guidance_level === "Yes — formal instruction"
    ) {
      addScore(
        "nutrition-for-athletes",
        4,
        "Formal nutrition instruction strongly supports this course"
      );
      addScore(
        "health-wellness-for-athletes",
        2,
        "Formal wellness guidance supports athlete health study"
      );
    } else if (
      payload.nutrition_guidance_level ===
        "Yes - informal coaching conversations" ||
      payload.nutrition_guidance_level ===
        "Yes — informal coaching conversations"
    ) {
      addScore(
        "nutrition-for-athletes",
        3,
        "Nutrition guidance supports course alignment"
      );
      addScore(
        "health-wellness-for-athletes",
        1,
        "Wellness conversations support athlete health study"
      );
    }

    if (nutrition.length) {
      addScore("nutrition-for-athletes", 3, "Nutrition education topics were selected");
    }

    if (leadership.length) {
      addScore("sports-leadership", 4, "Leadership responsibilities were identified");
      addScore(
        "leadership-in-sports-communities",
        3,
        "Leadership role suggests broader community leadership fit"
      );
      addScore(
        "team-dynamics-communication",
        2,
        "Leadership often overlaps with team communication"
      );
    }

    if (character.length) {
      addScore(
        "sportsmanship-character-development",
        4,
        "Character development was part of the program profile"
      );
      addScore(
        "personal-responsibility-goal-setting",
        2,
        "Character work supports personal responsibility coursework"
      );
    }

    if (lifeSkills.length) {
      addScore(
        "time-management-high-performance-students",
        3,
        "Life skills development supports time management coursework"
      );
      addScore(
        "personal-responsibility-goal-setting",
        3,
        "Life skills emphasis supports responsibility and goal setting"
      );
      addScore(
        "student-athlete-college-readiness",
        2,
        "Life skills development supports readiness coursework"
      );
    }

    if (mental.length) {
      addScore(
        "sports-psychology-basics",
        4,
        "Mental performance topics were included"
      );
      addScore(
        "personal-responsibility-goal-setting",
        1,
        "Mental training supports self-management and growth"
      );
    }

    if (payload.assist_coaches_younger_players === "Yes regularly") {
      addScore(
        "coaching-skills-athlete-mentorship",
        5,
        "Regular mentoring of younger athletes is a strong course match"
      );
      addScore(
        "intro-to-coaching-theory",
        4,
        "Coaching support aligns with introductory coaching study"
      );
      addScore("sports-leadership", 2, "Mentoring supports leadership development");
    } else if (payload.assist_coaches_younger_players === "Occasionally") {
      addScore(
        "coaching-skills-athlete-mentorship",
        3,
        "Some mentoring experience supports this course"
      );
      addScore(
        "intro-to-coaching-theory",
        2,
        "Occasional coaching support aligns with coaching foundations"
      );
    }

    if (payload.coach_led === "Yes") {
      addScore(
        "sports-theory-analysis",
        2,
        "Coach-led structure supports formal academic reflection"
      );
      addScore(
        "student-athlete-college-readiness",
        1,
        "Structured supervision supports readiness pathways"
      );
    }

    if (payload.can_verify === "Yes") {
      addScore(
        "sports-training-performance",
        1,
        "Verification capacity supports documented academic coursework"
      );
      addScore(
        "student-athlete-college-readiness",
        1,
        "Verification supports formal course participation"
      );
    }

    if (payload.qualifies === "high") {
      addScore(
        "high-performance-athletic-development",
        2,
        "Overall profile indicates strong qualification"
      );
      addScore(
        "sports-training-performance",
        2,
        "Overall profile indicates strong qualification"
      );
    } else if (payload.qualifies === "moderate") {
      addScore(
        "health-fitness-foundations",
        1,
        "Overall profile indicates a solid foundational fit"
      );
      addScore(
        "sports-training-performance",
        1,
        "Overall profile supports structured performance coursework"
      );
    } else {
      addScore(
        "health-fitness-foundations",
        2,
        "Overall profile suggests starting with foundational coursework"
      );
      addScore(
        "health-wellness-for-athletes",
        1,
        "Overall profile supports broad introductory wellness coursework"
      );
    }

    return courses
      .filter((course) => course.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((course, index) => {
        let confidence = "Possible fit";
        if (course.score >= 8) confidence = "Strong fit";
        else if (course.score >= 5) confidence = "Good fit";

        let group = "Additional eligible courses";
        if (index < 3) group = "Top matches";

        return {
          ...course,
          confidence,
          group,
        };
      });
  };

  const openCoursesModal = () => {
    const modal = $("#ccCoursesModal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    lockScroll();
  };

  const closeCoursesModal = () => {
    const modal = $("#ccCoursesModal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();
  };

  const renderCourseMatches = (payload) => {
  const list = $("#courseMatchesList");
  if (!list) return;

  const matches = matchCourses(payload);

  if (!matches.length) {
    list.innerHTML = `
      <div class="ccCourseCard">
        <div class="ccCourseCard__title">No course matches available yet</div>
        <p class="ccCourseCard__desc">Please review the eligibility form and try again.</p>
      </div>
    `;
    openCoursesModal();
    return;
  }

  const topMatches = matches.filter((m) => m.group === "Top matches");
  const additionalMatches = matches.filter(
    (m) => m.group === "Additional eligible courses"
  );
  const qualificationLabel = getQualificationLabel(payload);

  const renderCards = (items) =>
    items
      .map(
        (course) => `
          <article class="ccCourseCard">
            <div class="ccCourseCard__metaRow">
              <span class="ccCourseCard__pill">${course.category}</span>
              <span class="ccCourseCard__confidence">${course.confidence}</span>
            </div>

            <h3 class="ccCourseCard__title">${course.title}</h3>

            <p class="ccCourseCard__desc">${course.shortDescription}</p>

            <div class="ccCourseCard__why">
              <strong>Why it matched:</strong> ${course.reasons.join("; ")}
            </div>

            <div class="ccCourseCard__footer">
              <span class="ccCourseCard__qualify">${qualificationLabel}</span>

              <a 
                href="/course-enrollment.html?course=${encodeURIComponent(course.id)}"
                class="ccCourseCard__enrollBtn"
                data-course-id="${course.id}"
                data-course-title="${course.title}"
              >
                Enroll in this course
              </a>
            </div>
          </article>
        `
      )
      .join("");

  list.innerHTML = `
    ${
      topMatches.length
        ? `
        <div class="ccCourseGroup">
          <div class="ccCourseGroup__title">Top matches</div>
          <div class="ccCourseGrid">
            ${renderCards(topMatches)}
          </div>
        </div>
      `
        : ""
    }

    ${
      additionalMatches.length
        ? `
        <div class="ccCourseGroup">
          <div class="ccCourseGroup__title">Additional eligible courses</div>
          <div class="ccCourseGrid">
            ${renderCards(additionalMatches)}
          </div>
        </div>
      `
        : ""
    }
  `;

  list.querySelectorAll(".ccCourseCard__enrollBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-course-id");
      const title = btn.getAttribute("data-course-title");

      sessionStorage.setItem(
        "mqSelectedCourse",
        JSON.stringify({ id, title })
      );
    });
  });

  openCoursesModal();
};
  
  document.addEventListener("DOMContentLoaded", () => {
    const hoursEl = $("#ccHours");
    const creditsEl = $("#ccCredits");
    const minutesEl = $("#ccMinutes");
    const noteEl = $("#ccNote");
    const creditsInlineEl = $("#ccCreditsInline");

    const depositBtn = $("#ccDepositBtn");
    const depositModal = $("#ccModal");
    const depositLink = $("#ccDepositLink");
    const chips = $$("[data-deposit]");

    const seeCoursesBtn = $("#seeCoursesBtn");
    const coursesModal = $("#ccCoursesModal");
    const thanksModal = $("#mThanks");

    const openDepositModal = () => {
      if (!depositModal) return;
      depositModal.setAttribute("aria-hidden", "false");

      const active = chips.find((c) => c.classList.contains("is-active")) || chips[0];
      if (active) {
        const amt = active.getAttribute("data-deposit");
        if (amt) setDepositAmountOnLink(depositLink, amt);
      }

      lockScroll();
    };

    const closeDepositModal = () => {
      if (!depositModal) return;
      depositModal.setAttribute("aria-hidden", "true");
      unlockScroll();
    };

    const openThanks = () => {
      if (!thanksModal) return;
      thanksModal.setAttribute("aria-hidden", "false");
      lockScroll();
    };

    const closeThanks = () => {
      if (!thanksModal) return;
      thanksModal.setAttribute("aria-hidden", "true");
      unlockScroll();
    };

    if (depositBtn) {
      depositBtn.addEventListener("click", openDepositModal);
    }

    if (depositModal) {
      depositModal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-close]")) closeDepositModal();
      });
    }

    if (coursesModal) {
      coursesModal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-courses-close]")) closeCoursesModal();
      });
    }

    if (thanksModal) {
      thanksModal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-close]")) closeThanks();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      if (depositModal && depositModal.getAttribute("aria-hidden") === "false") {
        closeDepositModal();
        return;
      }

      if (coursesModal && coursesModal.getAttribute("aria-hidden") === "false") {
        closeCoursesModal();
        return;
      }

      if (thanksModal && thanksModal.getAttribute("aria-hidden") === "false") {
        closeThanks();
      }
    });

    const setActiveChip = (btn) => {
      chips.forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
    };

    chips.forEach((btn) => {
      btn.addEventListener("click", () => {
        const amt = btn.getAttribute("data-deposit");
        setActiveChip(btn);
        if (amt) setDepositAmountOnLink(depositLink, amt);
      });
    });

    const payload = readPayload();

    if (!payload) {
      if (hoursEl) hoursEl.textContent = "—";
      if (creditsEl) creditsEl.textContent = "—";
      if (minutesEl) minutesEl.textContent = "—";
      if (creditsInlineEl) creditsInlineEl.textContent = "—";
      if (noteEl) {
        noteEl.textContent =
          "We couldn’t find your eligibility answers. Please go back and submit the form again.";
      }
      return;
    }

    const sessions = sessionsToNumber(payload.training_sessions_per_week);
    const minsPerSession = lengthToMinutes(payload.session_length);
    const weeks = Number(payload.weeks_per_year || 0);

    const minutes = sessions * minsPerSession * weeks;
    const hours = minutes / 60;
    const credits = hours / CREDIT_HOURS;

    if (minutesEl) minutesEl.textContent = fmtInt(minutes);
    if (hoursEl) hoursEl.textContent = fmtInt(hours);
    if (creditsEl) {
      creditsEl.textContent =
        credits >= 0.1 ? credits.toFixed(1) : credits.toFixed(2);
    }
    if (creditsInlineEl) {
      creditsInlineEl.textContent =
        credits >= 0.1 ? `${credits.toFixed(1)} credits` : `${credits.toFixed(2)} credits`;
    }
    if (noteEl) noteEl.textContent = noteFor(credits);

    if (seeCoursesBtn) {
      seeCoursesBtn.addEventListener("click", () => {
        renderCourseMatches(payload);
      });
    }

    const thanksDeposit = $("#mThanksDeposit");
    if (thanksDeposit) {
      thanksDeposit.addEventListener("click", (e) => {
        e.preventDefault();
        closeThanks();
        openDepositModal();
      });
    }

    const copyBtn = $("#mThanksCopy");
    const emailEl = $("#mThanksEmail");

    if (copyBtn && emailEl) {
      const getEmailText = () => {
        const raw = "value" in emailEl ? emailEl.value : emailEl.textContent;
        const txt = (raw || "").trim();
        if (txt) return txt;

        const link = window.location.href;
        return [
          "Subject: Momentum eligibility + next steps",
          "",
          "Hi [Name],",
          "We just completed our Momentum eligibility check. Momentum converts verified training into academic credit (pending verification).",
          "",
          "Next step: Momentum will confirm eligibility requirements and the verification checklist for our program.",
          `If you’d like to review this together, here’s the eligibility summary: ${link}`,
          "",
          "Thanks,",
          "[Your Name]",
          "[Facility]",
        ].join("\n");
      };

      copyBtn.addEventListener("click", async () => {
        const text = getEmailText();

        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = "Copied";
          setTimeout(() => {
            copyBtn.textContent = "Copy email";
          }, 1200);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();

          try {
            document.execCommand("copy");
            copyBtn.textContent = "Copied";
            setTimeout(() => {
              copyBtn.textContent = "Copy email";
            }, 1200);
          } finally {
            document.body.removeChild(ta);
          }
        }
      });
    }

    if (thanksModal && shouldShowThanks(credits)) {
      openThanks();
      markThanksShown();
    }
  });
})();
