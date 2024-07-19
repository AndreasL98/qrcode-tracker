<script>
	import HowItWorks from '../../components/Modals/HowItWorks.svelte';
	let showHowItWorksModal = false;
	function closeHowItWorksModal() {
		showHowItWorksModal = false;
	}
	function openHowItWorksModal() {
		showHowItWorksModal = true;
	}
</script>

<HowItWorks showModal={showHowItWorksModal} on:close={closeHowItWorksModal} />

<div
	class="w-full flex justify-between items-center bg-gray-100 shadow border-b-2 border-slate-400 p-5 h-16"
>
	<div class="w-1/4">
		<p class="text-lg"><b>Trac.ovh</b></p>
		<p class="text-sm">simple QR code tracker</p>
	</div>
	<div class="w-1/4 text-center">
		<button on:click={openHowItWorksModal}>How does it work?</button>
	</div>
	<div class="w-1/4 text-right">
		<a href="/login">Login</a>
	</div>
</div>
