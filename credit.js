// credit.js — rewritten to match your current credits.html exactly
// (No legacy IDs required; modal close works; credits inline populates)

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Rule: 116 hours = 1 credit
  const CREDIT_HOURS = 116;

  // Session storage key from your eligibility form
  const PAYLOAD_KEY = "mqEligibilityPayload";

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
      // If URL parsing fails (rare), fall back to appending
      const raw = aEl.getAttribute("href") || "";
      const sep = raw.includes("?") ? "&" : "?";
      aEl.setAttribute("href", `${raw}${sep}amount=${encodeURIComponent(String(amount))}`);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // Nodes used by your current HTML
    const hoursEl = $("#ccHours");
    const creditsEl = $("#ccCredits");
    const minutesEl = $("#ccMinutes");
    const noteEl = $("#ccNote");
    const creditsInlineEl = $("#ccCreditsInline");

    // Modal nodes
    const depositBtn = $("#ccDepositBtn");
    const modal = $("#ccModal");
    const depositLink = $("#ccDepositLink");
    const chips = $$("[data-deposit]");

    const openModal = () => {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "false");

      // Ensure some amount is selected by default
      const active = chips.find((c) => c.classList.contains("is-active")) || chips[0];
      if (active) {
        const amt = active.getAttribute("data-deposit");
        if (amt) setDepositAmountOnLink(depositLink, amt);
      }

      // Optional: prevent background scroll while open
      document.documentElement.style.overflow = "hidden";
    };

    const closeModal = () => {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      document.documentElement.style.overflow = "";
    };

    // Open modal
    if (depositBtn) depositBtn.addEventListener("click", openModal);

    // Close modal on any element with [data-close] (matches your HTML)
    if (modal) {
      modal.addEventListener("click", (e) => {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (t.closest("[data-close]")) closeModal();
      });
    }

    // Escape closes modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
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
      if (noteEl) noteEl.textContent = "We couldn’t find your eligibility answers. Please go back and submit the form again.";
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
    if (creditsInlineEl) creditsInlineEl.textContent = credits >= 0.1 ? `${credits.toFixed(1)} credits` : `${credits.toFixed(2)} credits`;
    if (noteEl) noteEl.textContent = noteFor(credits);
  });
})();
