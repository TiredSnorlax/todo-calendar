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

<div>
	{#if successful}
		<p>Logout successful</p>
	{/if}
</div>
