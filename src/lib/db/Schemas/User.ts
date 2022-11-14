import type { ITheme } from '$lib/Layout/Theme';
import mongoose from 'mongoose';
import { DateModel, type IDate } from './Date';
const { Schema } = mongoose;

const date = DateModel;

export interface IUserSettings {
	themeID: string;
	additionalThemes: Array<ITheme>;
}

export interface IUser {
	username: string;
	password: string;
	settings: IUserSettings;
	id: string;

	dates?: IDate[]
}

const userSchema = new Schema<IUser>({
	username: String,
	password: String,
	settings: { type: { themeID: String, additionalThemes: Array<ITheme> }, required: false },

	dates: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Date'
		}
	]
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
