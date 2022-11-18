<script lang="ts">
	import { goto } from '$app/navigation';
	import { days, generateMonth, months } from './index';
	export let year: number;
	export let selectedMonth: number;
	export let titleLength: number;
	export let highlightedDates: number[] = [];

	let matrix: number[][];

	$: {
		if (selectedMonth) matrix = generateMonth(months[selectedMonth!], year);
	}

	const datesGoto = async (date: number) => {
		await goto(`./${year}/${selectedMonth}/${date}`);
	};
</script>

<div class="datesContainer">
	{#each matrix as day, i}
		<div class="dayRow">
			<p class="dayLabels">{days[i].slice(0, titleLength)}</p>
			<div class="dates">
				{#each day as date, i}
					<button
						on:click={() => datesGoto(date)}
						class:hidden={date === 0}
						class:highlighted={highlightedDates.includes(date)}
						class="dateItem"
					>
						<p>
							{date}
						</p>
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.datesContainer {
		text-align: center;
		display: grid;
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		gap: 2px;
	}

	.dayLabels {
		font-weight: bold;
		color: var(--secondary-color);
	}

	.dates {
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		align-items: end;
		gap: 2px;
	}

	.dateItem {
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(48, 48, 48);
		transition: 0.1s;
		border-radius: 4px;
	}

	.dateItem p {
		font-family: 'Oswald', sans-serif;
		font-weight: bold;
		transition: 0.1s;
	}

	.dateItem:hover {
		background: var(--secondary-color) !important;
		color: white;
	}

	.hidden {
		opacity: 0;
		user-select: none;
		cursor: initial;
	}

	.dateItem.highlighted {
		background: var(--primary-color);
		color: white;
	}

	button {
		color: inherit;
		background: none;
		border: none;
	}

	@media (max-width: 480px) {
		.dayLabels {
			display: none;
		}
		.dateItem {
			font-size: 0.7rem;
		}
	}
</style>
