<div>
	<p>Calendar</p>
	<span>TODO</span>
</div>

<style>
	div {
		position: relative;
        width: fit-content;
	}

	p {
		color: var(--primary-color);
		font-size: 4rem;
		transform: translate(0.5rem, 0.5rem);
        width: fit-content;
	}

	span {
		position: absolute;

		width: fit-content;
		height: fit-content;
		background: var(--secondary-color);
		color: white;
		padding: 0.25rem 0.5rem;
		font-size: 1.5rem;

		bottom: -1rem;
		left: calc(100% - 6px);

		border-radius: 5px;

		font-family: 'Oswald', sans-serif;
	}

    @media (max-width: 480px) {
        p {
            font-size: 3rem;
        }

        span {
            font-size: 1rem;
        }
    }
</style>
