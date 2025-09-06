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
  data.form.fields.forEach((f) => {
    const field = document.createElement("div");
    field.className = "form-field";
    field.innerHTML = `
      <label>${f.label}</label>
      <input 
        type="${f.type}" 
        name="${f.name}" 
        placeholder="${f.placeholder}" 
        ${f.required ? "required" : ""}
      >
    `;
    form.appendChild(field);
  });

  // Pagination
  const pagination = document.getElementById("contact-pagination");
  pagination.innerHTML = `
    <span>${data.form.pagination.current}/${data.form.pagination.total}</span>
    <button type="submit" class="btn btn-gost">${data.form.pagination.buttonText}</button>
  `;

  // Bild
  const img = document.getElementById("contact-image");
  img.src = data.image;
}