<!-- <script>
	async function fetchData() {
		// const response = await fetch('/download');
		// const data = await response.json();
		// console.log(data);
		window.location.href = 'http://localhost:5173/download';
	}
</script>

<h1>hello!</h1>
<button on:click={fetchData}> Click me </button> -->

<script>
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	import Header from '../components/Header/Header.svelte';

	import { PUBLIC_URL } from '$env/static/public';

	let url = '';
	let qrCodeData = '';
	let toggle = false;
	let canvas;

	onMount(() => {
		// generateQRCode();
	});

	const generateQRCode = async () => {
		try {
			qrCodeData = await QRCode.toDataURL(url || `${PUBLIC_URL}`);
			const context = canvas.getContext('2d');
			const img = new Image();
			img.src = qrCodeData;
			img.onload = () => {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(img, 0, 0);
			};
		} catch (err) {
			console.error(err);
		}
	};

	const downloadQRCode = () => {
		const link = document.createElement('a');
		link.href = qrCodeData;
		link.download = 'qrcode.png';
		link.click();
	};

	// $: if (url) {
	// 	generateQRCode();
	// }

	let qrcodeURL = `${PUBLIC_URL}/trach-ovh-logo-square.png`;
	let generatedQRCode = false;

	function createQRCode() {
		generatedQRCode = true;
		qrcodeURL = `${PUBLIC_URL}/view-qr?url="${url}"`;
		console.log('qr: ', qrcodeURL);
	}
</script>

<main class="min-h-screen bg-gray-100">
	<Header />
	<div class=" mt-20 flex flex-col items-center justify-center p-4 pt-0 bg-gray-100 pb-12">
		<h1 class="mb-4 text-2xl font-bold text-center">QR Code Generator & Tracker</h1>
		<div class="flex w-full justify-center">
			<input
				type="text"
				placeholder="Enter URL"
				bind:value={url}
				class="w-full max-w-md p-2 mb-4 border rounded shadow-sm focus:ring focus:outline-none"
			/>
			<button
				on:click={createQRCode}
				class="px-6 h-10 ml-3 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
				type="button"
			>
				Create
			</button>
		</div>
		<div class="mb-4 border h-72 w-72">
			<!-- <canvas bind:this={canvas} width="200" height="200" class="border"></canvas> -->
			<img class=" h-72" src={qrcodeURL} alt="" />
		</div>
		<button
			on:click={downloadQRCode}
			class="px-4 py-2 mb-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
			disabled={generatedQRCode ? false : true}
		>
			Download QR Code
		</button>

		<!-- <div class="flex items-center">
			<span class="mr-2">Enable Analytics: </span>

			<label class="inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" class="sr-only peer" />
				<div
					class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
				></div>
				<span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
			</label>
		</div> -->
	</div>
</main>

<style>
	.translate-x-6 {
		transform: translateX(1.5rem);
	}
</style>
