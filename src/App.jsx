import React, { useState } from 'react';
import Square from './Square';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);

  function adjMineNum(xCoor, yCoor) {
    let adjMines = 0;
    // console.log('before loop mine num should be 0', adjMines);
    for (let adjX = xCoor - 1; adjX <= xCoor + 1; adjX += 1) {
      for (let adjY = yCoor - 1; adjY <= yCoor + 1; adjY += 1) {
        if (adjX >= 0 // adjX = 0
          && adjX <= 9
          && adjY >= 0 //adjY = -1
          && adjY <= 9) {
          if (squares[adjY * 10 + adjX].props.isMine === true) {
            adjMines += 1;
          }
        }
      }
    }

    console.log('in mine counter funtion', adjMines);
    return adjMines;
  }

  function handleClick(event, mineState, setSquareState, xAxis, yAxis) {
    const squareContents = event.target.firstChild;
    // console.log('event', event);
    // console.log('mineState', mineState);
    if (event.type === 'click' && squareContents.innerHTML === '') { // left click logic
      if (mineState === false) { // non mine square logic
        // const xcoordinate = event.target.
        console.log('x and y axis, in order', xAxis, yAxis);
        squareContents.textContent = adjMineNum(xAxis, yAxis);
        console.log('in mineState false');
        // event.target.className = 'revealed-empty'; // no longer needed -> handled by state
        setSquareState('revealed-empty'); // in theory, square becomes minty-green based on state
      } else {
        console.log('in mineState true');
        // event.target.className = 'revealed-mine'; // no longer needed -> handled by state
        setSquareState('revealed-mine'); // in theory, square becomes red based on state
        setGameOver(true);
        // const allSquares = document.querySelectorAll('.square-contents'); // temporarily commented out
        // allSquares.forEach((elem) => { // end game death logic // commented this out to avoid problems
        //   elem.parentNode.setAttribute('disabled', true);
        // });
      }
    } else if (event.type === 'contextmenu') { // right click logic
      event.preventDefault(); // prevents context menu from appearing for right click
      event.stopPropagation(); // prevents click from bubbling up and clicking more than once
      let visualFlag;
      event.target.className === 'unrevealed'
      ? visualFlag = event.target.firstChild : visualFlag = event.target;
      console.log('right click');
      if ((event.target.className === 'unrevealed' // flag display logic based on right click
      || event.target.className === 'square-contents')
      && visualFlag.textContent === '') {
        // visualFlag.textContent = '📍'; // no longer needed -> handled by state
        setSquareState('flagged'); // in theory adds a flag based on 'flagged' state
        console.log(`VISUALFLAG.textContent 1`, visualFlag.textContent);
      } else if (event.target.className === 'unrevealed'
      || event.target.className === 'square-contents') {
        // visualFlag.textContent = ''; no longer needed -> handled by state
        setSquareState('unrevealed'); // in theory removes flag based on no longer being in 'flagged' state
        console.log(`VISUALFLAG.textContent 2`, visualFlag.textContent);
      }
    } // closes the else
  } // closes the handleClick function

  function handleRestart() {
    setGameOver(false);
    setRestart(true); 
  }

  const squares = []; // tracks which squares should have mines
  let totalMines = 16; // total number of mines to be on the grid
  while (totalMines > 0) {
    const randomSquareNum = Math.floor(Math.random() * 100);
    if (squares[randomSquareNum] === undefined) {
      squares[randomSquareNum] = true;
      // console.log(`Mined square`, squares[randomSquareNum]); // counts number of mines
      totalMines -= 1;
    }
  }

  for (let i = 0; i < 100; i += 1) {
    squares[i] = <Square
    xAxis={i % 10}
    yAxis={Math.floor(i / 10)}
    key={`key${i}`}
    handleClick={handleClick}
    gameOver={gameOver}
    isMine={squares[i] === true}
    restart={restart}
    setRestart={setRestart}
    />;
  }

  return (
    <div>
      <p className='section-title'>Mine Sweeper</p>
      <div className='board-area'>
      <div className='board-left' />
      <div className='board-main'>
        <div className='board' onContextMenu={(event) => {
          event.preventDefault();
          console.log('right click in board');
        }}>
          {squares} {/* if array is placed in JSX return statement it'll simply display in DOM */}
        </div>
      </div>
      <div className='board-right'>
        <p id='endGameMessage'>{
          gameOver === true ? 'Game Over!' : ''
        }</p>
      </div>
    </div>
    <div className='instruction-area'>
      <div id='left-child'></div>
      <div id='next-message'>
        Start over: <p id='current-turn'></p>
      </div>
      <div className='btn'>
        <button id='clear' onClick={handleRestart}>Restart Game</button> {/* onClick may not be ideal*/}
      </div>
    </div>
    <p className='under-text' id='click-or-tap'>
      Click or tap on the above board to play a move!
    </p>
    <script src='index.jsx'></script>
  </div>
  );
}

export default App;

// numbers work but they stay on clear and crash on edges of the board

// return the ones digit from any number 0 through 99

// get the sum of nested array
/*
function sumOfNestedArrays(testData) {
  let sum = 0;

  for(let i = 0; i < testData.length; i += 1) {
    for(let k = 0; k < testData[i].length; k += 1) {
      sum += testData[i][k];
    }
  }

  return sum;
}

const testData = [
                  [1, 4, 5,],
                  [2, 8, 3,],
                  [4, 6, 0,],
                  ];
*/