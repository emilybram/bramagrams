'use strict';

const app = require('./app');
var server = require('http').Server(app);

const PORT = process.env.PORT || 9000;

var letterFreqs = {
        'A': 13,
        'B': 3,
        'C': 3,
        'D': 6,
        'E': 18,
        'F': 3,
        'G': 4,
        'H': 3,
        'I': 12,
        'J': 2,
        'K': 2,
        'L': 5,
        'M': 3,
        'N': 8,
        'O': 11,
        'P': 3,
        'Q': 2,
        'R': 9,
        'S': 6,
        'T': 9,
        'U': 6,
        'V': 3,
        'W': 3,
        'X': 2,
        'Y': 3,
        'Z': 2
    };
    
    class Tile {
    constructor(letter, idx) {
        this.letter = letter;
        this.idx = idx;
    }
}

function shuffle(arr) {
    var i = 0, j = 0, temp = null;

    for (i = arr.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function getShuffledTiles() {
    var tiles = [];
    var count = 0;
        for (var letter in letterFreqs) {
        for (var i = 0; i < letterFreqs[letter]; i++) {
            tiles.push(new Tile(letter, count));
            count++;
        }
    }
    shuffle(tiles);
    return tiles;
}

var gameTiles = getShuffledTiles();

var server = app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){

    //console.log("Player " + socket.id + " has entered game "+ namespace + ".");
    //var nsp = io.of('/' + namespace);
    socket.emit('playerId', socket.id);
    socket.emit('gameTiles', gameTiles);

    socket.on('word', function({word: word, tilesFlipped: tilesFlipped}){
        console.log("Player " + socket.id + " submitted " + word);
        socket.broadcast.emit('word', {word: word, tilesFlipped: tilesFlipped});
    });

    socket.on('tileFlip', function(){
        console.log("Player " + socket.id + " flipped tile");
        socket.broadcast.emit('tileFlip');
    });

    socket.on('disconnect', function () {
        console.log("Player " + socket.id + " has disconnected.");
    });
});