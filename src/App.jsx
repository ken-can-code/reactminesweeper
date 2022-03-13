import Square from './Square';

function App() {
  function handleClick(event, mineState) {
    console.log('event.target', event.target);
    console.log('mineState', mineState);
    if (mineState === false) {
      console.log('in mineState false');
      event.target.className = 'revealed-square';
    } else {
      console.log('in mineState true');
      event.target.className = 'mine-square';
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
    handleClick={handleClick}
    isMine={squares[i] === true} />;
  }
  

  // console.log('square at position 0 raw boolean value', squares[0].props.isMine);

  return (
    <div>
      <p className='section-title'>A grid</p>
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
