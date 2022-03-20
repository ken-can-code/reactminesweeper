import React, { useState } from 'react';
import Square from './Square';

function App() {
  const [gameOver, setGameOver] = useState(false);
  function handleLeftClick(event, mineState, setSquareState) {
    console.log('left click');
    // console.log('mineState', mineState);
    if (event.target.firstChild.textContent === '') {
      if (mineState === false) {
        console.log('in mineState false');
        setSquareState('revealed-empty');
        setGameOver(true);
      } else {
        console.log('in mineState true');
        setSquareState('revealed-mine');
      }
    }
  } // closes the handleLeftClick function

  function handleRightClick(event, setSquareState) {
    event.preventDefault(); // prevents context menu from appearing for right click
    event.stopPropagation(); // prevents double right clicks due to bubbling up from square-contents
    console.log('right click');
    let squareContentsPointer;
    if (event.target.className === 'unrevealed') {
      squareContentsPointer = event.target.firstChild;
    } else if (event.target.className === 'square-contents') { // cannot just use else or flag will insert when green or red square clicked
      squareContentsPointer = event.target;
    }
    if (squareContentsPointer.textContent === '') { // no flag on unrevealed square
      setSquareState('flagged');
      console.log('if no flag, change state to flagged in inner or outer div');
    } else if (squareContentsPointer.textContent === '📍') { // if we want to add '?' state for square later on this is more maintainable
      setSquareState('unrevealed');
      console.log('if flag is present, change state to unrevealed in inner or outer div');
    }
    // *** it is not possible to click on an empty div because it has no size ***

  } // closes the handleRightClick function

  const squares = []; // tracks which squares should have mines
  let totalMines = 30; // total number of mines to be on the grid
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
    id={`square${i}`}
    key={`key${i}`}
    handleLeftClick={handleLeftClick}
    handleRightClick={handleRightClick}
    isMine={squares[i] === true} />;
  }
  
  // console.log('square at position 0 raw boolean value', squares[0].props.isMine);

  return (
    <div>
      <p className='section-title'>Mine Sweeper</p>
      <div className='board-area'>
      <div className='board-left' />
      <div className='board-main'>
        <div className='board'>
          {squares} {/* if array is placed in JSX return statement it'll simply display in DOM */}
        </div>
      </div>
      <div className='board-right'>
        <p id='win'></p>
      </div>
    </div>
    <div className='instruction-area'>
      <div id='left-child'></div>
      <div id='next-message'>
        Start over: <p id='current-turn'></p>
      </div>
      <div className='btn'>
        <button id='clear'>Clear</button>
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
