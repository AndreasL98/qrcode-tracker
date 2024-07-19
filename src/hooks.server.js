// src/hooks.server.js
import { connectToDatabase } from '$db/database';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '$db/models/user';
import Visit from '$db/models/visit';

import { JSON_SECRET_KEY } from '$env/static/private';

function timer(ms) {
	// Not used - move to seperate file
	return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log('RUNNING HOOK');
console.log('CONNECTING TO DB....');
connectToDatabase();

async function createUser() {
	const me = await new User({
		firstName: '',
		lastName: '',
		email: '', // email to login
		phone: '00',
		admin: true
	});

	await me.setPassword('');
	await me.save();
	console.log('NEW USER: ', me);
}
// createUser();

function runHook() {
	console.log('RUNNING INITIATION HOOK');

	initiatePassport(); // move out of function and delete runHook();
}
runHook();

async function seedDB() {
	const id = 'id';
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const year = 2024;
	// const visitors = Math.floor(Math.random() * 50);

	for (let month of months) {
		let visitors = Math.floor(Math.random() * 20);
		console.log('Visitors: ', visitors);
		for (let i = 0; i < visitors; i++) {
			let timeVisited = Math.floor(Math.random() * 23);
			console.log('time: ', timeVisited);

			const v = await Visit.findOne({
				month,
				year,
				project: id
			});

			if (!v) {
				const newVisit = new Visit({
					year,
					month,
					project: id,
					times: {},
					visits: 1
				});
				newVisit.times[timeVisited] = 1;
				await newVisit.save();
			} else {
				v.visits += 1;
				if (v.times[timeVisited]) {
					v.times[timeVisited] += 1;
				} else {
					v.times[timeVisited] = 1;
				}
				v.markModified('times');
				await v.save();
			}
		}

		console.log('SEEDED: ', month);
	}
}

function initiatePassport() {
	console.log('RUNNING INITIATE PASSPORT');
	passport.initialize();

	passport.session();

	// passport.use(new LocalStrategy(User.authenticate()));
	const jsonSecretKey = JSON_SECRET_KEY;

	const extractJwtFromCookie = (request) => {
		let token = null;
		try {
			token = request.cookies.get('jwt');
		} catch (err) {
			console.log('ERR PARSING TOKEN FROM REQUEST: ', token);
		}

		return token;
	};

	const jwtOptions = {
		jwtFromRequest: ExtractJwt.fromExtractors([
			ExtractJwt.fromAuthHeaderAsBearerToken(),
			extractJwtFromCookie // Extract JWT from the cookie named 'jwt'
		]),
		secretOrKey: jsonSecretKey
	};

	passport.use(
		new Strategy(jwtOptions, async (jwtPayload, done) => {
			console.log('RUNING PASSPORT JWT');
			try {
				const user = await User.findById(jwtPayload.id);
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (err) {
				done(err, false);
			}
		})
	);
}
