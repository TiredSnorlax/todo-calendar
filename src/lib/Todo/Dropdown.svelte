<script lang="ts">
	import { fade, scale, slide } from 'svelte/transition';

	export let options: string[];
	export let colors: string[];
	export let value = options[0];
	export let editing: boolean;

	let open = false;
	let color: string = '';
	let selected = value;

	$: color = colors[options.indexOf(value)];

	const clickOpen = () => {
		if (!editing) return;
		open = !open;
	};

	const click = () => {
		value = selected;
		open = false;
	};
</script>

<div class="container">
	<div class="marker" class:editable={editing} style=" background: {color}" on:click={clickOpen}>
		<span class="material-icons-outlined"> edit </span>
	</div>
	{#if open}
		<div class="menu" transition:slide>
			<div class="markers">
				{#each options as option}
					<div
						class="marker bigger"
						style="background: {colors[options.indexOf(option)]}"
						class:selected={option === selected}
						on:click={() => (selected = option)}
					/>
				{/each}
			</div>
			<div class="labelContainer">
				{#key selected}
					<p transition:scale>{selected}</p>
				{/key}
			</div>
			<button disabled={selected === value} on:click={click}>OK</button>
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
	}

	.marker {
		width: 1rem;
		height: 1rem;
		border: 2px solid transparent;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

		transition: 0.3s;
	}

	.marker::before {
		content: '';
		position: absolute;
		width: calc(1.2rem + 2px);
		height: calc(1.2rem + 2px);
		border-radius: 50%;

		border: 2px solid transparent;

		transition: 0.3s;
	}

	.marker span {
		opacity: 0;
		font-size: 1.2rem;
		color: white;

		transition: 0.3s;
	}

	.menu {
		position: absolute;
		top: -100%;
		left: calc(100% + 0.5rem);
		background: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 2px 0 black;

		z-index: 40;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.markers {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		position: relative;
	}

	.marker.selected {
		border: 2px solid white;
	}

	.marker.selected::before {
		border: 2px solid var(--secondary-color);
	}

	.marker.bigger {
		width: 1.2rem;
		height: 1.2rem;
	}

	.marker.editable {
		width: 1.8rem;
		height: 1.8rem;
	}

	.marker.editable span {
		opacity: 1;
	}

	.labelContainer {
		width: 100%;
		position: relative;
		height: 2rem;
	}

	.labelContainer p {
		position: absolute;
		display: block;
		inset: 0;
		height: 1rem;
		text-align: center;
		margin: auto;
	}

	.menu button {
		border: none;
		background: var(--secondary-color);
		border-radius: 1rem;
		text-align: center;
		color: white;
		padding: 0.25rem 0.75rem;
	}

	.menu button:disabled {
		background: none;
		color: grey;
	}

</style>
