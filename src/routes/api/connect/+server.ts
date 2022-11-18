import { dbConnect } from '$lib/db/connect';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	await dbConnect();
	return new Response('connected');
};
