const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const app = express()
const router = require('./routes')

const DB = process.env.MONGODB_URL

mongoose
  .connect(DB)
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log('error', error))

app.use('/styles', express.static('styles'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// ROUTE
app.use('/', router)

const PORT = process.env.port || 5000

app.listen(PORT, () => console.log(`listening to port ${PORT}`))
