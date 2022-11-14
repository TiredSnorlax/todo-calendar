<script lang="ts">
	import type { IDate } from '$lib/db/Schemas/Date';
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import { slide } from 'svelte/transition';

	export let open: boolean;
	export let todo: ITodo;
	export let date: IDate;

	let showDetails = false;
</script>

<div class="item" on:click={() => (showDetails = !showDetails)}>
	<div>
		<p>{todo.task}</p>
		<a href={`./${date.year}/${date.month}/${date.day}`} on:click={() => (open = false)}>
			<span class="material-icons-outlined"> navigate_next </span>
		</a>
	</div>
	{#if showDetails}
		<p transition:slide class="details">{todo.details}</p>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
		display: flex;
	}

	a span {
		color: var(--secondary-color);
	}

	.item {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		border-radius: 0.5rem;

		border: 1px solid var(--primary-color);
		transition: 0.2s;
	}

	.item:hover {
		box-shadow: 3px 3px 2px 0 rgb(202, 202, 202);
	}

	.item:not(:first-of-type) {
		margin-top: 1rem;
	}

	.item:active {
		background: rgb(220, 220, 220);
	}

	.item div:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.details {
		padding-left: 1rem;
		padding-top: 1rem;
		font-size: 0.85rem;
		color: rgb(50, 50, 50);
	}
</style>
