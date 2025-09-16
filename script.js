// Create the 9x9 grid dynamically
const sudokuBoard = document.getElementById("sudoku-board");
for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.className = "cell glow";
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = "1";
    input.pattern = "[1-9]";
    cell.appendChild(input);
    sudokuBoard.appendChild(cell);
}

// Add borders for the 3x3 matrices
const cells = document.querySelectorAll(".cell");
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const index = row * 9 + col;
        if (row % 3 === 0 && col % 3 === 0) {
            cells[index].classList.add("border-top-left");
        }
        if (row % 3 === 0 && col % 3 === 2) {
            cells[index].classList.add("border-top-right");
        }
        if (row % 3 === 2 && col % 3 === 0) {
            cells[index].classList.add("border-bottom-left");
        }
        if (row % 3 === 2 && col % 3 === 2) {
            cells[index].classList.add("border-bottom-right");
        }
    }
}

function getBoard() {
    const board = [];
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach(input => {
        const value = input.value ? parseInt(input.value) : 0;
        board.push(value);
    });
    return board;
}

function setBoard(board) {
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach((input, index) => {
        input.value = board[index] === 0 ? "" : board[index];
        if (board[index] > 0 && !input.value) {
            input.classList.add("highlighted");
        } else {
            input.classList.remove("highlighted");
        }
    });
}

function isSafe(board, row, col, num) {
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (board[row * 9 + i] === num || board[i * 9 + col] === num ||
            board[boxRowStart * 9 + boxColStart + (Math.floor(i / 3) * 9 + (i % 3))] === num) {
            return false;
        }
    }
    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row * 9 + col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row * 9 + col] = num;

                        if (solve(board)) {
                            return true;
                        }

                        board[row * 9 + col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    const board = getBoard();
    if (solve(board)) {
        setBoard(board);
    } else {
        alert("No solution exists");
    }
}

function resetBoard() {
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach(input => {
        input.value = "";
        input.classList.remove("highlighted");
    });
}