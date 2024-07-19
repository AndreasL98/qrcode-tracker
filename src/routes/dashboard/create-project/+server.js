import Project from '$db/models/project';

import { error, json, redirect } from '@sveltejs/kit';
import passport from 'passport';

import crypto from 'crypto';

export async function POST({ url, request, params, cookies }) {
	try {
		const data = await request.json();

		request.cookies = cookies;
		const user = await authenticatePassport(request, cookies);

		const identification = generateSixCharacterCode();

		const newProject = new Project({
			name: data.name,
			url: data.url,
			users: [user._id],
			admin: user._id,
			identification
		});
		await newProject.save();

		return json(newProject);
	} catch (err) {
		console.error('Could not create a new project:', err);

		return error(500, 'could not create a new project');
	}
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

function generateSixCharacterCode() {
	// Generate random bytes
	const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
	// Convert to base64 and extract 6 characters
	const base64String = randomBytes.toString('base64').replace(/[^a-zA-Z0-9]/g, '');

	// Ensure the result is exactly 6 characters long
	return base64String.slice(0, 6);
}
