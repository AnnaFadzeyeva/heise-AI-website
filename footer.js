document.addEventListener("DOMContentLoaded", () => {
  fetch("data/footer.json")
    .then(res => res.json())
    .then(data => renderFooter(data));
});

function renderFooter(data) {
  const footer = document.getElementById("site-footer");

  footer.innerHTML = `
    <div class="container footer-top">
      <div class="footer-brand">
        <img src="${data.brand.logo}" alt="${data.brand.alt}" class="footer-logo"/>
        <p>${data.brand.text}</p>
        <div class="social-links">
          ${data.brand.social
            .map(s => `<a href="${s.url}"><img src="${s.icon}" alt="${s.alt}"></a>`)
            .join("")}
        </div>
      </div>

      <div class="footer-nav">
        ${data.navigation
          .map(
            col => `
            <div class="footer-col">
              <h4>${col.title}</h4>
              <ul>
                ${col.links
                  .map(link => `<li><a href="${link.url}">${link.label}</a></li>`)
                  .join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="footer-partner">
        <img src="${data.partner.logo}" alt="${data.partner.alt}" />
        <span>${data.partner.text}</span>
      </div>
    </div>

    <div class="footer-bottom">
      <p>${data.bottom.text}</p>
      <ul class="footer-links">
        ${data.bottom.links
          .map(link => `<li><a href="${link.url}">${link.label}</a></li>`)
          .join("")}
      </ul>
    </div>
  `;
}