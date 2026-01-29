// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== 1) Set "Name" on Home (via JS) =====
  const userNameEl = document.getElementById("userName");

  // ambil nama dari localStorage jika ada, kalau belum pakai default
  const savedName = localStorage.getItem("visitorName");
  const defaultName = "Name";
  const visitorName =
    savedName && savedName.trim() ? savedName.trim() : defaultName;

  if (userNameEl) userNameEl.textContent = visitorName;

  // set tahun di footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== 2) Form Validation + Output =====
  const form = document.getElementById("messageForm");

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

  // helper tampil/sembunyi error
  function showError(el, show) {
    if (!el) return;
    el.classList.toggle("hidden", !show);
  }

  function isValidEmail(email) {
    // cukup untuk validasi tugas (simple)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isDigitsOnly(str) {
    return /^[0-9]+$/.test(str);
  }

  function setInvalid(input, invalid) {
    if (!input) return;
    // Tailwind ring merah saat invalid
    if (invalid) {
      input.classList.add("border-red-400", "focus:ring-red-200");
      input.classList.remove("border-slate-200", "focus:ring-blue-200");
    } else {
      input.classList.remove("border-red-400", "focus:ring-red-200");
      input.classList.add("border-slate-200", "focus:ring-blue-200");
    }
  }

  // (Opsional) minta nama sekali di awal supaya "Hi, Name" jadi personal
  // Kalau kamu tidak mau popup, hapus blok ini.
  if (!savedName) {
    const promptName = window.prompt("Masukkan nama kamu:");
    if (promptName && promptName.trim()) {
      localStorage.setItem("visitorName", promptName.trim());
      if (userNameEl) userNameEl.textContent = promptName.trim();
    }
  }

  if (!form) return;

  // validasi realtime sederhana
  nameInput?.addEventListener("input", () => {
    const v = nameInput.value.trim();
    const bad = v.length === 0;
    showError(errName, bad);
    setInvalid(nameInput, bad);
  });

  emailInput?.addEventListener("input", () => {
    const v = emailInput.value.trim();
    const bad = v.length === 0 || !isValidEmail(v);
    showError(errEmail, bad);
    setInvalid(emailInput, bad);
  });

  phoneInput?.addEventListener("input", () => {
    // biar user gampang, kita strip spasi dulu
    const v = phoneInput.value.replace(/\s+/g, "");
    phoneInput.value = v;

    const bad = v.length === 0 || !isDigitsOnly(v);
    showError(errPhone, bad);
    setInvalid(phoneInput, bad);
  });

  messageInput?.addEventListener("input", () => {
    const v = messageInput.value.trim();
    const bad = v.length === 0;
    showError(errMsg, bad);
    setInvalid(messageInput, bad);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const msgVal = messageInput ? messageInput.value.trim() : "";

    // validasi
    const nameBad = nameVal.length === 0;
    const emailBad = emailVal.length === 0 || !isValidEmail(emailVal);
    const phoneBad = phoneVal.length === 0 || !isDigitsOnly(phoneVal);
    const msgBad = msgVal.length === 0;

    showError(errName, nameBad);
    showError(errEmail, emailBad);
    showError(errPhone, phoneBad);
    showError(errMsg, msgBad);

    setInvalid(nameInput, nameBad);
    setInvalid(emailInput, emailBad);
    setInvalid(phoneInput, phoneBad);
    setInvalid(messageInput, msgBad);

    // kalau ada error, stop
    if (nameBad || emailBad || phoneBad || msgBad) return;

    // tampilkan ke panel hasil
    if (outName) outName.textContent = nameVal;
    if (outEmail) outEmail.textContent = emailVal;
    if (outPhone) outPhone.textContent = phoneVal;
    if (outMessage) outMessage.textContent = msgVal;

    // bonus: simpan nama buat greeting di Home
    localStorage.setItem("visitorName", nameVal);
    if (userNameEl) userNameEl.textContent = nameVal;

    // reset form (optional)
    form.reset();

    // bersihkan invalid styling setelah reset
    setInvalid(nameInput, false);
    setInvalid(emailInput, false);
    setInvalid(phoneInput, false);
    setInvalid(messageInput, false);

    showError(errName, false);
    showError(errEmail, false);
    showError(errPhone, false);
    showError(errMsg, false);

    // scroll ke hasil supaya user lihat hasil submit
    document.getElementById("message")?.scrollIntoView({ behavior: "smooth" });
  });
});
