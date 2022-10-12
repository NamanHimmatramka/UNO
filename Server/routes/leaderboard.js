const router = require('express').Router()
const User = require('../models/user')

router.get('/', (req,res)=>{
    const sortedUsers = User.find({}, null, {sort:{wins:-1}}, (err,users)=>{
        users.forEach((user)=>{
            console.log(user)
        })
        res.send(users)
    })
})

module.exports=router