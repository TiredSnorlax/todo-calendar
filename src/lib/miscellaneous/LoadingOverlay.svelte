<script lang="ts">
	import { fade } from "svelte/transition";


	export let loading: boolean;

	let str = 'Loading...';
</script>

{#if loading}
	<div class="container" transition:fade>
		{#each str as char, i}
			<p style="--delay: {i * 50}ms">{char}</p>
		{/each}
	</div>
{/if}

<style>
	.container {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100vw;
		height: 100vh;

		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(3px);

		z-index: 999;
	}

	p {
		font-size: 1.2rem;
		color: white;
		animation: pAnim 1.5s ease-in-out var(--delay) infinite;
	}

	@keyframes pAnim {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(10px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
