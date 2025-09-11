export function renderPricing(sectionId, content) {
  // Section-Titel (klein)
  const titleEl = document.getElementById(`${sectionId}-title`);
  if (titleEl) titleEl.textContent = content.title || "";

  // Headline (groß)
  const headlineEl = document.getElementById(`${sectionId}-headline`);
  if (headlineEl) headlineEl.textContent = content.headline || "";

  // Social Icons
  const socialEl = document.getElementById(`${sectionId}-social`);
  if (socialEl && content.socialIcons) {
    socialEl.innerHTML = content.socialIcons
      .map(
        (s) => `<img src="${s.icon}" alt="${s.alt}" class="social-icon">`
      )
      .join("");
  }

  // Subheadline
  const subheadlineEl = document.getElementById(`${sectionId}-subheadline`);
  if (subheadlineEl) subheadlineEl.textContent = content.subheadline || "";

  // Pricing-Pläne
  const plansEl = document.getElementById(`${sectionId}-plans`);
  if (plansEl && content.plans) {
    plansEl.innerHTML = content.plans
      .map((p) => `
        <div class="pricing-card ${p.highlight ? "highlight" : ""}" role="button" tabindex="0">
          <div class="pricing-header">
            <h4>
              ${p.name}
              ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
            </h4>
            <div class="price">
              <span class="label">${p.label}</span>
              ${p.description ? `<p>${p.description}</p>` : ""}
            </div>
          </div>
          <ul class="pricing-features">
            ${(p.features || [])
              .map(
                (f) => `
              <li>
                <img src="${f.icon}" alt="" aria-hidden="true" class="pricing-icon">
                <span>${f.text}</span>
              </li>`
              )
              .join("")}
          </ul>
          <div class="pricing-footer">
            ${
              p.button
                ? `<a href="${p.button.link}" class="btn ${p.button.style}" onclick="event.stopPropagation()">
                     ${p.button.label}
                   </a>`
                : ""
            }
          </div>
        </div>`
      )
      .join("");

    // === Highlight-Logik ===
    const cards = plansEl.querySelectorAll(".pricing-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("highlight"));
        card.classList.add("highlight");
      });
    });
  }
}