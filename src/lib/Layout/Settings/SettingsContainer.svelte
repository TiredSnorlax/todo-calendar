<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import ThemeMenu from '$lib/Layout/Menus/ThemeMenu.svelte';
	import ProfileMenu from '../Menus/Profile/ProfileMenu.svelte';
	import { page } from '$app/stores';
	import HelpMenu from '../Menus/Help/HelpMenu.svelte';

	export let open: boolean;

	let currentMenu: any;
	let menus = [ThemeMenu, ProfileMenu, HelpMenu];
	let menuIcons = ['palette', 'face', 'help'];

	const checkIfShow = (data: any) => {
		if ($page.routeId === 'login' || $page.routeId === 'signup' || $page.routeId === 'logout')
			return false;
		else return true;
	};

	const setCurrentMenu = (menu: any) => {
		if (currentMenu !== menu) currentMenu = menu;
		else currentMenu = null;
	};

	$: show = checkIfShow($page.data);
</script>

{#if show}
	{#if open}
		<div class="menuContainer" transition:fade>
			<svelte:component this={currentMenu} bind:open />
		</div>
	{/if}
	<div class="settingsContainer">
		<div class="icon" class:open on:click={() => (open = !open)}>
			<span class="material-icons-outlined"> settings </span>
		</div>
		{#if open}
			{#each menus as menu, i}
				<div
					class="icon"
					class:selected={currentMenu === menu}
					transition:scale={{ delay: 100 * i }}
				>
					<span class="material-icons-outlined" on:click={() => setCurrentMenu(menu)}
						>{menuIcons[i]}</span
					>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.settingsContainer {
		position: fixed;
		top: 2rem;
		right: 2rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		z-index: 100;
	}
	.icon {
		--size: 30px;
		box-sizing: content-box;
		padding: 5px;
		width: var(--size);
		height: var(--size);
		background: white;
		border-radius: 50%;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);

		user-select: none;
	}

	.icon.selected {
		background: var(--primary-color);
	}

	.icon span {
		font-size: var(--size);
		color: var(--primary-color);
		transition: 0.6s ease-in-out;
		cursor: pointer;
	}

	.icon.selected span {
		color: white;
	}

	.icon.open span {
		transform: rotate(270deg);
	}

	.menuContainer {
		position: fixed;
		height: 100vh;
		width: 100vw;

		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);

		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.menuContainer > :global(div) {
		padding: 2rem;
		width: calc(100% - 4rem);
		max-height: calc(100vh - 8rem);
		max-width: 700px;

		position: absolute;

		background: white;
		border-radius: 0.5rem;
		scrollbar-color: var(--primary-color) white;
	}

	@media (max-width: 480px) {
		.settingsContainer {
			top: 1rem;
			right: 1rem;
		}
	}

	@media (max-width: 600px) {
		.settingsContainer {
			flex-direction: row-reverse;
		}
		.menuContainer > :global(div) {
			width: calc(100% - 2rem);
		max-height: calc(100vh - 4rem);
			padding: 1rem;
		}
	}
</style>
