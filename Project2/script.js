const generateBtn = document.getElementById("generate-btn");
const colorBoxes = document.querySelectorAll(".color-box");

function generateRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${hex.toUpperCase()}`;
}

function updatePalette() {
  const usedColors = [];

  colorBoxes.forEach((box) => {
    const currentColor = box.querySelector(".color").style.backgroundColor;
    let newColor;
      
    do {
      newColor = generateRandomColor();
    } while (
      usedColors.includes(newColor) ||
      newColor === currentColor
    );

    usedColors.push(newColor);
    box.querySelector(".color").style.backgroundColor = newColor;
    box.querySelector(".hex-value").textContent = newColor;
    box.querySelector(".copy-btn").style.color = newColor;
  });
}

function copyToClipboard(e) {
  const box = e.target.closest(".color-box");
  const hexValue = box.querySelector(".hex-value").textContent.trim();
  const icon = e.target;

  navigator.clipboard.writeText(hexValue).then(() => {
    icon.classList.replace("fa-copy", "fa-check");
    setTimeout(() => icon.classList.replace("fa-check", "fa-copy"), 1500);
  });
}

colorBoxes.forEach((box) => {
  box.querySelector(".copy-btn").addEventListener("click", copyToClipboard);
});

updatePalette()

generateBtn.addEventListener("click", updatePalette);

