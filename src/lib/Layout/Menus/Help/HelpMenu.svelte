<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { scale, slide } from 'svelte/transition';
	import Section from './Section.svelte';

	export let open: boolean = true;

	let scrollDiv: HTMLDivElement;

	const scrollToHeader = (id: string) => {
		const ele = document.getElementById('help-' + id);
		if (ele) ele.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToTop = () => {
		scrollDiv.scrollTop = 0;
	};
</script>

<div in:slide out:scale class="menu">
	<div bind:this={scrollDiv}>
		<Section title="Hello!" id="greeting" {scrollToTop}>
			<p>Welcome to,</p>
			<Icon />

			<span class="break" />
			<span class="break" />
			<p>This is a brief guide of how to use it</p>
		</Section>
		<Section title="TOC" id="TOC" {scrollToTop}>
			<h3>Table of Contents</h3>
			<!-- Scroll to the Section on click -->
			<div class="tableOC">
				<div on:click={() => scrollToHeader('/')}>
					<p>1.</p>
					<p>/</p>
				</div>
				<div on:click={() => scrollToHeader('/[year]/[month]/[day]')}>
					<p>2.</p>
					<p>/[year]/[month]/[day]</p>
				</div>
				<div on:click={() => scrollToHeader('todo-item')}>
					<p>3.</p>
					<p>To-do Item</p>
				</div>
				<div on:click={() => scrollToHeader('add-todo')}>
					<p>4.</p>
					<p>Adding a to-do</p>
				</div>
				<div on:click={() => scrollToHeader('tags')}>
					<p>5.</p>
					<p>Tags</p>
				</div>
			</div>
		</Section>
		<Section title="/" id="/" {scrollToTop}>
			<img src="/Help/calendar-0.PNG" alt="" />
			<p>This is your calendar.</p>

			<!-- add image here -->

			<img src="/Help/calendar-1.PNG" alt="" />
			<p>Dates with todos are highlighted.</p>
			<p>Clicking on the dates will bring you to that date</p>

			<img src="/Help/calendar-2.PNG" alt="" />
			<p>Clicking anywhere else will expand the month for easier access</p>
		</Section>

		<Section title="/[year]/[month]/[day]" id="/[year]/[month]/[day]" {scrollToTop}>
			<img src="/Help/calendar-3.PNG" alt="" />
			<p>This is where you can find the todo list for a particular day</p>
		</Section>

		<Section title="Todo Item" id="todo-item" {scrollToTop}>
			<img src="/Help/calendar-4.PNG" alt="" />
			<p>This is a todo item</p>
			<span class="break" />
			<p>The color represents how urgent the task is.</p>
			<p style="font-weight: bold;">
				<span style="color: red">Urgent</span> ,
				<span style="color: rgb(255, 255, 0)">Not Urgent</span>
				,
				<span style="color: blue">Optional</span>
			</p>

			<img src="/Help/calendar-5.PNG" alt="" />
			<p>Clicking on it will expand to show the details</p>

			<img src="/Help/calendar-6.PNG" alt="" />
			<p>You can edit tasks by pressing this button</p>
			<p>Remember to save after editing!</p>
		</Section>

		<Section title="Adding a todo" id="add-todo" {scrollToTop}>
			<img src="/Help/calendar-7.PNG" alt="" />
			<p>You can do so by clicking the 'edit' button</p>

			<img src="/Help/calendar-8.PNG" alt="" />
			<p>Here, you type in your task and details, as well as set the urgency(color) of your task</p>
		</Section>

		<Section title="Tags" id="tags" {scrollToTop}>
			<img src="/Help/calendar-9.PNG" alt="" />
			<p>You can add tags to your tasks when adding it.</p>

			<img src="/Help/calendar-10.PNG" alt="" />
			<p>Todos with the same tags will be grouped together</p>
		</Section>
		<button on:click={() => (open = false)}>Let's Start!</button>
	</div>
</div>

<style>
	.menu {
		padding: 0;
		overflow: hidden;

		max-width: 1000px;
	}

	.menu > div {
		overflow-y: auto;
		height: 800px;
		scrollbar-color: var(--primary-color) white;

		scroll-behavior: smooth;
	}

	.break {
		height: 1rem;
	}

	p {
		font-size: 1.2rem;
		padding: 0 1rem;
		text-align: center;
	}

	h3 {
		color: var(--secondary-color);
		font-size: 1.5rem;
		margin-top: 3rem;
	}

	.tableOC {
		margin-top: 1rem;
	}

	.tableOC > div {
		display: flex;
		justify-content: flex-start;
		gap: 1rem;
	}

	.tableOC > div p:last-child {
		color: var(--primary-color);
		font-weight: bold;
		cursor: pointer;
	}

	.tableOC > div p:last-child:hover {
		text-decoration: underline;
	}

	button {
		display: block;
		padding: 0.5rem 1.5rem;
		margin: 0 auto;
		margin-bottom: 2rem;

		font-size: 1.2rem;
		border: none;
		color: white;
		border-radius: 0.5rem;
		background: var(--secondary-color);
		cursor: pointer;
	}

	button:hover {
		color: var(--secondary-color);
		background: white;
	}

	@media (max-width: 480px) {
		.menu div {
			height: 600px;
		}

		p {
			font-size: 0.9rem;
		}
	}
</style>
