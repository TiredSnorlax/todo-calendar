<script lang="ts">
	import { onMount } from 'svelte';
	import { themes, type ITheme } from '$lib/Layout/Theme';

	import { themeID, user } from '$lib/Layout/stores';

	import HomeBtn from '$lib/Layout/HomeBtn.svelte';
	import SettingsContainer from '$lib/Layout/Settings/SettingsContainer.svelte';
	import axios from 'axios';
	import { domain } from '$lib/utils';

	let selectedTheme = '0';
	let theme: ITheme;
	let mounted = false;

	let open = false;

	const getUser = async () => {
		await axios.get(domain + 'api/user').then((res) => {
			user.set(res.data);
		});
	};

	const setColors = () => {
		if (mounted) {
			document.documentElement.style.setProperty('--primary-color', theme.primary);
			document.documentElement.style.setProperty('--secondary-color', theme.secondary);
			document.documentElement.style.setProperty('--bg-color', theme.bg);
		}
	};

	user.subscribe((data) => {
		let _themes = themes;
		if (data) {
			themeID.set(data?.settings.themeID || '0');
			_themes = themes.concat(data.settings.additionalThemes);
		}
		theme = _themes.find((t) => t.id === selectedTheme)!;
		if (theme) setColors();
	});

	themeID.subscribe((value) => {
		if (!$user) return;
		selectedTheme = value;
		let _themes = themes.concat($user!.settings.additionalThemes);
		theme = _themes.find((t) => t.id === selectedTheme)!;
		setColors();
	});

	const disableScroll = (open: boolean) => {
		if (!mounted) return;
		if (open) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}
	};

	$: disableScroll(open);

	onMount(() => {
		getUser();
		mounted = true;
	});
</script>

<div class="container" class:scrollable={!open}>
	<HomeBtn />
	<SettingsContainer bind:open />
	<slot />
</div>

<style>
	:global(*) {
		transition: color 0.3s, background 0.3s;
	}

	.container {
		width: 100vw;
		min-height: 100vh;
		position: relative;

		background: var(--bg-color);
	}
</style>
