<script lang="ts">
	import { goto } from '$app/navigation';
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { fade, slide } from 'svelte/transition';
	import { user } from '$lib/Layout/stores';

	let username = '';
	let password = '';

	let errorMessage: null | string = null;

	let loading = false;

	const send = async () => {
		loading = true;
		await axios
			.post(domain + 'api/login', {
				username,
				password
			})
			.then((res) => {
				errorMessage = null;
				user.set(res.data);
				loading = false;
				goto('2022');
			})
			.catch((err) => {
				errorMessage = err.response.data.message;
				loading = false;
			});
	};
</script>

<div class="container">
	<h1>Login</h1>
	<div class="loginMenu">
		<div>
			<span class="material-icons-outlined"> account_circle </span>
			<div class="inputField">
				<input required type="text" bind:value={username} />
				<p>Username</p>
				<span />
			</div>
		</div>
		<div>
			<span class="material-icons-outlined"> password </span>
			<div class="inputField">
				<input required type="password" bind:value={password} />
				<p>Password</p>
				<span />
			</div>
		</div>
		{#if loading}
			<p transition:slide>Loading...</p>
		{:else}
			<button transition:slide class="submitBtn" on:click={send} disabled={!username || !password}
				>Enter</button
			>
		{/if}
	</div>
	{#if errorMessage}
		<div transition:slide class="messageContainer">
			<p>{errorMessage}</p>
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;

		--primary-color: rgb(148, 148, 231);
		--secondary-color: green;
		--bg-color: rgb(130, 181, 190);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: var(--bg-color);
	}

	h1 {
		color: var(--primary-color);
		padding: 1rem;
	}

	.loginMenu {
		background: white;
		padding: 2rem;
		padding-bottom: 1rem;
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 1rem;
	}

	.loginMenu > div {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.loginMenu > div > span {
		color: var(--primary-color);
	}

	input {
		position: relative;
		background: none;
		border: none;
		outline: none;
		padding: 0.5rem;
		z-index: 10;

		color: var(--primary-color);
	}

	.inputField {
		position: relative;
	}

	.inputField span {
		content: '';
		position: absolute;

		height: 3px;
		left: 0;
		width: 0;
		bottom: 0;
		margin: 0 auto;

		background: var(--primary-color);
		border-radius: 10px;
		transition: 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
	}

	input:focus ~ span,
	input:valid ~ span {
		width: 100%;
	}

	.inputField p {
		color: var(--primary-color);
		position: absolute;
		height: min-content;
		padding-left: 0.5rem;
		user-select: none;
		z-index: 1;

		inset: 0;
		margin: auto 0;

		transition: 0.3s;
	}

	input:focus ~ p,
	input:valid ~ p {
		transform: translate(-10%, -80%) scale(0.8);
	}

	.submitBtn {
		background: none;
		outline: none;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;

		border-radius: 5rem;
		border: 2px solid var(--secondary-color);
		color: var(--secondary-color);

		transition: 0.3s;

		cursor: pointer;
	}

	.submitBtn:disabled {
		color: var(--bg-color);
		border-color: transparent;

		cursor: not-allowed;
	}

	.messageContainer {
		max-width: 100%;
		background: rgb(255, 133, 133);
		padding: 0.5rem 1rem;
		margin: 1rem;
		border-radius: 5rem;
		text-align: center;
	}

	.messageContainer p {
		color: white;
	}
</style>
