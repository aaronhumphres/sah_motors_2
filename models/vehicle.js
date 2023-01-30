const mongoose = require('../utils/connection')
const commentSchema = require('./comment')

// import user model for populate
//const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const vehicleSchema = new Schema(
	{
		year: { type: Number, required: true },
		make: { type: String, required: true },
        model: { type: String, required: true },
		image: {type: String, required: false},
		favorite: { type: Boolean },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema]
	},
	
	{ timestamps: true }
)

const Vehicle = model('Vehicle', vehicleSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Vehicle
