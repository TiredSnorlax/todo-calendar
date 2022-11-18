import { connect } from '$lib/db/connect';
import { DateModel } from '$lib/db/Schemas';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	await connect();
	const userID = cookies.get('session');

	const dates = await DateModel.find({ user: userID })
		.populate('todos')
		.sort({ year: 1, month: 1, day: 1 })
		.exec();

	return new Response(JSON.stringify(dates));
};
