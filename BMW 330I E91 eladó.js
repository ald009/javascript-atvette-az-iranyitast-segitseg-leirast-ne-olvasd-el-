const size = parseInt(prompt("Enter the size of the grid between 3 and 10 (e.g., 5 for a 5x5 grid):"), 10);

if (isNaN(size) || size < 3 || size > 10) {
  alert("Invalid size. Please enter a number between 3 and 10.");
  throw new Error("Invalid grid size");
}

let moves = 0;

const bodyka = document.body;
bodyka.style.display = "flex";
bodyka.style.justifyContent = "center";
bodyka.style.alignItems = "center";
bodyka.style.flexDirection = "column";
bodyka.style.height = "90vh";
bodyka.style.backgroundColor = "#713196";

const div1 = document.createElement("div");
div1.style.display = "grid";
div1.style.gridTemplateColumns = `repeat(${size}, 50px)`;
div1.style.gridTemplateRows = `repeat(${size}, 50px)`;
div1.style.gap = "5px";
div1.style.border = "2px solid black";
div1.style.backgroundColor = "rgb(198, 182, 206)";
div1.style.width = `${size * 55}px`;
div1.style.height = `${size * 55}px`;
div1.style.boxShadow = "0 0 7px rgba(0, 0, 0, 0.5)";
div1.style.borderRadius = "10px";
div1.style.paddingTop = "6px";
div1.style.paddingLeft = "6px";
div1.style.paddingRight = "2px";
div1.style.paddingBottom = "2px";
bodyka.appendChild(div1);

const movesDisplay = document.createElement("div");
movesDisplay.style.marginTop = "20px";
movesDisplay.style.fontSize = "30px";
movesDisplay.style.color = "white";
movesDisplay.style.fontFamily = "Geo, sans-serif";
movesDisplay.textContent = `Moves: ${moves}`;
bodyka.appendChild(movesDisplay);

// Start with every cell having the same color
const grid = Array.from({ length: size }, () => // linq, tudod d mint denes
  Array(size).fill(0)
);

const colors = [
  "rgb(229, 176, 253)", // Color for 0
  "rgb(80, 200, 120)"   // Color for 1
];

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const cell = document.createElement("div");
    cell.style.width = "50px";
    cell.style.height = "50px";
    cell.style.display = "flex";
    cell.style.justifyContent = "center";
    cell.style.alignItems = "center";
    cell.style.border = "1px solid black";
    cell.addEventListener("click", () => {
      flipCell(i, j);
      moves++;
      updateGrid();
      movesDisplay.textContent = `Moves: ${moves}`;
    });
    div1.appendChild(cell);
  }
}


function updateGrid() {
  const cells = div1.children;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      cells[index].style.backgroundColor = colors[grid[i][j]];
    }
  }
}

function flipCell(row, col, check = true) {
  const directions = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;

    if (r >= 0 && r < size && c >= 0 && c < size) {
      grid[r][c] = 1 - grid[r][c];
    }
  }

  if (check) {
    checkWin();
  }
}

function scrambleGrid() {
  const moves = size * size * 2;

  for (let i = 0; i < moves; i++) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    flipCell(row, col, false);
  }
}

function checkWin() {
  const first = grid[0][0];

  const won = grid.every(row =>
    row.every(cell => cell === first)
  );

  if (won) {
    alert(`Congratulations! You've won the game in ${moves} moves!`);
  }
}

scrambleGrid();
updateGrid();