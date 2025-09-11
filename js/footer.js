export function renderFooter(content) {
  const footer = document.getElementById("site-footer");

  footer.innerHTML = `
    <div class="container footer-top">
      <div class="footer-brand">
        <img src="${content.brand.logo}" alt="${content.brand.alt}" class="footer-logo"/>
        <p>${content.brand.text}</p>
        <div class="social-links">
          ${content.brand.social
            .map(
              (s) =>
                `<a href="${s.url}"><img src="${s.icon}" alt="${s.alt}"></a>`
            )
            .join("")}
        </div>
      </div>

      <div class="footer-nav">
        ${content.navigation
          .map(
            (col) => `
            <div class="footer-col">
              <h3>${col.title}</h3>
              <ul>
                ${col.links
                  .map(
                    (link) => `<li><a href="${link.url}">${link.label}</a></li>`
                  )
                  .join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="footer-partner">
        <span>${content.partner.text}</span>
        <img src="${content.partner.logo}" alt="${content.partner.alt}" />
      </div>
    </div>

    <div class="footer-bottom">
      <ul class="footer-links">
        ${content.bottom.links
          .map((link) => `<li><a href="${link.url}">${link.label}</a></li>`)
          .join("")}
      </ul>
      <p>${content.bottom.text}</p>
    </div>
  `;
}