import React, { useState, useEffect } from 'react';
import Square from './Square';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [boardMines, setBoardMines] = useState([]); // set to true or undefined currently
  const [firstClicked, setFirstClicked] = useState(false);

  function adjSquarePositions(xCoor, yCoor) {
    const listOfSquareIdsAsKeys = new Set(); // {86, 87, 85, 77}

    for (let adjX = xCoor - 1; adjX <= xCoor + 1; adjX += 1) {
      for (let adjY = yCoor - 1; adjY <= yCoor + 1; adjY += 1) {
        if (adjX >= 0 // adjX = 0
          && adjX <= 9
          && adjY >= 0 //adjY = -1
          && adjY <= 9) {
          // do something at every square surrounding (and including) the clicked square
          listOfSquareIdsAsKeys.add(adjY * 10 + adjX); // keeping track of each square ID surrounding the click
        }
      }
    }

    return listOfSquareIdsAsKeys;
  }

  function adjMineNum(xCoor, yCoor) {
    let adjMines = 0;

    const listOfSquares = adjSquarePositions(xCoor, yCoor);
    listOfSquares.forEach((idxOfSquare) => { // checks each adjacent square
      if (boardMines[idxOfSquare] === true) { // checking if that adjacent square is a mine
        adjMines += 1; // if so, add to the count
      }
    });
    
    console.log('in mine counter funtion', adjMines);
    return adjMines;
  }

  function handleClick(event, mineState, setSquareState, setDispMineNum, xAxis, yAxis) {
    const squareContents = event.target.firstChild;
    if (event.type === 'click' && squareContents.innerHTML === '') { // left click logic
      console.log('reached here');
      if (boardMines[yAxis * 10 + xAxis] === undefined && firstClicked === true) { // non mine square logic
        console.log('x and y axis, in order', xAxis, yAxis);
        setDispMineNum(adjMineNum(xAxis, yAxis, boardMines)); // puts the adjacent mine num into state, which displays in square
        console.log('in mineState false');
        // event.target.className = 'revealed-empty'; // no longer needed -> handled by state
        setSquareState('revealed-empty'); // in theory, square becomes minty-green based on state
        // setFirstClicked(true);
      } else if (firstClicked === true) { // if left clicked and IS a mine
        console.log('in mineState true');
        // event.target.className = 'revealed-mine'; // no longer needed -> handled by state
        setSquareState('revealed-mine'); // in theory, square becomes red based on state
        setGameOver(true);
        // const allSquares = document.querySelectorAll('.square-contents'); // temporarily commented out
        // allSquares.forEach((elem) => { // end game death logic // commented this out to avoid problems
        //   elem.parentNode.setAttribute('disabled', true);
        // });
      } else if (firstClicked === false) { // first click guaranteed safe logic
        setFirstClicked(true);
        setSquareState('revealed-empty'); // use state to update rather than directly updating className
        const minePositions = generateMines(xAxis, yAxis); // minePositions var is no longer needed - Mario
        console.log('boardMines', boardMines);
        // const adjacentMineNum = adjMineNum(xAxis, yAxis, minePositions);
        setDispMineNum(adjMineNum(xAxis, yAxis));
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
    } // closes the handleClick function
  }

  function handleRestart() {  // (PROBABLY) All stuff in this function runs BEFORE
    setGameOver(false);      // the useEffect in Square.jsx runs
    setRestart(true);
    setFirstClicked(false);
    setBoardMines([]);
  }

  const squares = [];

  for (let i = 0; i < 100; i += 1) {
    squares[i] = <Square
    xAxis={i % 10}
    yAxis={Math.floor(i / 10)}
    key={`key${i}`}
    handleClick={handleClick}
    gameOver={gameOver}
    // isMine={boardMines}
    restart={restart}
    setRestart={setRestart}
    />;
  }

  console.log('************ rerendered App componente HERE ************')
  
  function generateMines (xAxis, yAxis) {
    const initialStateArr = []; // create array to pass into setBoardMines
    initialStateArr[yAxis * 10 + xAxis] = 'no mines here';

    // adjMineNum(xAxis, yAxis, initialStateArr); // this is doing nothing so I commented it out - Mario
    let totalMines = 16; // total number of mines to be on the grid

    const listOfAdjPositions = adjSquarePositions(xAxis, yAxis); // {86, 87, 85, 77} (example set)
    // by this point we need the positions of all adjacent squares

    while (totalMines > 0) {
      const randomSquareNum = Math.floor(Math.random() * 100);
      if (initialStateArr[randomSquareNum] === undefined && listOfAdjPositions.has(randomSquareNum) === false) {
        initialStateArr[randomSquareNum] = true;
        // console.log(`Mined square`, squaresStates[randomSquareNum]); // counts number of mines
        totalMines -= 1;
      }
    }

    setBoardMines(initialStateArr);
    console.log('generateMines is completed here');
    return initialStateArr;
  }

  // console.log(squares[0]);
  // rearchitect to have mines as states inside each square component

  
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

// maybe put mineState in the state of this component?
// we were working on guaranteeing first move is safe 4-6-22