/* =========================================================
   MOMENTUM ATHLETE — SIDEBAR CONTROLLER
   High-end, minimal, intentional
========================================================= */

(function () {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector("[data-sidebar-toggle]");
  const navLinks = document.querySelectorAll(".nav a");

  if (!sidebar) return;

  const STORAGE_KEY = "ma_sidebar_collapsed";

  /* -------------------------------------------------------
     INIT
  ------------------------------------------------------- */
  function initSidebar() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      sidebar.classList.add("collapsed");
    }
  }

  /* -------------------------------------------------------
     TOGGLE COLLAPSE
  ------------------------------------------------------- */
  function toggleSidebar() {
    const collapsed = sidebar.classList.toggle("collapsed");
    localStorage.setItem(STORAGE_KEY, collapsed);
  }

  /* -------------------------------------------------------
     ACTIVE STATE HANDLING
     (UI only — routing can hook later)
  ------------------------------------------------------- */
  function setActive(link) {
    navLinks.forEach(a => a.classList.remove("active"));
    link.classList.add("active");
  }

  /* -------------------------------------------------------
     EVENTS
  ------------------------------------------------------- */
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleSidebar);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => setActive(link));
  });

  /* -------------------------------------------------------
     OPTIONAL: HOVER EXPAND (DESKTOP ONLY)
     Comment out if you don't want it
  ------------------------------------------------------- */
  let hoverTimeout;

  sidebar.addEventListener("mouseenter", () => {
    if (!sidebar.classList.contains("collapsed")) return;
    hoverTimeout = setTimeout(() => {
      sidebar.classList.add("hover-open");
    }, 120);
  });

  sidebar.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    sidebar.classList.remove("hover-open");
  });

  /* -------------------------------------------------------
     ACCESSIBILITY
  ------------------------------------------------------- */
  sidebar.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebar.classList.remove("hover-open");
    }
  });

  initSidebar();
})();
