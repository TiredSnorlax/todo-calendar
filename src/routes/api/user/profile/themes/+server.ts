import connect from '$lib/db/connect';
import { UserModel } from '$lib/db/Schemas';
import type { IUser } from '$lib/db/Schemas/User';
import type { HydratedDocument } from 'mongoose';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ cookies, request }) => {
	await connect();
	const userID = cookies.get('session');
	const { additionalTheme } = await request.json();

	const user = (await UserModel.findById(userID).exec()) as HydratedDocument<IUser>;

	user.settings.additionalThemes.push(additionalTheme);
	user.settings.themeID = additionalTheme.id;

	await user.save();

	return new Response(JSON.stringify(user));
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	await connect();
	const userID = cookies.get('session');
	const { updatedTheme, originalId } = await request.json();

	const user = (await UserModel.findById(userID).exec()) as HydratedDocument<IUser>;
	const toBeUpdatedIndex = user.settings.additionalThemes.findIndex((t) => t.id === originalId);
	user.settings.additionalThemes[toBeUpdatedIndex] = updatedTheme;
	if (updatedTheme.id !== originalId) {
		user.settings.themeID = updatedTheme.id;
	}

	await user.save();

	return new Response(JSON.stringify(user));
};
