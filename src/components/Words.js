import React from 'react';
import Letter from './Letter';

const Word = (props) => {
        return (
            <div className="Word">
                {props.word.split('').map((letter, idx) => {
                    return (<Letter letter={letter} key={idx} />);
                })}
            </div>
        );
};

const Words = (props) => {
    return (
        <div className={"Words " + props.className}>
            {props.words.map((word, idx) => {
                return (<Word word={word} key={idx} />);
            })}
        </div>
    );
};

export default Words;