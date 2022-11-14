<script lang="ts">
	import { domain } from '$lib/utils';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let colors: string[];

	let frameRef: HTMLIFrameElement;
	let body: HTMLElement;

	const setColors = (colors: string[]) => {
		if (!body) return;
		console.log("set frame color")
		body?.style.setProperty('--primary-color', colors[0]);
		body?.style.setProperty('--secondary-color', colors[1]);
		body?.style.setProperty('--bg-color', colors[2]);
	};

	onMount(() => {
		frameRef.onload = () => {
			console.log('frame loaded');
			body = frameRef.contentDocument!.body;
			setColors(colors);
		};
	});

	$: setColors(colors)
</script>

<div class="container" transition:slide>
	<iframe bind:this={frameRef} src={domain + 'preview'} title="preview" />
</div>

<style>
	.container {
		width: 100%;
		padding: 0.5rem 0;

		overflow: hidden;

		display: flex;
		flex-direction: column;
		/* justify-content: flex-start; */
		align-items: center;
	}

	iframe {
		width: 100%;
		max-width: 480px;
		aspect-ratio: 0.5;
		position: relative;
		/* flex: 1 1 auto; */
		border: none;
		border-radius: 1rem;
	}

	@media (max-width: 480px) {
		iframe {
			width: 150%;
			transform: scale(0.6);
		}
	}

</style>
