import React, { Component } from 'react';
import Letter from './Letter';

class Board extends Component {
    render() {
        var tilesHTML = [];
        var tile;
        for (var i = 0; i < this.props.tiles.length; i++) {
            tile = this.props.tiles[i];
            tilesHTML.push(
                <Letter letter={tile.letter} onTileClicked={this.props.onTileClicked} key={tile.idx} idx={tile.idx}/>
            );
        }

        return (
            <div className="Board">
                {tilesHTML}
            </div>
        );
    }
}

export default Board;