const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const passwordLengthInput = document.getElementById("password-length");
const rangeValueSpan = document.getElementById("range-value");
const uppsercaseInput = document.getElementById("upperCase");
const lowercaseInput = document.getElementById("lowerCase");
const symbolsInput = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const strengthText = document.getElementById("strength");
const strengthBar = document.querySelector(".strength-bar");

let rangeValue;
let upperCaseValue;
let lowerCaseValue;
let symbolsValue;

function updateValues() {
  rangeValue = parseInt(passwordLengthInput.value);
  upperCaseValue = uppsercaseInput.checked;
  lowerCaseValue = lowercaseInput.checked;
  symbolsValue = symbolsInput.checked;
}

let charType = Object.freeze({
  UPPER: "QWERTYUIOPASDFGHJKLZXCVBNM",
  LOWER: "qwertyuiopasdfghjklzxcvbnm",
  NUMBER: "1234567890",
  SPECIAL: "!@#$%^&*_",
});

passwordLengthInput.addEventListener("input", () => {
  rangeValueSpan.innerText = passwordLengthInput.value;
  rangeValue = passwordLengthInput.value;
});

uppsercaseInput.addEventListener("change", () => {
  upperCaseValue = uppsercaseInput.checked;
});
lowercaseInput.addEventListener("change", () => {
  lowerCaseValue = lowercaseInput.checked;
});
symbolsInput.addEventListener("change", () => {
  symbolsValue = symbolsInput.checked;
});

function verifyValue() {
  console.log("range", rangeValue);
  console.log("upper", upperCaseValue);
  console.log("lower", lowerCaseValue);
  console.log("symbol", symbolsValue);
}

generateBtn.addEventListener("click", () => {
  updateValues();

  generatePassword(rangeValue, upperCaseValue, lowerCaseValue, symbolsValue);
});

function updateSummary(strength) {
  strengthBar.className = `strength-bar ${strength}`;
  strengthText.innerText = `${strength}`;
}

function generatePassword(length, upper, lower, special) {
  let charSet = charType.NUMBER;
  let strengthNum = 0;
  if (upper) {
    charSet += charType.UPPER;
    strengthNum += 1;
  }
  if (lower) {
    charSet += charType.LOWER;
    strengthNum += 1;
  }
  if (special) {
    charSet += charType.SPECIAL;
    strengthNum += 1;
  }
  if (length >= 15) {
    strengthNum += 1;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charSet[Math.floor(Math.random() * charSet.length)];
  }

  if (strengthNum < 2) {
    updateSummary("weak");
  } else if (strengthNum < 3) {
    updateSummary("medium");
  } else if (strengthNum < 4) {
    updateSummary("strong");
  } else if (strengthNum == 4) {
    updateSummary("powerful");
  }

  passwordInput.value = password;
}

let copyStatus = false;

copyBtn.addEventListener("click", () => {
  if (!copyStatus) {
    copyStatus = true;
    navigator.clipboard.writeText(passwordInput.value);

    copyBtn.classList.add("icon-hide");

    setTimeout(() => {
      copyBtn.className = "fa-solid fa-check icon-show";
      

      setTimeout(() => {
        copyBtn.classList.remove("icon-show");
        copyBtn.classList.add("icon-hide");

        setTimeout(() => {
          copyBtn.className = "fa-regular fa-copy icon-show";
          copyStatus = false;
        }, 100);
      }, 2000);
    }, 100);
  } else {
    return;
  }
});

updateValues();
generatePassword(rangeValue, upperCaseValue, lowerCaseValue, symbolsValue);
