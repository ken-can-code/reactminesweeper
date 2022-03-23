import React, { useState } from 'react';
import Square from './Square';

function App() {
  const [gameOver, setGameOver] = useState(false);
  function handleLeftClick(event, mineState, squareState, setSquareState) {
    console.log('left click');
    // console.log('mineState', mineState);
    if (squareState === 'unrevealed') {
      if (mineState === false) {
        console.log('in mineState false');
        setSquareState('revealed-empty');
      } else {
        console.log('in mineState true');
        setSquareState('revealed-mine');
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

  function handleClear() {
    setGameOver(false);
  }

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
    squares[i] =
    <Square
    id={`square${i}`}
    key={`key${i}`}
    handleLeftClick={handleLeftClick}
    handleRightClick={handleRightClick}
    isMine={squares[i] === true}
    gameOver={gameOver}
    />;
  }
  
  // console.log('square at position 0 raw boolean value', squares[0].props.isMine);

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
        <p id='win'>{gameOver ? 'game over!' : ''}</p>
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
