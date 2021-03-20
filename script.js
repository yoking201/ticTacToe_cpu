let currentPlayer = "";
const resultMesage = (resultFlag) => { return resultFlag ? `Player ${currentPlayer} has won this game` : "The Game has ended in Draw" };
const res = document.querySelector('.result');

let isGameActive = true;
const winningConditions =
       [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6]
       ];//8 winning conditions

let gameState = ["", "", "", "", "", "", "", "", ""];


function evaluateResult(cell) {

       let playerWon = false;
       for (let winningCondition of winningConditions) {

              let a = gameState[winningCondition[0]];
              let b = gameState[winningCondition[1]];
              let c = gameState[winningCondition[2]];
              if (a === "" || b === "" || c === "")
                     continue;
              if (a === b && b === c) {
                     playerWon = true;
                     break;
              }
       }
       if (playerWon) {
              res.textContent = resultMesage(playerWon);
              isGameActive = false;
              cell.style.backgroundColor="dark   green"
              return 0;
       }
       let roundDraw = !gameState.includes("");
       if (roundDraw) {
              res.textContent = resultMesage(playerWon);
              isGameActive = false;
              cell.style.backgroundColor="blue"

              return 0;
       }

return 1;
}



function handleCellClicked(cell, indexOfClickedCell) {

       gameState[indexOfClickedCell] = currentPlayer;
       cell.textContent = currentPlayer;
       cell.style.backgroundColor = "black";
       cell.style.color = "white";

       return evaluateResult(cell);

}
function cellClicked(cellEvent) {
       currentPlayer = "X";
       if (!isGameActive) {

              return 0;
       }
       const cell = cellEvent.target;

       const indexOfClickedCell = parseInt(cell.getAttribute('data-index'));
       if (gameState[indexOfClickedCell] !== "") {

              return 0;
       }
       return handleCellClicked(cell, indexOfClickedCell);
       
}
function botTurn() {
       let emptyCells = [];
       currentPlayer = "O";
     
       let i = 0;
       document.querySelectorAll('.cell').forEach(
              (cells) => {

                     if (cells.textContent == "") {
                            emptyCells[i++] = cells
                     }
              }

       );
       const indexOfClickedCell = Math.floor(Math.random() * emptyCells.length);
      
       const cell = emptyCells[indexOfClickedCell];
console.log(cell.getAttribute('data-index'),parseInt(cell.getAttribute('data-index')));
       handleCellClicked(cell, parseInt(cell.getAttribute('data-index')));
       return 1;
}

function ticTacToe(event) {
       if(cellClicked(event))
                botTurn();
}
function restartGame(event){
       isGameActive=true;
       currentPlayer="X";
       gameState=["","","","","","","","",""];
       res.textContent="";
       document.querySelectorAll('.cell').forEach(cell=>{cell.textContent="";cell.style.backgroundColor="white";cell.style.color="black"});
}
document.querySelectorAll('.cell').forEach((cell) => {
       cell.addEventListener('click', ticTacToe)
});
document.querySelector('.game-restart').addEventListener('click', restartGame);