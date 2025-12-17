/* =========================================================
   MOMENTUM ATHLETE CRM
   Premium Sidebar + Motion Controller
   ========================================================= */

(function () {
  const app = document.querySelector(".app");
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector("[data-sidebar-toggle]");
  const navLinks = document.querySelectorAll(".nav a");

  if (!app || !sidebar) return;

  const STORAGE_KEY = "ma_sidebar_collapsed";

  /* -------------------------------------------------------
     INIT
  ------------------------------------------------------- */
  function init() {
    restoreSidebarState();
    wireSidebarToggle();
    wireNavActive();
    initAOS();
    introMotion();
  }

  /* -------------------------------------------------------
     SIDEBAR STATE
  ------------------------------------------------------- */
  function restoreSidebarState() {
    const collapsed = localStorage.getItem(STORAGE_KEY) === "true";
    if (collapsed) {
      sidebar.classList.add("collapsed");
      app.classList.add("sidebar-collapsed");
    }
  }

  function toggleSidebar() {
    const collapsed = sidebar.classList.toggle("collapsed");
    app.classList.toggle("sidebar-collapsed", collapsed);
    localStorage.setItem(STORAGE_KEY, collapsed);
  }

  function wireSidebarToggle() {
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", toggleSidebar);
  }

  /* -------------------------------------------------------
     NAV ACTIVE STATE (UI ONLY)
  ------------------------------------------------------- */
  function wireNavActive() {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  /* -------------------------------------------------------
     AOS — PREMIUM CONFIG
     (Subtle, slow, intentional)
  ------------------------------------------------------- */
  function initAOS() {
    if (!window.AOS) return;

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      delay: 0
    });
  }

  /* -------------------------------------------------------
     INTRO MOTION (VERY SUBTLE)
  ------------------------------------------------------- */
  function introMotion() {
    // Sidebar fade-in
    sidebar.style.opacity = "0";
    sidebar.style.transform = "translateX(-6px)";

    requestAnimationFrame(() => {
      sidebar.style.transition = "opacity .6s ease, transform .6s ease";
      sidebar.style.opacity = "1";
      sidebar.style.transform = "translateX(0)";
    });
  }

  /* -------------------------------------------------------
     KEYBOARD SHORTCUTS (PREMIUM TOUCH)
     Cmd/Ctrl + \
  ------------------------------------------------------- */
  document.addEventListener("keydown", (e) => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const mod = isMac ? e.metaKey : e.ctrlKey;

    if (mod && e.key === "\\") {
      e.preventDefault();
      toggleSidebar();
    }
  });

  /* -------------------------------------------------------
     START
  ------------------------------------------------------- */
  init();
})();
