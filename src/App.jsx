import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [ranOnce, setRanOnce] = useState(false);

  console.log('ranOnceAtTop', ranOnce);

  function handleClick(event, mineState, setSquareState) {
    const squareContents = event.target.firstChild;
    // console.log('event', event);
    // console.log('mineState', mineState);
    if (event.type === 'click' && squareContents.textContent === '') { // left click logic
      if (mineState === false) {
        console.log('in mineState false');
        // event.target.className = 'revealed-empty'; // no longer needed -> handled by state
        setSquareState('revealed-empty'); // in theory, square becomes minty-green based on state
      } else {
        console.log('in mineState true');
        // event.target.className = 'revealed-mine'; // no longer needed -> handled by state
        setSquareState('revealed-mine'); // in theory, square becomes red based on state
        setIsGameOver(true); // SHOULD (but doesn't) update gameOver state to true i.e. the game is now over
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
    setIsGameOver(false);
    setRestart(true);
    setRanOnce(false);
  }

  // const [squares, setSquares] = useState([]); // temporary
  const squareAndMinePlacement = useCallback(() => 
  {
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
      handleClick={handleClick}
      isGameOver={isGameOver}
      isMine={squares[i] === true}
      restart={restart}
      setRestart={setRestart}
      />;
    }
  
    return squares;

  }, [isGameOver, restart, setRanOnce]);

  console.log('ranOnceBefore', ranOnce);
  const squares = squareAndMinePlacement();
  useEffect(() => {
    if (ranOnce === false) {
      setRanOnce(true);
      console.log('ranOnceInsideUseEffect', ranOnce);
    }
  }, [ranOnce, squareAndMinePlacement]);

  console.log('ranOnceAfter', ranOnce);

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
          isGameOver === true ? 'Game Over!' : ''
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

// just got game over working and very quickly got clear button to clear game over state (still need to reset squares)
// ideally create handleClear function instead of inline function in clear button onClick listener