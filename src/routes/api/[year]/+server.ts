import { connect } from '$lib/db/connect';
import { DateModel } from '$lib/db/Schemas';
import type { IDate } from '$lib/db/Schemas/Date';
import type { RequestHandler } from '@sveltejs/kit';
import type { HydratedDocument } from 'mongoose';

export const POST: RequestHandler = async ({ cookies, params }) => {
	await connect();
	const { year } = params;

	const userId = cookies.get('session');

	const highlightedYear: number[][] = [];

	for (let i = 1; i < 13; i++) {
		const dates = (await DateModel.find({
			year,
			month: i,
			user: userId
		}).exec()) as HydratedDocument<IDate>[];

		let highlightedDates: number[] = [];
		if (dates) {
			highlightedDates = dates.filter((d) => d.todos.length > 0).map((d) => d.day);
		}
		highlightedYear.push(highlightedDates)
	}

	return new Response(JSON.stringify(highlightedYear));
};
