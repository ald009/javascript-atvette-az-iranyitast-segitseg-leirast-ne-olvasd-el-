const size = parseInt(prompt("Enter the size of the grid between 3 and 10 (e.g., 5 for a 5x5 grid):"), 10);

if (isNaN(size) || size < 3 || size > 10) {
  alert("Invalid size. Please enter a number between 3 and 10.");
  throw new Error("Invalid grid size");
}



const bodyka = document.body;
bodyka.style.display = "flex";
bodyka.style.justifyContent = "center";
bodyka.style.alignItems = "center";
bodyka.style.height = "90vh";
bodyka.style.backgroundColor = "#713196";
const div1 = document.createElement("div");
div1.style.display = "grid";
div1.style.gridTemplateColumns = `repeat(${size}, 50px)`;
div1.style.gridTemplateRows = `repeat(${size}, 50px)`;
div1.style.gap = "5px";
div1.style.border = "2px solid black";
div1.style.backgroundColor = "rgb(199, 199, 199)";
div1.style.width = `${size * 55}px`;
bodyka.appendChild(div1);

// Start with every cell having the same color
const grid = Array.from({ length: size }, () =>
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
    cell.style.backgroundColor = colors[grid[i][j]];
    cell.style.border = "1px solid black";
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.addEventListener("click", () => {
      flipCell(i, j);
      updateGrid();
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
    alert("Congratulations! You've won the game!");
  }
}

scrambleGrid();
updateGrid();