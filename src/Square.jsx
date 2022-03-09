import React, { useState } from 'react';

const Square = (props) => {
  const {isMine: mineState} = props;
// state at any given time || update function 
  const [isMine, setIsMine] = useState(mineState);
//                         || React function to create the hook || initial state

  return (
    <div class='board-square'>
      <div class='square-contents'></div>
    </div>
  )
}

export default Square;

// assign a fixed number of mines to grid completely randomly

// keep track of total number of mines to assign
// e.g. let numOfMines = 30;
// loop through squares in random order and assign mine to square if not already have mine
// continue loop until no more mines