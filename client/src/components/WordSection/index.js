import React from 'react';
import Letter from '../Letter';
import './index.css';

const Word = ({ word }) => 
    <div className="Word">
        {word.split('').map((letter, idx) => {
            return (<Letter letter={letter} key={idx} />);
        })}
    </div>

const WordSection = ({ words, className, title }) => 
    <div className={"WordSection " + className}>
        <h2>{title}</h2>
        {words.map((word, idx) => {
            return (<Word word={word} key={idx} />);
        })}
    </div>

export default WordSection;