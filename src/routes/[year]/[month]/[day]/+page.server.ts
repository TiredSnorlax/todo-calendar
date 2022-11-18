import type { PageServerLoad } from './$types';
import { connect } from '$lib/db/connect';
import { DateModel } from '$lib/db/Schemas';

export const load: PageServerLoad = async ({ cookies, params }) => {
	await connect();
	const userID = cookies.get('session');
	const { year, month, day } = params;
	let date = await DateModel.findOne({ year, month, day, user: userID }).populate('todos');
	if (!date) {
		date = { year, month, day, todos: [], tags: [] };
	}

	return {
		date: JSON.stringify(date)
	};
};
