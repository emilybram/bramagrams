import React, { Component } from 'react';
import Letter from './Letter';
import Utils from './Utils';

class WordBuilder extends Component {
    render() {
        var tilesHTML = [];
        var tile;
        for (var i = 0; i < this.props.tiles.length; i++) {
            tile = this.props.tiles[i];
            tilesHTML.push(
                <Letter letter={tile.letter} onTileClicked={this.props.onCurrTileClicked} key={tile.idx} idx={tile.idx}/>
            );
        }

        return (
            <div className={"WordBuilder" + (!Utils.isValid(Utils.asWord(this.props.tiles)) ? " invalid" : "")}>
                {tilesHTML}
            </div>
        );
    }
}

export default WordBuilder;