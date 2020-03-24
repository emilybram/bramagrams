import React, { Component } from "react";
import Board from "../Board";
import SendURL from "../SendURL";
import WordBuilder from "../WordBuilder";
import WordSection from "../WordSection";
import InfoBox from "../InfoBox";
import Utils from "../../utils";
import Socket from "../../socket";
import Events from "../../events";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingForOpponent: true,
      yourTurn: false,
      userEndGame: false,
      opponentEndGame: false,
      lettersFlipped: [],
      lettersUnflipped: [],
      lettersCurrWord: [],
      yourWords: [],
      opponentWords: []
    };

    this.socket = Socket.setup(this);
    // Tell server to add you to game room
    this.socket.emit("gameRoom", { gameRoom: this.props.gameId });
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  render() {
    if (this.state.waitingForOpponent) {
      return <SendURL gameId={this.props.gameId} />;
    } else {
      return (
        <div className="App">
          <Board letters={this.getFlippedLetters()} />
          <WordBuilder letters={this.state.lettersCurrWord} />
          <InfoBox
            userEndGame={this.state.userEndGame}
            opponentEndGame={this.state.opponentEndGame}
            yourCount={this.state.yourWords.length}
            opponentCount={this.state.opponentWords.length}
            gameOver={false}
            yourTurn={this.state.yourTurn}
          />
          <div className="AllWords">
            <WordSection
              words={this.state.yourWords}
              className="YourWords"
              title="Your Words"
            />
            <WordSection
              words={this.state.opponentWords}
              className="OpponentWords"
              title="Opponent's Words"
            />
          </div>
        </div>
      );
    }
  }

  // listeners

  handleKeyDown(event) {
    if (this.state.waitingForOpponent) {
      // Game not started
      return;
    } else if (event.keyCode === 32) {
      // Spacebar
      if (this.state.lettersUnflipped.length > 0 && this.state.yourTurn) {
        this.setState({
          yourTurn: false
        });
        this.flipLetter();
        this.socket.emit("letterFlip");
      }
    } else if (event.keyCode === 13) {
      // Enter
      if (Utils.isValid(this.state.lettersCurrWord.join(""))) {
        this.onWordSubmitted();
      }
    } else if (event.keyCode === 8) {
      // Delete
      if (this.state.lettersCurrWord.length > 0) {
        this.onDelete();
      }
    } else if (event.keyCode === 49) {
      // 1
      if (this.state.lettersUnflipped.length == 0 && !this.state.userEndGame) {
        this.setState({
          userEndGame: true
        });
        this.socket.emit("endGame");
      }
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      // A through Z
      const letter = Utils.keyCodes[event.keyCode].toUpperCase();
      if (
        this.state.lettersFlipped.includes(letter) &&
        !this.state.userEndGame
      ) {
        this.onLetterTyped(letter);
      }
    }
  }

  onLetterTyped(letter) {
    this.setState(prevState => {
      const idx = prevState.lettersFlipped.indexOf(letter);
      const lettersFlipped = prevState.lettersFlipped.filter(
        (item, i) => i !== idx
      );

      return {
        lettersCurrWord: [...prevState.lettersCurrWord, letter],
        lettersFlipped
      };
    });
  }

  onDelete() {
    this.setState(prevState => {
      let lettersCurrWord = prevState.lettersCurrWord.slice(0);
      const letter = lettersCurrWord.pop();

      return {
        lettersCurrWord,
        lettersFlipped: [...prevState.lettersFlipped, letter]
      };
    });
  }

  onWordSubmitted() {
    const word = this.state.lettersCurrWord.join("");
    this.setState(prevState => {
      return {
        lettersCurrWord: [],
        yourWords: [...prevState.yourWords, word]
      };
    });
    this.socket.emit("word", word);
  }

  flipLetter() {
    this.setState(prevState => {
      const [flippedLetter, ...lettersUnflipped] = prevState.lettersUnflipped;
      return {
        lettersFlipped: [...prevState.lettersFlipped, flippedLetter],
        lettersUnflipped
      };
    });
  }

  onOpponentEndGame() {
    this.setState({
      opponentEndGame: true
    });
  }

  // helpers

  getFlippedLetters() {
    const { letters, flippedIndex } = this.state;
    return letters.slice(0, flippedIndex);
  }
}

export default App;
