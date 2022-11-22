<script lang="ts">
	import type { PageData } from './$types';
	import List from '$lib/Todo/List.svelte';
	import NewTask from '$lib/Todo/NewTask.svelte';
	import DateDisplay from '$lib/Todo/DateDisplay.svelte';
	import { page } from '$app/stores';

	import axios from 'axios';
	import { domain } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import type { IDate } from '$lib/db/Schemas/Date';
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import type { IChange } from '$lib/Todo';
	import LoadingOverlay from '$lib/miscellaneous/LoadingOverlay.svelte';

	export let data: PageData;

	let newTodo: ITodo | null = null;

	let day = parseInt($page.params.day);
	let month = parseInt($page.params.month);
	let year = parseInt($page.params.year);

	let tasks: ITodo[];

	let modified: IChange[] = [];

	let loading = false;

	const update = (date: IDate) => {
		if (date.todos) {
			tasks = date.todos;
		} else {
			tasks = [];
		}
	};

	const createNewTodo = async () => {
		if (!newTodo || !newTodo!.task) return;
		if (tasks.map((t) => t.task).includes(newTodo!.task)) return;
		loading = true;
		await axios
			.put(domain + `api/${date.year}/${date.month}/${date.day}/`, {
				newTodo
			})
			.then((res) => {
				console.log(res);
				tasks = [...tasks, res.data.newTodo];
				newTodo = null;
				loading = false;
			})
			.catch((err) => {
				console.log(err);
				loading = false;
			});
	};

	const deleteTask = async (id: string | undefined) => {
		loading = true;
		await axios
			.delete(domain + `api/${year}/${month}/${day}/`, {
				data: { id }
			})
			.then(() => {
				tasks = tasks.filter((t) => t._id !== id);
				loading = false;
			})
			.catch((err) => {
				console.log(err);
				loading = false;
			});
	};

	$: date = JSON.parse(data.date) as IDate;
	// $: tasks = date ? date.todos : [];

	$: {
		update(date);
	}
</script>

<LoadingOverlay {loading} />
<main class="container" transition:slide>
	<div class="dateContainer">
		{#key data.day}
			<DateDisplay {data} />
		{/key}
	</div>
	<div class="content">
		<List bind:tasks tags={date.tags} {deleteTask} bind:modified />
		{#key data.day}
			<NewTask bind:newTodo tags={date.tags} {createNewTodo} />
		{/key}
	</div>
</main>

<style>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		padding-top: 4rem;
		margin: 0 auto;
	}

	.dateContainer {
		position: relative;
		width: 100%;
		flex-shrink: 0;
		height: 10rem;
	}

	.content {
		width: 100%;
		max-height: 85%;
		position: relative;
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	@media (max-width: 480px) {
		.container {
			padding: 1rem;
			padding-top: 2rem;
		}

		.dateContainer {
			height: 8rem;
		}
	}
</style>
