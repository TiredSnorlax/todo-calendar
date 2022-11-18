// import connect from '$lib/db/connect';
import { UserModel } from '$lib/db/Schemas';
import type { IUser } from '$lib/db/Schemas/User';
import { error } from '@sveltejs/kit';
import type { HydratedDocument } from 'mongoose';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// await connect();
	const { username, password } = await request.json();

	const _user = (await UserModel.findOne({ username }).exec()) as HydratedDocument<IUser>;

	if (_user) {
		throw error(400, 'Username already exists!');
	} else {
		const defaultSettings = {
			additionalThemes: [],
			themeID: 1
		};
		const newUser = new UserModel({ username, password, settings: defaultSettings });
		newUser.save();
		return new Response('User created successfully');
	}
};
