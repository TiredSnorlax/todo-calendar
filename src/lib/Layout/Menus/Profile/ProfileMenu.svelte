<script lang="ts">
	import type { IDate } from '$lib/db/Schemas/Date';
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import { user } from '$lib/Layout/stores';
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	import TodoDayGroup from './TodoDayGroup.svelte';

	export let open: boolean;

	let dates: IDate[] = [];
	let numTodos = 0;

	const getTodos = async () => {
		await axios
			.post(domain + 'api/user/todos')
			.then((res) => {
				dates = res.data;
				getNumTodos();
			})
			.catch((err) => console.log(err));
	};

	const getNumTodos = () => {
		let l = 0;
		console.log(dates);
		dates.map((d) => {
			d.todos.map((t) => {
				if (t.completed === false) l++;
			});
		});
		numTodos = l;
	};

	onMount(() => {
		getTodos();
	});
</script>

<div class="menu" in:slide out:scale>
	<div class="info">
		<h1 class="greeting"><span>Hello </span>{$user?.username}!</h1>
		<button class="logoutBtn"><a href="/logout">Logout</a></button>
	</div>
	<div class="stats">
		<div>
			<p>Date</p>
			<p>11/6/2022</p>
		</div>
		<div>
			<p>Not Done</p>
			<p>{numTodos}</p>
		</div>
	</div>
	<div class="todosContainer">
		<h2>Todos</h2>
		{#key dates}
			<div class="todosList" transition:slide>
				{#each dates as date}
					<TodoDayGroup bind:open {date} />
				{/each}
			</div>
		{/key}
	</div>
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
		transition: 0s;
	}

	.menu {
		/* padding: 2rem;

		position: absolute;
		width: calc(100% - 4rem);
		max-width: 700px;
		max-height: calc(100vh - 6rem);

		background: white;
		border-radius: 0.5rem; */

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.info {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;
	}

	.greeting {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;

		color: var(--secondary-color);
	}

	h1 span {
		color: var(--primary-color);
	}

	.logoutBtn {
		position: absolute;
		right: 0;

		margin: 0.5rem;
		padding: 0.25rem 0.75rem;
		font-size: 0.8rem;
		border-radius: 3rem;
		border: 2px solid grey;
		background: none;
		color: gray;
		transition: 0s !important;
		cursor: pointer;
	}

	.logoutBtn:hover {
		border-color: red;
		color: red;
	}

	.stats {
		padding: 1rem;
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.stats div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.stats div p:first-child {
		font-size: 1rem;
		color: grey;
	}

	.stats div p:nth-child(2) {
		font-size: 2.5rem;
		color: var(--primary-color);

		font-family: 'Oswald', sans-serif;
	}

	h2 {
		color: var(--secondary-color);
	}

	.todosContainer {
		min-height: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.todosList {
		width: 100%;
		max-height: 400px;
		padding: 1rem;
		overflow-y: auto;
		scrollbar-color: rgba(0, 0, 0, 0.4) white !important;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.todosList::-webkit-scrollbar-track {
		background: white;
	}

	@media (max-width: 480px) {
		.info {
			flex-direction: column;
		}

		.logoutBtn {
			position: relative;
		}

		.stats {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.stats div p:first-child {
			font-size: 0.8rem;
			color: grey;
		}

		.stats div p:nth-child(2) {
			font-size: 2rem;
			color: var(--primary-color);

			font-family: 'Oswald', sans-serif;
		}
	}

	@media (max-width: 600px) {
		.stats {
			padding-bottom: 0;
		}
	}
</style>
