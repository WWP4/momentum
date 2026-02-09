(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  document.addEventListener("DOMContentLoaded", () => {
    initWordmark();
    initRevealSystem();
    initTimelineProgress();
    initWhyArrive();
    initHeroParallax();
    initMagneticButtons();
    initFormFlow();

    requestAnimationFrame(() => {
      document.body.classList.add("is-loaded");
    });
  });

  function initWordmark() {
    const container = $("#wordmarkLetters");
    if (!container) {
      return;
    }

    const word = "MOMENTUM";
    container.innerHTML = "";

    [...word].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.style.setProperty("--d", `${index * 90}ms`);
      span.textContent = char;
      container.appendChild(span);
    });
  }

  function initRevealSystem() {
    const revealItems = $$(".reveal");
    if (!revealItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function initTimelineProgress() {
    const timeline = $(".timeline");
    const railFill = $("#railFill");
    const events = $$("[data-event]");

    if (!timeline || !railFill || !events.length) {
      return;
    }

    const update = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const centerY = viewport * 0.5;

      const start = timelineRect.top + 180;
      const end = timelineRect.bottom - 50;
      const raw = (centerY - start) / Math.max(end - start, 1);
      const progress = Math.max(0, Math.min(1, raw));
      railFill.style.height = `${progress * 100}%`;

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      events.forEach((event, index) => {
        const rect = event.getBoundingClientRect();
        const eventCenter = rect.top + rect.height / 2;
        const distance = Math.abs(eventCenter - centerY);

        event.classList.add("is-in");

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      events.forEach((event, index) => {
        event.classList.toggle("is-active", index === nearestIndex);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initWhyArrive() {
    const section = $(".why");
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-arrived");
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);
  }

  function initHeroParallax() {
    const media = $("#heroMedia");
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const smooth = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const tick = () => {
      smooth.x += (target.x - smooth.x) * 0.08;
      smooth.y += (target.y - smooth.y) * 0.08;
      media.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0)`;
      requestAnimationFrame(tick);
    };

    tick();

    document.addEventListener("pointermove", (event) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.x = (event.clientX - cx) * 0.01;
      target.y = (event.clientY - cy) * 0.01;
    });

    document.addEventListener("pointerleave", () => {
      target.x = 0;
      target.y = 0;
    });
  }

  function initMagneticButtons() {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    $$(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        const force = 0.18;

        button.style.transform = `translate(${offsetX * force}px, ${offsetY * force}px)`;
      });

      button.addEventListener("pointerleave", () => {
        button.style.transform = "";
      });
    });
  }
})();
