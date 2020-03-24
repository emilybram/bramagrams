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
      letters: [],
      lettersFlipped: [],
      lettersUnflipped: [],
      flippedIndex: 0,
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
    }

    switch (event.keyCode) {
      case 32:
        // Spacebar
        return this.handleSpacebarPress();
      case 13:
        // Enter
        return this.handleEnterPress();
      case 8:
        // Delete
        return this.handleDeletePress();
      default:
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          // A through Z
          const letter = Utils.keyCodes[event.keyCode].toUpperCase();
          return this.handleLetterPress(letter);
        }
    }
  }

  // event handlers

  handleSpacebarPress() {
    const { letters, flippedIndex, yourTurn } = this.state;

    if (!yourTurn || flippedIndex >= letters.length - 1) {
      return;
    }

    this.setState(
      {
        yourTurn: false
      },
      () => {
        this.setState(
          prevState => {
            return {
              flippedIndex: prevState.flippedIndex + 1
            };
          },
          () => this.socket.emit("letterFlip")
        );
      }
    );
  }

  handleEnterPress() {
    if (!Utils.isValid(this.state.lettersCurrWord.join(""))) {
      return;
    }

    const word = this.state.lettersCurrWord.join("");
    this.setState(prevState => {
      return {
        lettersCurrWord: [],
        yourWords: [...prevState.yourWords, word]
      };
    });
    this.socket.emit("word", word);
  }

  handleDeletePress() {
    if (this.state.lettersCurrWord.length === 0) {
      return;
    }

    this.setState(prevState => {
      return {
        lettersCurrWord: prevState.lettersCurrWord.slice(0)
      };
    });
  }

  handleLetterPress(letter) {
    const flippedLetters = this.getFlippedLetters();
    if (!flippedLetters.includes(letter) || this.state.userEndGame) {
      return;
    }

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

  // helpers

  getFlippedLetters() {
    const { letters, flippedIndex } = this.state;
    return letters.slice(0, flippedIndex);
  }
}

export default App;
