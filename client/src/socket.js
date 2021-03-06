import io from "socket.io-client";
import Utils from "./utils";
import Events from "./events";

class Socket {
  static setup(app) {
    const socket = io("/game");

    socket.on(Events.CONNECTED, function(playerId) {
      app.playerId = playerId;
    });

    socket.on(Events.START_GAME, function({ socketId }) {
      app.setState({
        waitingForOpponent: false
      });
      app.socket.emit("sendLetters", {
        socketId,
        lettersFlipped: app.state.lettersFlipped,
        lettersUnflipped: app.state.lettersUnflipped
      });
    });

    socket.on("receiveLetters", function({ lettersFlipped, lettersUnflipped }) {
      app.setState({
        lettersFlipped,
        lettersUnflipped,
        waitingForOpponent: false
      });
    });

    socket.on("firstPlayer", function() {
      app.setState({
        yourTurn: true
      });
    });

    socket.on("word", function(word) {
      let lettersCurrWord = app.state.lettersCurrWord.slice();
      let lettersFlipped = app.state.lettersFlipped.slice();
      let letter;

      for (let i = 0; i < word.length; i++) {
        letter = word.charAt(i);
        let idx = lettersFlipped.indexOf(letter);
        if (idx > -1) {
          lettersFlipped.splice(idx, 1);
        } else {
          lettersFlipped = [...lettersFlipped, ...lettersCurrWord];
          lettersCurrWord = [];
          idx = lettersFlipped.indexOf(letter);
          lettersFlipped.splice(idx, 1);
        }
      }

      app.setState({
        opponentWords: [...app.state.opponentWords, word],
        lettersFlipped,
        lettersCurrWord
      });
    });

    socket.on("letterFlip", function() {
      app.flipLetter();
      app.setState({
        yourTurn: true
      });
    });

    socket.on("endGame", function() {
      app.onOpponentEndGame();
    });

    return socket;
  }
}

export default Socket;
