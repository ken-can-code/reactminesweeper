import React, { useState } from 'react';
import Square from './Square';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [clearBoard, setClearBoard] = useState(false);
  const [mineLocations, setMineLocations] = useState([]);

  let squaresRevealed = 0;
  let numOfSquares = 100;
  function handleLeftClick(mineState, squareState, setSquareState, setAdjacentMinesNum, xAxis, yAxis, setExplodedMine) {
    console.log('left click');
    if (squareState === 'unrevealed') {
      if (mineState === false) { // if it is not a mine
        console.log('in mineState false');
        let adjacentMineCount = 0;
        for (let column = xAxis - 1; column <= xAxis + 1; column += 1) {
          for (let row = yAxis - 1; row <= yAxis + 1; row += 1) {
            if (row >= 0 // makes sure not to check a square out of bounds
              && row <= 9
              && column >= 0
              && column <= 9
              && squares[row * 10 + column].props.mineStatus === true) {
              adjacentMineCount += 1;
            }
          }
        }
        setAdjacentMinesNum(adjacentMineCount);
        setSquareState('revealed-empty');
        squaresRevealed += 1;
        console.log('squaresRevealed', squaresRevealed);
        if (squaresRevealed === (numOfSquares - numOfMines)) {
          setGameWin(true);
          setGameOver(true);
        }
      } else { // if it is a mine
        console.log('in mineState true');
        setSquareState('revealed-mine');
        setExplodedMine(true);
        setGameOver(true);
      }
    }
  } // closes the handleLeftClick function

  function handleRightClick(event, squareState, setSquareState) {
    event.preventDefault(); // prevents context menu from appearing for right click
    event.stopPropagation(); // prevents double right clicks due to bubbling up from square-contents
    console.log('right click');
    if (squareState === 'unrevealed') {
      setSquareState('flagged');
    } else if (squareState === 'flagged') { // cannot just use else or flag will insert when green or red square clicked
      setSquareState('unrevealed');
    }
    // *** it is not possible to click on an empty div because it has no size ***

  } // closes the handleRightClick function

  function handleClear() { // work in progress
    setClearBoard(true);
    setGameOver(false);
    setGameWin(false);
  }
  
  function mineGenerator() {
    const squares = [];
    let numOfMines = 16; // set number of mines to have on the board for the game
    let minesToBePlaced = numOfMines;
    while (minesToBePlaced > 0) {
      // console.log('minesToBePlaced at start of while loop', minesToBePlaced);
      const randomSquareNum = Math.floor(Math.random() * 100);
      if (squares[randomSquareNum] === undefined) {
        squares[randomSquareNum] = true;
        minesToBePlaced -= 1;
      }
      // console.log('minesToBePlaced at end of while loop', minesToBePlaced - 1);
    }
  }
  
  for (let i = 0; i < numOfSquares; i += 1) {
    squares[i] =
    <Square
      key={`key${i}`}
      xAxis={i % 10}
      yAxis={Math.floor(i / 10)}
      handleLeftClick={handleLeftClick}
      handleRightClick={handleRightClick}
      clearBoard={clearBoard}
      setClearBoard={setClearBoard}
      mineStatus={squares[i] === true} // explicitly evaluate if true so it returns false if not, instead of undefined
      gameOver={gameOver}
    />;
  }
  // console.log(squares[0]);

  return (
    <div>
      <p className='section-title'>Mine Sweeper</p>
      <div className='board-area'>
      <div className='board-left' />
      <div className='board-main'>
        <div className='board' onContextMenu={(event) => {
          event.preventDefault();
            }
          }
        >
        {squares} {/* if array is placed in JSX return statement it'll simply display in DOM */}
        </div>
      </div>
      <div className='board-right'>
        <p id='win'>{
          gameOver === false
        ? ''
        : gameWin === true
        ? 'you win!'
        : 'you lose!'
        }</p>
      </div>
    </div>
    <div className='instruction-area'>
      <div id='left-child'></div>
      <div id='next-message'>
        Start over: <p id='current-turn'></p>
      </div>
      <div className='btn'>
        <button id='clear' onClick={handleClear}>Clear</button>
      </div>
    </div>
    <p className='under-text' id='click-or-tap'>
      Click on the above board to play a move!
    </p>
  </div>
  );
}

export default App;
