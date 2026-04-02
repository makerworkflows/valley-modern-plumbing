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

  /* ── EN/ES LANGUAGE TOGGLE — Español mexicano ── */
  const TRANSLATIONS = {
    // ── Navigation
    "nav-services": { en: "Services", es: "Servicios" },
    "nav-why": { en: "Why Us", es: "Quienes Somos" },
    "nav-about": { en: "About", es: "Nuestra Historia" },
    "nav-contact": { en: "Contact", es: "Contacto" },
    "nav-cta": { en: "Get a Quote", es: "Cotizaci\u00f3n" },

    // ── Hero
    "hero-eyebrow": {
      en: "McAllen, TX & All of the Rio Grande Valley",
      es: "McAllen, TX y todo el Valle del R\u00edo Grande"
    },
    "hero-title": {
      en: "McAllen\u2019s Most <span class=\"text-gradient\">Trusted</span> Plumbing Service",
      es: "El servicio de plomer\u00eda de <span class=\"text-gradient\">mayor confianza</span> en McAllen"
    },
    "hero-subtitle": {
      en: "Honest work, fair prices, and a clean job site every time. Trusted by families across the Rio Grande Valley for over 70 years.",
      es: "Trabajo honesto, precios justos y un \u00e1rea de trabajo limpia siempre. M\u00e1s de 38 a\u00f1os ganando la confianza de las familias del Valle del R\u00edo Grande."
    },
    "hero-call": { en: "Call Now: (956) 686-3687", es: "Llame ahora: (956) 686-3687" },
    "hero-estimate": {
      en: "Request a Quote <span aria-hidden=\"true\">&rarr;</span>",
      es: "Solicite una cotizaci\u00f3n gratis <span aria-hidden=\"true\">&rarr;</span>"
    },

    // ── Hero trust badges
    "badge-rating": { en: "4.6 Google Rating", es: "4.6 en Google" },
    "badge-rating-sub": { en: "Verified Reviews", es: "Rese\u00f1as verificadas" },
    "badge-licensed": { en: "Licensed & Insured", es: "Licencia y seguro" },
    "badge-years": { en: "70+ Years Experience", es: "70+ a\u00f1os de experiencia" },
    "badge-since": { en: "Since 1952", es: "Desde 1952" },

    // ── Stats strip
    "stat-years": { en: "Years in Business", es: "A\u00f1os de servicio" },
    "stat-projects": { en: "Projects Completed", es: "Proyectos completados" },
    "stat-rating": { en: "Google Rating", es: "Calificaci\u00f3n en Google" },
    "stat-gen": { en: "Generation Family", es: "Generaci\u00f3n familiar" },

    // ── Trust badge bar
    "trust-family": { en: "Family-Owned", es: "Empresa familiar" },
    "trust-family-sub": { en: "Est. 1952 \u2014 McAllen, TX", es: "Desde 1952 \u2014 McAllen, TX" },
    "trust-license-sub": { en: "Master Plumber License", es: "Licencia de plomero maestro" },
    "trust-bz": { en: "Top 15% Texas", es: "Top 15% en Texas" },
    "trust-bz-sub": { en: "BuildZoom Score: 99", es: "Puntuaci\u00f3n BuildZoom: 99" },
    "trust-projects": { en: "200+ Projects", es: "200+ proyectos" },
    "trust-projects-sub": { en: "Permitted & Inspected", es: "Con permiso e inspecci\u00f3n" },
    "trust-bilingual": { en: "Hablamos Espa\u00f1ol", es: "Hablamos espa\u00f1ol" },
    "trust-bilingual-sub": { en: "Fully Bilingual Service", es: "Servicio completamente biling\u00fce" },

    // ── Services section
    "svc-eyebrow": { en: "What We Do", es: "Lo que hacemos" },
    "svc-title": { en: "Reliable Plumbing for Home & Business", es: "Plomer\u00eda confiable para hogar y negocio" },
    "svc-subtitle": {
      en: "From everyday repairs to full plumbing installations \u2014 we treat your home like our own and leave it better than we found it.",
      es: "Desde reparaciones cotidianas hasta instalaciones completas \u2014 tratamos su hogar como el nuestro y lo dejamos mejor de como lo encontramos."
    },
    "svc1-title": { en: "Residential Plumbing", es: "Plomer\u00eda residencial" },
    "svc1-text": {
      en: "Whole-home repiping, fixture upgrades, bathroom additions, and complete plumbing services. Quality work with zero shortcuts and a clean job site.",
      es: "Cambio de tuber\u00eda completa, actualizaci\u00f3n de accesorios, ampliaciones de ba\u00f1o y servicios de plomer\u00eda integral. Trabajo de calidad, sin atajos y con el \u00e1rea limpia."
    },
    "svc2-title": { en: "Water Heater & Tankless Systems", es: "Calentadores de agua y sistemas sin tanque" },
    "svc2-text": {
      en: "Traditional and tankless water heater installation, replacement, and repair. We handle the full upgrade \u2014 old unit hauled away, area left spotless.",
      es: "Instalaci\u00f3n, reemplazo y reparaci\u00f3n de calentadores tradicionales y sin tanque. Nos encargamos de todo \u2014 retiramos el equipo viejo y dejamos el \u00e1rea impecable."
    },
    "svc3-title": { en: "Gas Line Services", es: "Servicios de l\u00edneas de gas" },
    "svc3-text": {
      en: "Gas line installation for outdoor kitchens, pool heaters, generators, and whole-home connections. Safe, code-compliant work with thorough testing.",
      es: "Instalaci\u00f3n de l\u00edneas de gas para cocinas exteriores, calentadores de alberca, generadores y conexiones residenciales. Trabajo seguro, conforme al c\u00f3digo y con pruebas rigurosas."
    },
    "svc4-title": { en: "Commercial Plumbing", es: "Plomer\u00eda comercial" },
    "svc4-text": {
      en: "Restaurants, offices, healthcare facilities, retail spaces \u2014 we handle commercial builds, change-of-use plumbing, and ongoing service contracts.",
      es: "Restaurantes, oficinas, cl\u00ednicas, locales comerciales \u2014 realizamos instalaciones comerciales, cambios de giro y contratos de mantenimiento."
    },
    "svc5-title": { en: "Water Filtration & Softener Systems", es: "Sistemas de filtraci\u00f3n y suavizadores de agua" },
    "svc5-text": {
      en: "Protect your home\u2019s fixtures and appliances from RGV hard water. Whole-home water filtration and softener system installation for cleaner water throughout your home.",
      es: "Proteja los accesorios y electrodom\u00e9sticos de su hogar del agua dura del Valle. Instalaci\u00f3n de sistemas de filtraci\u00f3n y suavizadores para agua m\u00e1s limpia en toda su casa."
    },
    "svc6-title": { en: "Kitchen & Bath Renovation Plumbing", es: "Plomer\u00eda para remodelaci\u00f3n de cocina y ba\u00f1o" },
    "svc6-text": {
      en: "Complete plumbing for bathroom remodels, kitchen renovations, and home additions. Permitted work, quality fixtures, and attention to detail.",
      es: "Plomer\u00eda completa para remodelaciones de ba\u00f1o, cocina y ampliaciones. Trabajo con permisos, accesorios de calidad y atenci\u00f3n al detalle."
    },
    "svc-link": { en: "Request Service", es: "Solicitar servicio" },

    // ── Why Us section
    "why-eyebrow": { en: "Why Valley Modern", es: "\u00bfPor qu\u00e9 Valley Modern?" },
    "why-title": { en: "Why Your Neighbors<br />Keep Calling Us Back.", es: "\u00bfPor qu\u00e9 sus vecinos<br />nos siguen llamando?" },
    "why1-title": { en: "Precision Work, Done Right", es: "Trabajo preciso, bien hecho" },
    "why1-text": {
      en: "We diagnose accurately, explain clearly, and fix it right the first time. No repeat visits, no callbacks \u2014 just expert workmanship you can count on.",
      es: "Diagnosticamos con precisi\u00f3n, explicamos con claridad y lo reparamos bien a la primera. Sin visitas repetidas \u2014 solo trabajo experto en el que puede confiar."
    },
    "why2-title": { en: "Your Time is Respected", es: "Respetamos su tiempo" },
    "why2-text": {
      en: "Same-day response, on-time arrivals, and efficient work. We know your time is valuable \u2014 we show up when we say we will and get the job done right.",
      es: "Respuesta el mismo d\u00eda, llegamos puntuales y trabajamos de manera eficiente. Sabemos que su tiempo es valioso \u2014 llegamos cuando decimos y hacemos el trabajo bien."
    },
    "why3-title": { en: "Licensed & Top-Rated in Texas", es: "Con licencia y los mejor calificados en Texas" },
    "why3-text": {
      en: "Fully licensed and insured, with a BuildZoom score ranking us in the top 15% of Texas contractors. 200+ permitted projects completed by code.",
      es: "Contamos con licencia y seguro, con una puntuaci\u00f3n de BuildZoom que nos ubica en el top 15% de contratistas en Texas. M\u00e1s de 200 proyectos con permiso."
    },
    "why4-title": { en: "We Leave Your Home Spotless", es: "Dejamos su hogar impecable" },
    "why4-text": {
      en: "We protect your floors, clean up completely, and leave your home exactly as we found it \u2014 except with the problem fixed. Three generations of treating every home like our own.",
      es: "Protegemos sus pisos, limpiamos todo y dejamos su hogar como lo encontramos \u2014 excepto con el problema resuelto. Tres generaciones tratando cada hogar como si fuera el nuestro."
    },

    // ── Reviews
    "rev-eyebrow": { en: "Customer Reviews", es: "Rese\u00f1as de clientes" },
    "rev-title": { en: "What Our Customers Say", es: "Lo que dicen nuestros clientes" },
    "rev-subtitle": { en: "Real reviews from real neighbors across the Rio Grande Valley.", es: "Rese\u00f1as reales de vecinos reales en todo el Valle del R\u00edo Grande." },
    "rev-cta": {
      en: "See All 4.6\u2605 Reviews on Google <span aria-hidden=\"true\">&rarr;</span>",
      es: "Ver todas las rese\u00f1as 4.6\u2605 en Google <span aria-hidden=\"true\">&rarr;</span>"
    },

    // ── About
    "about-eyebrow": { en: "Our Story", es: "Nuestra historia" },
    "about-title": { en: "Three Generations of Excellence", es: "Tres generaciones de excelencia" },
    "about-cta": { en: "Get In Touch With Us", es: "P\u00f3ngase en contacto con nosotros" },

    // ── Service Area
    "area-eyebrow": { en: "Where We Work", es: "D\u00f3nde trabajamos" },
    "area-title": { en: "Proudly Serving All of the Rio Grande Valley", es: "Orgullosamente al servicio de todo el Valle del R\u00edo Grande" },
    "area-subtitle": {
      en: "From McAllen to Brownsville \u2014 if you\u2019re in South Texas, we\u2019re your plumber. Hablamos Espa\u00f1ol.",
      es: "De McAllen a Brownsville \u2014 si est\u00e1 en el sur de Texas, somos sus plomeros. Hablamos espa\u00f1ol."
    },
    "area-cta": {
      en: "Call Us Today <span aria-hidden=\"true\">&rarr;</span>",
      es: "Ll\u00e1menos hoy <span aria-hidden=\"true\">&rarr;</span>"
    },

    // ── Contact
    "contact-eyebrow": { en: "Get In Touch", es: "Cont\u00e1ctenos" },
    "contact-title": { en: "Let\u2019s Talk About Your Project", es: "Platiquemos sobre su proyecto" },
    "contact-subtitle": {
      en: "Need a plumber you can trust? Give us a call or fill out the form to request a quote.",
      es: "\u00bfNecesita un plomero de confianza? Ll\u00e1menos o llene el formulario para una cotizaci\u00f3n gratis."
    },
    "info-phone": { en: "Phone", es: "Tel\u00e9fono" },
    "info-address": { en: "Address", es: "Direcci\u00f3n" },
    "info-hours": { en: "Business Hours", es: "Horario de atenci\u00f3n" },
    "bilingual-tag": {
      en: "<span>\ud83c\uddf2\ud83c\uddfd</span> Hablamos Espa\u00f1ol \u2014 Bilingual Service Available",
      es: "<span>\ud83c\uddf2\ud83c\uddfd</span> Hablamos espa\u00f1ol \u2014 Servicio completamente biling\u00fce"
    },

    // ── Form
    "form-title": { en: "Get a Quote", es: "Cotizaci\u00f3n" },
    "form-response": { en: "We\u2019ll get back to you within 1 business hour.", es: "Le respondemos en menos de 1 hora h\u00e1bil." },
    "form-first": { en: "First Name *", es: "Nombre *" },
    "form-last": { en: "Last Name *", es: "Apellido *" },
    "form-phone": { en: "Phone Number *", es: "N\u00famero de tel\u00e9fono *" },
    "form-email": { en: "Email Address", es: "Correo electr\u00f3nico" },
    "form-service": { en: "Service Needed *", es: "Servicio que necesita *" },
    "form-desc": { en: "Describe the Issue", es: "Describa el problema" },
    "form-submit": { en: "Send My Request &rarr;", es: "Enviar mi solicitud &rarr;" },
    "form-success-title": { en: "Request Received!", es: "\u00a1Solicitud recibida!" },
    "form-success-text": { en: "Thank you! We\u2019ll call you back within 1 business hour.", es: "\u00a1Gracias! Le llamaremos en menos de 1 hora h\u00e1bil." },

    // ── Footer
    "foot-svc": { en: "Services", es: "Servicios" },
    "foot-co": { en: "Company", es: "Empresa" },
    "foot-reach": { en: "Reach Us", es: "Cont\u00e1ctenos" },
    "foot-quote": { en: "\u201cWe treat your home like our own.\u201d", es: "\u201cTratamos su hogar como si fuera el nuestro.\u201d" },
    "foot-desc": {
      en: "McAllen\u2019s most trusted plumbing service since 1952. Three generations of precision work and white-glove care.",
      es: "El servicio de plomer\u00eda de mayor confianza en McAllen desde 1952. Tres generaciones de trabajo preciso y atenci\u00f3n de primera."
    },

    // ── Mobile CTA
    "cta-call": { en: "Call", es: "Llamar" },
    "cta-text": { en: "Text", es: "Mensaje" },
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
