(() => {
  const $ = (selector, root = document) => root.querySelector(selector);

  const COURSE_PRICE = 395;
  const COURSE_CREDIT = 1.0;
  const PAYLOAD_KEY = "mqEligibilityPayload";
  const SELECTED_COURSE_KEY = "mqSelectedCourse";

  const courses = {
    "sports-training-performance": {
      title: "Sports Training & Performance",
      category: "Performance",
      description:
        "A structured academic course built around training consistency, performance habits, logs, reflection, and measurable athletic development.",
    },
    "strength-conditioning": {
      title: "Strength & Conditioning",
      category: "Performance",
      description:
        "Focuses on disciplined physical preparation, conditioning structure, and documented athletic development connected to training routines.",
    },
    "high-performance-athletic-development": {
      title: "High-Performance Athletic Development",
      category: "Advanced Performance",
      description:
        "Designed for athletes in highly structured, rigorous environments with year-round expectations, performance reflection, and accountability.",
    },
    "competitive-athletics": {
      title: "Competitive Athletics",
      category: "Competition",
      description:
        "Examines athletic growth through structured competition, preparation, performance review, and academic reflection.",
    },
    "health-wellness-for-athletes": {
      title: "Health & Wellness for Athletes",
      category: "Wellness",
      description:
        "Covers athlete health, wellness routines, self-care, and the broader academic study of sustainable performance habits.",
    },
    "athletic-health-recovery": {
      title: "Athletic Health & Recovery",
      category: "Recovery",
      description:
        "Built around recovery strategies, body care, athlete wellness, and the role recovery plays in long-term athletic development.",
    },
    "nutrition-for-athletes": {
      title: "Nutrition for Athletes",
      category: "Nutrition",
      description:
        "Centers on athlete fueling, nutrition learning, performance-supporting habits, and written reflection tied to training.",
    },
    "sports-leadership": {
      title: "Sports Leadership",
      category: "Leadership",
      description:
        "Develops leadership through responsibility, initiative, communication, service, and reflection within a sports setting.",
    },
    "sportsmanship-character-development": {
      title: "Sportsmanship & Character Development",
      category: "Character",
      description:
        "Connects athletics to discipline, integrity, accountability, and character growth through structured academic work.",
    },
    "team-dynamics-communication": {
      title: "Team Dynamics & Communication",
      category: "Communication",
      description:
        "Focuses on teamwork, communication, collaboration, and leadership within training and competitive environments.",
    },
    "coaching-skills-athlete-mentorship": {
      title: "Coaching Skills & Athlete Mentorship",
      category: "Mentorship",
      description:
        "Designed for athletes who mentor others, assist younger players, and demonstrate coaching-related leadership behaviors.",
    },
    "sports-theory-analysis": {
      title: "Sports Theory & Analysis",
      category: "Academic Study",
      description:
        "Applies structured analysis to athletics, using training, performance, and sport environments as the context for academic learning.",
    },
    "sports-psychology-basics": {
      title: "Sports Psychology Basics",
      category: "Mental Performance",
      description:
        "Explores mindset, focus, confidence, and mental performance through reflective and structured course activities.",
    },
    "intro-to-coaching-theory": {
      title: "Intro to Coaching Theory",
      category: "Coaching",
      description:
        "Introduces coaching concepts, athlete development, communication, and the academic study of instruction in sports settings.",
    },
    "kinesiology-human-movement": {
      title: "Kinesiology & Human Movement",
      category: "Movement Science",
      description:
        "Studies movement, body mechanics, and physical performance in a structured training context.",
    },
    "exercise-science-foundations": {
      title: "Exercise Science Foundations",
      category: "Exercise Science",
      description:
        "A foundational academic course in exercise, training structure, physical development, and athletic preparation.",
    },
    "student-athlete-college-readiness": {
      title: "Student–Athlete College Readiness",
      category: "Readiness",
      description:
        "Supports students in preparing for higher expectations through disciplined habits, planning, and structured academic reflection.",
    },
    "leadership-in-sports-communities": {
      title: "Leadership in Sports Communities",
      category: "Leadership",
      description:
        "Expands athletic leadership into community influence, responsibility, and service-oriented development.",
    },
    "time-management-high-performance-students": {
      title: "Time Management for High-Performance Students",
      category: "Life Skills",
      description:
        "Built around balancing training, academic responsibilities, planning, and disciplined self-management.",
    },
    "personal-responsibility-goal-setting": {
      title: "Personal Responsibility & Goal Setting",
      category: "Life Skills",
      description:
        "Focuses on ownership, goal setting, growth habits, and structured personal development through sport-connected learning.",
    },
    "health-fitness-foundations": {
      title: "Health & Fitness Foundations",
      category: "Foundations",
      description:
        "A broad entry point into structured health, fitness, and athletic development coursework.",
    },
  };

  const getPayload = () => {
    try {
      return JSON.parse(sessionStorage.getItem(PAYLOAD_KEY) || "null");
    } catch {
      return null;
    }
  };

  const getQualificationLabel = (payload) => {
    if (!payload) return "Early fit";
    if (payload.qualifies === "high") return "Strong match";
    if (payload.qualifies === "moderate") return "Good match";
    return "Early fit";
  };

  const getCourseId = () => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("course");
    if (fromUrl) return fromUrl;

    try {
      const saved = JSON.parse(sessionStorage.getItem(SELECTED_COURSE_KEY) || "null");
      return saved?.id || null;
    } catch {
      return null;
    }
  };

  const saveSelectedCourse = ({ courseId, course, payload }) => {
    sessionStorage.setItem(
      SELECTED_COURSE_KEY,
      JSON.stringify({
        id: courseId,
        title: course.title,
        category: course.category,
        price: COURSE_PRICE,
        credit: COURSE_CREDIT,
        qualification: getQualificationLabel(payload),
      })
    );
  };

  document.addEventListener("DOMContentLoaded", () => {
    console.log("NEW course-enrollment.js loaded");

    const payload = getPayload();
    const courseId = getCourseId();
    const course = courses[courseId];

    const courseTitle = $("#courseTitle");
    const courseCategory = $("#courseCategory");
    const courseDescription = $("#courseDescription");
    const summaryCourse = $("#summaryCourse");
    const summaryQualification = $("#summaryQualification");

    const ackPrice = $("#ackPrice");
    const ackVerification = $("#ackVerification");
    const ackResponsibility = $("#ackResponsibility");
    const continueEnrollmentBtn = $("#continueEnrollmentBtn");
    const saveSelectionBtn = $("#saveSelectionBtn");
    const enrollError = $("#enrollError");

    if (!course) {
      if (courseTitle) courseTitle.textContent = "Course not found";
      if (courseCategory) courseCategory.textContent = "Unavailable";
      if (courseDescription) {
        courseDescription.textContent =
          "We could not identify the selected course. Please return to the recommended courses list and try again.";
      }
      if (summaryCourse) summaryCourse.textContent = "Unavailable";
    } else {
      if (courseTitle) courseTitle.textContent = course.title;
      if (courseCategory) courseCategory.textContent = course.category;
      if (courseDescription) courseDescription.textContent = course.description;
      if (summaryCourse) summaryCourse.textContent = course.title;
    }

    if (summaryQualification) {
      summaryQualification.textContent = getQualificationLabel(payload);
    }

    if (saveSelectionBtn && course) {
      saveSelectionBtn.addEventListener("click", () => {
        saveSelectedCourse({ courseId, course, payload });

        saveSelectionBtn.textContent = "Saved";
        window.setTimeout(() => {
          saveSelectionBtn.textContent = "Save selection";
        }, 1200);
      });
    }

    if (continueEnrollmentBtn) {
      continueEnrollmentBtn.addEventListener("click", async () => {
        console.log("Continue to payment clicked");

        const allChecked =
          ackPrice?.checked &&
          ackVerification?.checked &&
          ackResponsibility?.checked;

        if (!allChecked) {
          if (enrollError) enrollError.hidden = false;
          return;
        }

        if (enrollError) enrollError.hidden = true;

        if (!course) {
          alert("Course not found.");
          return;
        }

        saveSelectedCourse({ courseId, course, payload });

        try {
          continueEnrollmentBtn.disabled = true;
          continueEnrollmentBtn.textContent = "Redirecting...";

          const res = await fetch("/.netlify/functions/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId,
              courseTitle: course.title,
            }),
          });

          const data = await res.json().catch(() => ({}));

          if (!res.ok || !data.url) {
            throw new Error(data.error || "Could not start checkout.");
          }

          window.location.href = data.url;
        } catch (error) {
          console.error("Stripe checkout start error:", error);
          alert("We could not start payment right now. Please try again.");
          continueEnrollmentBtn.disabled = false;
          continueEnrollmentBtn.textContent = "Continue to payment";
        }
      });
    }

    [ackPrice, ackVerification, ackResponsibility].forEach((input) => {
      input?.addEventListener("change", () => {
        if (enrollError) enrollError.hidden = true;
      });
    });
  });
})();
