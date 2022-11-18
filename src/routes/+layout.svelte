<script lang="ts">
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let connected = false;

	onMount(async () => {
        console.log('layout mounted');
		connected = false;
		axios
			.post(domain + 'api/connect')
			.then(() => {
				connected = true;
			})
			.catch((err) => {
				console.log(err);
			});
	});
</script>

{#if connected}
	<slot />
{:else}
<div class="container">
	<p>Loading</p>
</div>
{/if}


<style>
    .container {
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>