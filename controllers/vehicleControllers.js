/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Vehicle = require('../models/vehicle')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

// INDEX route 
// Read -> finds and displays all vehicles
router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // find all the vehicles
    Vehicle.find({})
        // there's a built in function that runs before the rest of the promise chain
        // this function is called populate, and it's able to retrieve info from other documents in other collections
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        // send json if successful
        .then(vehicles => { 
            // res.json({ vehicles: vehicles })
            // now that we have liquid installed, we're going to use render as a response for our controllers
            res.render('vehicles/index', { vehicles, username, loggedIn, userId })
        })
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET for the new page
// shows a form where a user can create a new vehicle
router.get('/new', (req, res) => {
    res.render('vehicles/new', { ...req.session })
})

// CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    // console.log('this is req.body before owner: \n', req.body)
    // here, we'll have something called a request body
    // inside this function, that will be called req.body
    // we want to pass our req.body to the create method
    // we want to add an owner field to our vehicle
    // luckily for us, we saved the user's id on the session object, so it's really easy for us to access that data
    req.body.owner = req.session.userId

    // we need to do a little js magic, to get our checkbox turned into a boolean
    // here we use a ternary operator to change the on value to send as true
    // otherwise, make that field false
    req.body.favorite = req.body.favorite === 'on' ? true : false
    const newVehicle = req.body
    console.log('this is req.body aka newVehicle, after owner\n', newVehicle)
    Vehicle.create(newVehicle)
        // send a 201 status, along with the json response of the new vehicle
        .then(vehicle => {
            // in the API server version of our code we sent json and a success msg
            // res.status(201).json({ vehicle: vehicle.toObject() })
            // we could redirect to the 'mine' page
            // res.status(201).redirect('/vehicles/mine')
            // we could also redirect to the new vehicle's show page
            res.redirect(`/vehicles/${vehicle.id}`)
        })
        // send an error if one occurs
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route
// Index -> This is a user specific index route
// this will only show the logged in user's vehicles
router.get('/mine', (req, res) => {
    // find vehicles by ownership, using the req.session info
    Vehicle.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(vehicles => {
            // if found, display the vehicles
            // res.status(200).json({ vehicles: vehicles })
            res.render('vehicles/index', { vehicles, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route for getting json for specific user vehicles
// Index -> This is a user specific index route
// this will only show the logged in user's vehicles
router.get('/json', (req, res) => {
    // find vehicles by ownership, using the req.session info
    Vehicle.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(vehicles => {
            // if found, display the vehicles
            res.status(200).json({ vehicles: vehicles })
            // res.render('vehicles/index', { vehicles, ...req.session })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            res.status(400).json(err)
        })
})

// GET request -> edit route
// shows the form for updating a vehicle
router.get('/edit/:id', (req, res) => {
    // because we're editing a specific vehicle, we want to be able to access the vehicle's initial values. so we can use that info on the page.
    const vehicleId = req.params.id
    Vehicle.findById(vehicleId)
        .then(vehicle => {
            res.render('vehicles/edit', { vehicle, ...req.session })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// PUT route
// Update -> updates a specific vehicle(only if the vehicle's owner is updating)
router.put('/:id', (req, res) => {
    const id = req.params.id
    req.body.favorite = req.body.favorite === 'on' ? true : false
    Vehicle.findById(id)
        .then(vehicle => {
            // if the owner of the vehicle is the person who is logged in
            if (vehicle.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // update and save the vehicle
                return vehicle.updateOne(req.body)
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20vehicle`)
            }
        })
        .then(() => {
            // console.log('the vehicle?', vehicle)
            res.redirect(`/vehicles/mine`)
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// DELETE route
// Delete -> delete a specific vehicle
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Vehicle.findById(id)
        .then(vehicle => {
            // if the owner of the vehicle is the person who is logged in
            if (vehicle.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // delete the vehicle
                return vehicle.deleteOne()
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20vehicle`)
            }
        })
        .then(() => {
            res.redirect('/vehicles/mine')
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Vehicle.findById(id)
        .populate('comments.author', 'username')
        // send the vehicle as json upon success
        .then(vehicle => {
            // res.json({ vehicle: vehicle })
            res.render('vehicles/show.liquid', {vehicle, ...req.session})
        })
        // catch any errors
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router