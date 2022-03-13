import React, { useState } from 'react';

const Square = (props) => {
  const {isMine, handleClick} = props;
  const [squareState, setSquareState] = useState('unrevealed'); // ['unrevealed', 'revealed', 'flagged']

  return (
    <div
      className='board-square'
      onClick={function (event) {
        handleClick(event, isMine)
        }}
      >
      <div className='square-contents'></div>
    </div>
  )
}

// const kenSquare = document.getElementById('kenSquare');
// kenSquare.addEventListener('click', handleClick);

export default Square;

// ******************** pseudocode below ***************************
/*

  we can either have:
    --> one state for revealed, unrevealed, and marked (flagged) ||
    --> one state for flagged/unflagged
      --> one state for revealed or not
      --> one state for dead or not dead...?

****************BASIC FUNCTIONALITY GOALS****************
  First square click:
      --> Right-click:
          --> Mark square/show flag
          --> Unmark flag if ALREADY marked
      --> Left-click:        
          1) Mines are placed
          2) Square is revealed
  All susequent left-click clicks:
      --> Mine?
        --> Dead
        --> Reveal all mines on grid (STRETCH??)
      --> Reveal the square
*/



// ******************* below has been complete ***********************
// assign a fixed number of mines to grid completely randomly

// keep track of total number of mines to assign
// e.g. let numOfMines = 30;
// loop through squares in random order and assign mine to square if not already have mine
// continue loop until no more mines



// ******************* Luigi's Notes ***********************
//     state at any given time || update function 
// const [isMine, setIsMine] = useState(mineState);
//                         || React function to create the hook || initial state