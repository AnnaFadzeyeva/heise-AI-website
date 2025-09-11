export function renderFooter(content) {
  const footer = document.getElementById("site-footer");

  footer.innerHTML = `
    <div class="container footer-top">
      <div class="footer-brand">
        <img src="img/heiseAI-logo.svg" alt="${content.brand.alt}" class="footer-logo"/>
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
        <img src="img/Logo_DEEP-CONTENT-Heise_micro.svg" alt="${content.partner.alt}" class="footer-partner-logo"/>
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

  
  const currentTheme = document.documentElement.getAttribute("data-theme");
  updateFooterLogos(currentTheme);
}

function updateFooterLogos(theme) {
  const footerLogo = document.querySelector(".footer-logo");
  const partnerLogo = document.querySelector(".footer-partner-logo");

  if (footerLogo) {
    footerLogo.src =
      theme === "light"
        ? "img/heiseAI-logo.svg"
        : "img/heiseAI-logo-dark.svg";
  }

  if (partnerLogo) {
    partnerLogo.src =
      theme === "light"
        ? "img/Logo_DEEP-CONTENT-Heise_micro_light.svg"
        : "img/Logo_DEEP-CONTENT-Heise_micro.svg";
  }
}