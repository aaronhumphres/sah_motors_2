const mongoose = require('../utils/connection')
const Vehicle = require('./vehicle')






/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
// first, we'll save our db connection to a variable
// const db = mongoose.connection

db.on('open', () => {
    // array of starter resources(vehicles)
    const startVehicles = [
        { year: '2021', make: 'Jeep', model: 'Wrangler Unlimited', favorite: true },
        { year: '2021', make: 'Chevrolet', model: 'Corvette', favorite: true }

    ]

    // then we delete every vehicle in the database(all instances of this resource)
    // this will delete any vehicle that are not owned by a user
    Vehicle.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter vehicle
            Vehicle.create(startVehicles)
                // tell our app what to do with success and failures
                .then(data => {
                    console.log('here are the created vehicle: \n', data)
                    // once it's done, we close the connection
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // always close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})