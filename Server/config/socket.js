const Game = require('../models/game')
const JWT = require('jsonwebtoken')

module.exports = (io)=>{
    io.on('connection', (socket)=>{
        console.log('socket connected')

        socket.on('create-game', (jwt)=>{
            const decodedJwt = JWT.decode(jwt)
            const userId = decodedJwt.sub
            const newGame = new Game({
                userId1: userId
            })
            try{
                newGame.save()
                .then((game)=>{
                    socket.emit('gameId', game._id);
                    socket.join(game._id)
                })
            }
            catch(err){
                console.log(err)
            }
        })

        socket.on('join-game', (gameId, jwt)=>{
            const decodedJwt = JWT.decode(jwt)
            const userId = decodedJwt.sub
            Game.findById(gameId)
            .then((game)=>{
                if(!game){
                    
                }
                else if(game.userId2!=null){

                }
                else{
                    game.userId2=userId
                    try{
                        game.save()
                        .then((game)=>{
                            socket.join(game._id)
                            socket.to(game._id).emit("game-start", {user1: game.userId1, user2: game.userId2})
                        })
                    }
                    catch(err){
                        console.log(err)
                    }
                }
            })
        })
    })
}