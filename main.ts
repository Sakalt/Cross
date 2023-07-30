import {initBoard, turn, isCorrect, randomBoard} from "./game.js"

let board
const boardSize = 6
let muted = true

function debugView(board: any) {
    const mapped = board.map((a) => {
        return a.map((b) => {
            return b == 1? "◼": "◻"
        })
    })
    return mapped.map((a) => {
        return a.reduce((b, x) => {
            return b + x
        })
    }).reduce((y, b) => {return y + "</br>" + b})
}

(window as any).muteGetter = () => {
    mute()
}

function mute() {
    const audios: NodeListOf<HTMLAudioElement> = document.querySelectorAll('audio')
    const button = document.getElementById('mute')
    if (muted) {
        muted = false
        button!.innerHTML = '<span onclick="muteGetter()" style="background-color: #0c0c0c; color: white; padding: 5px 10px;">SOUND ON</span>'
    } else {
        muted = true
        button!.innerHTML = '<span onclick="muteGetter()" style="background-color: #b3170b; color: white; padding: 5px 10px;">SOUND MUTED</span>'
    }
    Array.prototype.forEach.call(audios, (audio) => {
        audio.muted = muted
        console.log(muted)
    })
}

(window as any).reload = (x, y) => {
    if (!isCorrect(board)) {
        board = turn(board, x, y)
        const piece = <HTMLVideoElement> document.getElementById('piece')
        const correct = <HTMLVideoElement> document.getElementById('correct')
        piece.currentTime = 0;
        piece.play()
        redraw()
        if (isCorrect(board)) {
            setTimeout(() => {correct.play()}, 500)
            let status = document.getElementById("status")
            status!.innerHTML = '<span style="background-color: #3030FF; color: white; padding: 20px;">クリア！おめでとう！</span>'
            console.log("correct")
        }
    }
}

function redraw() {
    let tables = "<table class='board'>"

    for (let row = 0; row < board.length; row++) {
        tables += "<tr>"
        for (let col = 0; col < board[row].length; col++) {
            tables += "<td onclick='reload(" + row + "," + col + ")' class='grid'>"
            tables += "<img width='100%' class='piece' src='./assets/" + (board[row][col]==1? "sun": "moon") + ".png'>"
            tables += "</td>"
        }
        tables += "</tr>"
    }
    tables += "</table>"

    let htmlBoard = document.getElementById("board")

    htmlBoard!.innerHTML = tables
}

window.onload = () => {
    board = initBoard(boardSize)
    board = randomBoard(board, boardSize, 5)
    redraw()

    mute()
}
