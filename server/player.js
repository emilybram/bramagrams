"use strict";

class Player {
  constructor({ ID }) {
    this.ID = ID;
  }

  // public functions

  getID(player) {
    return this.ID;
  }
}

module.exports = Player;
