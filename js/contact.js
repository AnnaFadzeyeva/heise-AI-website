export async function renderContact(sectionId, content) {
  // Titel + Untertitel
  document.getElementById("contact-title").textContent = content.title;
  document.getElementById("contact-subtitle").textContent = content.subtitle;

  // Formular
  const form = document.getElementById("contact-form");
  form.innerHTML = `<p class="form-note">${content.form.note}</p>`;

  let emailField = null;
  let phoneField = null;

  // 📥 CountryCodes laden
  let countryCodes = [];
  try {
    const res = await fetch("data/countryCodes.json");
    countryCodes = await res.json();
  } catch (err) {
    console.error("Konnte countryCodes.json nicht laden:", err);
  }

  content.form.fields.forEach((f) => {
    const autocompleteAttr = f.autocomplete
      ? `autocomplete="${f.autocomplete}"`
      : `autocomplete="on"`;

    let fieldHTML = "";

    if (f.type === "textarea") {
      fieldHTML = `
        <label for="${f.name}">${f.label}</label>
        <textarea 
          id="${f.name}"
          name="${f.name}" 
          placeholder="${f.placeholder}" 
          ${f.required ? "required" : ""}
          ${autocompleteAttr}
          rows="4"
        ></textarea>
      `;
    } else if (f.name === "telephone") {
      // Dynamische Optionen für Länder-Codes
      const optionsHTML = countryCodes
        .map(
          (c) => `
            <option value="${c.dial_code}" ${c.dial_code === "+49" ? "selected" : ""}>
              ${c.flag} ${c.dial_code}
            </option>
          `
        )
        .join("");

      fieldHTML = `
        <label for="${f.name}">${f.label}</label>
        <div class="phone-input-wrapper">
          <select id="country-code" name="country-code" class="phone-select">
            ${optionsHTML}
          </select>
          <input 
            id="${f.name}" 
            type="tel" 
            name="${f.name}" 
            placeholder="123 4567890" 
            ${f.required ? "required" : ""}
            ${autocompleteAttr}
          >
        </div>
      `;
    } else {
      fieldHTML = `
        <label for="${f.name}">${f.label}</label>
        <input 
          id="${f.name}"
          type="${f.type}" 
          name="${f.name}" 
          placeholder="${f.placeholder}" 
          ${f.required ? "required" : ""}
          ${autocompleteAttr}
        >
      `;
    }

    const field = document.createElement("div");
    field.className = "form-field";
    field.innerHTML = fieldHTML;

    if (f.name === "email") {
      emailField = field;
    } else if (f.name === "telephone") {
      phoneField = field;
    } else {
      form.appendChild(field);
    }
  });

  // Email + Telefon nebeneinander
  if (emailField && phoneField) {
    const group = document.createElement("div");
    group.className = "form-row";
    group.appendChild(emailField);
    group.appendChild(phoneField);
    form.appendChild(group);
  }

  // Submit
  const pagination = document.getElementById("contact-pagination");
  pagination.innerHTML = `
    <button type="submit" class="btn btn-primary">
      ${content.form.pagination.buttonText}
    </button>
  `;

  // Bild
  const img = document.getElementById("contact-image");
  if (img && content.image) img.src = content.image;
}