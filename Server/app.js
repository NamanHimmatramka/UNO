const express = require('express')
const passport = require('passport')
const app = express()
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT

require('./config/database')
//require('./config/passport')(passport)

require('./config/passport')(passport)
// app.use(cors)
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', require('./routes/user'))
app.get('/', (req,res)=>{
    console.log("GET")
    res.json({success: true})
})
app.listen(port, ()=>{
    console.log('Server listening on port '+port)
})