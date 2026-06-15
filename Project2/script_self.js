const generateBtn = document.getElementById("generate-btn");
const colorBox = document.querySelectorAll(".color-box");

function generatePallate() {
  const usedcolors = [];
  let newColor;

  const currentColor = document.querySelector(".color").style.backgroundColor;
  console.log("hello");
  for (let i = 0; i < 5; i++) {
    do {
      newColor = generateRandomColor();
    } while (usedcolors.includes(newColor) || newColor === currentColor);
    usedcolors.push(newColor);
  }

  colorBox.forEach((box, index) => {
    box.querySelector(".color").style.backgroundColor = usedcolors[index];
    box.querySelector(".hex-value").textContent = usedcolors[index];
    box.querySelector(".copy-btn").style.color = usedcolors[index];
  });
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

generatePallate();
generateBtn.addEventListener("click", generatePallate);

colorBox.forEach((box) => {
  const copyBtn = box.querySelector(".copy-btn");

  copyBtn.addEventListener("click", () => {
    const hexValue = box.querySelector(".hex-value").textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        copyBtn.classList.replace("fa-copy", "fa-check");
        copyBtn.setAttribute("title", "Copied!");

        setTimeout(() => {
          copyBtn.classList.replace("fa-check", "fa-copy");
          copyBtn.setAttribute("title", "Click to Copy");
        }, 1500);
      })
      .catch((err) => console.log(err));
  });
});
