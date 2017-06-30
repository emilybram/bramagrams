import React, { Component } from 'react';
import Board from './Board';
import WordBuilder from './WordBuilder';
import Utils from './Utils';

class Tile {
    constructor(letter, idx) {
        this.letter = letter;
        this.idx = idx;
    }
}

class Bramagrams extends Component {
    constructor() {
        super();
        this.state = {
            tilesFlipped: [],
            tilesUnflipped: this.getShuffledTiles(),
            tilesCurrWord: []
        };
        this.flipTile = this.flipTile.bind(this);
        this.getShuffledTiles = this.getShuffledTiles.bind(this);
        this.onFlipClicked = this.onFlipClicked.bind(this);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.onWordSubmitted = this.onWordSubmitted.bind(this);
    }

    onTileClicked(letter, idx, selected) {
        var tile = new Tile(letter, idx);
        var newTilesCurrWord = this.state.tilesCurrWord.slice();
        var newTilesFlipped = this.state.tilesFlipped.slice();
        var idx;

        for (var i = 0; i < newTilesFlipped.length; i++) {
            if (newTilesFlipped[i].letter === letter && newTilesFlipped[i].idx === idx) {
                idx = i;
                break;
            }
        } 
        
        newTilesCurrWord.push(tile);
        newTilesFlipped.splice(idx, 1);

        this.setState({
            tilesCurrWord: newTilesCurrWord,
            tilesFlipped: newTilesFlipped
        });
    }

    onFlipClicked() {
        if (this.state.tilesUnflipped.length > 0) {
            this.flipTile();
        } else {
            alert("No more tiles!");
        }
    }

    onWordSubmitted() {
        this.setState({
            tilesCurrWord: []
        });
    }

    getShuffledTiles() {
        var tiles = [];
        var count = 0;
        for (var letter in Utils.letterFreqs) {
            for (var i = 0; i < Utils.letterFreqs[letter]; i++) {
                tiles.push(new Tile(letter, count));
                count++;
            }
        }
        Utils.shuffle(tiles);
        return tiles;
    }

    flipTile() {
        var newTilesFlipped = this.state.tilesFlipped.slice();
        var newTilesUnflipped = this.state.tilesUnflipped.slice();
        var newTile = newTilesUnflipped.pop();
        newTilesFlipped.push(newTile);
        this.setState({
            tilesFlipped: newTilesFlipped,
            tilesUnflipped: newTilesUnflipped
        });
    }

    render() {
        return (
            <div className="Bramagrams">
                <Board tiles={this.state.tilesFlipped} onTileClicked={this.onTileClicked} />
                <div className="Button" onClick={this.onFlipClicked}>
                    Flip
                </div>
                <WordBuilder tiles={this.state.tilesCurrWord} onWordSubmitted={this.onWordSubmitted} />
            </div>
        );
    }
}

export default Bramagrams;