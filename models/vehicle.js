// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const vehicleSchema = new Schema(
	{
		Brand: { type: String, required: true },
		Model: { type: String, required: true },
        Color: { type: Number, required: true },
		favorite: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Vehicle = model('Vehicle', vehicleSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = vehicle
