'use strict';

const Events = require('../client/src/events');

const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 9000;

server.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

const games = {};

io.of('/game').on('connection', function(socket){
    console.log("socket connected");
    
    socket.on('gameRoom', function({gameRoom: gameId}){
        console.log("Player " + socket.id + " joining game " + gameId);
        socket.gameRoom = gameId
        socket.join(gameId);
        socket.emit(Events.CONNECTED, socket.id);
        if (!games[gameId]) {
            games[gameId] = [socket.id];
            socket.emit('firstPlayer');
        } else {
            games[gameId].push(socket.id);
            socket.to(games[gameId][0]).emit(Events.JOINED_GAME, {socketId: socket.id});
        }
    });

    socket.on('sendLetters', function({socketId,
        lettersFlipped,
        lettersUnflipped}){
        console.log("Sending player " + socketId + " letters");
        socket.to(socketId).emit('receiveLetters', {
            lettersFlipped,
            lettersUnflipped
        });
    });

    socket.on('word', function(word){
        console.log("Player " + socket.id + " submitted " + word);
        socket.to(socket.gameRoom).emit('word', word);
    });

    socket.on('letterFlip', function(){
        console.log("Player " + socket.id + " flipped letter");
        socket.broadcast.to(socket.gameRoom).emit('letterFlip');
    });

    socket.on('endGame', function(){
        console.log("Player " + socket.id + " ended game");
        socket.broadcast.to(socket.gameRoom).emit('endGame');
    });

    socket.on('disconnect', function () {
        console.log("Player " + socket.id + " has disconnected.");
    });
});