<script lang="ts">
	import { domain } from '$lib/utils';
	import axios from 'axios';
	import { slide } from 'svelte/transition';

	let username = '';
	let password = '';
	let confirmPassword = '';

	let allowLogin = false;

	let loading = false;

	let errors: Array<boolean> = [false, false, false];

	interface IMessage {
		content: string;
		color: string;
	}
	let messages: IMessage[] = [];

	const send = async () => {
		loading = true;
		console.log('check');
		if (username.length < 1) errors[0] = true;
		if (password.length < 1) errors[1] = true;
		if (confirmPassword.length < 1) errors[2] = true;

		if (confirmPassword !== password) {
			errors[2] = true;
			messages.push({ content: 'Passwords do not match.', color: 'red' });
		}

		if (errors.includes(true)) return (loading = false);
		console.log('send');
		await axios
			.post(domain + 'api/signup', { password, username })
			.then(() => {
				messages = [
					...messages,
					{
						content: `User created successfully`,
						color: 'var(--primary-color)'
					}
				];
				loading = false;
				allowLogin = true;
			})
			.catch((err) => {
				messages = [...messages, { content: err.response.data.message, color: 'red' }];

				console.log(messages);

				console.log(err.response.data.message);
				loading = false;
			});
	};
</script>

<div class="container">
	<h1>Sign up</h1>
	<div class="menu">
		<div class="fieldsContainer">
			<div class="field" class:error={errors[0]}>
				<div class="inputLabel">
					{#if username.length > 0}
						<span transition:slide class="material-icons-outlined"> check </span>
					{:else}
						<span transition:slide class="material-icons-outlined"> account_circle </span>
					{/if}
				</div>
				<div class="inputField">
					<input type="text" placeholder="Username" bind:value={username} />
					<span />
				</div>
			</div>
			<div class="field" class:error={errors[1]}>
				<div class="inputLabel">
					{#if password.length > 0}
						<span transition:slide class="material-icons-outlined"> check </span>
					{:else}
						<span transition:slide class="material-icons-outlined"> password </span>
					{/if}
				</div>
				<div class="inputField">
					<input type="password" placeholder="Password" bind:value={password} />
					<span />
				</div>
			</div>
			<div class="field" class:error={errors[2]}>
				<div class="inputLabel">
					{#if password === confirmPassword && password.length > 0}
						<span transition:slide class="material-icons-outlined"> check </span>
					{:else}
						<span transition:slide class="material-icons-outlined"> pending </span>
					{/if}
				</div>
				<div class="inputField">
					<input type="password" placeholder="Confirm Password" bind:value={confirmPassword} />
					<span />
				</div>
			</div>
		</div>
		<button class="createAccBtn" on:click={send} disabled={loading}>
			{#if loading}
				<p transition:slide>Loading...</p>
			{:else}
				<p transition:slide>Create Account</p>
			{/if}
		</button>
	</div>

	<div class="messages">
		{#each messages as message}
			<p transition:slide style="background: {message.color}">{message.content}</p>
		{/each}
	</div>
	<p>Login <a href="{domain}login">here</a></p>
</div>

<style>
	input {
		border: none;
		outline: none;
		padding: 0.25rem;
		font-size: 1rem;
	}

	h1 {
		color: var(--primary-color);
	}

	.container {
		--primary-color: rgb(128, 128, 255);
		--secondary-color: rgb(51, 160, 51);
		--bg-color: rgb(130, 181, 190);
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		background: var(--bg-color);
	}

	.menu {
		padding: 2rem;
		background: white;
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fieldsContainer {
		display: flex;
		flex-direction: column;
	}

	.field {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		border-radius: 1rem;
		padding: 0.5rem;
	}

	.field.error {
		border: 2px solid red;
	}

	.field.error span {
		color: red;
	}

	.field.error input {
		color: red;
	}

	.field.error .inputField span {
		background: red;
	}

	.inputLabel span {
		display: flex;
		color: var(--primary-color);
	}

	.inputField {
		position: relative;
		flex: 1 1 0;
	}

	.inputField span {
		background: var(--secondary-color);
		display: block;
		width: 0;
		height: 2px;

		left: 0;
		right: 0;
		bottom: 0;

		transition: 0.5s;
	}

	.inputField input:not(:placeholder-shown) ~ span,
	.inputField input:focus ~ span {
		width: 100%;
	}

	.createAccBtn {
		border: none;
		background: var(--secondary-color);
		color: white;
		margin-top: 2rem;
		padding: 0.25rem 1.5rem;
		border-radius: 2rem;
		font-size: 1.1rem;
	}

	.createAccBtn:disabled {
		background: none;
		color: grey;
	}

	.messages {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.messages p {
		/* background: red; */
		color: white;

		border-radius: 2rem;
		padding: 0.5rem 1.5rem;
	}
</style>
