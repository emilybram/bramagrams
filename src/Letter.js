import React, { Component } from 'react';
import Tile from './Bramagrams';

class Letter extends Component {
    constructor() {
        super();
        this.state = {
            selected: false
        };
        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        var newState = !this.state.selected;
        this.setState({
            selected: newState
        });
        this.props.onTileClicked(this.props.letter, this.props.idx, newState);
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