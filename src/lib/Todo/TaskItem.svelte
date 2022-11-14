<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';
	import { statusColors } from '.';
	import Dropdown from './Dropdown.svelte';

	export let options: string[];

	export let completed: boolean;
	export let task: string;
	export let details: string | undefined;
	export let status: string;
	export let tag: string;
	export let tags: string[];
	export let _id: string | undefined;

	export let markModified: (todoId: string, change: any) => void;
	export let deleteFunc: () => void;

	let open = false;

	let editing = false;

	let newTask = task;
	let newDetails = details;
	let newTag = tag;
	let newStatus = status;

	const save = () => {
		let change: any = {};
		if (newTask !== task) {
			task = newTask;
			change['task'] = newTask;
		}
		if (newDetails !== details) {
			details = newDetails;
			change['details'] = newDetails;
		}
		if (newTag !== tag) {
			tag = newTag;
			change['tag'] = newTag;
		}
		if (newStatus !== status) {
			status = newStatus;
			change['status'] = newStatus;
		}

		if (Object.entries(change).length > 0) markModified(_id!, change);
	};

	$: {
		if (!editing) {
			save();
		}
	}
</script>

<div class="taskItem" class:completed transition:scale>
	<div class="top">
		<Dropdown {options} bind:value={newStatus} colors={statusColors} {editing} />
		{#if editing}
			<div class="inputField">
				<input class="task" type="text" bind:value={newTask} />
				<span />
			</div>
		{:else}
			<p class="task" type="text" on:click={() => (open = !open)}>{task}</p>
		{/if}
		<div>
			<input type="checkbox" bind:checked={completed} />
		</div>
	</div>
	{#if open}
		<div transition:slide>
			{#if editing}
				<div class="inputField">
					<input class="details" type="text" bind:value={newDetails} />
					<span />
				</div>
			{:else}
				<p class="details">{details}</p>
			{/if}
			<div class="tagContainer">
				<p>Tags:</p>
				<div class="tags">
					{#each tags as t}
						{#if editing || t === tag}
							<p class:highlighted={t === newTag} on:click={() => (newTag = t)}>#{t}</p>
						{/if}
					{/each}

					{#if editing}
						<p on:click={() => (newTag = '')}>None</p>
					{/if}
				</div>
			</div>
			<div class="btnContainer">
				<button on:click={() => (editing = !editing)}>{editing ? 'Save' : 'Edit'}</button>
				{#if editing}
					<button on:click={deleteFunc}>Delete</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	input {
		display: block;
		background: none;
		border: none;
		outline: none;
		min-width: 0;
	}

	p {
		border-bottom: 2px solid transparent;
	}

	button {
		background: none;
		outline: none;
		border: none;
	}

	.taskItem {
		padding: 0.5rem 1rem;
		border: 2px solid var(--primary-color);
		border-radius: 1rem;

		transition: 0.3s;

		background: white;
	}

	.taskItem .task {
		flex: 1 1 0;
	}

	.taskItem.completed {
		background: greenyellow;
	}

	.taskItem .top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.top p {
		font-size: 1.2rem;
	}

	.top input {
		font-size: 1.2rem;
	}

	.top > div {
		display: flex;
		gap: 1rem;
	}

	.inputField {
		position: relative;
		flex: 1 1 0;
	}

	.inputField input {
		padding-bottom: 4px;
		width: 100%;
	}

	.inputField span {
		position: absolute;

		height: 2px;
		width: 0;
		background: var(--secondary-color);

		left: 0;
		right: 0;
		bottom: 0;

		transition: 0.3s;
	}

	.inputField input:focus ~ span {
		width: 100%;
	}

	.details {
		margin: 0.5rem;
		font-size: 0.9rem;
		color: rgb(60, 60, 60);
	}

	.tagContainer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-top: 0.5rem;
	}

	.tagContainer .tags {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.tagContainer .tags p {
		margin: 0 0.5rem;
		padding: 0.25rem 0.5rem;
		color: var(--primary-color);
		border-radius: 1rem;
		cursor: pointer;
	}

	.tagContainer .tags p.highlighted {
		background: var(--secondary-color);
		color: white;
	}

	.btnContainer {
		width: 100%;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
	}

	.btnContainer button:first-child {
		background: var(--primary-color);
		color: white;
		border-radius: 5px;

		font-size: 1.2rem;
		padding: 0.25rem 1rem;
		transition: none;
		cursor: pointer;
	}

	.btnContainer button:first-child:hover {
		background: var(--secondary-color);
	}

	.btnContainer button:nth-child(2) {
		color: grey;
		font-size: 1rem;
	}
	.btnContainer button:nth-child(2):hover {
		color: red;
	}
</style>
