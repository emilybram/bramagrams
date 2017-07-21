var app = require('express')();
var io = require('socket.io')();

const PORT = 7912;

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

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log("Player " + socket.id + " has connected.");
    
    socket.emit('playerId', socket.id);
    socket.emit('gameTiles', gameTiles);

    socket.on('word', function({word: word, tilesFlipped: tilesFlipped}){
        console.log("Player " + socket.id + " submitted " + word);
        socket.broadcast.emit('word', word);
    });

    socket.on('tileFlip', function(tile){
        console.log("Player " + socket.id + " flipped " + tile.letter);
        socket.broadcast.emit('tileFlip');
    });

    socket.on('disconnect', function () {
        console.log("Player " + socket.id + " has disconnected.");
    });
});


io.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
