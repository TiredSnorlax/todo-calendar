<script lang="ts">
	import { days, getMonths } from '$lib/Months';
	import { domain } from '$lib/utils';
	import { fade, scale, blur } from 'svelte/transition';
	import type { PageData } from '.svelte-kit/types/src/routes/[year]/[month]/[day]/$types';

	export let data: PageData;
	let day: number = parseInt(data.day!);
	let month: number = parseInt(data.month!);
	let year: number = parseInt(data.year!);

	const getDay = (d: number, m: number, y: number) => {
		return new Date(y, m - 1, d).getDay();
	};

	const nextDay = () => {
		if (!day) return;
		let newDay = day + 1;
		let _month = month;
		let _year = year;
		if (newDay > getMonths(_year)[_month - 1].number) {
			newDay = 1;
			_month += 1;
			if (_month > 12) {
				_month = 1;
				_year += 1;
			}
		}

		return `${domain}${_year}/${_month}/${newDay}`;
	};

	const prevDay = () => {
		if (!day) return;
		let newDay = day - 1;
		let _month = month;
		let _year = year;
		if (newDay === 0) {
			_month -= 1;
			if (_month < 1) {
				_month = 12;
				_year -= 1;
			}
			newDay = getMonths(_year)[_month - 1].number;
		}

		return `${domain}${_year}/${_month}/${newDay}`;
	};

	let nextLink = nextDay();
	let prevLink = prevDay();

	$: dayOfWeek = getDay(day, month, year);
</script>

<div class="container" transition:fade>
	<div class="dateContainer">
		<p transition:scale>{day ?? ' '}</p>
		<p transition:scale={{ delay: 200 }}>/</p>
		<p transition:scale={{ delay: 400 }}>{month ?? ''}</p>
		<p transition:scale={{ delay: 600 }}>/</p>
		<p transition:scale={{ delay: 800 }}>{year ?? ''}</p>
	</div>
	<p class="dayLabel" transition:blur={{ duration: 500 }}>{days[dayOfWeek]}</p>
	<div class="arrowContainer">
		<a href={prevLink}><span class="material-icons-outlined"> chevron_left </span></a>
		<a href={nextLink}><span class="material-icons-outlined"> chevron_right </span></a>
	</div>
</div>

<style>
	.container {
		top: 0;
		left: 0;
		right: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.dateContainer {
		position: relative;
		padding-top: 1rem;

		width: 100%;
		max-width: 600px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.arrowContainer {
		position: absolute;
		inset: 0;
		/* left: -1rem;
		right: -1rem; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.arrowContainer a {
		height: 24px;
		color: var(--primary-color);
	}

	.arrowContainer a:hover {
		color: white;
	}

	p {
		color: var(--primary-color);
		font-size: 4rem;
		font-family: 'Oswald', sans-serif;
	}

	.dayLabel {
		font-size: 2rem;
		font-family: 'Open Sans', sans-serif;
		font-weight: bold;
		color: var(--secondary-color);
	}

	@media (max-width: 480px) {
		p {
			font-size: 3rem;
		}
	}
</style>
