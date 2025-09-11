document.addEventListener("DOMContentLoaded", () => {
  fetch("data/contact.json")
    .then((res) => res.json())
    .then((data) => renderContactSection(data));
});

function renderContactSection(data) {
  // Titel + Untertitel
  document.getElementById("contact-title").textContent = data.title;
  document.getElementById("contact-subtitle").textContent = data.subtitle;

  // Formular
  const form = document.getElementById("contact-form");
  form.innerHTML = `<p class="form-note">${data.form.note}</p>`;

  let emailField = null;
  let phoneField = null;

data.form.fields.forEach((f) => {
  // Fallback: wenn kein autocomplete im JSON, dann default = "on"
  const autocompleteAttr = f.autocomplete ? `autocomplete="${f.autocomplete}"` : `autocomplete="on"`;

  const fieldHTML =
    f.type === "textarea"
      ? `
        <label for="${f.name}">${f.label}</label>
        <textarea 
          id="${f.name}"
          name="${f.name}" 
          placeholder="${f.placeholder}" 
          ${f.required ? "required" : ""}
          ${autocompleteAttr}
          rows="4"
        ></textarea>
      `
      : `
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

  // Gruppe für Email & Telefon
  if (emailField && phoneField) {
    const group = document.createElement("div");
    group.className = "form-row";
    group.appendChild(emailField);
    group.appendChild(phoneField);
    form.appendChild(group);
  }

  // Pagination
  const pagination = document.getElementById("contact-pagination");
  pagination.innerHTML = `
    <button type="submit" class="btn-small btn-primary">${data.form.pagination.buttonText}</button>
  `;

  // Bild
  const img = document.getElementById("contact-image");
  img.src = data.image;
}
