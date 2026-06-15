const formContainer = document.querySelector(".form-container");
const registrationForm = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirmPassword-error");
const passwordEyeIcon = document.getElementById("password-eye");
const confirmPasswordEyeIcon = document.getElementById("confirmPassword-eye");

let users = JSON.parse(localStorage.getItem("users")) || [];

function debouncer(validationoFunction) {
  console.log();
  let timer;
  return (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => validationoFunction(e.target.value), 1000);
  };
}

usernameInput.addEventListener("input", debouncer(usernameValidation));

emailInput.addEventListener("input", debouncer(emailValidation));

passwordInput.addEventListener("input", debouncer(passwordValidation));

confirmPasswordInput.addEventListener(
  "input",
  debouncer(confirmPasswordValidation),
);

function swapClass(element, from, to) {
  element.classList.remove(from);
  element.classList.add(to);
}

function showError(message, errorEl, input) {
  errorEl.innerText = message;
  errorEl.style.visibility = "visible";
  swapClass(input, "correct", "error");
}

function hideError(input, errorEl) {
  errorEl.innerText = "";
  errorEl.style.visibility = "hidden";
  swapClass(input, "error", "correct");
}

function usernameValidation(value) {
  console.log("username function called");
  if (value.length === 0) {
    showError("Username is required", usernameError, usernameInput);
    return false;
  } else if (value.length < 4) {
    showError("Too short username", usernameError, usernameInput);
    return false;
  }else if(value.length > 15){
    showError("Username max length should be 15 only", usernameError, usernameInput)
    return false
  } 
  else if (/[!@#$%^&*-]/.test(value)) {
    showError(
      "User Shouldn't have '!@#$%^&*-' special characters",
      usernameError,
      usernameInput,
    );
    return false;
  } else {
    hideError(usernameInput, usernameError);
    return true;
  }
}

function emailValidation(value) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;

  if (value.length === 0) {
   showError("Email is required", emailError, emailInput);
 }
  else if (!emailRegex.test(value)) {
    showError("Invalid Email", emailError, emailInput);
    return false;
  } 
   else {
    hideError(emailInput, emailError);
    return true;
  }
}

function passwordValidation(value) {
  if (value.length === 0){
    showError("Password is required", passwordError, passwordInput)
    return false
  }
  else if (value.length < 8) {
    showError("Password is too short", passwordError, passwordInput);
    return false;
  } else if (!/[0-9]/.test(value)) {
    showError("Must have at least one number", passwordError, passwordInput);
    return false;
  } else if (!/[a-z]/.test(value)) {
    showError(
      "Must have at least one lower case character",
      passwordError,
      passwordInput,
    );
    return false;
  } else if (!/[A-Z]/.test(value)) {
    showError(
      "Must have at least one upper case character",
      passwordError,
      passwordInput,
    );
    return false;
  } else if (!/[!@#$%^&*_-]/.test(value)) {
    showError(
      "Must have at least one special character",
      passwordError,
      passwordInput,
    );
    return false;
  }
  else {
    hideError(passwordInput, passwordError);
    return true;
  }
}

function confirmPasswordValidation(value) {
  if (value.length === 0){
    showError("Confirm Password is rquired",confirmPasswordError, confirmPasswordInput)
    return false
  }
  if (!(passwordInput.value === value)) {
    showError(
      "Password should match",
      confirmPasswordError,
      confirmPasswordInput,
    );
    return false;
  } else {
    hideError(confirmPasswordInput, confirmPasswordError);
    return true;
  }
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let validationFail =
    usernameValidation(usernameInput.value) &&
    emailValidation(emailInput.value) &&
    passwordValidation(passwordInput.value) &&
    confirmPasswordValidation(confirmPasswordInput.value);
  if (validationFail) {
    if (userExistsValidation(usernameInput.value, emailInput.value)) {
      users.push({
        id: Date.now(),
        username: usernameInput.value,
        email: emailInput.value,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("User created Successfully");
      registrationForm.reset()
    } else {
      alert("User Already Exists");
      return;
    }
  } else {
    return;
  }
});

passwordEyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    swapClass(passwordEyeIcon, "fa-eye", "fa-eye-slash");
    passwordInput.type = "text";
  } else {
    swapClass(passwordEyeIcon, "fa-eye-slash", "fa-eye");
    passwordInput.type = "password";
  }
});

confirmPasswordEyeIcon.addEventListener("click", () => {
  if (confirmPasswordInput.type === "password") {
    swapClass(confirmPasswordEyeIcon, "fa-eye", "fa-eye-slash");
    confirmPasswordInput.type = "text";
  } else {
    swapClass(confirmPasswordEyeIcon, "fa-eye-slash", "fa-eye");
    confirmPasswordInput.type = "password";
  }
});

function userExistsValidation(username, email) {
  let condition = true;
  users.forEach((user) => {
    if (username === user.username) {
      condition = false;
    }
    if (email === user.email) {
      condition = false;
    }
  });
  return condition;
}
