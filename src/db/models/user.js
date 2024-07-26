import mongoose from 'mongoose';
// const passportLocalMongoose = require('passport-local-mongoose');
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true
	},
	phoneNumber: String,
	maxProjects: {
		type: Number,
		default: 5
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

// User acccess ??

const demo = {
	access: ['Boookings', 'Room', 'Packages', 'Econ'],
	edit: ['Bookings', 'Room', 'Packages', 'Econ']
};
