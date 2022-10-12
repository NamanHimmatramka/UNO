const User = require('../models/user')
const router = require('express').Router()
const upload = require('../config/multer')
const path = require('path')

router.post('/dp/:email', upload.single('testImage'), async(req,res)=>{
    const email = req.params.email
    User.findOne({userName: email})
    .then((user)=>{
        if(!user){
            res.json({success:false, msg:'User Not Found'})
        }
        user.displayPicture = "/profile_pictures/"+req.file.filename
        try{
            user.save()
            .then((user)=>{
                res.json({success:true, msg: "Profile picture changed"})
            })
        }
        catch(err){
            res.json({success: false, msg: err})
        }
    })
})
router.get('/user/:email', (req,res)=>{
    const email = req.params.email
    User.findOne({userName: email})
    .then((user)=>{
        if(!user){
            res.json({success:false, msg:'User Not Found'})
        }
        res.json({success: true, user: user})
    })
})
module.exports = router