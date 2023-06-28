const mongoose = require('mongoose');

const User = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
		email: { type: String, required: true,},
		password: { type: String, required: true },
		bio: { type: String },
        pic: { type: String },
        birthday:{ type: String, required: true },
        position: { type: String, required: true },
        phone:{ type: String, required: true }
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model