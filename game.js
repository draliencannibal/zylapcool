let board = [];
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.addEventListener('keydown', handleInput);
document.getElementById('reset').addEventListener('click', initializeGame);
initializeGame();

function initializeGame() {
  board = Array(4).fill().map(() => Array(4).fill(null));
  score = 0;
  spawnTile();
  spawnTile();
  updateBoard();
  document.getElementById("game-over").style.display = "none";
}

function spawnTile() {
  let emptyCells = [];
  board.forEach((row, r) => row.forEach((cell, c) => {
    if (!cell) emptyCells.push({ row: r, col: c });
  }));

  if (emptyCells.length) {
    let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() > 0.1 ? 2 : 4;
  }
}

function updateBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  board.forEach(row => row.forEach(value => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (value) {
      cell.dataset.value = value;
      cell.textContent = value;
    }
    boardElement.appendChild(cell);
  }));
  
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  
  if (!canMove()) {
    document.getElementById("game-over").style.display = "block";
  }
}

function handleInput(event) {
    let moved = false;
    if (event.key === 'ArrowUp') {
      moved = moveUp();
    } else if (event.key === 'ArrowDown') {
      moved = moveDown();
    } else if (event.key === 'ArrowLeft') {
      moved = moveLeft();
    } else if (event.key === 'ArrowRight') {
      moved = moveRight();
    }
  
    if (moved) {
      spawnTile();
      updateBoard();
    }
  }
  
  function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
      let merged = [false, false, false, false];
      for (let row = 1; row < 4; row++) {
        if (board[row][col]) {
          let targetRow = row;
          while (targetRow > 0 && !board[targetRow - 1][col]) {
            targetRow--;
          }
          if (targetRow > 0 && board[targetRow - 1][col] === board[row][col] && !merged[targetRow - 1]) {
            board[targetRow - 1][col] *= 2;
            board[row][col] = null;
            score += board[targetRow - 1][col];
            merged[targetRow - 1] = true;
            moved = true;
          } else if (targetRow !== row) {
            board[targetRow][col] = board[row][col];
            board[row][col] = null;
            moved = true;
          }
        }
      }
    }
    return moved;
  }
  
  function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
      let merged = [false, false, false, false];
      for (let row = 2; row >= 0; row--) {
        if (board[row][col]) {
          let targetRow = row;
          while (targetRow < 3 && !board[targetRow + 1][col]) {
            targetRow++;
          }
          if (targetRow < 3 && board[targetRow + 1][col] === board[row][col] && !merged[targetRow + 1]) {
            board[targetRow + 1][col] *= 2;
            board[row][col] = null;
            score += board[targetRow + 1][col];
            merged[targetRow + 1] = true;
            moved = true;
          } else if (targetRow !== row) {
            board[targetRow][col] = board[row][col];
            board[row][col] = null;
            moved = true;
          }
        }
      }
    }
    return moved;
  }
  
  function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
      let merged = [false, false, false, false];
      for (let col = 1; col < 4; col++) {
        if (board[row][col]) {
          let targetCol = col;
          while (targetCol > 0 && !board[row][targetCol - 1]) {
            targetCol--;
          }
          if (targetCol > 0 && board[row][targetCol - 1] === board[row][col] && !merged[targetCol - 1]) {
            board[row][targetCol - 1] *= 2;
            board[row][col] = null;
            score += board[row][targetCol - 1];
            merged[targetCol - 1] = true;
            moved = true;
          } else if (targetCol !== col) {
            board[row][targetCol] = board[row][col];
            board[row][col] = null;
            moved = true;
          }
        }
      }
    }
    return moved;
  }
  
  function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
      let merged = [false, false, false, false];
      for (let col = 2; col >= 0; col--) {
        if (board[row][col]) {
          let targetCol = col;
          while (targetCol < 3 && !board[row][targetCol + 1]) {
            targetCol++;
          }
          if (targetCol < 3 && board[row][targetCol + 1] === board[row][col] && !merged[targetCol + 1]) {
            board[row][targetCol + 1] *= 2;
            board[row][col] = null;
            score += board[row][targetCol + 1];
            merged[targetCol + 1] = true;
            moved = true;
          } else if (targetCol !== col) {
            board[row][targetCol] = board[row][col];
            board[row][col] = null;
            moved = true;
          }
        }
      }
    }
    return moved;
  }
