const mongoose = require('../utils/connection')



// import what I need
const { Schema, model } = mongoose

//destructer the Schema and model functions from mongoose
//const {Schema, model } = mongoose

// create the schema
const userSchema = new Schema(
	{
		username: { 
			type: String, 
			required: true, 
			unique: true 
		},
		password: { 
			type: String, 
			required: true 
		}
	
	})

// creat the model
const User = model('User', userSchema)

// export the model
module.exports = User
