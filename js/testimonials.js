// js/testimonials.js

export function renderTestimonials(sectionId, content) {
  const testimonialsContainer = document.getElementById(`${sectionId}-items`);
  if (!testimonialsContainer || !content.testimonials) return;

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

    track.style.transition = animate ? "transform 0.4s ease" : "none";
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
        setTranslate(items.length - 2, false); // Anfangs-Klon → letzter
      } else if (currentIndex === items.length - 1) {
        setTranslate(1, false); // End-Klon → erster
      }
    }
  });

  // --- Buttons ---
  document.querySelector(".carousel-prev")
    ?.addEventListener("click", () => updateCarousel(currentIndex - 1));
  document.querySelector(".carousel-next")
    ?.addEventListener("click", () => updateCarousel(currentIndex + 1));

  // --- Dots Click ---
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateCarousel(i + 1));
  });

  // --- Startposition setzen ---
  setTranslate(currentIndex, false);
}