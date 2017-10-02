import React from 'react';

const Letter = (props) => (
                    <div className="Letter" onClick={props.onLetterClicked}>
                        <div className="LetterText">
                            {props.letter}
                        </div>
                    </div>);

export default Letter;