import React from 'react';
import './index.css';

const Letter = ({ letter, onLetterClicked }) => 
    <div className="Letter" onClick={onLetterClicked}>
        <div className="LetterText">
            {letter}
        </div>
    </div>  

export default Letter;