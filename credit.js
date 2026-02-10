// credit.js — rewritten to match your current credits.html exactly
// + Deposit modal works
// + Credits inline populates
// + NEW: "Thanks / Next steps" modal only shows if credits >= 1.0, and only once per submission
// + Optional: copy-to-clipboard email block support (if you add the IDs)

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Rule: 116 hours = 1 credit
  const CREDIT_HOURS = 116;

  // Session storage key from your eligibility form
  const PAYLOAD_KEY = "mqEligibilityPayload";

  // Show the "Momentum received / next steps" modal only if they qualify
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

  const lengthToMinutes = (label) => {
    if (!label) return 0;
    // Keep in sync with your form values
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
    if (credits >= 2) return "Strong volume. Your program may support multiple credits pending verification.";
    if (credits >= 1) return "Good fit range. Next step is an advisory call to confirm verification requirements.";
    if (credits >= 0.5) return "Partial credit range. You may qualify depending on documentation and training structure.";
    return "Low estimated volume. You can still proceed — an advisor can outline pathways to qualify.";
  };

  const shouldShowThanks = (credits) => {
    if (!Number.isFinite(credits)) return false;
    if (credits < QUALIFY_CREDITS_MIN) return false;
    return sessionStorage.getItem(THANKS_SHOWN_KEY) !== "1";
  };

  const markThanksShown = () => sessionStorage.setItem(THANKS_SHOWN_KEY, "1");

  // Deposit URL updater:
  // - If href contains "{amount}", it replaces it.
  // - Else, sets/updates ?amount= in querystring.
  const setDepositAmountOnLink = (aEl, amount) => {
    if (!aEl) return;

    try {
      const raw = aEl.getAttribute("href") || "";
      if (!raw) return;

      // Placeholder replacement
      if (raw.includes("{amount}")) {
        aEl.setAttribute("href", raw.replaceAll("{amount}", encodeURIComponent(String(amount))));
        return;
      }

      // Querystring update
      const u = new URL(raw, window.location.origin);
      u.searchParams.set("amount", String(amount));
      aEl.setAttribute("href", u.toString());
    } catch {
      // If URL parsing fails, fall back to appending
      const raw = aEl.getAttribute("href") || "";
      const sep = raw.includes("?") ? "&" : "?";
      aEl.setAttribute("href", `${raw}${sep}amount=${encodeURIComponent(String(amount))}`);
    }
  };

  const lockScroll = () => {
    document.documentElement.style.overflow = "hidden";
  };
  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Nodes used by your current HTML
    const hoursEl = $("#ccHours");
    const creditsEl = $("#ccCredits");
    const minutesEl = $("#ccMinutes");
    const noteEl = $("#ccNote");
    const creditsInlineEl = $("#ccCreditsInline");

    // Deposit modal nodes (your existing modal)
    const depositBtn = $("#ccDepositBtn");
    const depositModal = $("#ccModal");
    const depositLink = $("#ccDepositLink");
    const chips = $$("[data-deposit]");

    const openDepositModal = () => {
      if (!depositModal) return;
      depositModal.setAttribute("aria-hidden", "false");

      // Ensure some amount is selected by default
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

    // Open deposit modal
    if (depositBtn) depositBtn.addEventListener("click", openDepositModal);

    // Close deposit modal on any element with [data-close] (matches your HTML)
    if (depositModal) {
      depositModal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-close]")) closeDepositModal();
      });
    }

    // Escape closes whichever modal is open
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      if (depositModal && depositModal.getAttribute("aria-hidden") === "false") {
        closeDepositModal();
        return;
      }

      const thanksModal = $("#mThanks");
      if (thanksModal && thanksModal.getAttribute("aria-hidden") === "false") {
        thanksModal.setAttribute("aria-hidden", "true");
        unlockScroll();
      }
    });

    // Chip selection updates deposit link + active UI
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

    // ===== Populate estimate =====
    const payload = readPayload();

    if (!payload) {
      if (hoursEl) hoursEl.textContent = "—";
      if (creditsEl) creditsEl.textContent = "—";
      if (minutesEl) minutesEl.textContent = "—";
      if (creditsInlineEl) creditsInlineEl.textContent = "—";
      if (noteEl) noteEl.textContent =
        "We couldn’t find your eligibility answers. Please go back and submit the form again.";
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
    if (creditsEl) creditsEl.textContent = credits >= 0.1 ? credits.toFixed(1) : credits.toFixed(2);
    if (creditsInlineEl)
      creditsInlineEl.textContent = credits >= 0.1 ? `${credits.toFixed(1)} credits` : `${credits.toFixed(2)} credits`;
    if (noteEl) noteEl.textContent = noteFor(credits);

    // ===== THANKS MODAL (optional) =====
    // Requires you to add HTML for:
    //  - #mThanks (wrapper with aria-hidden)
    //  - [data-close] inside it
    // Optional IDs:
    //  - #mThanksCopy (button)
    //  - #mThanksEmail (textarea or pre)
    //  - #mThanksDeposit (button/link) to open deposit modal
    //  - #mThanksEligibility (link) for eligibility page
    const thanksModal = $("#mThanks");

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

    if (thanksModal) {
      // Close on click of any [data-close] inside
      thanksModal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-close]")) closeThanks();
      });

      // Wire optional "Place deposit" inside thanks modal to open the real deposit modal
      const thanksDeposit = $("#mThanksDeposit");
      if (thanksDeposit) {
        thanksDeposit.addEventListener("click", (e) => {
          e.preventDefault();
          closeThanks();
          openDepositModal();
        });
      }

      // Copy email block (optional)
      const copyBtn = $("#mThanksCopy");
      const emailEl = $("#mThanksEmail");

      if (copyBtn && emailEl) {
        // If it's empty, auto-fill with a good default message + current page URL
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
            "[Facility]"
          ].join("\n");
        };

        copyBtn.addEventListener("click", async () => {
          const text = getEmailText();
          try {
            await navigator.clipboard.writeText(text);
            copyBtn.textContent = "Copied";
            setTimeout(() => (copyBtn.textContent = "Copy email"), 1200);
          } catch {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand("copy");
              copyBtn.textContent = "Copied";
              setTimeout(() => (copyBtn.textContent = "Copy email"), 1200);
            } finally {
              document.body.removeChild(ta);
            }
          }
        });
      }
    }

    // Show thanks only if qualified (>= 1 credit) and only once
    if (thanksModal && shouldShowThanks(credits)) {
      openThanks();
      markThanksShown();
    }
  });
})();
