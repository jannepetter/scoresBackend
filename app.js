const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const scorerouter = require('./controllers/scorerouter')
const mUrl = config.dburl
mongoose.connect(mUrl, config.MONGOCONFIG)
app.use(cors())
app.use(express.json())
//http://localhost:3001/api/scores/
app.use('/api/scores', scorerouter)

module.exports = app