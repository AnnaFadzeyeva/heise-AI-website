document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!navToggle || !nav) return;

  function toggleMenu(forceState) {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    const newState = typeof forceState === "boolean" ? forceState : !expanded;

    navToggle.setAttribute("aria-expanded", newState);
    nav.classList.toggle("is-open", newState);
    document.body.classList.toggle("menu-open", newState);

    // Klick außerhalb nur aktiv, wenn offen
    if (newState) {
      document.addEventListener("click", outsideClick);
    } else {
      document.removeEventListener("click", outsideClick);
    }
  }

  function outsideClick(e) {
    if (
      !nav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  }

  navToggle.addEventListener("click", () => toggleMenu());

  nav.querySelectorAll("a.nav-item").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      toggleMenu(false);
    }
  });
});