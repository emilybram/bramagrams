import React from 'react';
import Letter from '../Letter';

const Word = ({ word }) => 
    <div className="Word">
        {word.split('').map((letter, idx) => {
            return (<Letter letter={letter} key={idx} />);
        })}
    </div>

const WordSection = ({ words, className }) => 
    <div className={"WordSection " + className}>
        {words.map((word, idx) => {
            return (<Word word={word} key={idx} />);
        })}
    </div>

export default WordSection;