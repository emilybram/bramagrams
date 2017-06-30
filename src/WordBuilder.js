import React, { Component } from 'react';
import Letter from './Letter';

class WordBuilder extends Component {
    constructor() {
        super();
        this.onWordSubmitted = this.onWordSubmitted.bind(this);
    }

    onWordSubmitted() {
        var word = "";
        for (var i = 0; i < this.props.tiles.length; i++) {
            word = word.concat(this.props.tiles[i].letter);
        }
        this.props.onWordSubmitted(word);
    }

    render() {
        if (this.props.tiles.length === 0) {
            return (
                <div className="WordBuilder" />
            );
        }

        var tilesHTML = [];
        var tile;
        for (var i = 0; i < this.props.tiles.length; i++) {
            tile = this.props.tiles[i];
            tilesHTML.push(
                <Letter letter={tile.letter} onTileClicked={this.props.onCurrTileClicked} key={tile.idx} idx={tile.idx}/>
            );
        }
        return (
            <div className="WordBuilder">
                <div className="CurrentWord">
                    {tilesHTML}
                </div>
                <div className="Button" onClick={this.onWordSubmitted}>
                    Submit
                </div>
            </div>
        );
    }
}

export default WordBuilder;