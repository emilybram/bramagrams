import React from 'react';

const WaitingPage = ({ gameId }) => 
            <div className="WaitingPage">
                Send your friend this link: 
                <div className="GameUrl">
                    https://bramagrams.herokuapp.com/game/{gameId}
                </div>
            </div>

export default WaitingPage;