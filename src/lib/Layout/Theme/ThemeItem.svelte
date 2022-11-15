<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { ITheme } from '.';
	import { user, themeID } from '../stores';

	export let theme: ITheme;
	export let changeTheme: (id: string) => void;
	export let userMade: boolean;
	export let updatingThemeId: string | null;

	let open = false;
</script>

<div
	class="themeItem user"
	class:selected={theme.id === $themeID}
	class:using={theme.id === $user?.settings.themeID}
	on:click={() => changeTheme(theme.id)}
>
	<div class="top">
		<p>{theme.id}</p>
		<div class="markers">
			<div style={`background: ${theme.primary}`}>P</div>
			<div style={`background: ${theme.secondary}`}>S</div>
			<div style={`background: ${theme.bg}`}>BG</div>
		</div>
		<button class="expandBtn">
			{#if userMade}
				<span class="material-icons-outlined" class:invert={open} on:click={() => (open = !open)}>
					expand_more
				</span>
			{:else}
				<span />
			{/if}
		</button>
	</div>
	{#if userMade && open}
		<div class="bottom" transition:slide>
			<button on:click={() => (updatingThemeId = theme.id)}>
				{#if updatingThemeId === theme.id}
					Editing
				{:else}
					Edit
				{/if}
			</button>
			<button>Delete</button>
		</div>
	{/if}
</div>

<style>
	button {
		border: none;
		background: none;
	}

	.themeItem {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		border-radius: 0.5rem;

		padding: 0.5rem;
	}

	.themeItem .top {
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		border-radius: 0.5rem;

		padding: 0.5rem;
	}

	.themeItem.selected {
		background: rgba(0, 0, 0, 0.15);
	}

	.themeItem.using {
		border: 2px solid var(--primary-color);
	}

	.markers {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.top > p {
		width: 100px;
	}

	.top span {
		width: 24px;
		display: flex;
	}

	.markers > div {
		color: transparent;
		width: 2rem;
		height: 2rem;

		border: 2px solid black;

		border-radius: 0.5rem;

		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
	}

	.markers > div:hover {
		color: black;
	}

	.expandBtn span {
		transition: 0.3s;
	}

	.invert {
		transform: rotate(180deg);
	}

	.bottom {
		width: 100%;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.bottom button:first-child {
		background: var(--primary-color);
		border: 2px solid var(--primary-color);
		color: white;
		padding: 0.25rem 1rem;
		border-radius: 1rem;
	}

	.bottom button:first-child:hover {
		background: white;
	}

	.bottom button {
		background: none;
		color: grey;
		font-size: 0.9rem;
	}

	.bottom button:hover {
		color: var(--secondary-color);
		cursor: pointer;
	}
</style>
