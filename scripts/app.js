//Player 1 is 0, Player 2 is 1
// VARIABLES
let player = 0;
const gameSquares = document.querySelectorAll('.game-square');
let playerOneElement = document.getElementById('p1');
let playerTwoElement = document.getElementById('p2');

// CHECKS WHO THE CURRENT PLAYER IS IN THE START
const checkCurrentPlayer = () => {
    if (player === 0) {
        playerOneElement.classList.add('currentP');
    } else {
        playerTwoElement.classList.add('currentP');
    }    
}
checkCurrentPlayer();

// SWITCHES PLAYERS
const switchPlayer = () => {
    if (player === 0) {
        playerTwoElement.classList.add('currentP');
        playerOneElement.classList.remove('currentP');
        
        player = 1;
        return player;
    } else {
        playerOneElement.classList.add('currentP');
        playerTwoElement.classList.remove('currentP');

        player = 0;
        return player;
    }
};

// ADDS EVENT LISTENERS TO EACH SQUARE AND PLACES CURRENT PLAYERS SYMBOL THEN RUNS SWITCH PLAYERS FUNCTION
gameSquares.forEach(square => square.addEventListener('click', squareEvent));
function squareEvent () {
    console.log('Clicked Square');
    let xSymbol = document.createTextNode('X');
    let oSymbol = document.createTextNode('O');
    if (player === 0) {
        this.appendChild(xSymbol);
        this.removeEventListener('click', squareEvent);
        switchPlayer();
        checkWinCondition();
    } else if (player === 1) {
        this.appendChild(oSymbol);
        this.removeEventListener('click', squareEvent);
        switchPlayer();
        checkWinCondition();
    }
};

// CHECK WIN CONDITION BY CHECKING AN ARRAY OF POSSIBLE CONDITIONS AND MAKING SURE IF THE CONDITIONS HAVE THE SAME SYMBOL, IF TRUTHY THEN IT RETURNS THE WINNING PLAYER BASED ON THE SYMBOL.
const checkWinCondition = () => {
    let gameWon = false;
    let playerWon = document.getElementById('playerWon');
    let playerWhoWon;
    
    //Top Row
    let c1 = document.getElementById('c1').textContent;
    let c2 = document.getElementById('c2').textContent;
    let c3 = document.getElementById('c3').textContent;

    //Middle Row
    let c4 = document.getElementById('c4').textContent;
    let c5 = document.getElementById('c5').textContent;
    let c6 = document.getElementById('c6').textContent;

    //Bottom Row
    let c7 = document.getElementById('c7').textContent;
    let c8 = document.getElementById('c8').textContent;
    let c9 = document.getElementById('c9').textContent;

    let winConditions = [
        //Rows
        [c1, c2, c3],
        [c4, c5, c6],
        [c7, c8, c9],
        //Columns
        [c1, c4, c7],
        [c2, c5, c8],
        [c3, c6, c9],
        //Cross
        [c1, c5, c9],
        [c3, c5, c7],
    ];
   
    for (let i = 0; i < winConditions.length; i++) {
        const conditions = winConditions[i];
        if (conditions[0] == 'X' && conditions[1] == 'X' && conditions[2] == 'X') {
            console.log('Player X Won');
            gameWon = true;
            playerWhoWon = 'Player X'
            break;
        }
        if (conditions[0] == 'O' && conditions[1] == 'O' && conditions[2] == 'O') {
            console.log('Player O Won');
            gameWon = true;
            playerWhoWon = 'Player O';
            break;
        }    
    }

    if (gameWon) {
        console.log('Game Won');
        playerWon.textContent = `${playerWhoWon} has won!`;
        playerTwoElement.classList.remove('currentP');
        playerOneElement.classList.remove('currentP');
        stopGame();
    }
};

// REMOVES ALL EVENT LISTENERS MAKING THE GAME UNPLAYABLE
const stopGame = () => {
    gameSquares.forEach(square => square.removeEventListener('click', squareEvent));
};

// RELOADS WEBPAGE
document.getElementById('restartButton').addEventListener('click', function restart () {
    location.reload();
});