// js/steps.js
export function renderSteps(sectionId, content) {
  const stepsEl = document.getElementById(`${sectionId}-steps`);
  const dotsEl = document.getElementById(`${sectionId}-dots`);
  const prevBtn = document.querySelector(`#${sectionId} .carousel-step-prev`);
  const nextBtn = document.querySelector(`#${sectionId} .carousel-step-next`);

  if (!stepsEl || !content.steps) return;

  stepsEl.innerHTML = "";
  dotsEl.innerHTML = "";

  // Steps einfügen
  content.steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    stepEl.className = "step-card";
    stepEl.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.text}</p>
      <img src="${step.image}" alt="${step.alt}">
    `;
    stepsEl.appendChild(stepEl);

    // Dots
    const dot = document.createElement("button");
    dot.className = "carousel-step-dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(index));
    dotsEl.appendChild(dot);
  });

  let currentIndex = 0;
  const stepCards = stepsEl.querySelectorAll(".step-card");
  const dots = dotsEl.querySelectorAll(".carousel-step-dot");

  // Slide anzeigen (mobil)
  function showSlide(index) {
    if (window.innerWidth >= 960) return; // nur mobil
    if (index < 0) index = stepCards.length - 1;
    if (index >= stepCards.length) index = 0;
    currentIndex = index;

    stepsEl.style.transform = `translateX(-${index * 100}%)`;
    stepsEl.style.transition = "transform 0.4s ease";
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  // Pfeile
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
  }

  // Setup für mobil/desktop
  function setupCarousel() {
    if (window.innerWidth < 960) {
      stepsEl.style.width = `${stepCards.length * 100}%`;
      stepsEl.style.display = "flex";
      stepsEl.style.flexWrap = "nowrap";
      stepCards.forEach((c) => (c.style.minWidth = "100%"));
      showSlide(currentIndex);
    } else {
      stepsEl.style.width = "100%";
      stepsEl.style.transform = "none";
      stepsEl.style.display = "flex";
      stepsEl.style.flexWrap = "nowrap";
      stepCards.forEach((c) => {
        c.style.minWidth = "auto"; // normale Größe
        c.style.flex = "1";        // nebeneinander
      });
    }
  }

  setupCarousel();
  window.addEventListener("resize", setupCarousel);
}