"use strict";

class Game {
  constructor() {
    this.letters = this._getShuffledLetters();
    this.players = [];
  }

  // public functions

  addPlayer(player) {
    this.players.push(player);
  }

  getPlayers() {
    return this.players;
  }

  getLetters() {
    return this.letters;
  }

  // helpers

  _shuffle(arr) {
    let i = 0,
      j = 0,
      temp = null;

    for (i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  _getShuffledLetters() {
    let letters = [];
    const letterFreqs = this._getLetterFreqs();
    for (let letter in letterFreqs) {
      for (let i = 0; i < letterFreqs[letter]; i++) {
        letters.push(letter);
      }
    }
    this._shuffle(letters);
    return letters;
  }

  _getLetterFreqs() {
    return {
      A: 13,
      B: 3,
      C: 3,
      D: 6,
      E: 18,
      F: 3,
      G: 4,
      H: 3,
      I: 12,
      J: 2,
      K: 2,
      L: 5,
      M: 3,
      N: 8,
      O: 11,
      P: 3,
      Q: 2,
      R: 9,
      S: 6,
      T: 9,
      U: 6,
      V: 3,
      W: 3,
      X: 2,
      Y: 3,
      Z: 2
    };
  }
}

module.exports = Game;
