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


// POST -> `/comments/<someVehicleId>`
// only loggedin users can post comments
// bc we have to refer to a vehicle, we'll do that in the simplest way via the route
router.post('/:vehicleId', (req, res) => {
    // first we get the vehicleId and save to a variable
    const vehicleId = req.params.vehicleId
    // then we'll protect this route against non-logged in users
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the comment
        // this is exactly like how we added the owner to our vehicles
        req.body.author = req.session.userId
        // saves the req.body to a variable for easy reference later
        const theComment = req.body
        // find a specific vehicle
        Vehicle.findById(vehicleId)
            .then(vehicle => {
                // create the comment(with a req.body)
                vehicle.comments.push(theComment)
                // save the vehicle
                return vehicle.save()
            })
            // respond with a 201 and the vehicle itself
            .then(vehicle => {
                // res.status(201).json({ vehicle: vehicle })
                res.redirect(`/vehicles/${vehicle.id}`)
            })
            // catch and handle any errors
            .catch(err => {
                console.log(err)
                // res.status(400).json(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        // res.sendStatus(401) //send a 401-unauthorized
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20vehicle`)
    }
})

// DELETE -> `/comments/delete/<someVehicleId>/<someCommentId>`
// make sure only the author of the comment can delete the comment
router.delete('/delete/:vehicleId/:commId', (req, res) => {
    // isolate the ids and save to variables so we don't have to keep typing req.params
    // const vehicleId = req.params.vehicleId
    // const commId = req.params.commId
    const { vehicleId, commId } = req.params
    // get the vehicle
    Vehicle.findById(vehicleId)
        .then(vehicle => {
            // get the comment, we'll use the built in subdoc method called .id()
            const theComment = vehicle.comments.id(commId)
            console.log('this is the comment to be deleted: \n', theComment)
            // then we want to make sure the user is loggedIn, and that they are the author of the comment
            if (req.session.loggedIn) {
                // if they are the author, allow them to delete
                if (theComment.author == req.session.userId) {
                    // we can use another built in method - remove()
                    theComment.remove()
                    vehicle.save()
                    // res.sendStatus(204) //send 204 no content
                    res.redirect(`/vehicles/${vehicle.id}`)
                } else {
                    // otherwise send a 401 - unauthorized status
                    // res.sendStatus(401)
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                // otherwise send a 401 - unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router

