<script lang="ts">
	import { getMonths, type IMonth, months } from '$lib/Months/index';
	import Menu from '$lib/Months/menu.svelte';
	import { scale, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import MonthCalendar from '$lib/Months/MonthCalendar.svelte';
	import { send, receive } from '$lib/Months/monthCrossFade';
	import axios from 'axios';
	import { domain } from '$lib/utils';

	let year = new Date().getFullYear();
	let monthsList: IMonth[] = [];
	let highlighted: number[][] = [];

	let selectedMonth = 0;

	const incrementYear = () => {
		year++;
	};
	const decrementYear = () => {
		year--;
	};
	const getHighlighted = async () => {
		await axios
			.post(domain + `api/${year}`)
			.then((res) => {
				highlighted = res.data;
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	onMount(() => {
		monthsList = getMonths(year);
		getHighlighted();
	});

	const changeYear = (year: number) => {
		highlighted = new Array(12).fill([]);
		// if (!year) return;
		// monthsList = getMonths(year);
		getHighlighted();
	};

	$: changeYear(year);
</script>

<div class="container">
	<h1 transition:fade>Year</h1>
	<div class="header" transition:fade>
		<button on:click={decrementYear}
			><span class="material-icons-outlined"> arrow_left </span></button
		>
		{#key year}
			<p in:scale class="label">{year}</p>
		{/key}
		<button on:click={incrementYear}
			><span class="material-icons-outlined"> arrow_right </span></button
		>
	</div>
	<div class="monthContainer">
		{#each monthsList as { month, index }, i (index)}
			<div class="monthItem" transition:scale on:click={() => (selectedMonth = i + 1)}>
				{#if month !== months[selectedMonth]}
					<div in:receive={{ key: i + 1 }} out:send={{ key: i + 1 }}>
						<h3>{month}</h3>
						<MonthCalendar
							{year}
							selectedMonth={i + 1}
							titleLength={1}
							highlightedDates={highlighted[i]}
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<Menu bind:year bind:selectedMonth {highlighted} />
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 2rem 0rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		color: var(--primary-color);
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		color: var(--secondary-color);
	}

	.header button {
		background: none;
		outline: none;
		border: none;
		cursor: pointer;

		color: var(--primary-color);
		transition: 0.3s;
	}

	.header button span {
		font-size: 3rem;
	}

	.header button:hover {
		color: var(--secondary-color);
		transform: scale(1.5);
	}

	.label {
		padding: 1rem;
		font-size: 3rem;
		font-family: 'Oswald', sans-serif;
	}

	.monthContainer {
		width: 100%;
		max-width: 1400px;
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

		justify-content: center;
		align-items: center;

		/* display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap; */

		gap: 1rem;
	}

	.monthItem {
		padding-top: 0;
		padding: 2rem;
		padding-top: 0;
		border-radius: 1rem;

		flex: 1 1 auto;
		min-width: 150px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 1px solid var(--primary-color);
	}

	.monthItem h3 {
		text-align: center;
		color: var(--primary-color);
	}

	.monthItem > div {
		width: 100%;
		height: 100%;
	}

	.monthItem:hover {
		background: rgba(255, 255, 255, 1);
	}

	.monthItem h3 {
		padding: 1rem;
	}

	@media (max-width: 480px) {
		.monthContainer {
			grid-template-columns: 1fr 1fr;
		}
		.monthItem {
			padding: 1rem;
		}
	}

	@media (min-width: 1000px) {
		.container {
			padding: 4rem 2rem;
		}
		.monthContainer {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}
</style>
