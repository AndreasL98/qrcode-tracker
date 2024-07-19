export const ssr = false;

import { json, text, fail } from '@sveltejs/kit';

import User from '$db/models/user.js';
import Project from '$db/models/project.js';
import passport from 'passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

import jwt from 'jsonwebtoken';

import { redirect, error } from '@sveltejs/kit';

import { JSON_SECRET_KEY } from '$env/static/private';

export async function load({ request, cookies }) {
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

	let user;
	try {
		user = await authenticatePassport(request, cookies);
		// User is authenticated, attach user to the request or perform other actions
	} catch (error) {
		console.log('ERROR IN FINDING USER: ', error);

		// If there's an error or no user, redirect to login
		if (error.message === 'No user') {
			throw redirect(307, '/login');
		} else {
			// Handle other errors, possibly throw a 500 error
			throw error(500, '/error');
		}
	}

	const sessionToken = cookies.get('session_token');

	const projects = await Project.find({ users: user._id });

	return {
		projects: JSON.parse(JSON.stringify(projects))
	};
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
