<script>
	import { tweened } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { PUBLIC_URL } from '$env/static/public';

	export let data;
	console.log('data layout: ', data);
	const { projects } = data;

	let itemsList;
	let itemsListExpanded = false;

	function changePage(url) {
		document.location.href = `${PUBLIC_URL}${url}`;
	}

	import NewProject from '../../components/Modals/NewProject.svelte';
	let showNewProjectModal = false;
	function closeNewProjectModal() {
		showNewProjectModal = false;
	}
	function openNewProjectModal() {
		showNewProjectModal = true;
	}
</script>

<NewProject showModal={showNewProjectModal} on:close={closeNewProjectModal} />

<body>
	<div class="flex h-screen bg-gray-100">
		<!-- Sidebar -->
		<div class="bg-blue-500 text-white w-56 space-y-6 py-7 px-2">
			<h1 class="text-2xl font-bold">Trac.ovh</h1>
			<nav>
				<a href="/dashboard" class="block py-2.5 px-4 rounded hover:bg-blue-700">Home</a>
				<!-- <a href="#" class="block py-2.5 px-4 rounded hover:bg-blue-700">About</a>
				<a href="#" class="block py-2.5 px-4 rounded hover:bg-blue-700">Services</a> -->
				<a
					href="#"
					on:click={openNewProjectModal}
					class="block py-2.5 px-4 rounded hover:bg-blue-700">Create a new project</a
				>

				<div class="block py-2.5 px-4 rounded hover:bg-blue-700">
					<div
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && (itemsListExpanded = !itemsListExpanded)}
						class="flex cursor-pointer items-center justify-between text-slate-700 dark:text-navy-100"
						on:click={() => (itemsListExpanded = !itemsListExpanded)}
					>
						<p class="text-white">Projects</p>
						<div
							class="text-sm font-normal leading-none text-slate-400 transition-transform duration-300 dark:text-navy-300 {itemsListExpanded
								? '-rotate-180'
								: ''}"
						>
							<!-- <i class="fas fa-chevron-down" /> -->
							<!-- fill="currentColor" -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="#FFFF"
								class="bi bi-chevron-down"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
								/>
							</svg>
						</div>
					</div>
					{#if itemsListExpanded}
						<div class="pb-2 mt-5" transition:slide>
							{#each projects as project}
								<a
									on:click={() => changePage(`/dashboard/${project._id}`)}
									class="block mb-2"
									href="/dashboard/{project._id}">{project.name}</a
								>
							{/each}
						</div>
					{/if}
				</div>
			</nav>
		</div>

		<!-- Main Content + Header -->
		<div class="flex-1 flex flex-col overflow-hidden">
			<!-- Header -->
			<header class="bg-white shadow py-4 px-4">
				<div class="flex justify-between">
					<h2 class="text-lg text-gray-800 font-semibold">Dashboard</h2>
					<button class="text-blue-500">Logout</button>
				</div>
			</header>

			<!-- Content -->
			<main class="flex-1 overflow-y-auto p-5">
				<slot />
			</main>
		</div>
	</div>
</body>
