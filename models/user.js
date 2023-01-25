// import what I need
const { Schema, model } = require('../utils/connection.js')

//destructer the Schema and model functions from mongoose
//const {Schema, model } = mongoose

// create the schema
const UserSchema = new Schema(
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
	},
	{ timestamps: true }
)

// creat the model
const User = model('User', UserSchema)

// export the model
module.exports = User
