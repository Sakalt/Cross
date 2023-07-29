const turnGrid = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
function initBoard(size = 5) {
    let arr = new Array(3);
    for (let b = 0; b < size; b++) {
        arr[b] = new Array(3);
        for (let a = 0; a < size; a++) {
            arr[b][a] = "1"; //(a + b) % 2? "1":"-1";
        }
    }
    return arr;
}
function isCorrect(board) {
    const numOfCorrect = board.reduce((a, b) => {
        return a.concat(b);
    }).filter((a) => {
        return a == 1;
    }).length;
    return board.reduce((a, b) => { return a.concat(b); }).length == numOfCorrect;
}
function turn(board, x, y) {
    const leng = board.length;
    turnGrid.forEach((grid) => {
        const dx = y + grid[0];
        const dy = x + grid[1];
        if (dy > -1 && dy < leng && dx > -1 && dx < leng) {
            board[dy][dx] *= -1;
        }
    });
    return board;
}
function debugView(board) {
    const mapped = board.map((a) => {
        return a.map((b) => {
            return b == 1 ? "◼" : "◻";
        });
    });
    return mapped.map((a) => {
        return a.reduce((b, x) => {
            return b + x;
        });
    }).reduce((y, b) => { return y + "</br>" + b; });
}
const boardSize = 5;
let board = initBoard(boardSize);
for (let i = 0; i < 3; i++) {
    board = turn(board, Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize));
}
function reload(x, y) {
    if (!isCorrect(board)) {
        board = turn(board, x, y);
        redraw();
        if (isCorrect(board)) {
            let status = document.getElementById("status");
            status.innerHTML = '<span style="background-color: #3030FF; color: white; padding: 20px;">クリア！おめでとう！</span>';
            console.log("correct");
        }
    }
}
function redraw() {
    let tables = "<table class='board'>";
    for (let row = 0; row < board.length; row++) {
        tables += "<tr>";
        for (let col = 0; col < board[row].length; col++) {
            tables += "<td onclick=\"reload(" + row + "," + col + ")\" class=\"grid" + board[row][col] + " grid\"></td>";
        }
        tables += "</tr>";
    }
    tables += "</table>";
    let htmlBoard = document.getElementById("board");
    htmlBoard.innerHTML = tables;
    console.log(debugView(board));
}
redraw();
