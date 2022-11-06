const games = new Map()
const shuffledCards = require('./lib/utils').shuffledCards
const startGame = (io, gameId, userId1, userId2) => {
    const newMapUser1 = new Map()
    const user1Cards = shuffledCards().splice(0, 7)
    for (i = 0; i < 7; i++) {
        if (newMapUser1.has(user1Cards[i])) {
            newMapUser1.set(user1Cards[i], newMapUser1.get(user1Cards[i]) + 1)
        }
        else {
            newMapUser1.set(user1Cards[i], 1)
        }
    }
    const newMapUser2 = new Map()
    const user2Cards = shuffledCards().splice(0, 7)
    for (i = 0; i < 7; i++) {
        if (newMapUser2.has(user2Cards[i])) {
            newMapUser2.set(user2Cards[i], newMapUser2.get(user2Cards[i]) + 1)
        }
        else {
            newMapUser2.set(user2Cards[i], 1)
        }
    }
    const middleCard = shuffledCards().splice(0, 1)
    const newGameObject = new Object();
    newGameObject["middle"] = middleCard[0];
    newGameObject[userId1] = Object.fromEntries(newMapUser1)
    newGameObject[userId2] = Object.fromEntries(newMapUser2)
    console.log(newGameObject)
    games.set(gameId, newGameObject)
    io.to(gameId).emit("game-start", newGameObject)
}


module.exports.startGame = startGame