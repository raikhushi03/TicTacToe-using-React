import { useState } from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/game-over.jsx";
import { WINNING_COMBINATIONS } from "./components/winning_combinations.js";
 


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurns){
  let currentPlayer='X';
      if(gameTurns.length > 0 && gameTurns[0].player==='X'){
        currentPlayer='O';
      }
      return currentPlayer;
}
function derivedGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array=> [...array])];
  

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol=== thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const[players, setPlayers]=useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  const[gameTurns, setGameTurns]=useState([]);
  
  const activePlayer=derivedActivePlayer(gameTurns);
  

  const gameBoard= derivedGameBoard(gameTurns);
  const winner= deriveWinner(gameBoard,players);
  const hasDraw =gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex){

    setGameTurns((prevTurns)=>{
      const currentPlayer=derivedActivePlayer(prevTurns);
      const updatedTurns=[
        { square: {row:rowIndex, col: colIndex },player: currentPlayer},...prevTurns];
      return updatedTurns;
    });
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName ){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  
  return( 
  <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
         initialName="Player 1"
          symbol="X"
           isActive={activePlayer ==='X'}
           onChangeName={handlePlayerNameChange}
           />
        <Player 
        initialName="Player 2"
         symbol="O"
          isActive={activePlayer ==='O'}
          onChangeName={handlePlayerNameChange}
          />

      </ol>
      {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}

      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}
      turns={gameTurns}/>
    </div>
    <Log turns={gameTurns}/>
      </main>);
}

export default App
