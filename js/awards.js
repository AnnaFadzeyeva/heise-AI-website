// js/awards.js
export function renderAwards(sectionId, data) {
  // Titel
  const titleEl = document.getElementById(`${sectionId}-title`);
  if (titleEl && data.title) titleEl.textContent = data.title;

  // Visual (Bild + Caption)
  const visualEl = document.getElementById(`${sectionId}-visual`);
  if (visualEl && data.visual) {
    visualEl.innerHTML = `
      <figure>
        <img src="${data.visual.image}" alt="${data.visual.alt}">
        <figcaption>${data.visual.caption}</figcaption>
      </figure>
    `;
  }

  // Social (Award-Icons)
  const socialEl = document.getElementById(`${sectionId}-social`);
  if (socialEl && data.social) {
    socialEl.innerHTML = "";
    data.social.forEach((award) => {
      const img = document.createElement("img");
      img.src = award.icon;
      img.alt = award.alt;
      socialEl.appendChild(img);
    });
  }

  // Beschreibung + Liste + Nachsatz
  const descEl = document.getElementById(`${sectionId}-description`);
  if (descEl) {
    let html = "";

    if (data.paragraphs) {
      html += data.paragraphs.map((p) => `<p>${p}</p>`).join("");
    }

    if (data.list) {
      html += "<ul class='awards-list'>";
      html += data.list.map((item) => `<li>${item}</li>`).join("");
      html += "</ul>";
    }

    if (data.afterList) {
      html += data.afterList.map((p) => `<p>${p}</p>`).join("");
    }

    descEl.innerHTML = html;
  }

  // Buttons
  const btnsEl = document.getElementById(`${sectionId}-buttons`);
  if (btnsEl && data.buttons) {
    btnsEl.innerHTML = "";
    data.buttons.forEach((btn) => {
      const a = document.createElement("a");
      a.href = btn.link;
      a.className = "btn-small btn-primary";
      a.textContent = btn.label;
      btnsEl.appendChild(a);
    });
  }
}
