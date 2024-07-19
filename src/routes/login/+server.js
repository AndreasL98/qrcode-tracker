// import { Readable } from 'node:stream';
import { toFileStream } from 'qrcode';
import { PassThrough } from 'stream';

import User from '$db/models/user';
import jwt from 'jsonwebtoken';

import { error, json, redirect } from '@sveltejs/kit';

export async function POST({ url, request, params, cookies }) {
	try {
		const data = await request.json();
		console.log('DATA: ', data);

		const { email, password } = data;

		try {
			const { user, token } = await authenticateUser(email, password);
			console.log('USER: ', user);

			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 60 * 60 * 24 * 30
			});

			return json({ status: 200, login: 'success' });
		} catch (err) {
			console.log('FAILED TO AUTH: ', err);

			// return fail(401, { message: 'Wrong Email or Password' });
			return error(401, 'Failed to Auth');
		}
	} catch (err) {
		if (err.status == 401) {
			return error(401, 'Failed to Authenticate');
		}
		console.log('Failed to logon - Unknown issue: ', err);
		return error(500, 'Failed to Authenticate');
	}
}

//@ts-ignore
function authenticateUser(email, password) {
	return new Promise((resolve, reject) => {
		//@ts-ignore
		User.authenticate()(email, password, (err, user, options) => {
			if (err) {
				console.log('ERROR:', err);
				reject(err); // Reject the promise with the error
			} else if (user) {
				const jsonSecretKey = 'poop';
				const token = jwt.sign({ id: user._id }, jsonSecretKey);

				resolve({ user, token }); // Resolve the promise with the user and token
			} else {
				console.log('NO USER FOUND');
				reject(new Error(options.message || 'Authentication failed')); // Reject with a custom error message
			}
		});
	});
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
