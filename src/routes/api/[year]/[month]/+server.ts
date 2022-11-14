import { DateModel, type IDate } from '$lib/db/Schemas/Date';
import type { RequestHandler } from '@sveltejs/kit';
import type { HydratedDocument } from 'mongoose';

export const POST: RequestHandler = async ({ cookies, params }) => {
	const { year, month } = params;

	const userId = cookies.get('session');

	const dates = (await DateModel.find({
		year,
		month,
		user: userId
	}).exec()) as HydratedDocument<IDate>[];

	let highlightedDates: number[] = [];
	if (dates) {
		highlightedDates = dates.map((d) => d.day);
	}

	return new Response(JSON.stringify(highlightedDates));
};
