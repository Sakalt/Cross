const turnGrid = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
export function initBoard(size = 5) {
    let arr = new Array(3);
    for (let b = 0; b < size; b++) {
        arr[b] = new Array(3);
        for (let a = 0; a < size; a++) {
            arr[b][a] = "1"; //(a + b) % 2? "1":"-1";
        }
    }
    return arr;
}
export function isCorrect(board) {
    const numOfCorrect = board.reduce((a, b) => {
        return a.concat(b);
    }).filter((a) => {
        return a == 1;
    }).length;
    return board.reduce((a, b) => { return a.concat(b); }).length == numOfCorrect;
}
export function turn(board, x, y) {
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
export function randomBoard(board, size, times) {
    for (let i = 0; i < times; i++) {
        board = turn(board, Math.floor(Math.random() * size), Math.floor(Math.random() * size));
    }
    return board;
}
