import React from 'react';

const WaitingPage = (props) => {
        return (
            <div className="WaitingPage">
                Send your friend this link: 
                <div className="GameUrl">
                    https://bramagrams.herokuapp.com/game/{props.gameId}
                </div>
            </div>
            );
}

export default WaitingPage;