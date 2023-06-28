const mongoose = require('mongoose');

const employeeData = new mongoose.Schema(
	{
		emp_num:  { type: String, required: true, unique: true},
        name: { type: String, required: true },
		surname: { type: String, required: true },
		email: { type: String, required: true,},
		password: { type: String, required: true },
		bio: { type: String },
        pic: { type: String },
        birthday:{ type: String, required: true },
        position: { type: String, required: true },
        phone:{ type: String, required: true }
	},
	{ collection: 'employees' }
)

const model = mongoose.model('Employee', employeeData)

module.exports = model