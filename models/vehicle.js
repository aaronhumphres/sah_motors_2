
/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const commentSchema = require('./comment')


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const vehicleSchema = new Schema(
	{
		year: { type: Number, required: true },
		make: { type: String, required: true },
        model: { type: String, required: true },
		image: {type: String, required: false},
		book: {type: String, required: false},
		keyword: {Array},
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
// Export our Model            //
/////////////////////////////////
module.exports = Vehicle
