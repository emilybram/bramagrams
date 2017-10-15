import React, { Component } from 'react';
import Board from '../Board';
import SendURL from '../SendURL';
import WordBuilder from '../WordBuilder';
import WordSection from '../WordSection';
import Utils from '../../utils';
import './index.css';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waitingForOpponent: true,
            lettersFlipped: [],
            lettersUnflipped: [],
            lettersCurrWord: [],
            yourWords: [],
            opponentWords: []
        };

        this.initSocket();
        this.socket.emit('gameRoom', {gameRoom: this.props.gameId});
    }

    componentWillMount() {
        document.addEventListener("keyup", this.handleKeyDown.bind(this));
    }


    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyDown.bind(this));
    }

    initSocket() {
        var app = this; 
        this.socket = io('/game');

        this.socket.on('playerId', function(playerId){
            app.playerId = playerId;
        });

        this.socket.on('secondPlayerJoin', function({socketId: socketId}){
            app.setState({
                waitingForOpponent: false
            });
            app.socket.emit('sendLetters', {
                socketId: socketId,
                lettersFlipped: app.state.lettersFlipped,
                lettersUnflipped: app.state.lettersUnflipped
            });
        });

        this.socket.on('receiveLetters', function({lettersFlipped: lettersFlipped, lettersUnflipped: lettersUnflipped}){
            app.setState({
                lettersFlipped: lettersFlipped,
                lettersUnflipped: lettersUnflipped,
                waitingForOpponent: false
        });
    });

        this.socket.on('firstPlayer', function(){
            app.setState({
                lettersUnflipped: Utils.getShuffledLetters(),
                lettersFlipped: []
            });
        });

        this.socket.on('word', function(newGameState) {
            var newWords = app.state.opponentWords.slice();
            newWords.push(newGameState.word);

            app.setState({
                opponentWords: newWords,
                lettersFlipped: newGameState.lettersFlipped,
                lettersUnflipped: newGameState.lettersUnflipped
            });
        });
        this.socket.on('letterFlip', function() {
            app.flipLetter();
        });
    }

    handleKeyDown(event) {
        if (this.state.waitingForOpponent) {
            return;
        }
        if (event.keyCode === 32) {
            // Spacebar
            if (this.state.lettersUnflipped.length > 0) {
                this.flipLetter();
                this.socket.emit("letterFlip");
            } else {
                alert("No more letters!");
            }
        } else if (event.keyCode === 13) {
            // Enter
            if (Utils.isValid(this.state.lettersCurrWord.join(""))) {
                this.onWordSubmitted();
            } 
        } else if (event.keyCode === 8) {
            // Delete
            if (this.state.lettersCurrWord.length > 0) {
                var letter = this.state.lettersCurrWord[this.state.lettersCurrWord.length - 1];
                this.onCurrLetterClicked(letter);
            }
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
            // A through Z
            var letter = this.getLetter(Utils.keyCodes[event.keyCode].toUpperCase());
            if (letter) {
                this.onLetterClicked(letter);
            }
        }
    }

    getLetter(letter) {
        for (var i = 0; i < this.state.lettersFlipped.length; i++) {
            if (this.state.lettersFlipped[i] === letter) {
                return this.state.lettersFlipped[i]
            }
        }
        return null;
    }

    onLetterClicked(letter) {
        var newLettersCurrWord = this.state.lettersCurrWord.slice();
        var newLettersFlipped = this.state.lettersFlipped.slice();
        var idx;

        for (var i = 0; i < newLettersFlipped.length; i++) {
            if (newLettersFlipped[i] === letter) {
                idx = i;
                break;
            }
        } 
        
        newLettersCurrWord.push(letter);
        newLettersFlipped.splice(idx, 1);

        this.setState({
            lettersCurrWord: newLettersCurrWord,
            lettersFlipped: newLettersFlipped
        });
    }

    onCurrLetterClicked(letter) {
        var newLettersCurrWord = this.state.lettersCurrWord.slice();
        var newLettersFlipped = this.state.lettersFlipped.slice();
        var idx;

        for (var i = 0; i < newLettersCurrWord.length; i++) {
            if (newLettersCurrWord[i] === letter) {
                idx = i;
                break;
            }
        } 
        
        newLettersCurrWord.splice(idx, 1);
        newLettersFlipped.push(letter);

        this.setState({
            lettersCurrWord: newLettersCurrWord,
            lettersFlipped: newLettersFlipped
        });
    }


    onWordSubmitted() {
        var word = this.state.lettersCurrWord.join("");
        var newYourWords = this.state.yourWords.slice();
        newYourWords.push(word);

        this.socket.emit('word', {word: word, 
            lettersFlipped: this.state.lettersFlipped,
            lettersUnflipped: this.state.lettersUnflipped
        });

        this.setState({
            lettersCurrWord: [],
            yourWords: newYourWords
        });
    }

    flipLetter() {
        var newLettersFlipped = this.state.lettersFlipped.slice();
        var newLettersUnflipped = this.state.lettersUnflipped.slice();
        var newLetter = newLettersUnflipped.pop();
        for (var i = 0; i < this.state.lettersCurrWord.length; i++) {
            newLettersFlipped.push(this.state.lettersCurrWord[i]);
        }
        newLettersFlipped.push(newLetter);
        this.setState({
            lettersFlipped: newLettersFlipped,
            lettersUnflipped: newLettersUnflipped,
            lettersCurrWord: []
        });
    }

    render() {
        if (this.state.waitingForOpponent) {
            return (<SendURL gameId={this.props.gameId}/>);
        }
        else { 
            return (
            <div className="App">
                <Board letters={this.state.lettersFlipped} onLetterClicked={this.onLetterClicked.bind(this)}/>
                <WordBuilder letters={this.state.lettersCurrWord}/>
                <div className="AllWords">
                    <WordSection words={this.state.yourWords} className="YourWords" />
                    <WordSection words={this.state.opponentWords} className="OpponentWords" />
                </div>
            </div>
        );
    }}
}

export default App;