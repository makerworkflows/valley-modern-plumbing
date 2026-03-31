/**
 * Valley Modern Plumbing
 * Main JavaScript File
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ── MOBILE NAVIGATION TOGGLE ── */
  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";

      // Toggle Accessibility Attribute
      mobileToggle.setAttribute("aria-expanded", !isExpanded);

      // Toggle Classes
      mainNav.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  /* Close Mobile Nav on Link Click */
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  /* ── STICKY HEADER EFFECT ── */
  const header = document.getElementById("header");

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.setAttribute("data-scrolled", "true");
    } else {
      header.setAttribute("data-scrolled", "false");
    }
  };

  // Initial check
  checkScroll();

  // Scroll event listener (throttled slightly for performance)
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ── SCROLL ANIMATIONS (INTERSECTION OBSERVER) ── */
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px", // Trigger elements slightly before they enter the bottom 10% of viewport
    threshold: 0.1,
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Stop observing once animated to improve performance
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(
    revealCallback,
    revealOptions,
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* ── CONTACT FORM HANDLING ── */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const formContent = document.getElementById("formContent");

  if (contactForm && formSuccess && formContent) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation check
      const phone = document.getElementById("phone").value;
      const firstName = document.getElementById("firstName").value;

      if (phone.trim() === "" || firstName.trim() === "") {
        alert("Please fill out the required fields.");
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = "Sending...";
      submitBtn.disabled = true;

      // Mock API delay (1.5 seconds)
      setTimeout(() => {
        formContent.style.display = "none";
        formSuccess.classList.add("active");
      }, 1000);
    });
  }

  /* ── EMERGENCY BANNER DISMISS ── */
  const emergencyBanner = document.getElementById("emergencyBanner");
  const emergencyClose = document.getElementById("emergencyClose");

  function syncBannerHeight() {
    if (emergencyBanner && !emergencyBanner.classList.contains("hidden")) {
      const h = emergencyBanner.offsetHeight;
      document.documentElement.style.setProperty("--banner-height", h + "px");
      document.documentElement.style.setProperty("--scroll-offset", (h + 80) + "px");
    } else {
      document.documentElement.style.setProperty("--banner-height", "0px");
      document.documentElement.style.setProperty("--scroll-offset", "80px");
    }
  }

  if (emergencyBanner && emergencyClose) {
    if (sessionStorage.getItem("vmp-banner-dismissed")) {
      emergencyBanner.classList.add("hidden");
    }
    syncBannerHeight();

    emergencyClose.addEventListener("click", () => {
      emergencyBanner.classList.add("hidden");
      sessionStorage.setItem("vmp-banner-dismissed", "1");
      syncBannerHeight();
    });

    window.addEventListener("resize", syncBannerHeight);
  }

  /* ── EN/ES LANGUAGE TOGGLE ── */
  const TRANSLATIONS = {
    // Emergency banner
    "emergency-text": { en: "Plumbing Emergency? We respond fast \u2014 ", es: "Emergencia de plomeria? Respondemos rapido \u2014 " },
    "emergency-cta": { en: "Call (956) 686-3687 Now \u2192", es: "Llame al (956) 686-3687 Ahora \u2192" },
    // Trust badges bar
    "trust-family": { en: "Family-Owned", es: "Empresa Familiar" },
    "trust-family-sub": { en: "Est. 1986 \u2014 McAllen, TX", es: "Desde 1986 \u2014 McAllen, TX" },
    "trust-license-sub": { en: "Master Plumber License", es: "Licencia de Plomero Maestro" },
    "trust-bz": { en: "Top 15% Texas", es: "Top 15% en Texas" },
    "trust-bz-sub": { en: "BuildZoom Score: 99", es: "Puntuacion BuildZoom: 99" },
    "trust-projects": { en: "200+ Projects", es: "200+ Proyectos" },
    "trust-projects-sub": { en: "Permitted & Inspected", es: "Con Permiso e Inspeccion" },
    "trust-bilingual": { en: "Hablamos Espanol", es: "Hablamos Espanol" },
    "trust-bilingual-sub": { en: "Fully Bilingual Service", es: "Servicio Completamente Bilingue" },
    // Mobile CTA
    "cta-call": { en: "Call", es: "Llamar" },
    "cta-text": { en: "Text", es: "Texto" },
    "cta-quote": { en: "Quote", es: "Cotizar" },
  };

  let currentLang = localStorage.getItem("vmp-lang") || "en";

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("vmp-lang", lang);
    document.documentElement.lang = lang;

    // Update toggle buttons
    document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Swap translatable elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.innerHTML = TRANSLATIONS[key][lang];
      }
    });
  }

  // Init language
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    // Apply saved language on load
    if (currentLang !== "en") setLang(currentLang);
  }
});
