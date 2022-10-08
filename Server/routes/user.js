const router = require('express').Router();
const User = require('../models/user')
const passport = require('passport')
const Utils = require('../lib/utils');

router.get('/protected', passport.authenticate('jwt', {session: false}), (req,res)=>{
    res.json({success: true, msg: "You are a verified user"})
})

router.post('/login', (req,res)=>{
    User.findOne({userName: req.body.userName})
    .then((user)=>{
        if(!user){
            res.json({success: false, msg: "User Not Registered"})
        }
        else{
            const hash = user.password
            Utils.validPassword(hash, req.body.password)
            .then((isValid)=>{
                if(isValid){
                    const newToken = Utils.issueJWT(user)
                    res.json({success: true, token: newToken.token, expiresIn: newToken.expires})
                }
                else{
                    res.json({success: false, msg: "Incorrect Password"})
                }
            })
        }
    })
})

router.post('/register', (req, res, next)=>{
    console.log(req.body.inputs)
    User.findOne({userName: req.body.inputs.email.value})
    .then((user)=>{
        if(user){
            res.json({success: false, msg: "User already registered"})
        }
        else{
            Utils.createSalt()
            .then((salt)=>{
                Utils.createPassword(req.body.inputs.password.value, salt)
                .then((hashedPassword)=>{
                    const newUser = new User({
                        name: req.body.inputs.name.value,
                        userName: req.body.inputs.email.value,
                        password: hashedPassword,
                    })
                    try{
                        newUser.save()
                        .then((user)=>{
                            res.json({success:true, msg: "user Saved"})
                        })
                    }
                    catch(err){
                        res.json({success: false, msg: err})
                    }
                })
            })
        }
    })
})

module.exports = router