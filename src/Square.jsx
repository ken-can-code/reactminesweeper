import React, { useState, useEffect } from 'react';

const Square = (props) => {
  const {xAxis, yAxis, isMine, handleLeftClick, handleRightClick, clearBoard, setClearBoard, gameOver} = props;
  const [squareState, setSquareState] = useState('unrevealed'); // ['unrevealed', 'revealed-empty', 'revealed-mine'flagged']
  const [adjacentMinesNum, setAdjacentMinesNum] = useState('');

  useEffect(() => {
    if (clearBoard) {
      setSquareState('unrevealed');
      setClearBoard(false);
    }
  }, [clearBoard, setClearBoard]);

  return (
    <div
      className={squareState === 'revealed-empty'
      ? 'revealed-empty'
      : squareState === 'revealed-mine'
      ? 'revealed-mine'
      : 'unrevealed'
      }
      onClick={gameOver === false // all left clicks
        ? () => {
          handleLeftClick(isMine, squareState, setSquareState, setAdjacentMinesNum, xAxis, yAxis)
        }
        : undefined
        }
      onContextMenu={gameOver === false // right click on outer square div
        ? (event) => {
          handleRightClick(event, squareState, setSquareState)
        }
        : (event) => event.preventDefault()
        }
    >
      <div
      className='square-contents' // right click on inner square div (flag itself)
      onContextMenu={gameOver === false
        ? (event) => {
          handleRightClick(event, squareState, setSquareState)
        }
        : (event) => event.preventDefault()
        }
      >{
          squareState === 'flagged'
          ? '📍'
          : squareState === 'revealed-empty'
          ? adjacentMinesNum
          : ''
        }</div>
    </div>
  )
}


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
      --> Reveal the square
*/

/*

  

*/


// ******************* below has been complete ***********************
// assign a fixed number of mines to grid completely randomly
// right click toggles flag on and off
// if square is left clicked -> 'revealed' right click is disabled on that square
// if square is right clicked -> 'flagged' left click is disabled on that square
// clicks are disabled in the space between squares
// left click will 'reveal' square as green if no mine is present
// left click will 'reveal' square as red if mine is present
// if mine is present on a left clicked square, game over is displayed
// all clicks are disabled if the game is over until game is restarted