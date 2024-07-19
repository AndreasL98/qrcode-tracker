import User from '$db/models/user';
import Project from '$db/models/project';

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JSON_SECRET_KEY } from '$env/static/private';

export async function load({ url, cookies, params, request }) {
	const user = await getUser(request, cookies);

	const projects = await Project.find({ users: user._id });

	return {
		projects: JSON.parse(JSON.stringify(projects))
	};
}

async function getUser(request, cookies) {
	const jsonSecretKey = JSON_SECRET_KEY;

	const extractJwtFromCookie = (cookies) => {
		let token = null;
		token = cookies.get('jwt');

		return token;
	};

	const jwtOptions = {
		jwtFromRequest: ExtractJwt.fromExtractors([
			ExtractJwt.fromAuthHeaderAsBearerToken(),
			extractJwtFromCookie // Extract JWT from the cookie named 'jwt'
		]),
		secretOrKey: jsonSecretKey
	};

	request.cookies = cookies;

	const user = await authenticatePassport(request, cookies);

	return user;
}

function authenticatePassport(request, cookies) {
	return new Promise((resolve, reject) => {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (err) {
				return reject(err);
			}
			if (!user) {
				return reject(new Error('No user'));
			}
			resolve(user);
		})(request, cookies);
	});
}
