<script lang="ts">
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import DateDisplay from '$lib/Todo/DateDisplay.svelte';
	import List from '$lib/Todo/List.svelte';
	import NewTask from '$lib/Todo/NewTask.svelte';

	const date = new Date();

	const fakeData = {
		year: date.getFullYear() + '',
		month: date.getMonth() + '',
		day: date.getDate() + '',
		date: ''
	};

	const fakeTasks: ITodo[] = [
		{
			completed: false,
			task: 'Start on **** presentation',
			status: 'Not Urgent',
			tag: 'Work',
			_id: '0'
		},
		{
			completed: false,
			task: 'Finish up *** proposal',
			status: 'Urgent',
			tag: 'Work',
			_id: '1'
		}
	];

	const fakeDelete = (id: string | undefined) => {
		return;
	};

	const fakeTags = ['Work', 'Personal'];

	const newTodo = {
		task: 'Buy groceries',
		status: 'Optional',
		details: 'Eggs, Toast, Bread',
		completed: false,
		tag: 'Personal'
	};
</script>

<div class="container">
    <div class="cover"></div>
	<div class="date">
		<DateDisplay data={fakeData} />
	</div>
	<List modified={[]} tags={[]} tasks={fakeTasks} deleteTask={fakeDelete} />
	<NewTask {newTodo} createNewTodo={() => {}} tags={fakeTags} />
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		padding: 2rem;
		padding-top: 4rem;

		display: flex;
		flex-direction: column;
	}

	.date {
		height: 6rem;
		position: relative;
	}

    .cover {
        position: fixed;
        inset: 0;
        z-index: 110;
        user-select: none;
    }
</style>
