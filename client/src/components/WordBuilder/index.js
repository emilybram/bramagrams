import React from 'react';
import Letter from '../Letter';
import Utils from '../../utils';
import './index.css';

const WordBuilder = ({ letters }) => {
                const isValid = Utils.isValid(letters.join(""));
                return (
                    <div className={"WordBuilder" +  (isValid ? "" : " invalid")}>
                        {letters.map((letter, idx) => (
                            <Letter letter={letter} 
                            key={idx}/>
                        ))}
                    </div>
                );
};

export default WordBuilder;