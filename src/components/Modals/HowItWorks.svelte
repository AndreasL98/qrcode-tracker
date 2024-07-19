<script>
	// let showModal = false;

	import { PUBLIC_URL } from '$env/static/public';

	export let showModal = false;

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			// showModal = false;
			closeModal();
		}
	}

	function closeModal() {
		showModal = false;
		// Emit an event to inform parent component on close
		dispatch('close');
	}

	let url = '';
	let qrcodeURL = '';
	let projectName = '';
	let projectDescription = '';

	function createQRCode() {
		qrcodeURL = `${PUBLIC_URL}/view-qr?url="${url}"`;
		console.log('qr: ', qrcodeURL);
	}

	async function createProject() {
		const response = await fetch('/dashboard/create-project', {
			method: 'POST',
			body: JSON.stringify({
				name: projectName,
				url: url,
				description: projectDescription
			})
		});

		if (response.status == 200) {
			const responseData = await response.json();
			document.location.href = `${PUBLIC_URL}/dashboard/${responseData._id}`;
		}
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<!-- <button
	on:click={() => (showModal = true)}
	class="btn bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
>
	Basic Modal
</button> -->

{#if showModal}
	<div
		class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
		role="dialog"
		on:keydown.window={handleKeydown}
	>
		<div
			class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"
			on:click={closeModal}
		/>

		<div
			class=" w-1/3 relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5"
		>
			<!-- SVG and other content here -->
			<h1 class="text-2xl">How it Works</h1>

			<div class="flex w-full text-left mt-4 mb-2">
				<p class="text-md">
					You can create QR codes for your data here. Like a URL so people (or animals??) can scan
					and be taken to your website.
				</p>
			</div>

			<div class="flex w-full flex-col text-left mt-4 mb-2">
				<h2 class="text-xl">But, you can also...</h2>
				<p class="text-md mt-2"><i>Track your QR code scans.</i></p>
				<p class="text-md mt-3">
					If you login and create a new project with your destination URL, a short link and
					associated QR code is created that allows you to track each scan.
				</p>
				<p class="text-md mt-3">
					The "Tracker QR code" will have a link that looks something like <i>trac.ovh/xxxxxx</i> and
					will immediately redirect the user to your website while also providing insight on how many
					and at what times its been scanned.
				</p>
			</div>

			<div class="mt-5">
				<!-- Your content here -->

				<a
					href="/login"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>Nice, log me in!</a
				>

				<button
					on:click={closeModal}
					type="button"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>Cool (close)</button
				>
			</div>
		</div>
	</div>
{/if}
