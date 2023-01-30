// // make our .env variables available via process.env
// require('dotenv').config()
// // import mongoose
// const mongoose = require('mongoose')

// const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }

// // connect to the database
// mongoose.connect(DATABASE_URL, CONFIG)

// // save the connection in a variable
// const db = mongoose.connection

// // create some notification
// db.on('open', () => console.log('You are connected to mongo'))
// db.on('close', () => console.log('You are disconnected from mongo'))
// db.on('error', (error) => console.log(error))

// // export the connection
// module.exports = mongoose


/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
require('dotenv').config() // Load my ENV file's variables
const mongoose = require('mongoose') // import the mongoose library

/////////////////////////////////////
//// Database Connection         ////
/////////////////////////////////////
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL
// here is our DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish our database connection
mongoose.connect(DATABASE_URL, CONFIG)

// Tell mongoose what to do with certain events
// what happens when we open, diconnect, or get an error
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

/////////////////////////////////////
//// Export our Connection       ////
/////////////////////////////////////
module.exports = mongoose