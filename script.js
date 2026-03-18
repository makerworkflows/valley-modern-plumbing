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
});
