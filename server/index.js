'use strict';

const app = require('./app');
var http = require('http').Server(app);

const PORT = process.env.PORT || 9000;

var games = {};

var server = app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log("socket connected");
    socket.on('gameRoom', function({gameRoom: gameId}){
        console.log("Player " + socket.id + " joining game " + gameId);
        socket.gameRoom = gameId
        socket.join(gameId);
        socket.emit('playerId', socket.id);
        if (!games[gameId]) {
            games[gameId] = [socket.id];
            socket.emit('firstPlayer');
        } else {
            games[gameId].push(socket.id);
            socket.to(games[gameId][0]).emit('secondPlayerJoin', {socketId: socket.id});
        }
    });

    socket.on('sendTiles', function({socketId: socketId,
        tilesFlipped: tilesFlipped,
        tilesUnflipped: tilesUnflipped}){
        console.log("Sending player " + socketId + " tiles");
        socket.to(socketId).emit('receiveTiles', {
            tilesFlipped: tilesFlipped,
            tilesUnflipped: tilesUnflipped
        });
    });

    socket.on('word', function({word: word, tilesFlipped: tilesFlipped, tilesUnflipped: tilesUnflipped}){
        console.log("Player " + socket.id + " submitted " + word);
        socket.to(socket.gameRoom).emit('word', {word: word, 
            tilesFlipped: tilesFlipped,
            tilesUnflipped: tilesUnflipped});
    });

    socket.on('tileFlip', function(){
        console.log("Player " + socket.id + " flipped tile");
        socket.broadcast.to(socket.gameRoom).emit('tileFlip');
    });

    socket.on('disconnect', function () {
        console.log("Player " + socket.id + " has disconnected.");
    });
});