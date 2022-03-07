import Square from './Square';

function App() {
  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    squares.push(<Square id={`square${i}`} />);

  }

  return (
    <div>
      <p class='section-title'>Minesweeper</p>
      <div class='board-area'>
      <div class='board-left' />
      <div class='board-main'>
        <div class='board'>
          {squares} {/* if array is placed in JSX return statement it'll simply display in DOM */}
        </div>
      </div>
      <div class='board-right'>
        <p id='win'></p>
      </div>
    </div>
    <div class='instruction-area'>
      <div id='left-child'></div>
      <p id='next-message'>
        Start over: <p id='current-turn'></p>
      </p>
      <div class='btn'>
        <button id='clear'>Clear</button>
      </div>
    </div>
    <p class='under-text' id='click-or-tap'>
      Click or tap on the above board to play a move!
    </p>
    <script src='index.jsx'></script>
  </div>
  );
}

export default App;
