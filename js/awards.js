// js/awards.js
export function renderAwards(sectionId, content) {
  // Titel
  const titleEl = document.getElementById(`${sectionId}-title`);
  if (titleEl && content.title) titleEl.textContent = content.title;

  // Visual (Bild + Caption)
  const visualEl = document.getElementById(`${sectionId}-visual`);
  if (visualEl && content.visual) {
    visualEl.innerHTML = `
      <figure>
        <img src="${content.visual.image}" alt="${content.visual.alt}">
        <figcaption>${content.visual.caption}</figcaption>
      </figure>
    `;
  }

  // Social (Award-Icons)
  const socialEl = document.getElementById(`${sectionId}-social`);
  if (socialEl && content.social) {
    socialEl.innerHTML = "";
    content.social.forEach((award) => {
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

    if (content.paragraphs) {
      html += content.paragraphs.map((p) => `<p>${p}</p>`).join("");
    }

    if (content.list) {
      html += "<ul class='awards-list'>";
      html += content.list.map((item) => `<li>${item}</li>`).join("");
      html += "</ul>";
    }

    if (content.afterList) {
      html += content.afterList.map((p) => `<p>${p}</p>`).join("");
    }

    descEl.innerHTML = html;
  }

  // Buttons
  const btnsEl = document.getElementById(`${sectionId}-buttons`);
  if (btnsEl && content.buttons) {
    btnsEl.innerHTML = "";
    content.buttons.forEach((btn) => {
      const a = document.createElement("a");
      a.href = btn.link;
      a.className = "btn-small btn-secondary";
      a.textContent = btn.label;
      btnsEl.appendChild(a);
    });
  }
}