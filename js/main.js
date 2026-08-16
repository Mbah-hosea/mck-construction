/* ==========================================================================
   MCK CONSTRUCTION — MAIN JS
   Reusable, framework-free architecture. Sections:
   1. Site data (nav, contact placeholders) — EDIT HERE, changes everywhere
   2. Header / Footer injection
   3. Mobile nav
   4. BackgroundSlider class
   5. Accordion class
   6. Lightbox
   7. Project filter
   8. Scroll reveal animations
   9. Form helpers
   10. Init
   ========================================================================== */


/* -------------------- 1. SITE DATA -------------------- */
/* Single source of truth for nav + contact placeholders.
   Edit this object and every page updates automatically. */

const SITE_DATA = {
  companyName: "MCK CONSTRUCTION",

  logo: "assets/images/logo/mck-logo.png",

  nav: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Departments", href: "departments.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Students", href: "students.html" },
    { label: "Contact", href: "contact.html" },
  ],

  contact: {
    phone: "+237 671 69 40 35",
    phoneHref: "tel:+237671694035",

    whatsapp: "+237 671 69 40 35",

    /* WhatsApp automatically opens with this message ready to send */
    whatsappHref:
      "https://wa.me/237671694035?text=" +
      encodeURIComponent(
        "Hello MCK Construction, I found your website and would like to make an inquiry."
      ),

    email: "info@mck-construction-PLACEHOLDER.com",
    emailHref: "mailto:info@mck-construction-PLACEHOLDER.com",

    address: "[OFFICE ADDRESS], BAMENDA, CAMEROON",
  },

  social: [
    { label: "Facebook", href: "#", icon: "f" },
    { label: "Instagram", href: "#", icon: "ig" },
    { label: "LinkedIn", href: "#", icon: "in" },
  ],
};


/* -------------------- 2. HEADER / FOOTER INJECTION -------------------- */

function renderHeader() {
  const root = document.getElementById("site-header-root");

  if (!root) return;

  const currentPage = document.body.dataset.page || "";

  const navLinks = SITE_DATA.nav
    .map(
      (item) => `
        <li>
          <a href="${item.href}" ${
        item.href === currentPage ? 'aria-current="page"' : ""
      }>
            ${item.label}
          </a>
        </li>
      `
    )
    .join("");

  root.innerHTML = `
    <header class="site-header">
      <div class="container">

        <a href="index.html" class="site-header__logo">
          <!-- LOGO PLACEHOLDER:
               Replace mck-logo.png with the official MCK Construction logo. -->
          <img
            src="assets/images/logo/mck-logo.png"
            alt="PLACEHOLDER: MCK Construction logo"
          >

          <span>${SITE_DATA.companyName}</span>
        </a>

        <nav
          class="site-nav"
          id="site-nav"
          aria-label="Primary"
        >
          <ul class="site-nav__list">
            ${navLinks}
          </ul>
        </nav>

        <div class="site-header__cta">

          <a
            href="quote.html"
            class="btn btn-primary"
          >
            Request Quote
          </a>

          <button
            class="hamburger"
            id="hamburger"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="site-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

      </div>
    </header>
  `;
}


function renderFooter() {
  const root = document.getElementById("site-footer-root");

  if (!root) return;

  const quickLinks = SITE_DATA.nav
    .map(
      (item) =>
        `<li><a href="${item.href}">${item.label}</a></li>`
    )
    .join("");

  const socialLinks = SITE_DATA.social
    .map(
      (s) => `
        <a
          href="${s.href}"
          aria-label="${s.label}"
        >
          <!-- SOCIAL PLACEHOLDER: ${s.label} -->
          ${s.icon}
        </a>
      `
    )
    .join("");

  root.innerHTML = `
    <footer class="site-footer">

      <div class="container">

        <div class="site-footer__grid">

          <!-- ABOUT -->
          <div class="site-footer__about">

            <img
              src="assets/images/logo/mck-logo.png"
              alt="PLACEHOLDER: MCK Construction logo"
            >

            <p>
              MCK Construction is a multi-disciplinary construction and
              contracting company, managing projects from concept through
              to handover and maintenance.
            </p>

            <div class="site-footer__social">
              ${socialLinks}
            </div>

          </div>


          <!-- QUICK LINKS -->
          <div>

            <h4>Quick Links</h4>

            <ul>
              ${quickLinks}
            </ul>

          </div>


          <!-- SERVICES -->
          <div>

            <h4>Services</h4>

            <ul>

              <li>
                <a href="services.html">
                  Residential Construction
                </a>
              </li>

              <li>
                <a href="services.html">
                  Commercial Construction
                </a>
              </li>

              <li>
                <a href="services.html">
                  Industrial Construction
                </a>
              </li>

              <li>
                <a href="services.html">
                  Architecture
                </a>
              </li>

              <li>
                <a href="services.html">
                  Renovation &amp; Maintenance
                </a>
              </li>

            </ul>

          </div>


          <!-- CONTACT -->
          <div>

            <h4>Contact</h4>

            <ul>

              <!-- PHONE -->
              <li>
                <a href="${SITE_DATA.contact.phoneHref}">
                  ${SITE_DATA.contact.phone}
                </a>
              </li>


              <!-- WHATSAPP -->
              <li>
                <a
                  href="${SITE_DATA.contact.whatsappHref}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact MCK Construction on WhatsApp"
                >
                  WhatsApp: ${SITE_DATA.contact.whatsapp}
                </a>
              </li>


              <!-- EMAIL -->
              <li>
                <a href="${SITE_DATA.contact.emailHref}">
                  ${SITE_DATA.contact.email}
                </a>
              </li>


              <!-- ADDRESS -->
              <li>
                <span>
                  <!-- ADDRESS PLACEHOLDER -->
                  ${SITE_DATA.contact.address}
                </span>
              </li>

            </ul>

          </div>

        </div>


        <!-- FOOTER BOTTOM -->
        <div class="site-footer__bottom">

          <span>
            &copy; 2026 MCK Construction. All Rights Reserved.
          </span>

          <div class="legal-links">

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms of Service
            </a>

          </div>

        </div>

      </div>

    </footer>
  `;
}


