import React, { Component } from 'react';

class WaitingPage extends Component {
    render() {
        return (
            <div className="WaitingPage">
                Send your friend this link: 
                <div className="GameUrl">
                    https://bramagrams.herokuapp.com/{this.props.gameId}
                </div>
            </div>
            );
    }
}

export default WaitingPage;