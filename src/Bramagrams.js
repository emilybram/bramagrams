import React, { Component } from 'react';
import Board from './Board';
import WordBuilder from './WordBuilder';
import YourWords from './YourWords';
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
            tilesCurrWord: [],
            yourWords: []
        };
        this.flipTile = this.flipTile.bind(this);
        this.getShuffledTiles = this.getShuffledTiles.bind(this);
        this.onFlipClicked = this.onFlipClicked.bind(this);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.onWordSubmitted = this.onWordSubmitted.bind(this);
        this.onCurrTileClicked = this.onCurrTileClicked.bind(this);
    }

    onTileClicked(letter, idx) {
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

    onCurrTileClicked(letter, idx) {
        var tile = new Tile(letter, idx);
        var newTilesCurrWord = this.state.tilesCurrWord.slice();
        var newTilesFlipped = this.state.tilesFlipped.slice();
        var idx;

        for (var i = 0; i < newTilesCurrWord.length; i++) {
            if (newTilesCurrWord[i].letter === letter && newTilesCurrWord[i].idx === idx) {
                idx = i;
                break;
            }
        } 
        
        newTilesCurrWord.splice(idx, 1);
        newTilesFlipped.push(tile);

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

    onWordSubmitted(word) {
        var newYourWords = this.state.yourWords.slice();
        newYourWords.push(word);
        this.setState({
            tilesCurrWord: [],
            yourWords: newYourWords
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
                <WordBuilder tiles={this.state.tilesCurrWord} onCurrTileClicked={this.onCurrTileClicked} onWordSubmitted={this.onWordSubmitted} />
                <YourWords words={this.state.yourWords} />
            </div>
        );
    }
}

export default Bramagrams;