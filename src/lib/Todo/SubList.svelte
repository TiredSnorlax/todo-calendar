<script lang="ts">
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import { flip } from 'svelte/animate';
	import { options, type IChange } from '.';
	import TaskItem from './TaskItem.svelte';

	export let modified: IChange[];
	export let formatTasks: (tasks: ITodo[]) => ITodo[];
	export let deleteTask: (id: string | undefined) => void;

	export let tag: string;
	export let tags: string[];
	export let group: ITodo[] = [];

	$: group = formatTasks(group);

	const markModified = (todoId: string, change: any) => {
		let isChanged = modified.find((c) => c.todoId === todoId);
		if (isChanged) {
			modified[modified.indexOf(isChanged)] = { todoId, change };
		} else {
			modified = [...modified, { todoId, change }];
		}
		console.log('modified', modified);
	};
</script>

<div class="items">
	<p>#{tag}</p>
	{#each group as { completed, task, status, details, tag, _id }, i (_id)}
		<div animate:flip={{ duration: 500 }}>
			<TaskItem
				bind:completed
				bind:task
				bind:status
				bind:details
				bind:tag
				{_id}
				{tags}
				{options}
				{markModified}
				deleteFunc={() => deleteTask(_id)}
			/>
		</div>
	{/each}
</div>

<style>
	.items {
		width: 100%;
		max-width: 800px;
		padding: 1rem;
		flex: 1 0 300px;

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: stretch;
		gap: 1rem;
	}

	.items p {
		text-align: center;
		color: var(--primary-color);
		font-size: 1.2rem;
	}
</style>
