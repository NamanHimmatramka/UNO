const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type: String, 
        required: true
    },
    password:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    noOfGames:{
        type: Number,
        default: 0
    },
    wins:{
        type: Number,
        default: 0
    },
    displayPicture:{
        type:String
    }
})

module.exports = mongoose.model('User', userSchema);