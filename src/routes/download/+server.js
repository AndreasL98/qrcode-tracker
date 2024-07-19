// import { Readable } from 'node:stream';
import { toFileStream } from 'qrcode';
import { PassThrough } from 'stream';

import { PUBLIC_URL } from '$env/static/public';

export async function GET({ url, request, params, cookies }) {
	try {
		let passedURL = url.searchParams.get('url');

		if (!passedURL) passedURL = `${PUBLIC_URL}`;

		const passThrough = new PassThrough();

		// Generate the QR code and pipe it to the PassThrough stream
		const img = toFileStream(passThrough, passedURL, {
			type: 'png',
			width: 512
		});
		// ##### FOR DOWNLOAD
		return new Response(passThrough, {
			headers: {
				'content-type': 'image/png',
				'Content-Disposition': 'attachment; filename=qrcode.png'
			}
		});
		// ##### FOR DOWNLOAD

		// #### FOR VIEW
		// return new Response(passThrough, {
		// 	headers: {
		// 		'content-type': 'image/png'
		// 	}
		// });
		// #### FOR VIEW
	} catch (error) {
		console.error('Error fetching file from S3:', error);
		return {
			status: 500,
			body: 'Error fetching file from S3'
		};
	}
}
