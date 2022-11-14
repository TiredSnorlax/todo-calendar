import { connect } from '$lib/db/connect';
import { UserModel, type IUser } from '$lib/db/Schemas/User';
import { error } from '@sveltejs/kit';
import type { HydratedDocument } from 'mongoose';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	await connect();
	const userID = cookies.get('session');
	if (userID) {
		try {
			const user = (await UserModel.findById(userID).exec()) as HydratedDocument<IUser>;
			return new Response(JSON.stringify(user));
		} catch (err) {
			throw error(400, 'No user found');
		}
	} else {
		return new Response(null);
	}
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	await connect();
	const userID = cookies.get('session');
	const newInfo = await request.json();
	if (userID) {
		try {
			const user = (await UserModel.findByIdAndUpdate(
				userID,
				newInfo
			).exec()) as HydratedDocument<IUser>;
			return new Response(JSON.stringify(user));
		} catch (err) {
			throw error(400, 'Update went wrong');
		}
	} else {
		throw error(400, 'No user id ');
	}
};
