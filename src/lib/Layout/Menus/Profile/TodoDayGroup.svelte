<script lang="ts">
	import type { IDate } from '$lib/db/Schemas/Date';
	import { scale } from 'svelte/transition';
	import TodoItem from './TodoItem.svelte';

	export let open: boolean;
	export let date: IDate;
</script>

<div class="group" in:scale={{ delay: 500 }} out:scale>
	<p class="date">{date.day}/{date.month}/{date.year}</p>
	{#each date.todos as todo, i (i)}
		<TodoItem {todo} bind:open {date} />
	{/each}
</div>

<style>
	.date {
		text-align: center;
		color: grey;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}
</style>
