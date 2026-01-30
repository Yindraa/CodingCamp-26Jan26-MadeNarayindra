// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const introOverlay = document.getElementById("introOverlay");
  const introForm = document.getElementById("introForm");
  const introName = document.getElementById("introName");
  const introError = document.getElementById("introError");
  const introClose = document.getElementById("introClose");
  const app = document.getElementById("app");
  const userNameEl = document.getElementById("userName");

  function openIntro() {
    introOverlay?.classList.remove("hidden");
    app?.classList.add("hidden");
    introName?.focus();
  }

  function closeIntro() {
    introOverlay?.classList.add("hidden");
    app?.classList.remove("hidden");
  }

  function setInvalid(input, invalid) {
    if (!input) return;
    if (invalid) {
      input.classList.add("border-red-400", "focus:ring-red-200");
      input.classList.remove("border-slate-200", "focus:ring-blue-200");
    } else {
      input.classList.remove("border-red-400", "focus:ring-red-200");
      input.classList.add("border-slate-200", "focus:ring-blue-200");
    }
  }

  openIntro();

  introClose?.addEventListener("click", () => {
    if (userNameEl) userNameEl.textContent = "Guest";
    closeIntro();
  });

  introForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameVal = introName ? introName.value.trim() : "";
    const invalid = nameVal.length === 0;

    if (introError) introError.classList.toggle("hidden", !invalid);
    setInvalid(introName, invalid);

    if (invalid) return;

    if (userNameEl) userNameEl.textContent = nameVal;
    closeIntro();
  });

  const form = document.getElementById("messageForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("messageText");

  const errName = document.getElementById("errName");
  const errEmail = document.getElementById("errEmail");
  const errPhone = document.getElementById("errPhone");
  const errMsg = document.getElementById("errMsg");

  const outName = document.getElementById("outName");
  const outEmail = document.getElementById("outEmail");
  const outPhone = document.getElementById("outPhone");
  const outMessage = document.getElementById("outMessage");

  function showError(el, show) {
    if (!el) return;
    el.classList.toggle("hidden", !show);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isDigitsOnly(str) {
    return /^[0-9]+$/.test(str);
  }

  nameInput?.addEventListener("input", () => {
    const bad = nameInput.value.trim() === "";
    showError(errName, bad);
    setInvalid(nameInput, bad);
  });

  emailInput?.addEventListener("input", () => {
    const v = emailInput.value.trim();
    const bad = v === "" || !isValidEmail(v);
    showError(errEmail, bad);
    setInvalid(emailInput, bad);
  });

  phoneInput?.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\s+/g, "");
    const v = phoneInput.value.trim();
    const bad = v === "" || !isDigitsOnly(v);
    showError(errPhone, bad);
    setInvalid(phoneInput, bad);
  });

  messageInput?.addEventListener("input", () => {
    const bad = messageInput.value.trim() === "";
    showError(errMsg, bad);
    setInvalid(messageInput, bad);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const msgVal = messageInput ? messageInput.value.trim() : "";

    const nameBad = nameVal === "";
    const emailBad = emailVal === "" || !isValidEmail(emailVal);
    const phoneBad = phoneVal === "" || !isDigitsOnly(phoneVal);
    const msgBad = msgVal === "";

    showError(errName, nameBad);
    showError(errEmail, emailBad);
    showError(errPhone, phoneBad);
    showError(errMsg, msgBad);

    setInvalid(nameInput, nameBad);
    setInvalid(emailInput, emailBad);
    setInvalid(phoneInput, phoneBad);
    setInvalid(messageInput, msgBad);

    if (nameBad || emailBad || phoneBad || msgBad) return;

    if (outName) outName.textContent = nameVal;
    if (outEmail) outEmail.textContent = emailVal;
    if (outPhone) outPhone.textContent = phoneVal;
    if (outMessage) outMessage.textContent = msgVal;

    form.reset();

    setInvalid(nameInput, false);
    setInvalid(emailInput, false);
    setInvalid(phoneInput, false);
    setInvalid(messageInput, false);

    showError(errName, false);
    showError(errEmail, false);
    showError(errPhone, false);
    showError(errMsg, false);

    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  });
});
