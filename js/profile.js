function getLanguage() {
  return localStorage.getItem("lang") || "de";
}

export function renderProfile() {
  fetch("data/profile.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP Fehler: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const lang = getLanguage();
      const content = data[lang]?.profile || data["de"].profile;

      // === Alle H2 automatisch setzen ===
      const sections = ["company", "details", "presence", "contact", "personalization"];
      sections.forEach((section) => {
        const heading = document.querySelector(`h2[data-section='${section}']`);
        if (heading && content[section]?.title) {
          heading.textContent = content[section].title;
        }
      });

      // === Unternehmensdaten ===
      const logoImg = document.getElementById("company-logo-img");
      const logoBtn = document.getElementById("logo-btn");

      if (content.company.logo && content.company.logo.trim() !== "") {
        if (logoImg) {
          logoImg.src = content.company.logo;
          logoImg.alt = content.company.brand + " Logo";
          logoImg.style.display = "block";
        }
        if (logoBtn) {
          logoBtn.textContent = "Unternehmenslogo ändern";
        }
      } else {
        if (logoImg) logoImg.style.display = "none";
        if (logoBtn) logoBtn.textContent = "Logo hochladen";
      }

      document.getElementById("brand").value = content.company.brand;
      document.getElementById("slogan").value = content.company.slogan;

      // === Unternehmensdetails ===
      document.getElementById("products").value = content.details.products;
      document.getElementById("services").value = content.details.services;
      document.getElementById("size").value = content.details.size;
      document.getElementById("year").value = content.details.year;

      // === Online-Präsenz ===
      document.getElementById("website").value = content.presence.website;
      document.getElementById("email").value = content.presence.email;

      // === Kontakt ===
      document.getElementById("opening").value = content.contact.opening;
      document.getElementById("phone").value = content.contact.phone;
      document.getElementById("address").value = content.contact.address;
      document.getElementById("zip").value = content.contact.zip;
      document.getElementById("city").value = content.contact.city;
      document.getElementById("country").value = content.contact.country;

      // === Personalisierung ===
      document.getElementById("style").value = content.personalization.style;
      document.getElementById("hashtags").value = content.personalization.hashtags;

      // === Aktionen ===
      document.getElementById("logout-btn").textContent = content.actions.logout;
      document.getElementById("save-btn").textContent = content.actions.save;
    })
    .catch((err) => console.error("Fehler beim Laden der Profile-Daten:", err));
}

document.addEventListener("DOMContentLoaded", renderProfile);

// =========================================
// Auto-Resize für Textareas
// =========================================
function autoResizeTextarea(el) {
  el.style.height = "auto";
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
  const paddingTop = parseFloat(getComputedStyle(el).paddingTop);
  const paddingBottom = parseFloat(getComputedStyle(el).paddingBottom);
  const singleLineHeight = lineHeight + paddingTop + paddingBottom;
  const newHeight = el.scrollHeight;
  el.style.height = Math.max(newHeight, singleLineHeight) + "px";
}

document.addEventListener("DOMContentLoaded", () => {
  const textareas = document.querySelectorAll("textarea.auto-resize");
  textareas.forEach((ta) => {
    autoResizeTextarea(ta);
    ta.addEventListener("input", () => autoResizeTextarea(ta));
  });
});

// =========================================
// Logo Upload (Drag & Drop / Klick)
// =========================================
const fileInput = document.getElementById("company-logo-upload");
const preview = document.getElementById("company-logo-preview");
const placeholder = document.querySelector(".logo-upload-placeholder");
const uploadArea = document.getElementById("logo-upload");

if (uploadArea && fileInput) {
  uploadArea.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
        placeholder.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      alert("Bitte ein Bild (PNG/JPG) bis 2MB auswählen.");
    }
  });
}