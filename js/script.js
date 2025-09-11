// js/script.js
import { renderWorkflow } from "./workflow.js";
import { renderAwards } from "./awards.js";
import { renderPricing } from "./pricing.js";
import { renderContact } from "./contact.js";
import { renderFooter } from "./footer.js";
import { renderHeaderHero } from "./headerHero.js";
function getLanguage() {
  return localStorage.getItem("lang") || "de";
}

// ---------- Dynamic Section Rendering ----------
function renderSection(sectionId, jsonFile) {
  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP Fehler: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      // Titel
      const titleEl = document.getElementById(`${sectionId}-title`);
      if (titleEl && content.title) titleEl.textContent = content.title;

      // Optionaler Untertitel
      const subtitleEl = document.getElementById(`${sectionId}-subtitle`);
      if (subtitleEl && content.subtitle)
        subtitleEl.textContent = content.subtitle;

      // Beschreibung
      const descEl = document.getElementById(`${sectionId}-description`);
      if (descEl && content.description)
        descEl.textContent = content.description;

      // CTA
      const ctaEl = document.getElementById(`${sectionId}-cta`);
      if (ctaEl && content.cta) {
        ctaEl.textContent = content.cta.label;
        ctaEl.href = content.cta.link;
      }

      // Karten (generisch)
      const cardsContainer = document.getElementById(`${sectionId}-cards`);
      if (cardsContainer && content.cards) {
        cardsContainer.innerHTML = "";
        content.cards.forEach((card) => {
          const cardEl = document.createElement("div");
          cardEl.className = "card";
          cardEl.innerHTML = `
            <div class="card-icon">
              <img src="${card.icon}" alt="${card.title} Icon" />
            </div>
            <div>
              <h3>${card.title}</h3>
              <p>${card.text}</p>
            </div>
          `;
          cardsContainer.appendChild(cardEl);
        });
      }

      // Features-Block (Social + Features-Karten + Wave)
      const socialEl = document.getElementById(`${sectionId}-social`);
      if (sectionId !== "workflow" && socialEl && content.social) {
        socialEl.innerHTML = "";
        content.social.forEach((s) => {
          const icon = document.createElement("img");
          icon.src = s.icon;
          icon.alt = s.alt;
          socialEl.appendChild(icon);
        });
      }

      const featuresEl = document.getElementById(`${sectionId}-cards`);
      if (featuresEl && content.features) {
        featuresEl.innerHTML = "";

        content.features.forEach((f, i) => {
          // Feature Card
          const card = document.createElement("div");
          card.className = "feature-card";
          card.innerHTML = `
      <img class="feature-icon" src="${f.icon}" alt="${f.title}">
      <div>
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </div>
    `;
          featuresEl.appendChild(card);

          // Wave nur zwischen den Cards (nicht nach der letzten)
          if (i < content.features.length - 1) {
            const wave = document.createElement("div");
            wave.className = "wave-wrapper";
            wave.innerHTML = `<img src="img/svg/wave.svg" alt="Trennlinie">`;
            featuresEl.appendChild(wave);
          }
        });
      }

      // Steps-Block ("So geht's")
      const stepsEl = document.getElementById(`${sectionId}-steps`);
      if (stepsEl && content.steps) {
        stepsEl.innerHTML = "";
        content.steps.forEach((step) => {
          const stepEl = document.createElement("div");
          stepEl.className = "step-card";
          stepEl.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.text}</p>
      <img src="${step.image}" alt="${step.alt}">
    `;
          stepsEl.appendChild(stepEl);
        });
      }

      // Workflow
      if (sectionId === "workflow") {
        renderWorkflow(sectionId, content);
      }

      // Testimonials Carousel
      const testimonialsContainer = document.getElementById(
        `${sectionId}-items`
      );
      if (testimonialsContainer && content.testimonials) {
        testimonialsContainer.innerHTML = "";

        // --- Testimonials rendern ---
        content.testimonials.forEach((t, i) => {
          const item = document.createElement("div");
          item.className = "testimonial-card";
          if (i === 0) item.classList.add("active");

          item.innerHTML = `
  <div class="testimonial-header">
    ${
      t.logo
        ? `<img src="${t.logo}" alt="" aria-hidden="true" class="testimonial-logo">`
        : ""
    }
    <div class="testimonial-meta">
      <strong>${t.name}</strong>
      ${t.company ? `<span class="company">${t.company}</span>` : ""}
    </div>
  </div>
  <blockquote>„${t.quote}“</blockquote>
`;
          testimonialsContainer.appendChild(item);
        });

        // --- Pagination Dots rendern ---
        const dotsContainer = document.getElementById(`${sectionId}-dots`);
        if (dotsContainer) {
          dotsContainer.innerHTML = "";
          content.testimonials.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", `Testimonial ${i + 1}`);
            dotsContainer.appendChild(dot);
          });
        }

        // --- Carousel Logic ---
        const track = testimonialsContainer;
        let items = Array.from(track.querySelectorAll(".testimonial-card"));
        const dots = document.querySelectorAll(
          `#${sectionId}-dots .carousel-dot`
        );

        // --- Clones für Loop ---
        const firstClone = items[0].cloneNode(true);
        const lastClone = items[items.length - 1].cloneNode(true);

        firstClone.classList.add("clone");
        lastClone.classList.add("clone");

        track.appendChild(firstClone);
        track.insertBefore(lastClone, items[0]);

        items = Array.from(track.querySelectorAll(".testimonial-card"));

        let currentIndex = 1; // Start beim echten ersten Element
        let realLength = content.testimonials.length;

        function setTranslate(index, animate = true) {
          const activeItem = items[index];
          const viewport = track.parentNode;
          const viewportWidth = viewport.offsetWidth;

          const itemRect = activeItem.getBoundingClientRect();
          const trackRect = track.getBoundingClientRect();
          const itemOffset = itemRect.left - trackRect.left;
          const itemCenter = itemOffset + activeItem.offsetWidth / 2;

          const translateX = -(itemCenter - viewportWidth / 2);

          if (!animate) {
            track.style.transition = "none";
          } else {
            track.style.transition = "transform 0.4s ease";
          }
          track.style.transform = `translateX(${translateX}px)`;

          currentIndex = index;

          // --- Klassen aktualisieren ---
          items.forEach((item, i) =>
            item.classList.toggle("active", i === index)
          );

          // Dots: immer echten Index berechnen
          let realIndex = (index - 1 + realLength) % realLength;
          dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === realIndex)
          );
        }

        function updateCarousel(index) {
          setTranslate(index);
        }

        // --- TransitionEnd: Loop zurückspringen ---
        track.addEventListener("transitionend", () => {
          if (items[currentIndex].classList.contains("clone")) {
            if (currentIndex === 0) {
              // Anfangs-Klon → echter letzter
              setTranslate(items.length - 2, false);
            } else if (currentIndex === items.length - 1) {
              // End-Klon → echter erster
              setTranslate(1, false);
            }
          }
        });

        // --- Buttons ---
        document
          .querySelector(".carousel-prev")
          ?.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
          });
        document
          .querySelector(".carousel-next")
          ?.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
          });

        // --- Dots Click ---
        dots.forEach((dot, i) => {
          dot.addEventListener("click", () => {
            updateCarousel(i + 1); // +1 wegen Clone-Offset
          });
        });

        // --- Startposition setzen ---
        setTranslate(currentIndex, false);
      }

      // FAQ
      const faqContainer = document.getElementById(`${sectionId}-items`);
      if (faqContainer && content.faqs) {
        faqContainer.innerHTML = "";
        content.faqs.forEach((faq, i) => {
          const item = document.createElement("div");
          item.className = "faq-item";

          // Start-Icon ist immer "+"
          item.innerHTML = `
            <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
              <span>${faq.question}</span>
              <span class="faq-icon">+</span>
            </button>
            <div id="faq-answer-${i}" class="faq-answer" hidden>
              <p>${faq.answer}</p>
            </div>
          `;
          faqContainer.appendChild(item);
        });

        // FAQ Toggle (nur eine Frage gleichzeitig geöffnet)
        faqContainer.querySelectorAll(".faq-question").forEach((btn) => {
          btn.addEventListener("click", () => {
            const expanded = btn.getAttribute("aria-expanded") === "true";

            // Alle anderen schließen
            faqContainer
              .querySelectorAll(".faq-question")
              .forEach((otherBtn) => {
                otherBtn.setAttribute("aria-expanded", "false");
                otherBtn.querySelector(".faq-icon").textContent = "+";
                if (otherBtn.nextElementSibling) {
                  otherBtn.nextElementSibling.hidden = true;
                }
              });

            // Aktuelle Frage umschalten
            btn.setAttribute("aria-expanded", String(!expanded));
            const answer = btn.nextElementSibling;
            if (answer) {
              answer.hidden = expanded;
              btn.querySelector(".faq-icon").textContent = expanded ? "+" : "–";
            }
          });
        });
      }
    })
    .catch((error) =>
      console.error(`Fehler beim Laden von ${jsonFile}:`, error)
    );
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderSection("compliance", "data/compliance.json");
  renderSection("features", "data/features.json");
  renderSection("leistungen", "data/benefits.json");
  renderSection("so-gehts", "data/steps.json");
  renderSection("workflow", "data/workflow.json");
  renderSection("testimonials", "data/testimonials.json");
  renderSection("heise-io-faq", "data/faq.json");
  fetch("data/header-hero.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderHeaderHero("header-hero", content);
    });
  fetch("data/awards.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderAwards("awards", content);
    })
    .catch((err) => console.error("Awards JSON Fehler:", err));
  fetch("data/pricing.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderPricing("pricing", content);
    });
  fetch("data/contact.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderContact("contact-support", content);
    });
  fetch("data/footer.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderFooter(content);
    });
});

