import { users } from "./userdata.js";

// Select elements once at the beginning
const EmailElem = document.querySelector(".email_input");
const passwordElem = document.querySelector(".password_input");
const passwordElem1 = document.querySelector(".password_input1");
const buttonElem = document.querySelector(".button");
const pElem = document.querySelector(".email_error");

buttonElem.addEventListener("click", () => {
  const emailValue = EmailElem.value.trim();
  const passwordValue = passwordElem.value;
  const confirmPasswordValue = passwordElem1.value;

  // Validate email format, password match, and password length
  if (!validateEmail(emailValue) || passwordValue !== confirmPasswordValue || passwordValue.length < 8) {
    pElem.textContent = passwordValue.length < 8
      ? "Password must be at least 8 characters long"
      : passwordValue !== confirmPasswordValue
        ? "The password does not match"
        : "Enter a valid email and password";
    pElem.style.display = "block";
    return;
  }

  // Efficiently find user using findIndex and destructuring
  const userIndex = users.findIndex(({ email }) => email === emailValue);

  if (userIndex !== -1) {
    pElem.textContent = "Email is already used";
    pElem.style.display = "block";
    return;
  }

  // Store user info in localStorage (assuming valid email format)
  setInLocalStorage(emailValue, passwordValue);
});

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9_.+-]+@[gmail.com]+$/; // Optimized pattern (case-insensitive, allows dots and plus signs)
  return pattern.test(email);
}

function setInLocalStorage(email, password) {
  const userinfo = { email, password, role: "user" }; // Destructuring for clear object creation
  localStorage.setItem("info", JSON.stringify(userinfo));
  localStorage.setItem("islogin", "true");
  window.location.href = "/public/homeoage.html";
}
