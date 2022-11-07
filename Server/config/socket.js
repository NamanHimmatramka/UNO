const Game = require("../models/game");
const JWT = require("jsonwebtoken");
const gameplay = require('../gameplay');
const game = require("../models/game");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("create-game", (jwt) => {
      const decodedJwt = JWT.decode(jwt);
      const userId = decodedJwt.sub;
      const newGame = new Game({
        userId1: userId,
        jwt1: jwt
      });
      try {
        newGame.save().then((game) => {
          socket.emit("gameId", game._id);
          console.log(game._id.toString())
          socket.join(game._id.toString());
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("join-game", (res) => {
      const jwt=res.jwt;
      const gameId=res.gameId;
      const decodedJwt = JWT.decode(jwt);
      const userId = decodedJwt.sub;
      Game.findById(gameId).then((game) => {
        if (!game) {
          socket.emit("error", {msg:"Incorrect Game ID"})
        } 
        else if (game.userId2 != null) {
          socket.emit("error", {msg:"Game Full"})
        } 
        else {
          game.userId2 = userId;
          game.jwt2 = jwt
          try {
            game.save().then((game) => {
              console.log(gameId)
              socket.join(gameId);
              // socket.emit("join-successful",gameId)
              gameplay.startGame(io, gameId, game.jwt1, game.jwt2)
            });
          } catch (err) {
            socket.emit("error", {msg:err})
          }
        }
      })
      .catch((err)=>{
        socket.emit("error", {msg:"Incorrect Game ID"})
      });
    });

    socket.on("card-played", (res)=>{
      const gameId = res.gameId
      const cardPlayed = res.cardPlayed
      const jwt = res.jwt
      console.log(res)
      Game.findById(gameId).then((game)=>{
        let nextTurn = null
        if(game.jwt1 == jwt){
          nextTurn = game.jwt2
        }
        else{
          nextTurn = game.jwt1
        }
        gameplay.playCard(io,gameId,cardPlayed, jwt, nextTurn)
      })
    })
  });
};
