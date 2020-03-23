import React from 'react';
import Letter from '../Letter';

const Board = ({ letters }) => {
                return (
                    <div className="Board">
                        {letters.map((letter, idx) => (
                            <Letter letter={letter} 
                            key={idx} />
                        ))}
                    </div>
                );
};

export default Board;