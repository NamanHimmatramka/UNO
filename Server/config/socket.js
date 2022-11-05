const Game = require("../models/game");
const JWT = require("jsonwebtoken");
const startGame = require('../gameplay').startGame

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("create-game", (jwt) => {
      const decodedJwt = JWT.decode(jwt);
      const userId = decodedJwt.sub;
      const newGame = new Game({
        userId1: userId,
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
          try {
            game.save().then((game) => {
              console.log(gameId)
              socket.join(gameId);
              socket.emit("join-successful",gameId)
              startGame(io, gameId, game.userId1, game.userId2)
            });
          } catch (err) {
            socket.emit("error", {msg:err})
          }
        }
      });
    });
  });
};
