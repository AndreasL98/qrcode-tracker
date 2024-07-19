import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
	date: {
		type: Date
	},
	year: Number,
	month: Number,
	time: Number, // 24hr clock, like 2200hrs or 0800hrs

	times: Object,
	visits: Number,

	project: {
		// Trailers
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true
	}
});

const Visit = mongoose.models.Visit || mongoose.model('Visit', visitSchema);

export default Visit;
