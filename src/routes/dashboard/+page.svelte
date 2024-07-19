<script>
	import { onMount } from 'svelte';

	import NewProject from '../../components/Modals/NewProject.svelte';

	export let data;
	const { projects } = data;

	onMount(() => {
		console.log('daya : ', data);
	});

	let showNewProjectModal = false;
	function closeNewProjectModal() {
		showNewProjectModal = false;
	}
	function openNewProjectModal() {
		showNewProjectModal = true;
	}
</script>

<NewProject showModal={showNewProjectModal} on:close={closeNewProjectModal} />

<div class="container mx-auto">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Card 1 -->

		{#each projects as project}
			<div class="bg-white shadow-lg rounded-lg p-6">
				<h2 class="text-xl font-bold mb-2">{project.name}</h2>
				<p class="text-gray-700 mb-4">
					{project.description ? project.description : 'No Project Description'}
				</p>
				<a
					href="/dashboard/{project._id}"
					class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">View</a
				>
			</div>
		{/each}
	</div>
</div>
