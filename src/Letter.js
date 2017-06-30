import React, { Component } from 'react';
import Tile from './Bramagrams';

class Letter extends Component {
    constructor() {
        super();
        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        this.props.onTileClicked(this.props.letter, this.props.idx);
    }

    render() {
        return (
            <div className="Letter" onClick={this.onClicked}>
                {this.props.letter}
            </div>
        );
    }
}

export default Letter;