import React, { useState, useEffect } from 'react';

const Square = (props) => {
  const {xAxis, yAxis, isMine : mineStatus, handleLeftClick, handleRightClick, clearBoard, setClearBoard, gameOver} = props;
  const [squareState, setSquareState] = useState('unrevealed'); // ['unrevealed', 'revealed-empty', 'revealed-mine'flagged']
  const [adjacentMinesNum, setAdjacentMinesNum] = useState('');
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (clearBoard) {
      setSquareState('unrevealed');
      setClearBoard(false);
    }
    setIsMine(mineStatus);
  }, [clearBoard, setClearBoard]);

  return (
    <div
      className={squareState === 'revealed-empty'
      ? 'revealed-empty'
      : squareState === 'revealed-mine' 
        || (gameOver === true && isMine === true)
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
          : squareState === 'revealed-mine'
          ? 'X'
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

      ** --> Eventually, we went with one state for unrevealed, reavealed-empty, revealed-mine, and flagged
        --> Then, a separate state for gameOver

****************BASIC FUNCTIONALITY GOALS****************
  First square click:
      --> Right-click:
          --> Mark square/show flag
          --> Unmark flag if ALREADY marked
      --> Left-click:        
          1) Mines are placed ** --> completed, but mines are placed *BEFORE* first click
          2) Square is revealed
  All susequent left-click clicks:
      --> Mine?
        --> Dead
      --> Reveal the square
*/

/*
  Stretch features:

  --> show remaining number of mines to player based on number of squares flagged
  --> when game over, highlight square that caused the game over with big (red?) X --> done but not red
  --> when game over, show locations of all remaining mines --> done but useEffect dependency array complaining
  --> when game over, show locations where squares were flagged incorrectly
  --> guarantee first move is safe
  --> guarantee first move lands on a space with no adjacent mines, if at all possible

  --> write test suite (puppeteer? cypress?)

  --> if revealed square is 0, reveal any adjacent squares until no longer 0's all around
  --> timer
  --> best score tracking in browser cache
  --> best score keeping in database
  --> high score list
    --> ability to enter name or initials
  --> sound effects
  --> miniature mine graphics
  --> user defined dynamic board size and number of mines

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
// a revealed square without a mine will calculate adjacent mines and display number
// clear button restarts the game and clears all squares of flags and colors, rearranges mines