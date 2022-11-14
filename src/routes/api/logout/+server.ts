import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	console.log('delete cookies');
	cookies.delete('session', { path: '/' });

	return new Response('Logout Successful');
};
