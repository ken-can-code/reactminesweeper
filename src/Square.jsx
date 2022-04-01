import React, { useState, useEffect } from 'react';

const Square = (props) => {
  const {isMine, handleClick, gameOver, restart, setRestart, xAxis, yAxis} = props;
  const [squareState, setSquareState] = useState('unrevealed'); // ['unrevealed', 'revealed-empty', 'revealed-mine', 'flagged']

  useEffect(() => {
    setSquareState('unrevealed');
    setRestart(false);
  }, [restart, setRestart])

  return (
    <div
      className={squareState === 'revealed-empty'
      ? 'revealed-empty' // true 'revealed-empty'
      : squareState === 'revealed-mine'
        ? 'revealed-mine' // true 'revealed-mine'
        : 'unrevealed' // unrevealed or flagged becomes 'unrevealed'
      }
      onClick={gameOver === false ? function (event) { // handle left click
        handleClick(event, isMine, setSquareState, xAxis, yAxis);
        } : undefined}
      onContextMenu={gameOver === false ? function (event) { // handle right click
        handleClick(event, isMine, setSquareState)
        } : function (event) {
          event.preventDefault();
        }
      } // right click listener (don't forget preventDefault()!)
    >
      <div className='square-contents'
        onContextMenu={gameOver === false ? function (event) { // handle right click
          handleClick(event, isMine, setSquareState)
          } : function (event) {
            event.preventDefault();
          }
        }
      >{squareState === 'flagged' ? '📍' : ''}</div> {/* flag gets placed here if needed */}
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

/* ***************** features or bugs currently being worked on: *******************
--> restart button not clearing numbered squares
--> win condition
--> numbers are not the correct size

*************** stretch features ***************
--> sounds? music? (music may be a bad idea...)
--> when lose, reveal the square that caused a loss
--> reveal all remaining mines when die (or win?)
--> remaining mine counter displayed on screen
--> guarantee first move is safe
--> automatically reveal all surrounding squares when left click reveals a 0
--> timer
--> keep high score
  --> keep high score in local browser storage
    extra stretch feature: --> keep high scores in a database



*/



// ******************* below has been complete ***********************
// assign a fixed number of mines to grid completely randomly

// keep track of total number of mines to assign
// e.g. let numOfMines = 20;
// loop through squares in random order and assign mine to square if not already have mine
// continue loop until no more mines



// ******************* Luigi's Notes ***********************
//     state at any given time || function used to update the state ** <-- corrected wording by Ken 
// const [isMine, setIsMine] = useState(mineState);
//                         || React function to create the hook || initial state

