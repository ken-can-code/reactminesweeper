import Square from './Square';

function App() {
  function handleLeftClick(event, mineState) {
    console.log('left click');
    // console.log('mineState', mineState);
    if (event.target.firstChild.textContent === '') {
      if (mineState === false) {
        console.log('in mineState false');
        event.target.className = 'revealed-empty';
      } else {
        console.log('in mineState true');
        event.target.className = 'revealed-mine';
      }
    }
  } // closes the handleLeftClick function

  function handleRightClick(event) {
    event.preventDefault(); // prevents context menu from appearing for right click
    event.stopPropagation();
    console.log('right click');
    if (event.target.className === 'unrevealed') { // click on the outer div
      if (event.target.firstChild.textContent === '') {
        event.target.firstChild.textContent = '📍';
        console.log('if textContent is blank');
      } else {
        event.target.firstChild.textContent = '';
        console.log('if textContent is not blank using else assumption');
      }
      console.log(`nested if statement triggered`, event.target.className);
    }
    if (event.target.className === 'square-contents') { // click on the contents i.e. the flag
      console.log('event.target within squareContents - flag clicked', event.target);
      if (event.target.textContent === '📍') {
        event.target.textContent = '';
      } // remove this close bracked if you uncomment code block below

      /* *** below code is unnecessary and is left as comments for illustration ***
        below code is unnecessary because it is not possible to click on an empty div
        basically, when the div contains nothing (empty string) it has no size
  
        ---> The child div will also send the event to the parent div <---
        basically what happens is the flag is removed and then immediately added back
        because it will literally process right click TWICE without event.stopPropagation()

      } else if (event.target.textContent === '📍') {
        // console.log('if textContent is blank and clicked on the flag itself - BEFORE');
        // console.log(event.target.textContent);
        console.log('event.target.textContent BEFORE change', event.target.textContent);
        event.target.textContent = ''; // removes flag
        console.log('event.target.textContent AFTER change', event.target.textContent);
        // console.log('if textContent is blank and clicked on the flag itself - AFTER');
        // console.log('if textContent is not blank and clicked on the flag itself');
      }
      */
    }
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
