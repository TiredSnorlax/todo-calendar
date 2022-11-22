<script lang="ts">
	import type { ITodo } from '$lib/db/Schemas/Todo';
	import axios from 'axios';
	import { slide } from 'svelte/transition';
	import { options, type IChange } from '.';
	import SubList from './SubList.svelte';
	import { page } from '$app/stores';
	import { domain } from '$lib/utils';

	export let modified: IChange[];
	export let tags: string[];
	export let tasks: ITodo[];
	export let deleteTask: (id: string | undefined) => void;

	let saveBtn: HTMLButtonElement;
	let saveBtnSticky = false;
	let needSave = false;

	let originalTasks = [...tasks];

	const startObservation = (ele: HTMLButtonElement) => {
		if (!ele) return;
		const observer = new IntersectionObserver(([e]) => (saveBtnSticky = e.intersectionRatio < 1), {
			threshold: [1]
		});

		observer.observe(ele);
	};

	const groupByTag = (arr: ITodo[], _modified: IChange[]) => {
		const re = arr.reduce<{ [key: string]: any }>((group, next) => {
			let { tag } = next;
			group[tag] = group[tag] ?? [];
			group[tag].push(next);
			return group;
		}, {});
		return re;
	};

	const formatTasks = (tasks: ITodo[]) => {
		const _t = [...tasks].sort(
			(task1, task2) => options.indexOf(task1.status) - options.indexOf(task2.status)
		);

		const uncompletedTasks = _t.filter((t) => !t.completed);
		const completedTasks = _t.filter((t) => t.completed);

		return [...uncompletedTasks, ...completedTasks];
	};

	const save = async () => {
		console.log('saving');
		const pageData = $page.data;
		await axios
			.post(domain + `api/${pageData.year}/${pageData.month}/${pageData.day}`, {
				modified
			})
			.then((res) => {
				console.log(res);
				needSave = false;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const checkIfNeedSave = (_modified: IChange[]) => {
		if (_modified.length === 0) return false;
		if (tasks === originalTasks) return false;
		return true;
	};

	$: groupedTasks = groupByTag(tasks, modified);
	$: {
		startObservation(saveBtn);
	}
	$: {
		needSave = checkIfNeedSave(modified);
	}
</script>

<div class="container">
	{#if needSave}
		<button
			transition:slide
			class="saveBtn"
			bind:this={saveBtn}
			class:isSticky={saveBtnSticky}
			on:click={save}>Save</button
		>
	{/if}
	<div class="sublists">
		{#if groupedTasks}
			{#each Object.entries(groupedTasks) as [tag, group]}
				<SubList {formatTasks} {deleteTask} {tag} {tags} bind:group bind:modified />
			{/each}
		{:else}
			<span class="material-icons-outlined"> sentiment_dissatisfied </span>
			<p>There's nothing here...</p>
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		flex: 1 1 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	h2 {
		text-align: center;
		padding: 1rem;
		font-size: 1.8rem;
		color: var(--primary-color);
	}

	.saveBtn {
		border: none;
		position: sticky;

		top: -1px;
		z-index: 40;
		width: 80%;
		margin: 0 auto;

		padding: 0.5rem 1.5rem;
		padding-top: calc(0.5rem + 1px);
		background: var(--secondary-color);

		border-radius: 2rem;
		font-size: 1.1rem;
		color: white;
	}

	.saveBtn.isSticky {
		opacity: 0.5;
	}

	.saveBtn.isSticky:hover {
		opacity: 1;
	}

	.sublists {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
