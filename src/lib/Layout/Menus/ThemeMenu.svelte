<script lang="ts">
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { scale, slide } from 'svelte/transition';
	import { themes, type ITheme } from '../Theme';
	import { user, themeID } from '../stores';
	import NewThemePicker from '../Theme/NewThemePicker.svelte';
	import ColorPicker from '../Theme/ColorPicker.svelte';
	import ThemeItem from '../Theme/ThemeItem.svelte';

	export let open: boolean;

	let preview = false;

	let updatingThemeId: string | null = null;

	const changeTheme = (id: string) => {
		themeID.set(id);
	};

	const saveTheme = async () => {
		if ($themeID === $user?.settings.themeID) return;
		let _temp = $user;
		_temp!.settings.themeID = $themeID;
		await axios
			.post(domain + 'api/user', _temp)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});

		open = false;
	};
</script>

<div
	class="menu"
	on:mouseenter={() => (preview = false)}
	on:mouseleave={() => (preview = true)}
	in:slide
	out:scale
>
	<h1>Color Themes</h1>
	<div class="themes">
		<NewThemePicker bind:updatingThemeId />
		{#if $user}
			{#each $user.settings.additionalThemes as theme}
				<ThemeItem {theme} {changeTheme} userMade={true} bind:updatingThemeId  />
			{/each}
		{/if}

		{#each themes.slice(1) as theme}
			<ThemeItem {theme} {changeTheme} userMade={false} bind:updatingThemeId />
		{/each}
	</div>
	<button class="closeBtn" on:click={saveTheme} disabled={$user?.settings.themeID === $themeID}
		>Save</button
	>
</div>

<style>
	.menu {
		padding: 2rem;
		width: calc(100% - 4rem);
		max-height: calc(100vh - 6rem);
		max-width: 700px;

		position: absolute;

		background: white;
		border-radius: 0.5rem;
		scrollbar-color: rgba(0, 0, 0, 0.4) white !important;

		display: grid;
		grid-template-rows: 1fr 10fr 1fr;
	}

	h1 {
		color: var(--primary-color);
		text-align: center;
		align-self: center;
	}

	/* .menu.preview {
		opacity: 0.3;
	} */

	.themes {
		display: flex;
		flex-direction: column;

		padding: 1rem 0.5rem;

		overflow-y: auto;
		scrollbar-color: rgba(0, 0, 0, 0.4) white !important;
	}

	.themes::-webkit-scrollbar-track {
		background: white;
	}

	.closeBtn {
		color: var(--primary-color);
		background: var(--secondary-color);

		border: none;
		outline: none;

		width: 100%;
		font-size: 1.2rem;
		margin-top: 1rem;
		padding: 0.5rem;
		border-radius: 0.5rem;

		cursor: pointer;
	}

	.closeBtn:hover {
		color: var(--secondary-color);
		background: var(--primary-color);
	}

	.closeBtn:disabled {
		color: grey;
		background: none;
	}

	/* @media (max-width: 480px) {
		.themes {
			max-height: 500px;
		}
	} */

	@media (max-width: 600px) {
		.menu {
			width: calc(100% - 2rem);
			padding: 1rem;
		}
	}
</style>
