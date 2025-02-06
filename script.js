const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#008000",
  "#800080",
  "#FFC0CB",
  "#A52A2A",
  "#808080",
];

const colorBox = document.querySelector('.color-box');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('.status');
const scoreElement = document.querySelector('.score');
const newGameBtn = document.querySelector('.new-game');

let score = 0;
let targetColor;

function initializeGame() {
  // Select target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  // Generate color options
  const options = [...colors]
    .filter((color) => color !== targetColor)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  options.push(targetColor);
  options.sort(() => Math.random() - 0.5);

  // Create option buttons
  colorOptions.innerHTML = options
    .map(
      (color) => `
        <button class="color-option" 
                data-testid="colorOption"
                style="background-color: ${color}"
                data-color="${color}">
        </button>
    `
    )
    .join("");
    
  // Reset status
  gameStatus.textContent = "";
  gameStatus.style.color = "initial";
}


function handleGuess(e) {
  const selectedColor = e.target.dataset.color;
  const buttons = document.querySelectorAll(".color-option");

  // buttons.forEach((button) => {
  //   button.disabled = true;
  //   button.style.cursor = "not-allowed";
  // });

  if (selectedColor === targetColor) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    gameStatus.textContent = "Correct! Well done!";
    gameStatus.style.color = "#ffffff";
    colorBox.classList.add("correct-animation");
    setTimeout(() => colorBox.classList.remove("correct-animation"), 500);
  } else {
    gameStatus.textContent = "Wrong! Try again!";
    gameStatus.style.color = "#ffffff";
    e.target.classList.add("wrong-animation");
    setTimeout(() => e.target.classList.remove("wrong-animation"), 500);
  }

  setTimeout(initializeGame, 800)
}

colorOptions.addEventListener("click", (e) => {
  if (e.target.classList.contains("color-option")) {
    handleGuess(e);
  }
});

newGameBtn.addEventListener("click", () => {
  score = 0;
  scoreElement.textContent = "Score: 0";
  initializeGame();
});

// Initial game setup
initializeGame();
