import Square from './Square';

function App() {
  return (
    <div>
      <p class='section-title'>Minesweeper</p>
      <div class='board-area'>
      <div class='board-left' />
      <div class='board-main'>
        <div class='board'>
          <div class='board-square' id='square1'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square2'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square3'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square4'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square5'>
            <div class='square-contents'> </div>
          </div>
          <div class='board-square' id='square6'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square7'>
            <div class='square-contents'></div>
          </div>
          <div class='board-square' id='square8'>
            <div class='square-contents'></div>
          </div>
          <Square />
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
