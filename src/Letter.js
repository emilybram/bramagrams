import React, { Component } from 'react';
import Tile from './App';

class Letter extends Component {
    constructor() {
        super();
        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        if (this.props.onTileClicked) {
            this.props.onTileClicked(this.props.letter, this.props.idx);
        }
    }

    render() {
        return (
            <div className="Letter" onClick={this.onClicked}>
                <div className="LetterText"> {this.props.letter} </div>
            </div>
        );
    }
}

export default Letter;