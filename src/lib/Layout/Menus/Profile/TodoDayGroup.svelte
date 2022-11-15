<script lang="ts">
	import type { IDate } from '$lib/db/Schemas/Date';
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import { scale } from 'svelte/transition';
	import TodoItem from './TodoItem.svelte';

	export let open: boolean;
	export let date: IDate;

	const filterTodos = (_todos: ITodo[]) => {
		return _todos.filter((t) => t.completed === false);
	};

	let todos = filterTodos(date.todos);
</script>

<div class="group" in:scale={{ delay: 500 }} out:scale>
	<p class="date">{date.day}/{date.month}/{date.year}</p>
	{#each todos as todo, i (i)}
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
