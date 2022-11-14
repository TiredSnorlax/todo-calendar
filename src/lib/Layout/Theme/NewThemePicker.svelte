<script lang="ts">
	import { domain } from '$lib/utils';
	import { scale, slide } from 'svelte/transition';
	import ColorPicker from './ColorPicker.svelte';
	import Previewer from './Previewer.svelte';
	import axios from 'axios';
	import { themeID, user } from '$lib/Layout/stores';

	export let updatingThemeId: string | null;

	let open = false;
	let preview = false;

	let updating = false;
	let originalId = '';

	let newThemeTitle = '';

	const DEFAULT_VALUES = {
		colors: ['rgb(255, 150, 150)', 'rgb(150, 255, 150)', 'rgb(150, 150, 255)'],
		themeTitle: ''
	};

	let colors = ['rgb(255, 150, 150)', 'rgb(150, 255, 150)', 'rgb(150, 150, 255)'];
	let selectedIndex = -1;

	const selectColor = (index: number) => {
		if (selectedIndex === index) selectedIndex = -1;
		else selectedIndex = index;
	};

	const reset = () => {
		newThemeTitle = DEFAULT_VALUES.themeTitle;
		colors = DEFAULT_VALUES.colors;
		open = false;
	};

	const addTheme = async () => {
		if (!newThemeTitle) return;
		console.log(colors);
		await axios
			.put(domain + 'api/user/profile/themes', {
				additionalTheme: {
					id: newThemeTitle,
					primary: colors[0],
					secondary: colors[1],
					bg: colors[2]
				}
			})
			.then((res) => {
				console.log(res.data);
				user.set(res.data);
				reset();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const startUpdate = (id: string | null) => {
		if (!id) return;
		originalId = id;
		const _theme = $user?.settings.additionalThemes.find((t) => t.id === id);
		if (!_theme) return;
		open = true;
		updating = true;
		newThemeTitle = id;
		colors = [_theme?.primary, _theme?.secondary, _theme?.bg];
	};

	const save = async () => {
		if (!updatingThemeId) return;
		await axios
			.post(domain + 'api/user/profile/themes', {
				updatedTheme: {
					id: newThemeTitle,
					primary: colors[0],
					secondary: colors[1],
					bg: colors[2]
				},
				originalId
			})
			.then((res) => {
				console.log(res.data);
				user.set(res.data);
				themeID.set(updatingThemeId!);
				reset();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	$: startUpdate(updatingThemeId);
</script>

<div>
	{#if open}
		<div class="menu" transition:slide>
			<input
				class="themeNameInput"
				type="text"
				placeholder="Name of theme"
				bind:value={newThemeTitle}
			/>
			<div class="markers">
				{#each colors as _color, i}
					<span
						class="marker"
						class:open={selectedIndex === i}
						style="background: {colors[i]};"
						on:click={() => selectColor(i)}
					/>
				{/each}
			</div>
			{#if selectedIndex >= 0}
				<ColorPicker bind:colors bind:selectedIndex />
			{/if}
			<div class="btnContainer">
				<button class="previewBtn" on:click={() => (preview = !preview)}>Preview</button>
				{#if updating}
					<button class="addBtn" on:click={save}>Save</button>
				{:else}
					<button class="addBtn" on:click={addTheme}>Add</button>
				{/if}
			</div>
		</div>
		{#if preview}
			<Previewer {colors} />
		{/if}
	{/if}
	<button on:click={() => (open = !open)} transition:scale class="newBtn"
		>{open ? 'Cancel' : 'New'}</button
	>
</div>

<style>
	.menu {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
	}

	.newBtn {
		display: block;
		background: var(--primary-color);
		padding: 0.5rem 1rem;
		margin: 0.5rem auto;
		border-radius: 2rem;
		font-size: 1.1rem;
		color: white;
	}

	.themeNameInput {
		border: none;
		outline: none;
		font-size: 1.1rem;
	}

	.markers {
		width: 100%;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
	.marker {
		display: block;
		height: 2rem;
		width: 2rem;

		border-radius: 0.5rem;
		transition: 0.5s;
		border: 2px solid black;
	}

	.marker.open {
		width: 100%;
		border-radius: 0.5rem;
	}

	button {
		border: none;
	}

	.btnContainer {
		display: flex;
		justify-content: space-between;
	}

	.previewBtn {
		color: grey;
		background: none;
		font-size: 1rem;
		border-radius: 2rem;
		padding: 0.5rem;
	}

	.addBtn {
		margin-top: 1rem;
		padding: 0.25rem 1rem;
		background: var(--secondary-color);
		color: white;
		border-radius: 0.5rem;
		font-size: 1.2rem;
	}
</style>
