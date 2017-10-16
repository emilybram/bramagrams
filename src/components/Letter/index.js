import React from 'react';
import './index.css';

const Letter = ({ letter, onLetterClicked }) => 
    <div className="Letter" onClick={onLetterClicked}>
        {letter}
    </div>  

export default Letter;