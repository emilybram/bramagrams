import React from 'react';
import Letter from './Letter';
import Utils from '../utils';

const WordBuilder = (props) => {
                const isValid = Utils.isValid(props.letters.join(""));
                return (
                    <div className={"WordBuilder" +  (isValid ? "" : " invalid")}>
                        {props.letters.map((letter, idx) => (
                            <Letter letter={letter} 
                            key={idx}/>
                        ))}
                    </div>
                );
};

export default WordBuilder;