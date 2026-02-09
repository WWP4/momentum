(() => {
  const $ = (s, r = document) => r.querySelector(s);

  const CREDIT_HOURS = 116; // your rule
  const DEFAULT_BOOKING_URL = "https://calendly.com/YOUR-ADVISOR-LINK"; // replace
  const DEFAULT_DEPOSIT_URL = "https://YOURPAYMENTLINK.com?amount=";   // replace

  const lengthToMinutes = (label) => {
    // Keep in sync with your form values
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

  const fmtInt = (n) => new Intl.NumberFormat().format(Math.round(n));

  const readPayload = () => {
    try {
      return JSON.parse(sessionStorage.getItem("mqEligibilityPayload") || "null");
    } catch {
      return null;
    }
  };

  const estimatePrice = (credits) => {
    // Replace with your real model later.
    // This just creates a believable range for the UI.
    if (!Number.isFinite(credits) || credits <= 0) return { low: 0, high: 0 };

    // Example: base + per-credit band (placeholder)
    const base = 299;
    const perCreditLow = 450;
    const perCreditHigh = 750;

    const low = base + credits * perCreditLow;
    const high = base + credits * perCreditHigh;

    return { low, high };
  };

  const noteFor = (credits) => {
    if (credits >= 2) return "Strong volume. Your program may support multiple credits pending verification.";
    if (credits >= 1) return "Good fit range. Next step is an advisory call to confirm verification requirements.";
    if (credits >= 0.5) return "Partial credit range. You may qualify depending on documentation and training structure.";
    return "Low estimated volume. You can still proceed — an advisor can outline pathways to qualify.";
  };

  document.addEventListener("DOMContentLoaded", () => {
    const payload = readPayload();

    // Wire CTAs (even if missing payload)
    const book = $("#ccBook");
    if (book) book.href = DEFAULT_BOOKING_URL;

    const depositBtn = $("#ccDepositBtn");
    const modal = $("#ccModal");
    const depositLink = $("#ccDepositLink");

    const openModal = () => {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "false");
    };
    const closeModal = () => {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
    };

    if (depositBtn) depositBtn.addEventListener("click", openModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        const t = e.target;
        if (t && t.getAttribute && t.getAttribute("data-close") === "1") closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    document.querySelectorAll("[data-deposit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const amt = btn.getAttribute("data-deposit");
        if (depositLink) depositLink.href = `${DEFAULT_DEPOSIT_URL}${encodeURIComponent(amt)}`;
      });
    });

    // If no payload, show fallback
    if (!payload) {
      $("#ccHours").textContent = "—";
      $("#ccCredits").textContent = "—";
      $("#ccMinutes").textContent = "—";
      $("#ccPrice").textContent = "—";
      $("#ccNote").textContent = "We couldn’t find your eligibility answers. Please go back and submit the form again.";
      return;
    }

    const sessions = sessionsToNumber(payload.training_sessions_per_week);
    const minsPerSession = lengthToMinutes(payload.session_length);
    const weeks = Number(payload.weeks_per_year || 0);

    const minutes = sessions * minsPerSession * weeks;
    const hours = minutes / 60;
    const credits = hours / CREDIT_HOURS;

    // Display
    $("#ccMinutes").textContent = fmtInt(minutes);
    $("#ccHours").textContent = fmtInt(hours);
    $("#ccCredits").textContent = credits >= 0.1 ? credits.toFixed(1) : credits.toFixed(2);
    $("#ccNote").textContent = noteFor(credits);

    const { low, high } = estimatePrice(credits);
    if (low <= 0) {
      $("#ccPrice").textContent = "Advisor review required";
      $("#ccPriceFine").textContent = "We’ll confirm pricing and eligibility on the call.";
    } else {
      $("#ccPrice").textContent = `$${fmtInt(low)} – $${fmtInt(high)}`;
      $("#ccPriceFine").textContent = "Final pricing is confirmed after eligibility review and verification requirements.";
    }
  });
})();
