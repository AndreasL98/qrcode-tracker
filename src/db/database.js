import mongoose from 'mongoose';

import { DB_URL } from '$env/static/private';

/**
 * @type {any}
 */
let dbConnection;
export function connectToDatabase() {
	// if (!dbConnection) {
	dbConnection = mongoose
		.connect(DB_URL, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true
		})
		.then(() => {
			console.log('Successfully connected to the database');
			return mongoose.connection;
		})
		.catch((err) => {
			console.error('Error connecting to the database', err);
			throw err;
		});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error'));
	// } else {
	// 	console.log('DB CONNECTION ALREADY ESTABLISHED');
	// }

	return dbConnection;
}

// ######### NOT IN FUNCTION

// mongoose.connect(DB_URL, {
// 	// useNewUrlParser: true,
// 	// useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', () => {
// 	console.log('MongoDB Database connection established');
// });

// export default db;

// ######### NOT IN FUNCTION

// export function startMongo() {
// 	console.log('Starting mongo');
// 	// mongoose.connect(DB_URL, {
// 	// 	useNewUrlParser: true,
// 	// 	useUnifiedTopology: true
// 	// });

// 	// return mongoose.connection;
// 	return mongoose.connect(DB_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	});
// }

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.on("open", () => {
//   console.log("MongoDB Databse connection");
// });
