<script lang="ts">
	import { domain } from '$lib/utils';
	import { page } from '$app/stores';

	let show = true;

	$: {
		if (!$page.routeId!.includes('[day]')) {
			show = false;
		} else {
			show = true;
		}
	}

	const currentYear = new Date().getFullYear();
</script>

{#if show}
	<div><a href="{domain}{currentYear}"><span class="material-icons-outlined"> home </span></a></div>
{/if}

<style>
	div {
		position: fixed;
		top: 2rem;
		left: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 50;
	}

	a {
		color: var(--primary-color);
		background: white;
		box-sizing: content-box;
		padding: 5px;
		border-radius: 50%;
		width: 30px;
		height: 30px;

		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
		user-select: none;
	}

	span {
		font-size: 30px;
	}
</style>
