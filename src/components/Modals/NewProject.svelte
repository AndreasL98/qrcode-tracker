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
		// Optional: Emit an event to inform parent component
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
		} else {
			let errorCode = response.status;

			console.log('res: ', response);
			const responseData = await response.json();
			console.log('body: ', responseData);
			let errorMessage = responseData.message;

			error = `${errorCode} - ${errorMessage}`;
		}
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let error = '';
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
			<h1>Create a New Project</h1>

			<div class="flex w-full justify-center mt-4 mb-2">
				<input
					type="text"
					placeholder="Project Name"
					bind:value={projectName}
					class="w-full max-w-md p-2 mb-4 border rounded shadow-sm focus:ring focus:outline-none"
				/>
			</div>

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
					Generate QR
				</button>
			</div>

			<div class="mb-4 border w-full flex justify-center">
				<!-- <canvas bind:this={canvas} width="200" height="200" class="border"></canvas> -->
				<img class=" h-64" src={qrcodeURL} alt="" />
			</div>

			<div class="mt-3">
				<textarea
					rows="2"
					placeholder="Description"
					class="w-full max-w-md p-2 mb-4 border rounded shadow-sm focus:ring focus:outline-non"
					name=""
					id=""
					bind:value={projectDescription}
				></textarea>
			</div>

			{#if error}
				<p class="mt-2 text-red-600 text-lg"><b>Error: {error}</b></p>
			{/if}

			<div class="mt-4">
				<!-- Your content here -->

				<button
					on:click={createProject}
					type="button"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>Create Project</button
				>

				<button
					on:click={closeModal}
					type="button"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
					>Close</button
				>
			</div>
		</div>
	</div>
{/if}