/* -------------------- 3. MOBILE NAV -------------------- */

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("site-nav");

  if (!hamburger || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");

    hamburger.setAttribute(
      "aria-expanded",
      "false"
    );

    hamburger.setAttribute(
      "aria-label",
      "Open menu"
    );
  };

  const openNav = () => {
    nav.classList.add("is-open");

    hamburger.setAttribute(
      "aria-expanded",
      "true"
    );

    hamburger.setAttribute(
      "aria-label",
      "Close menu"
    );
  };

  hamburger.addEventListener("click", () => {
    const isOpen =
      nav.classList.contains("is-open");

    isOpen
      ? closeNav()
      : openNav();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener(
      "click",
      closeNav
    );
  });

  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("is-open") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
    }
  });
}


/* -------------------- 4. BACKGROUND SLIDER -------------------- */

class BackgroundSlider {

  constructor(
    containerSelector,
    options = {}
  ) {

    this.container =
      typeof containerSelector === "string"
        ? document.querySelector(
            containerSelector
          )
        : containerSelector;

    if (!this.container) return;

    this.slides = Array.from(
      this.container.querySelectorAll(
        ".bg-slider__slide, .hero-slider__slide"
      )
    );

    if (this.slides.length === 0) return;

    this.options = Object.assign(
      {
        interval: 5000,
        controls: true,
        dots: true,
        swipe: true,
        keyboard: true
      },
      options
    );

    this.current = 0;
    this.timer = null;

    this._buildControls();
    this._bindEvents();

    this.showSlide(0);
    this.start();
  }


  _buildControls() {

    const controlsWrap =
      this.container.querySelector(
        ".slider-controls"
      );

    if (!controlsWrap) return;


    if (this.options.dots) {

      const dotsWrap =
        controlsWrap.querySelector(
          ".slider-dots"
        );

      if (dotsWrap) {

        dotsWrap.innerHTML =
          this.slides
            .map(
              (_, i) =>
                `<button
                  class="slider-dot"
                  data-index="${i}"
                  aria-label="Go to slide ${i + 1}"
                ></button>`
            )
            .join("");

        dotsWrap
          .querySelectorAll(".slider-dot")
          .forEach((dot) => {

            dot.addEventListener(
              "click",
              () => {

                this.showSlide(
                  Number(
                    dot.dataset.index
                  )
                );

                this.restart();
              }
            );

          });
      }
    }


    if (this.options.controls) {

      const prevBtn =
        controlsWrap.querySelector(
          ".slider-arrow.prev"
        );

      const nextBtn =
        controlsWrap.querySelector(
          ".slider-arrow.next"
        );

      if (prevBtn) {
        prevBtn.addEventListener(
          "click",
          () => {
            this.prevSlide();
            this.restart();
          }
        );
      }

      if (nextBtn) {
        nextBtn.addEventListener(
          "click",
          () => {
            this.nextSlide();
            this.restart();
          }
        );
      }
    }
  }


