import React from 'react';
import Letter from './Letter';

const Word = ({ word }) => 
    <div className="Word">
        {word.split('').map((letter, idx) => {
            return (<Letter letter={letter} key={idx} />);
        })}
    </div>

const Words = ({ words, className }) => 
    <div className={"Words " + className}>
        {words.map((word, idx) => {
            return (<Word word={word} key={idx} />);
        })}
    </div>

export default Words;