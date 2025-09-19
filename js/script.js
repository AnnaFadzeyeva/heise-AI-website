// js/script.js
import { renderWorkflow } from "./workflow.js";
import { renderSteps } from "./steps.js";
import { renderAwards } from "./awards.js";
import { renderPricing } from "./pricing.js";
import { renderTestimonials } from "./testimonials.js";
import { renderContact } from "./contact.js";
import { renderFooter } from "./footer.js";
import { renderHeaderHero } from "./headerHero.js";
/* import { renderLogin } from "./login.js"; */
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

      // Workflow
      if (sectionId === "workflow") {
        renderWorkflow(sectionId, content);
      }

      // Steps-Block ("So geht's")
      if (sectionId === "so-gehts") {
        renderSteps(sectionId, content);
      }
      // Testimonials
      if (sectionId === "testimonials") {
        renderTestimonials(sectionId, content);
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
    /* renderLogin(); */
}