  _bindEvents() {

    if (this.options.swipe) {

      let startX = 0;

      this.container.addEventListener(
        "touchstart",
        (e) => {
          startX =
            e.touches[0].clientX;
        },
        { passive: true }
      );

      this.container.addEventListener(
        "touchend",
        (e) => {

          const diff =
            e.changedTouches[0].clientX -
            startX;

          if (Math.abs(diff) > 40) {

            diff > 0
              ? this.prevSlide()
              : this.nextSlide();

            this.restart();
          }
        }
      );
    }


    if (this.options.keyboard) {

      this.container.setAttribute(
        "tabindex",
        "0"
      );

      this.container.addEventListener(
        "keydown",
        (e) => {

          if (
            e.key ===
            "ArrowLeft"
          ) {
            this.prevSlide();
            this.restart();
          }

          if (
            e.key ===
            "ArrowRight"
          ) {
            this.nextSlide();
            this.restart();
          }
        }
      );
    }


    this.container.addEventListener(
      "mouseenter",
      () => this.stop()
    );

    this.container.addEventListener(
      "mouseleave",
      () => this.start()
    );
  }


  showSlide(index) {

    this.slides.forEach(
      (slide) =>
        slide.classList.remove(
          "is-active"
        )
    );

    this.current =
      (index +
        this.slides.length) %
      this.slides.length;

    this.slides[
      this.current
    ].classList.add(
      "is-active"
    );

    const dots =
      this.container.querySelectorAll(
        ".slider-dot"
      );

    dots.forEach(
      (dot, i) =>
        dot.classList.toggle(
          "is-active",
          i === this.current
        )
    );
  }


  nextSlide() {
    this.showSlide(
      this.current + 1
    );
  }


  prevSlide() {
    this.showSlide(
      this.current - 1
    );
  }


  start() {
    this.stop();

    this.timer =
      setInterval(
        () =>
          this.nextSlide(),
        this.options.interval
      );
  }


  stop() {

    if (this.timer) {

      clearInterval(
        this.timer
      );

      this.timer = null;
    }
  }


  restart() {
    this.start();
  }
}


/* -------------------- 5. ACCORDION -------------------- */

class Accordion {

  constructor(
    containerSelector,
    {
      allowMultiple = false
    } = {}
  ) {

    this.container =
      typeof containerSelector === "string"
        ? document.querySelector(
            containerSelector
          )
        : containerSelector;

    if (!this.container) return;

    this.allowMultiple =
      allowMultiple;

    this.items = Array.from(
      this.container.querySelectorAll(
        ".accordion-item"
      )
    );

    this.items.forEach(
      (item) => {

        const trigger =
          item.querySelector(
            ".accordion-item__trigger"
          );

        const panel =
          item.querySelector(
            ".accordion-item__panel"
          );

        if (!trigger || !panel)
          return;

        trigger.addEventListener(
          "click",
          () => this.toggle(item)
        );

        trigger.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    );
  }


  toggle(item) {

    const isOpen =
      item.dataset.open ===
      "true";

    if (!this.allowMultiple) {

      this.items.forEach(
        (other) => {

          if (other !== item) {
            this._setOpen(
              other,
              false
            );
          }

        }
      );
    }

    this._setOpen(
      item,
      !isOpen
    );
  }


  _setOpen(item, open) {

    const trigger =
      item.querySelector(
        ".accordion-item__trigger"
      );

    const panel =
      item.querySelector(
        ".accordion-item__panel"
      );

    item.dataset.open =
      open
        ? "true"
        : "false";

    trigger.setAttribute(
      "aria-expanded",
      open
        ? "true"
        : "false"
    );

    panel.style.maxHeight =
      open
        ? panel.scrollHeight +
          "px"
        : "0px";
  }
}


/* -------------------- 6. LIGHTBOX -------------------- */

class Lightbox {

  constructor(
    triggerSelector,
    lightboxSelector
  ) {

    this.triggers =
      Array.from(
        document.querySelectorAll(
          triggerSelector
        )
      );

    this.lightbox =
      document.querySelector(
        lightboxSelector
      );

    if (
      !this.lightbox ||
      this.triggers.length === 0
    )
      return;

    this.currentIndex = 0;

    this.imageEl =
      this.lightbox.querySelector(
        ".lightbox__image-wrap img"
      );

    this.titleEl =
      this.lightbox.querySelector(
        ".lightbox__meta h3"
      );

    this.metaEl =
      this.lightbox.querySelector(
        ".lightbox__meta .project-card__meta"
      );

    this.descEl =
      this.lightbox.querySelector(
        ".lightbox__meta p"
      );


    this.triggers.forEach(
      (trigger, index) => {

        trigger.addEventListener(
          "click",
          () => this.open(index)
        );
      }
    );


    this.lightbox
      .querySelector(
        ".lightbox__close"
      )
      ?.addEventListener(
        "click",
        () => this.close()
      );


    this.lightbox
      .querySelector(
        ".lightbox__prev"
      )
      ?.addEventListener(
        "click",
        () =>
          this.show(
            this.currentIndex -
              1
          )
      );


    this.lightbox
      .querySelector(
        ".lightbox__next"
      )
      ?.addEventListener(
        "click",
        () =>
          this.show(
            this.currentIndex +
              1
          )
      );


    this.lightbox.addEventListener(
      "click",
      (e) => {

        if (
          e.target ===
          this.lightbox
        ) {
          this.close();
        }
      }
    );


    document.addEventListener(
      "keydown",
      (e) => {

        if (
          !this.lightbox.classList.contains(
            "is-open"
          )
        )
          return;

        if (
          e.key === "Escape"
        )
          this.close();

        if (
          e.key ===
          "ArrowLeft"
        )
          this.show(
            this.currentIndex -
              1
          );

        if (
          e.key ===
          "ArrowRight"
        )
          this.show(
            this.currentIndex +
              1
          );
      }
    );
  }


