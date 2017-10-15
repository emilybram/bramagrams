import React from 'react';

const Letter = ({ letter, onLetterClicked }) => 
    <div className="Letter" onClick={onLetterClicked}>
        <div className="LetterText">
            {letter}
        </div>
    </div>  

export default Letter;