import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UserModel, type IUser } from '$lib/db/Schemas/User';
import type { HydratedDocument } from 'mongoose';
import { connect } from '$lib/db/connect';

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
	await connect();
	const { username, password } = await request.json();

	const user = (await UserModel.findOne({ username, password }).exec()) as
		| HydratedDocument<IUser>
		| undefined;

	if (user) {
		cookies.set('session', user._id.toString(), {
			path: '/',
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 30
		});
		return new Response(JSON.stringify(user));
	} else {
		throw error(400, 'Invalid username or password');
	}
};
