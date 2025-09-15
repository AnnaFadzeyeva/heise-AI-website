// js/workflow.js
export function renderWorkflow(sectionId, data) {
  // --- Infographic (wie gehabt) ---
  const infographicEl = document.getElementById(`${sectionId}-infographic`);
  if (infographicEl && data.infographic) {
    if (data.infographic.html) {
      infographicEl.innerHTML = data.infographic.html;
    } else if (data.infographic.image) {
      infographicEl.innerHTML =
        `<img src="${data.infographic.image}" alt="${data.infographic.alt || ""}">`;
    }
  }

  // --- VISUAL: genau EIN Bild, sofort einsetzen ---
  const visualEl = document.getElementById(`${sectionId}-visual`);
  if (visualEl) {
    const src = data?.visual?.image;
    const alt = data?.visual?.alt || "";

    if (src) {
      const img = document.createElement("img");
      img.alt = alt;
      img.loading = "lazy";
      img.src = src;

      img.onerror = () => {
        visualEl.innerHTML =
          `<div class="visual-placeholder">Bild nicht gefunden: ${src}</div>`;
      };

      // genau EIN Kind einsetzen/ersetzen
      visualEl.replaceChildren(img);
    } else {
      console.warn("[workflow] Kein visual.image im JSON gefunden");
      visualEl.textContent = "";
    }
  }

  // --- Social (wie gehabt) ---
  const workflowSocialEl = document.getElementById(`${sectionId}-social`);
  if (workflowSocialEl && Array.isArray(data.social)) {
    workflowSocialEl.innerHTML = "";
    data.social.forEach((s) => {
      const icon = document.createElement("img");
      icon.src = s.icon;
      icon.alt = s.alt || "";
      workflowSocialEl.appendChild(icon);
    });
  }
}

