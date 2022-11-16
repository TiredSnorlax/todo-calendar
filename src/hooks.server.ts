import { connect } from '$lib/db/connect';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	await connect();
	const response = await resolve(event);
	return response;
};
