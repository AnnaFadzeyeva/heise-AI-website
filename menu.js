document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!navToggle || !nav) return;

  // Toggle-Funktion
  function toggleMenu(forceState) {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    const newState = typeof forceState === "boolean" ? forceState : !expanded;

    navToggle.setAttribute("aria-expanded", newState);
    nav.classList.toggle("is-open", newState);
    document.body.classList.toggle("menu-open", newState);
  }

  // Klick auf Burger-Button
  navToggle.addEventListener("click", () => {
    toggleMenu();
  });

  // Klick auf Links -> Menü schließen
  nav.querySelectorAll("a.nav-item").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Klick außerhalb -> Menü schließen
  document.addEventListener("click", e => {
    if (
      nav.classList.contains("is-open") &&
      !nav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // ESC -> Menü schließen
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });
});