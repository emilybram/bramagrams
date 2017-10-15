import io from 'socket.io-client';
import Utils from './utils';

class Socket {

    static setup(app) { 
        const socket = io('/game');

        socket.on('playerId', function(playerId){
            app.playerId = playerId;
        });

        socket.on('secondPlayerJoin', function({socketId: socketId}){
            app.setState({
                waitingForOpponent: false
            });
            app.socket.emit('sendLetters', {
                socketId: socketId,
                lettersFlipped: app.state.lettersFlipped,
                lettersUnflipped: app.state.lettersUnflipped
            });
        });

        socket.on('receiveLetters', function({lettersFlipped: lettersFlipped, lettersUnflipped: lettersUnflipped}){
            app.setState({
                lettersFlipped: lettersFlipped,
                lettersUnflipped: lettersUnflipped,
                waitingForOpponent: false
            });
        });

        socket.on('firstPlayer', function(){
            app.setState({
                lettersUnflipped: Utils.getShuffledLetters(),
                lettersFlipped: []
            });
        });

        socket.on('word', function(newGameState) {
            var newWords = app.state.opponentWords.slice();
            newWords.push(newGameState.word);

            app.setState({
                opponentWords: newWords,
                lettersFlipped: newGameState.lettersFlipped,
                lettersUnflipped: newGameState.lettersUnflipped
            });
        });

        socket.on('letterFlip', function() {
            app.flipLetter();
        });

        return socket;
    }
}

export default Socket;