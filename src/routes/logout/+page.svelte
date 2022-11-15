<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { domain } from '$lib/utils';

	let successful = false;

	onMount(async () => {
		console.log('logout');
		await axios
			.post(domain + 'api/logout')
			.then((res) => {
				successful = true;
			})
			.catch((err) => {
				console.log(err);
			});
	});
</script>

<div class="container">
	{#if successful}
		<p>Logout successful!</p>
		<p><a href="/login">Login</a> again?</p>
	{/if}
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;

		background:  rgb(130, 181, 190);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	p {
		font-size: 1.2rem;
		color: white;
	}
</style>
