const socket = require("./config/socket");

const games = new Map();
const shuffledCards = require("./lib/utils").shuffledCards;
const startGame = (io, gameId, userId1, userId2) => {
  const newMapUser1 = new Map();
  const user1Cards = shuffledCards().splice(0, 7);
  for (i = 0; i < 7; i++) {
    if (newMapUser1.has(user1Cards[i])) {
      newMapUser1.set(user1Cards[i], newMapUser1.get(user1Cards[i]) + 1);
    } else {
      newMapUser1.set(user1Cards[i], 1);
    }
  }
  const newMapUser2 = new Map();
  const user2Cards = shuffledCards().splice(0, 7);
  for (i = 0; i < 7; i++) {
    if (newMapUser2.has(user2Cards[i])) {
      newMapUser2.set(user2Cards[i], newMapUser2.get(user2Cards[i]) + 1);
    } else {
      newMapUser2.set(user2Cards[i], 1);
    }
  }
  const middleCard = shuffledCards().splice(0, 1);
  const newGameObject = new Object();
  newGameObject["middle"] = middleCard[0];
  newGameObject[userId1] = Object.fromEntries(newMapUser1);
  newGameObject[userId2] = Object.fromEntries(newMapUser2);

  const noOfCards = new Object()
  noOfCards[userId1] = 7
  noOfCards[userId2] = 7

  newGameObject["noOfCards"] = noOfCards
  console.log(newGameObject);

  newGameObject["turn"] = userId1
  games.set(gameId, newGameObject);
  io.to(gameId).emit("game-start", {
    gameObject: newGameObject,
    gameId: gameId,
  });
};

const playCard = (io, gameId, cardPlayed, userId, nextTurn)=>{
  const gameObject = games.get(gameId)
  console.log(gameObject[userId])
  const userCards = new Map(Object.entries(gameObject[userId]))
  if(userCards.get(cardPlayed)-1 == 0){
    userCards.delete(cardPlayed)
  }
  else{
    userCards.set(cardPlayed, userCards.get(cardPlayed)-1)
  }
  gameObject[userId] = Object.fromEntries(userCards)
  gameObject["middle"]=cardPlayed;
  gameObject.noOfCards[nextTurn]-=1;
  if(cardPlayed.startsWith('skip') || cardPlayed.startsWith('_')){
    gameObject.turn = userId
  }
  else{
    gameObject.turn = nextTurn
  }
  games.set(gameId, gameObject)
  console.log(gameObject["middle"]);
  io.to(gameId).emit("update-state", {
    gameObject: gameObject,
  })
}

const drawCard = (io, gameId, userId1, userId2)=>{
  const gameObject = games.get(gameId)
  const userCards = new Map(Object.entries(gameObject[userId1]))
  const newCard = shuffledCards().splice(0, 1);
  if(userCards.has(newCard)){
    userCards.set(newCard, userCards.get(newCard) + 1);
  }else{
    userCards.set(newCard, 1);
  }
  gameObject[userId1] = Object.fromEntries(userCards)
  gameObject.noOfCards[userId2]+=1
  gameObject.turn = userId1
  games.set(gameId,gameObject)
  io.to(gameId).emit("update-state", {
    gameObject: gameObject,
  })
}

const pass = (io,gameId,userId1,userId2)=>{
  const gameObject = games.get(gameId)
  gameObject.turn = userId2
  games.set(gameId,gameObject)
  io.to(gameId).emit("update-state", {
    gameObject: gameObject,
  })
}

const sendMessage = (socket,gameId,message)=>{
  socket.broadcast.to(gameId).emit("receive-message", message)
}
module.exports.startGame = startGame;
module.exports.playCard = playCard;
module.exports.drawCard = drawCard;
module.exports.pass = pass;
module.exports.sendMessage = sendMessage;
