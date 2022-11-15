<script lang="ts">
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import { slide, fade, scale } from 'svelte/transition';
	import { options, statusColors } from '.';
	import Dropdown from './Dropdown.svelte';

	export let newTodo: ITodo | null;
	export let createNewTodo: () => void;
	export let tags: string[];

	let newTag = '';
	let createNewTag = false;
	let newTagEle: HTMLInputElement;

	const open = () => {
		newTodo = {
			task: '',
			status: 'Urgent',
			details: '',
			completed: false,
			tag: ''
		};
	};

	const changeTag = (tag: string) => {
		if (!newTodo) return;
		if (newTodo.tag === tag) newTodo.tag = '';
		else newTodo.tag = tag;
	};

	const focusNewTag = () => {
		if (!newTagEle) return;
		createNewTag = true;
		newTagEle.focus();
	};

	const checkNewTag = () => {
		console.log(tags.includes(newTag));
		if (tags.includes(newTag) || !newTodo) return;
		tags = [...tags, newTag];
		console.log(tags);
		newTodo.tag = newTag;
		newTag = '';
		createNewTag = false;
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			console.log('enter');
			createNewTodo();
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="newTaskContainer">
	{#if newTodo}
		<div transition:scale={{ duration: 500 }}>
			<div class="fields">
				<div>
					<Dropdown {options} colors={statusColors} bind:value={newTodo.status} editing={true} />
					<div class="inputField">
						<input type="text" bind:value={newTodo.task} placeholder="Write your task here..." />
						<span />
					</div>
				</div>
				<div class="inputField details">
					<input placeholder="Details" bind:value={newTodo.details} />
					<span />
				</div>
				<div class="tagsContainer">
					<h4>Tags</h4>
					<div class="tags">
						{#each tags as tag}
							<p on:click={() => changeTag(tag)} class:highlighted={newTodo.tag === tag}>
								#{tag}
							</p>
						{/each}
						<input id="newTag" type="text" bind:value={newTag} bind:this={newTagEle} />
						{#if createNewTag}
							<p class="highlighted newTagP">#{newTag}</p>
						{/if}
						{#if newTag.length > 0}
							<button on:click={checkNewTag}>Add</button>
						{:else if createNewTag && newTag.length === 0}
							<button on:click={() => (createNewTag = false)}>Cancel</button>
						{:else}
							<button on:click={focusNewTag}>New</button>
							<!-- <label for="newTag" class="newTagLabel">New</label> -->
						{/if}
					</div>
				</div>
			</div>
			<button
				class="addBtn"
				on:click={newTodo.task ? createNewTodo : () => (newTodo = null)}
				class:cancel={newTodo && !newTodo.task}
			>
				{#if newTodo.task}
					<p transition:slide>Add</p>
				{:else}
					<p transition:slide>Cancel</p>
				{/if}
			</button>
		</div>
	{:else}
		<h2 on:click={open} in:fade={{ delay: 550 }}>New task</h2>
	{/if}
</div>

<style>
	h2 {
		margin: 0 auto;
		width: max-content;
		color: var(--primary-color);
		cursor: pointer;

		transition: 0.3s;
	}

	h2:hover {
		color: white;
	}

	.newTaskContainer {
		padding-bottom: 1rem;
	}

	.newTaskContainer > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}

	.fields {
		background: white;
		padding: 1rem;
		margin-top: 1rem;
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
	}

	.fields > div:first-child {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;

		margin-bottom: 0.5rem;
	}

	.fields input {
		width: 100%;
		height: 100%;
		font-size: 1rem;
		border: none;
		outline: none;
		background: none;
	}

	.fields > .inputField {
		margin: 0.5rem;
		z-index: 5;
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

	.inputField.details input {
		font-size: 0.9rem;
	}

	.addBtn {
		border: none;
		outline: none;
		background: var(--secondary-color);
		border: 2px solid var(--primary-color);
		border-radius: 2rem;
		font-size: 1.2rem;
		padding: 0.25rem 1.5rem;
		margin-bottom: 0;
		margin-top: 1rem;

		color: white;
		transition: 0.5s;
	}

	.addBtn.cancel {
		background: transparent;
		color: grey;
		border-color: transparent;
		margin-top: 0;
	}

	.tagsContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding-bottom: 1rem;
	}

	.tagsContainer h4 {
		color: var(--primary-color);

		width: 100%;
		text-align: left;
		padding-left: 0.5rem;
		padding-top: 1rem;
	}

	.tagsContainer button {
		background: none;
		border: none;
		padding: 0.25rem 0.5rem;
		margin: 0.5rem;
		border-radius: 1rem;
		background: var(--secondary-color);
		color: white;
		font-size: 1rem;
		cursor: pointer;
	}

	.tagsContainer button:hover {
		background: var(--primary-color);
	}

	.tags {
		display: flex;
		align-items: center;
		width: 100%;
		padding-left: 1rem;
	}

	.tags p {
		color: var(--primary-color);
		margin: 0 0.5rem;
		padding: 0.25rem 0.5rem;
		border-radius: 2rem;

		transition: 0.3s;
		cursor: pointer;
	}

	.tags p.highlighted {
		color: white;
		background: var(--primary-color);
	}

	#newTag {
		width: 0;
		height: 0;
	}
</style>
