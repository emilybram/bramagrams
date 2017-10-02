import React from 'react';
import Letter from './Letter';

const Board = (props) => {
                return (
                    <div className="Board">
                        {props.letters.map((letter, idx) => (
                            <Letter letter={letter} 
                            key={idx} />
                        ))}
                    </div>
                );
};

export default Board;