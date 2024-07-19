import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
	identification: String,
	name: String,
	url: String,
	description: String,
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
