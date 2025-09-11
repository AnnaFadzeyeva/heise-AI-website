export function renderHeaderHero(sectionId, data) {
  // === HEADER ===
  const navEl = document.querySelector("nav#primary-nav .nav-center");
  if (navEl && data.header?.nav?.links) {
    navEl.innerHTML = data.header.nav.links
      .map((link) => `<li><a class="nav-item" href="${link.url}">${link.label}</a></li>`)
      .join("");
  }

  const loginEl = document.querySelector(".nav-right .login");
  if (loginEl && data.header?.nav?.actions?.login) {
    loginEl.textContent = data.header.nav.actions.login.label;
    loginEl.href = data.header.nav.actions.login.url;
  }

  const ctaEl = document.querySelector(".nav-right .cta");
  if (ctaEl && data.header?.nav?.actions?.cta) {
    ctaEl.textContent = data.header.nav.actions.cta.label;
    ctaEl.href = data.header.nav.actions.cta.url;
  }

  // === HERO ===
  if (data.hero) {
    document.querySelector(".hero .eyebrow").innerHTML = data.hero.eyebrow;
    document.querySelector(".hero h1").innerHTML = data.hero.headline;
    document.querySelector(".hero .lead").innerHTML = data.hero.lead;

    const heroActions = document.querySelector(".hero .actions");
    if (heroActions) {
      heroActions.innerHTML = data.hero.actions
        .map(
          (a) =>
            `<a class="${a.style}" href="${a.url}">${a.label}</a>`
        )
        .join("");
    }

    const heroImg = document.querySelector(".hero .phone-mock");
    if (heroImg && data.hero.image) {
      heroImg.src = data.hero.image.src;
      heroImg.srcset = data.hero.image.srcset;
      heroImg.sizes = data.hero.image.sizes;
      heroImg.alt = data.hero.image.alt;
    }
  }
}