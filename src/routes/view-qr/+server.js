// import { Readable } from 'node:stream';
import { toFileStream } from 'qrcode';
import { PassThrough } from 'stream';

export async function GET({ url, request, params, cookies }) {
	try {
		let passedURL = url.searchParams.get('url');
		console.log('passed: ', passedURL);

		if (!passedURL) passedURL = 'http://localhost:3000';

		const text = 'https://qualitymalt.se';
		const filename = 'qrcode.png';

		const passThrough = new PassThrough();

		// Generate the QR code and pipe it to the PassThrough stream
		const img = toFileStream(passThrough, passedURL, {
			type: 'png',
			width: 512
		});

		// ##### FOR DOWNLOAD
		// return new Response(passThrough, {
		// 	headers: {
		// 		'content-type': 'image/png',
		// 		'Content-Disposition': 'attachment; filename=test-img.png'
		// 	}
		// });
		// ##### FOR DOWNLOAD

		// ##### FOR VIEW
		return new Response(passThrough, {
			headers: {
				'content-type': 'image/png'
			}
		});
		// ##### FOR VIEW
	} catch (error) {
		console.error('Error fetching file from S3:', error);
		return {
			status: 500,
			body: 'Error fetching file from S3'
		};
	}
}
