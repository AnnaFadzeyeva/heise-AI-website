document.addEventListener("DOMContentLoaded", () => {
  const emailStep = document.getElementById("login-step-email");
  const codeStep = document.getElementById("login-step-code");

  const emailSubmit = document.getElementById("login-email-submit");
  const backBtn = document.getElementById("login-back");

  emailSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    emailStep.style.display = "none";
    codeStep.style.display = "block";
  });

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    codeStep.style.display = "none";
    emailStep.style.display = "block";
  });

  // Resend Code (Demo)
  document.getElementById("login-resend").addEventListener("click", () => {
    alert("Neuer Code wurde an Ihre E-Mail gesendet.");
  });

  // Code Submit (Demo)
  document.getElementById("login-code-submit").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Login erfolgreich!");
  });
});