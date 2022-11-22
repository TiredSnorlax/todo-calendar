<script lang="ts">
	export let title: string;
	export let id: string;
	export let scrollToTop: () => void;
</script>

<h2 id={'help-' + id} on:click={scrollToTop}>{title}</h2>
<div class="section">
	<slot />
</div>

<style>
	h2 {
		color: var(--primary-color);
		position: sticky;

		font-size: 2rem;

		width: 100%;
		text-align: center;
		text-decoration: underline;
		text-decoration-thickness: 3px;

		padding-top: 2rem;
		padding-left: 1rem;
		padding-bottom: 0.5rem;

		top: 0;

		z-index: 30;

		background: white;
	}

	.section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		position: relative;

		padding: 4rem 0;
	}

	.section > :global(img) {
		margin-top: 3rem;
		margin-bottom: 1rem;
		width: 70%;
		border-radius: 0.5rem;
		border: 2px solid var(--primary-color);
	}

	@media (max-width: 480px) {
		h2 {
			font-size: 1.5rem;
		}
	}
</style>
