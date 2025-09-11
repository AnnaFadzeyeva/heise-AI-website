// js/themeToggle.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Theme aus localStorage laden
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  updateThemeAssets(savedTheme);

  // Klick-Handler
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme");
      const newTheme = current === "light" ? "dark" : "light";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      updateThemeAssets(newTheme);
      // Event werfen, damit andere Module reagieren können
      document.dispatchEvent(
        new CustomEvent("themeChange", { detail: { theme: newTheme } })
      );
    });
  }

  function updateThemeAssets(theme) {
    if (themeIcon) {
      themeIcon.src =
        theme === "light" ? "img/svg/Brightness.svg" : "img/svg/Moon.svg";
    }

    const brandLogo = document.querySelector(".brand-logo");
    if (brandLogo) {
      brandLogo.src =
        theme === "light"
          ? "img/heiseAI-logo.svg"
          : "img/heiseAI-logo-dark.svg";
    }

    const footerLogo = document.querySelector(".footer-logo");
    if (footerLogo) {
      footerLogo.src =
        theme === "light"
          ? "img/heiseAI-logo.svg"
          : "img/heiseAI-logo-dark.svg";
    }

    const partnerLogo = document.querySelector(".footer-partner-logo");
    if (partnerLogo) {
      partnerLogo.src =
        theme === "light"
          ? "img/Logo_DEEP-CONTENT-Heise_micro_light.svg"
          : "img/Logo_DEEP-CONTENT-Heise_micro.svg";
    }
  }

  // Exportieren, damit Footer drauf zugreifen kann
  window.updateThemeAssets = updateThemeAssets;
});