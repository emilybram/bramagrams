import React, { Component } from 'react';
import './index.css';

const GameOver = ({
    yourCount,
    opponentCount,
    userEndGame,
    opponentEndGame
    }) => {

    let message = "";

    if (!userEndGame) {
        message = "No more tiles! Press '1' to end game."
    } else if (!opponentEndGame) {
        message = "Waiting for opponent..."
    } else if (yourCount > opponentCount) {
        message = "You Win!"
    } else if (yourCount < opponentCount) {
        message = "You Lose!"
    } else {
        message = "It's a Tie!"
    }

    return (
        <div className="GameOver">
            {message}
        </div>
    );
}

export default GameOver;