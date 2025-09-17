// js/login.js
function getLanguage() {
  return localStorage.getItem("lang") || "de";
}

let loginData = null; // Cache für JSON

export function renderLogin() {
  fetch("data/login.json")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP Fehler: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      loginData = data; // speichern für späteren Zugriff
      const lang = getLanguage();
      const content = loginData[lang]?.login || loginData["de"].login;

      renderLoginTexts(content);
      initLoginEvents(content);
    })
    .catch((err) => console.error("Fehler beim Laden der Login-Daten:", err));
}

function renderLoginTexts(content) {
  // Titel & Untertitel
  document.getElementById("login-title").textContent = content.title;
  document.getElementById("login-subtitle").textContent = content.subtitle;

  // Step 1: Email
  const emailLabel = document.querySelector("#login-step-email label[for='login-email']");
  if (emailLabel) emailLabel.textContent = content.steps.email.label;

  const emailInput = document.getElementById("login-email");
  if (emailInput) {
    emailInput.placeholder = content.steps.email.placeholder;
  }

  const emailBtn = document.getElementById("login-email-submit");
  if (emailBtn) emailBtn.textContent = content.steps.email.button;

  // Step 2: Code (noch versteckt)
  const note = document.querySelector("#login-step-code .form-note");
  if (note) note.textContent = content.steps.code.note;

  const codeLabel = document.querySelector("#login-step-code label[for='login-code']");
  if (codeLabel) codeLabel.textContent = content.steps.code.label;

  const codeInput = document.getElementById("login-code");
  if (codeInput) {
    codeInput.placeholder = content.steps.code.placeholder;
  }

  const codeBtn = document.getElementById("login-code-submit");
  if (codeBtn) codeBtn.textContent = content.steps.code.button;

  // Links
  const backBtn = document.getElementById("login-back");
  if (backBtn) backBtn.textContent = content.steps.code.links.back;

  const resendBtn = document.getElementById("login-resend");
  if (resendBtn) resendBtn.textContent = content.steps.code.links.resend;
}

function initLoginEvents(content) {
  const emailBtn = document.getElementById("login-email-submit");
  const backBtn = document.getElementById("login-back");

  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Step 1 verstecken, Step 2 anzeigen
      document.getElementById("login-step-email").style.display = "none";
      document.getElementById("login-step-code").style.display = "block";

      // Untertitel ersetzen durch note
      const subtitleEl = document.getElementById("login-subtitle");
      subtitleEl.textContent = content.steps.code.note;
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Step 2 verstecken, Step 1 anzeigen
      document.getElementById("login-step-code").style.display = "none";
      document.getElementById("login-step-email").style.display = "block";

      // Untertitel zurücksetzen
      const subtitleEl = document.getElementById("login-subtitle");
      subtitleEl.textContent = content.subtitle;
    });
  }
}

// Initial Render auf DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderLogin();
});