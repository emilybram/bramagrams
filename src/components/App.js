import React, { Component } from 'react';
import Board from './Board';
import WordBuilder from './WordBuilder';
import Words from './Words';
import Utils from '../Utils';
import '../styles/App.css';
import io from 'socket.io-client';

class Tile {
    constructor(letter, idx) {
        this.letter = letter;
        this.idx = idx;
    }
}

class WaitingScreen extends Component {
    render() {
        return (
            <div className="WaitingScreen">
                Send your friend this link: 
                <div className="GameUrl">
                    https://bramagrams.herokuapp.com/{this.props.gameId}
                </div>
            </div>
            );
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waitingForOpponent: true,
            tilesFlipped: [],
            tilesUnflipped: [],
            tilesCurrWord: [],
            yourWords: [],
            opponentWords: []
        };

        var app = this;

        this.socket = io();

        this.socket.emit('gameRoom', {gameRoom: this.props.gameId});

        this.socket.on('playerId', function(playerId){
            app.playerId = playerId;
        });

        this.socket.on('secondPlayerJoin', function({socketId: socketId}){
            app.setState({
                waitingForOpponent: false
            });
            app.socket.emit('sendTiles', {
                socketId: socketId,
                tilesFlipped: app.state.tilesFlipped,
                tilesUnflipped: app.state.tilesUnflipped
            });
        });

        this.socket.on('receiveTiles', function({tilesFlipped: tilesFlipped, tilesUnflipped: tilesUnflipped}){
            app.setState({
                tilesFlipped: tilesFlipped,
                tilesUnflipped: tilesUnflipped,
                waitingForOpponent: false
        });
    });

        this.socket.on('firstPlayer', function(){
            app.setState({
                tilesUnflipped: Utils.getShuffledTiles(),
                tilesFlipped: []
            });
        });

        this.socket.on('word', function(newGameState) {
            var newWords = app.state.opponentWords.slice();
            newWords.push(newGameState.word);
            app.setState({
                opponentWords: newWords,
                tilesFlipped: newGameState.tilesFlipped,
                tilesUnflipped: newGameState.tilesUnflipped
            });
        });
        this.socket.on('tileFlip', function() {
            app.flipTile();
        });

        this.flipTile = this.flipTile.bind(this);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.onWordSubmitted = this.onWordSubmitted.bind(this);
        this.onCurrTileClicked = this.onCurrTileClicked.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.getTileWithLetter = this.getTileWithLetter.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keyup", this.handleKeyDown);
    }


    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyDown);
    }

    getNextTile() {
        return new Tile();
    }

    handleKeyDown(event) {
        if (this.state.waitingForOpponent) {
            return;
        }
        if (event.keyCode === 32) {
            // Spacebar
            if (this.state.tilesUnflipped.length > 0) {
                this.flipTile();
                this.socket.emit("tileFlip");
            } else {
                alert("No more tiles!");
            }
        } else if (event.keyCode === 13) {
            // Enter
            if (Utils.isValid(Utils.asWord(this.state.tilesCurrWord))) {
                this.onWordSubmitted();
            } 
        } else if (event.keyCode === 8) {
            // Delete
            if (this.state.tilesCurrWord.length > 0) {
                var tile = this.state.tilesCurrWord[this.state.tilesCurrWord.length - 1];
                this.onCurrTileClicked(tile.letter, tile.idx);
            }
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
            // A through Z
            var tile = this.getTileWithLetter(Utils.keyCodes[event.keyCode].toUpperCase());
            if (tile) {
                this.onTileClicked(tile.letter, tile.idx);
            }
        }
    }

    getTileWithLetter(letter) {
        for (var i = 0; i < this.state.tilesFlipped.length; i++) {
            if (this.state.tilesFlipped[i].letter === letter) {
                return this.state.tilesFlipped[i]
            }
        }
        return null;
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

    onWordSubmitted() {
        var word = Utils.asWord(this.state.tilesCurrWord);
        var newYourWords = this.state.yourWords.slice();
        newYourWords.push(word);

        this.socket.emit('word', {word: word, 
            tilesFlipped: this.state.tilesFlipped,
            tilesUnflipped: this.state.tilesUnflipped
        });

        this.setState({
            tilesCurrWord: [],
            yourWords: newYourWords
        });
    }

    flipTile() {
        var newTilesFlipped = this.state.tilesFlipped.slice();
        var newTilesUnflipped = this.state.tilesUnflipped.slice();
        var newTile = newTilesUnflipped.pop();
        for (var i = 0; i < this.state.tilesCurrWord.length; i++) {
            newTilesFlipped.push(this.state.tilesCurrWord[i]);
        }
        newTilesFlipped.push(newTile);
        this.setState({
            tilesFlipped: newTilesFlipped,
            tilesUnflipped: newTilesUnflipped,
            tilesCurrWord: []
        });
    }

    render() {
        if (this.state.waitingForOpponent) {
            return (<WaitingScreen gameId={this.props.gameId}/>);
        }
        else return (
            <div className="App">
                <div className="TilesSection">
                    <Board tiles={this.state.tilesFlipped} onTileClicked={this.onTileClicked} />
                </div>
                <WordBuilder tiles={this.state.tilesCurrWord} onCurrTileClicked={this.onCurrTileClicked} onWordSubmitted={this.onWordSubmitted} />
                <div className="AllWords">
                    <Words words={this.state.yourWords} className="YourWords" />
                    <Words words={this.state.opponentWords} className="OpponentWords" />
                </div>
            </div>
        );
    }
}

export default App;