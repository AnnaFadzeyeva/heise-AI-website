// js/login.js

export function renderLogin(lang) {
  fetch("data/content.json")
    .then((res) => res.json())
    .then((data) => {
      const loginData = data[lang]?.login;
      if (!loginData) return;

      // Titel & Untertitel
      const titleEl = document.getElementById("login-title");
      if (titleEl) titleEl.textContent = loginData.title;

      const subtitleEl = document.getElementById("login-subtitle");
      if (subtitleEl) subtitleEl.textContent = loginData.subtitle;

      // Step 1: Email
      const emailLabel = document.querySelector("label[for='login-email']");
      if (emailLabel) emailLabel.textContent = loginData.steps.email.label;

      const emailInput = document.getElementById("login-email");
      if (emailInput)
        emailInput.placeholder = loginData.steps.email.placeholder;

      const emailBtn = document.getElementById("login-email-submit");
      if (emailBtn) emailBtn.textContent = loginData.steps.email.button;

      // Step 2: Code
      const codeNote = document.querySelector("#login-step-code .form-note");
      if (codeNote) codeNote.textContent = loginData.steps.code.note;

      const codeLabel = document.querySelector("label[for='login-code']");
      if (codeLabel) codeLabel.textContent = loginData.steps.code.label;

      const codeInput = document.getElementById("login-code");
      if (codeInput)
        codeInput.placeholder = loginData.steps.code.placeholder;

      const codeBtn = document.getElementById("login-code-submit");
      if (codeBtn) codeBtn.textContent = loginData.steps.code.button;

      const backBtn = document.getElementById("login-back");
      if (backBtn) backBtn.textContent = loginData.steps.code.links.back;

      const resendBtn = document.getElementById("login-resend");
      if (resendBtn) resendBtn.textContent = loginData.steps.code.links.resend;
    })
    .catch((err) => console.error("Fehler beim Laden von content.json:", err));
}