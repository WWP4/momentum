// Momentum Landing — Hero Animation Controller
// Clean / cinematic / fast typing / slow wipe

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".heroType");
  const letters = document.getElementById("wordmarkLetters");

  if (!hero || !letters) return;

  /* ===== TIMING CONTROLS ===== */

  const WORD = "MOMENTUM.";

  const TYPE_SPEED = 90;     // ms between letters (FAST)
  const FADE_SPEED = 260;   // fade duration per letter
  const UNDERLINE_GAP = 160;
  const WIPE_DELAY = 140;

  /* ========================== */

  letters.innerHTML = "";

  [...WORD].forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = char;

    span.style.setProperty("--d", `${WIPE_DELAY + i * TYPE_SPEED}ms`);
    letters.appendChild(span);
  });

  const typingDuration =
    WIPE_DELAY +
    (WORD.length * TYPE_SPEED) +
    FADE_SPEED;

  hero.style.setProperty("--underlineDelay", `${typingDuration + UNDERLINE_GAP}ms`);
  hero.style.setProperty("--copyDelay", `${typingDuration + UNDERLINE_GAP + 180}ms`);

  // Fire animations
  requestAnimationFrame(() => {
    hero.classList.add("is-ready");
  });

});
