<script>
	export let data;
	const { project, visits, visitsByTime } = data;

	import { chart } from 'svelte-apexcharts';
	import { PUBLIC_URL } from '$env/static/public';

	const visitsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (let month of visits) {
		visitsByMonth[month.month - 1] = month.visits;
	}

	let optionsLine = {
		chart: {
			type: 'line',
			height: 350
		},
		series: [
			{
				name: 'Visits By Month',
				data: visitsByMonth
			}
		],
		xaxis: {
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Okt',
				'Nov',
				'Dec'
			]
		}
	};

	const visitedHours = Object.keys(visitsByTime);
	const visitsByHoursArray = [];
	for (let hour of visitedHours) visitsByHoursArray.push(visitsByTime[hour]);

	let optionsVisitsByTime = {
		chart: {
			type: 'bar',
			height: 350
		},
		series: [
			{
				name: 'Visits By Hour',
				data: visitsByHoursArray
			}
		],
		xaxis: {
			categories: visitedHours
		}
	};

	const downloadQRCode = (url) => {
		const link = document.createElement('a');
		link.href = `${PUBLIC_URL}/download?url=${url}`;
		link.download = 'qrcode.png';
		link.click();
	};
</script>

<div class="p-5">
	<div class="flex justify-between mb-12">
		<h1 class="text-4xl">{project.name}</h1>
		<!-- <button
			type="button"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>Handle User Access</button
		> -->
	</div>
	<h2 class="text-lg mb-2">ID: {project._id}</h2>
	<h2 class="text-lg mb-12">Identification code: {project.identification}</h2>

	<div class="flex justify-between w-full">
		<div class="w-full">
			<p class="text-2xl">Destiantion URL:</p>
			<p class="text-xl">{project.url}</p>

			<p class="text-2xl mt-5">QR Code URL:</p>
			<p class="text-xl">{PUBLIC_URL}/{project.identification}</p>
		</div>
		<div class="flex flex-col items-center justify-center w-full">
			<p class="text-lg">Project URL QR code</p>
			<img class="mt-4 w-56 h-56" src="/view-qr?url={project.url}" alt="" />
			<button
				on:click={() => downloadQRCode(`${PUBLIC_URL}/${project.identification}`)}
				class="mt-4 w-56 px-4 py-2 mb-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Download QR Code
			</button>
		</div>
		<div class=" ml-24 flex flex-col items-center justify-center w-full">
			<p class="text-center text-lg">Tracker QR Code</p>
			<img class="mt-4 w-56 h-56" src="/view-qr?url={PUBLIC_URL}/{project.identification}" alt="" />
			<button
				on:click={() => downloadQRCode(`${PUBLIC_URL}/${project.identification}`)}
				class="mt-4 w-56 px-4 py-2 mb-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Download QR Code
			</button>
		</div>
	</div>
</div>

<div class="flex justify-between w-full mt-4">
	<div class="w-full py-6">
		<p class="text-2xl ml-4">Visitors per month</p>
		<div use:chart={optionsLine} />
	</div>

	<div class="w-full p-6">
		<p class="text-2xl ml-4">Most Visited Hours</p>
		<div use:chart={optionsVisitsByTime} />
	</div>
</div>
