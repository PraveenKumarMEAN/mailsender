const express = require('express')
const cors = require('cors')
const mailRouter = require('./router/mailSender')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({origin:'*'}))
app.use('/mail', mailRouter)

module.exports = app