import React, { Component } from 'react';
import Letter from './Letter';

class WordBuilder extends Component {
    render() {
        if (this.props.tiles.length === 0) {
            return (
                <div />
            );
        }

        var tilesHTML = [];
        var tile;
        for (var i = 0; i < this.props.tiles.length; i++) {
            tile = this.props.tiles[i];
            tilesHTML.push(
                <Letter letter={tile.letter} onClick={alert} key={tile.idx} idx={tile.idx}/>
            );
        }
        return (
            <div className="WordBuilder">
                <div className="CurrentWord">
                    {tilesHTML}
                </div>
                <div className="Button" onClick={this.props.onWordSubmitted}>
                    Submit
                </div>
            </div>
        );
    }
}

export default WordBuilder;