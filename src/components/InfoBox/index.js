import React, { Component } from 'react';
import './index.css';

const InfoBox = ({
    yourCount,
    opponentCount,
    userEndGame,
    opponentEndGame,
    gameOver,
    yourTurn
    }) => {

    let message = "";

    if (!gameOver && yourTurn) {
        message = "Your turn!";
    } else if (!gameOver) {
        message = "Waiting for opponent...";
    } else if (!userEndGame) {
        message = "No more tiles! Press '1' to end game.";
    } else if (!opponentEndGame) {
        message = "Waiting for opponent...";
    } else if (yourCount > opponentCount) {
        message = "You Win!";
    } else if (yourCount < opponentCount) {
        message = "You Lose!";
    } else {
        message = "It's a Tie!";
    }

    return (
        <div className="InfoBox">
            {message}
        </div>
    );
}

export default InfoBox;