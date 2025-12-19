/* =========================================================
   MOMENTUM MINDSET — DAILY CHECK-IN
   Isolated Section Controller
========================================================= */

(function () {
  const section = document.querySelector(".mindset-checkin");
  if (!section) return; // section not on this page

  const options = section.querySelectorAll(".checkin-option");
  const extra = section.querySelector(".checkin-extra");
  const share = section.querySelector(".checkin-share");
  const submit = section.querySelector(".submit-checkin");
  const textarea = section.querySelector("textarea");

  let selectedValue = null;

  /* -------------------------------------------------------
     OPTION SELECTION
  ------------------------------------------------------- */
  options.forEach(option => {
    option.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");

      selectedValue = option.dataset.value;

      revealExtras();
      enableSubmit();
    });
  });

  /* -------------------------------------------------------
     REVEAL FLOW (IMMERSIVE)
  ------------------------------------------------------- */
  function revealExtras() {
    extra.classList.remove("hidden");
    share.classList.remove("hidden");

    extra.style.opacity = "0";
    share.style.opacity = "0";

    requestAnimationFrame(() => {
      extra.style.transition = "opacity .3s ease";
      share.style.transition = "opacity .3s ease";
      extra.style.opacity = "1";
      share.style.opacity = "1";
    });
  }

  /* -------------------------------------------------------
     SUBMIT ENABLE
  ------------------------------------------------------- */
  function enableSubmit() {
    submit.classList.add("enabled");
    submit.disabled = false;
  }

  /* -------------------------------------------------------
     SUBMIT CHECK-IN
  ------------------------------------------------------- */
  submit.addEventListener("click", () => {
    if (!selectedValue) return;

    const note = textarea?.value?.trim() || "";
    const shareValue = section.querySelector(
      "input[name='share']:checked"
    )?.nextSibling?.textContent?.trim() || "Just me";

    const payload = {
      feeling: selectedValue,
      note,
      visibility: shareValue,
      timestamp: new Date().toISOString()
    };

    // Placeholder for backend call
    console.log("[Momentum Mindset] Check-in logged:", payload);

    lockSubmission();
  });

  /* -------------------------------------------------------
     POST-SUBMIT STATE
  ------------------------------------------------------- */
  function lockSubmission() {
    submit.textContent = "Check-In Logged";
    submit.disabled = true;
    submit.classList.remove("enabled");

    options.forEach(o => o.disabled = true);
    if (textarea) textarea.disabled = true;
  }

})();