// ---------- Language Switch ----------
document.querySelectorAll(".lang-switch .lang").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const newLang = el.dataset.lang;

    // Sprache speichern
    localStorage.setItem("lang", newLang);

    // Aktive Klasse updaten
    document
      .querySelectorAll(".lang-switch .lang")
      .forEach((l) => l.classList.remove("active"));
    el.classList.add("active");

    // Seite neu rendern (alle Sections)
    reloadSections();
  });
});

// Hilfsfunktion: rendert alle Sektionen neu
function reloadSections() {
  renderSection("compliance", "data/compliance.json");
  renderSection("features", "data/features.json");
  renderSection("leistungen", "data/benefits.json");
  renderSection("so-gehts", "data/steps.json");
  renderSection("workflow", "data/workflow.json");
  renderSection("testimonials", "data/testimonials.json");
  renderSection("heise-io-faq", "data/faq.json");

  fetch("data/header-hero.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderHeaderHero("header-hero", content);
    });
    
  fetch("data/awards.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderAwards("awards", content);
    });

  fetch("data/pricing.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderPricing("pricing", content);
    });

  fetch("data/contact.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderContact("contact-support", content);
    });

  fetch("data/footer.json")
    .then((res) => res.json())
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang] || data["de"];
      renderFooter(content);
    });
}
