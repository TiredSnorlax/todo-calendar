<script lang="ts">
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let connected = false;

	onMount(async () => {
        await axios.post(domain + 'api/connect');
		connected = true;
		console.log('layout mounted');
	});
</script>

{#if connected}
	<slot />
{:else}
	<p>Loading</p>
{/if}
