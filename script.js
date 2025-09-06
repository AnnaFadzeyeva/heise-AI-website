// ---------- Dynamic Section Rendering ----------
function renderSection(sectionId, jsonFile) {
  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP Fehler: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      // Titel
      const titleEl = document.getElementById(`${sectionId}-title`);
      if (titleEl && data.title) titleEl.textContent = data.title;

      // Optionaler Untertitel
      const subtitleEl = document.getElementById(`${sectionId}-subtitle`);
      if (subtitleEl && data.subtitle) subtitleEl.textContent = data.subtitle;

      // Beschreibung
      const descEl = document.getElementById(`${sectionId}-description`);
      if (descEl && data.description) descEl.textContent = data.description;

      // CTA
      const ctaEl = document.getElementById(`${sectionId}-cta`);
      if (ctaEl && data.cta) {
        ctaEl.textContent = data.cta.label;
        ctaEl.href = data.cta.link;
      }

      // Karten (generisch)
      const cardsContainer = document.getElementById(`${sectionId}-cards`);
      if (cardsContainer && data.cards) {
        cardsContainer.innerHTML = "";
        data.cards.forEach((card) => {
          const cardEl = document.createElement("div");
          cardEl.className = "card";
          cardEl.innerHTML = `
            <div class="card-icon">
              <img src="${card.icon}" alt="${card.title} Icon" />
            </div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          `;
          cardsContainer.appendChild(cardEl);
        });
      }

      // Features-Block (Social + Features-Karten + Wave)
      const socialEl = document.getElementById(`${sectionId}-social`);
      if (socialEl && data.social) {
        socialEl.innerHTML = "";
        data.social.forEach((s) => {
          const icon = document.createElement("img");
          icon.src = s.icon;
          icon.alt = s.alt;
          socialEl.appendChild(icon);
        });
      }

      const featuresEl = document.getElementById(`${sectionId}-cards`);
      if (featuresEl && data.features) {
        featuresEl.innerHTML = "";

        data.features.forEach((f, i) => {
          // Feature Card
          const card = document.createElement("div");
          card.className = "feature-card";
          card.innerHTML = `
      <img class="feature-icon" src="${f.icon}" alt="${f.title}">
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    `;
          featuresEl.appendChild(card);

          // Wave nur zwischen den Cards (nicht nach der letzten)
          if (i < data.features.length - 1) {
            const wave = document.createElement("div");
            wave.className = "wave-wrapper";
            wave.innerHTML = `<img src="img/svg/wave.svg" alt="Trennlinie">`;
            featuresEl.appendChild(wave);
          }
        });
      }

      // Steps-Block ("So geht's")
      const stepsEl = document.getElementById(`${sectionId}-steps`);
      if (stepsEl && data.steps) {
        stepsEl.innerHTML = "";
        data.steps.forEach((step) => {
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

      // Workflow-Block
      const infographicEl = document.getElementById(`${sectionId}-infographic`);
      if (infographicEl && data.infographic) {
        infographicEl.innerHTML = `
          <img src="${data.infographic.image}" alt="${data.infographic.alt}">
        `;
      }

      const visualEl = document.getElementById(`${sectionId}-visual`);
      if (visualEl && data.visual) {
        visualEl.innerHTML = `
          <img src="${data.visual.image}" alt="${data.visual.alt}">
        `;
      }

      const workflowSocialEl = document.getElementById(`${sectionId}-social`);
      if (workflowSocialEl && data.social) {
        workflowSocialEl.innerHTML = "";
        data.social.forEach((s) => {
          const icon = document.createElement("img");
          icon.src = s.icon;
          icon.alt = s.alt;
          workflowSocialEl.appendChild(icon);
        });
      }

      // Testimonials Carousel
// Testimonials Carousel
const testimonialsContainer = document.getElementById(`${sectionId}-items`);
if (testimonialsContainer && data.testimonials) {
  testimonialsContainer.innerHTML = "";

  // --- Testimonials rendern ---
  data.testimonials.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "testimonial-card";
    if (i === 0) item.classList.add("active");

    item.innerHTML = `
      <div class="testimonial-header">
        ${
          t.logo
            ? `<img src="${t.logo}" alt="${t.company} Logo" class="testimonial-logo">`
            : ""
        }
        <div class="testimonial-meta">
          <strong>${t.name}</strong><br>
          <span>${t.company}</span>
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
    data.testimonials.forEach((_, i) => {
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
  const dots = document.querySelectorAll(`#${sectionId}-dots .carousel-dot`);

  // --- Clones für Loop ---
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, items[0]);

  items = Array.from(track.querySelectorAll(".testimonial-card"));

  let currentIndex = 1; // Start beim echten ersten Element
  let realLength = data.testimonials.length;

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
    items.forEach((item, i) => item.classList.toggle("active", i === index));

    // Dots: immer echten Index berechnen
    let realIndex = (index - 1 + realLength) % realLength;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === realIndex));
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
  document.querySelector(".carousel-prev")?.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
  });
  document.querySelector(".carousel-next")?.addEventListener("click", () => {
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
      if (faqContainer && data.faqs) {
        faqContainer.innerHTML = "";
        data.faqs.forEach((faq, i) => {
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
  renderSection("leistungen", "data/leistungen.json");
  renderSection("so-gehts", "data/so-gehts.json");
  renderSection("workflow", "data/workflow.json");
  renderSection("testimonials", "data/testimonials.json");
  renderSection("heise-io-faq", "data/heise-io-faq.json");
});