  open(index) {

    this.show(index);

    this.lightbox.classList.add(
      "is-open"
    );

    this.lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    this.lightbox
      .querySelector(
        ".lightbox__close"
      )
      ?.focus();
  }


  close() {

    this.lightbox.classList.remove(
      "is-open"
    );

    this.lightbox.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  show(index) {

    const visible =
      this.triggers.filter(
        (t) =>
          !t.classList.contains(
            "is-hidden"
          )
      );

    if (visible.length === 0)
      return;

    this.currentIndex =
      (index +
        this.triggers.length) %
      this.triggers.length;

    const trigger =
      this.triggers[
        this.currentIndex
      ];

    const data =
      trigger.dataset;


    if (this.imageEl) {

      this.imageEl.src =
        data.image;

      this.imageEl.alt =
        data.title ||
        "PLACEHOLDER: project image";
    }


    if (this.titleEl) {

      this.titleEl.textContent =
        data.title || "";
    }


    if (this.descEl) {

      this.descEl.textContent =
        data.description || "";
    }


    if (this.metaEl) {

      this.metaEl.innerHTML = `
        <span>
          ${data.location || "[LOCATION]"}
        </span>

        <span>
          ${data.type || ""}
        </span>

        <span>
          ${data.status || ""}
        </span>
      `;
    }
  }
}


/* -------------------- 7. PROJECT FILTER -------------------- */

class ProjectFilter {

  constructor(
    filterSelector,
    itemSelector
  ) {

    this.filters =
      Array.from(
        document.querySelectorAll(
          filterSelector
        )
      );

    this.items =
      Array.from(
        document.querySelectorAll(
          itemSelector
        )
      );

    if (
      this.filters.length === 0 ||
      this.items.length === 0
    )
      return;

    this.filters.forEach(
      (filter) => {

        filter.addEventListener(
          "click",
          () =>
            this.applyFilter(
              filter
            )
        );
      }
    );
  }


  applyFilter(
    activeFilter
  ) {

    this.filters.forEach(
      (f) =>
        f.setAttribute(
          "aria-pressed",
          "false"
        )
    );

    activeFilter.setAttribute(
      "aria-pressed",
      "true"
    );

    const category =
      activeFilter.dataset.filter;


    this.items.forEach(
      (item) => {

        const matches =
          category === "all" ||
          item.dataset.category ===
            category;

        item.classList.toggle(
          "is-hidden",
          !matches
        );
      }
    );
  }
}


/* -------------------- 8. SCROLL REVEAL -------------------- */

function initScrollReveal() {

  const targets =
    document.querySelectorAll(
      "[data-animate]"
    );

  if (targets.length === 0)
    return;


  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {

    targets.forEach(
      (t) =>
        t.classList.add(
          "is-visible"
        )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.15
      }
    );


  targets.forEach(
    (t) =>
      observer.observe(t)
  );
}


/* -------------------- 9. FORM HELPERS -------------------- */

function initFormHandler(
  formSelector,
  statusSelector
) {

  const form =
    document.querySelector(
      formSelector
    );

  const status =
    document.querySelector(
      statusSelector
    );

  if (!form) return;


  form.addEventListener(
    "submit",
    (e) => {

      e.preventDefault();


      if (
        !form.checkValidity()
      ) {

        form.reportValidity();

        return;
      }


      if (status) {

        status.textContent =
          "This form is not yet connected to a backend. Your information has not been sent. Replace this notice once a form-processing service is wired up (see comments in this file).";

        status.classList.remove(
          "success"
        );

        status.classList.add(
          "error",
          "is-visible"
        );
      }
    }
  );
}


/* -------------------- 10. INIT -------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderHeader();

    renderFooter();

    initMobileNav();

    initScrollReveal();


    // Page-specific initializers are called
    // from each page's inline script block.
    if (
      typeof initPage ===
      "function"
    ) {
      initPage();
    }

  }
);