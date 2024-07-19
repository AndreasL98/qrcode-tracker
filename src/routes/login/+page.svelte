<script>
	import { PUBLIC_URL } from '$env/static/public';

	let email = '';
	let password = '';

	const handleLogin = async () => {
		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (response.status == 200) window.location.href = `${PUBLIC_URL}/dashboard`;
	};
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
		<h2 class="text-2xl font-bold text-center mb-6">Login</h2>
		<div>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
				/>
			</div>
			<div class="flex items-center justify-between mb-4">
				<button
					on:click={handleLogin}
					class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Login
				</button>
			</div>
			<div class="text-center">
				<a href="#" class="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
			</div>
		</div>
	</div>
</main>
