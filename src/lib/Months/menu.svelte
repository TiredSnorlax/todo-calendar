<script lang="ts">
	import { days, months, generateMonth } from '$lib/Months/index';
	import { fade, fly, slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import MonthCalendar from './MonthCalendar.svelte';
	import { send, receive } from './monthCrossFade';

	export let selectedMonth: number;
	export let year: number;

	let changeKey = -1;

	let containerDiv: HTMLDivElement | null;
	const close = (e: MouseEvent) => {
		change = 0;
		changeKey = selectedMonth;
		if (e.target === containerDiv) {
			selectedMonth = 0;
		}
	};

	let change = 0;

	const increment = () => {
		selectedMonth!++;
		if (selectedMonth! > 12) {
			selectedMonth = 1;
			year++;
		}
		change = 1;
	};
	const decrement = () => {
		selectedMonth!--;
		if (selectedMonth! < 1) {
			selectedMonth = 12;
			year--;
		}
		change = -1;
	};
</script>

{#if selectedMonth}
	<div class="container" transition:fade  class:active={selectedMonth} bind:this={containerDiv} on:click={close}>
		<div class="menu" in:receive={{ key: selectedMonth }} out:send={{ key: changeKey }}>
			{#key selectedMonth}
				<div
					in:fly={{
						duration: 300,
						x: change * window.innerWidth,
						opacity: 0.5,
						easing: quadInOut
					}}
					out:fly={{
						duration: 300,
						x: -change * window.innerWidth,
						opacity: 0.5,
						easing: quadInOut
					}}
				>
					<h2>
						{months[selectedMonth]}
					</h2>
					<MonthCalendar {year} {selectedMonth} titleLength={3} />
				</div>
			{/key}
		</div>
		<div class="navBtnContainer" transition:fly|local>
			<button on:click={decrement} class="leftBtn"
				><span class="material-icons-outlined"> arrow_left </span></button
			>
			<button on:click={increment} class="rightBtn">
				<span class="material-icons-outlined"> arrow_right </span></button
			>
		</div>
	</div>
{/if}

<style>
	.container.active {
		position: fixed;
		inset: 0;

		background: rgba(0, 0, 0, 0.3);

		display: flex;
		justify-content: center;
		align-items: center;

		padding: 2rem;

		flex-direction: column;
	}

	.container h2 {
		text-align: center;
		padding-bottom: 1rem;
	}

	.menu {
		max-width: 800px;
		width: 100%;
		aspect-ratio: 1;
		padding: 2rem;
		background: white;
		overflow: hidden;
		border-radius: 2rem;

		display: flex;
		justify-content: center;
		flex-direction: column;

		position: relative;
	}

	.menu > div:first-child {
		position: absolute;
		inset: 2rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
	}

	.navBtnContainer {
		background: white;
		margin: 1rem;
		border-radius: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.leftBtn,
	.rightBtn {
		background: none;
		outline: none;
		border: none;

		display: flex;

		cursor: pointer;
	}

	.leftBtn:hover,
	.rightBtn:hover {
		transform: scale(1.5);
	}

	.leftBtn span,
	.rightBtn span {
		font-size: 36px;
	}
</style>
