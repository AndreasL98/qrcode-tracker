// import { Readable } from 'node:stream';
import { toFileStream } from 'qrcode';
import { PassThrough } from 'stream';

import Project from '$db/models/project';
import Visit from '$db/models/visit';
import { redirect, error } from '@sveltejs/kit';

import { PUBLIC_URL } from '$env/static/public';

export async function GET({ url, request, params, cookies }) {
	try {
		const { identification } = params;
		const project = await Project.findOne({
			identification
		});

		if (project) {
			logVisitor(project);
			redirect(302, project.url);
		} else {
			error(404, 'Could not find page');
		}
	} catch (error) {
		console.error('Error:', error);

		if (error.status == 302) {
			throw redirect(302, error.location);
		} else if (error.status == 404) {
			error(404, 'Could not find page');
		}

		return {
			status: 500,
			body: 'Error fetching file from S3'
		};
	}
}

async function logVisitor(project) {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;

	const hourDate = date.getHours();
	const hour = `${hourDate}`;
	// SET TO SERVER (local) CLOCK AND DATE
	// FOR REAL PURPOSES WOULD BE BETTER TO SET USER DETERMINED TIMEZONE

	const visit = await Visit.findOne({
		project: project._id,
		year,
		month
	});

	if (visit) {
		visit.visits += 1;
		if (visit.times[hour]) visit.times[hour] += 1;
		else visit.times[hour] = 1;

		visit.markModified('times');
		visit.markModified('visits');

		await visit.save();
	} else {
		const newVisit = new Visit({
			year,
			month,
			project: project._id,
			times: {},
			visits: 1
		});

		newVisit.times[hour] = 1;
		await newVisit.save();
	}
}
