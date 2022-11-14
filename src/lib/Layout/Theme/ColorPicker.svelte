<script lang="ts">
	import { scale, slide } from 'svelte/transition';

	export let colors: string[];
	export let selectedIndex: number;

	let r = 0;
	let g = 0;
	let b = 0;

	let textColor = '';

	const setColor = (r: number, g: number, b: number) => {
		colors[selectedIndex] = `rgb(${r}, ${g}, ${b})`;
	};

	const reset = (index: number) => {
		const values = colors[index].slice(4).slice(0, -1).split(',');
		console.log(values);
		r = parseInt(values[0]);
		g = parseInt(values[1]);
		b = parseInt(values[2]);
	};

	const setFromText = (str: string) => {
		const values = str.slice(4).slice(0, -1).split(',');
		if (values.length !== 3) return;
		r = parseInt(values[0]);
		g = parseInt(values[1]);
		b = parseInt(values[2]);
	};

	$: reset(selectedIndex);
	$: setFromText(textColor);
	$: setColor(r, g, b);
</script>

<div class="container" transition:slide>
	<div class="colors">
		<div class="color">
			<p>R:</p>
			<input type="text" bind:value={r} />
			<input type="range" bind:value={r} min="0" max="255" />
		</div>
		<div class="color">
			<p>G:</p>
			<input type="text" bind:value={g} />
			<input type="range" bind:value={g} min="0" max="255" />
		</div>
		<div class="color">
			<p>B:</p>
			<input type="text" bind:value={b} />
			<input type="range" bind:value={b} min="0" max="255" />
		</div>
	</div>
	<input type="text" bind:value={textColor} placeholder={colors[selectedIndex]} />
</div>

<style>
	input {
		min-width: 0px;
	}

	.colors {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.5rem;
	}

	.color {
		display: grid;
		grid-template-columns: 1fr 1fr 8fr;
		gap: 0.5rem;
	}

	.color input {
		text-align: center;
	}

	.container > input {
		text-align: center;
		padding: 0.25rem 0.5rem;
		border-radius: 2rem;
		border: 2px solid var(--primary-color);
		margin-top: 1rem;
		font-size: 1rem;
	}
</style>
