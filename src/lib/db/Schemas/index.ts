import mongoose from 'mongoose';

import type { ITheme } from '$lib/Layout/Theme';
import type { IDate } from './Date';
import type { ITodo } from './Todo';
import type { IUser } from './User';

const { Schema } = mongoose;

const dateSchema = new Schema<IDate>({
	year: Number,
	month: Number,
	day: Number,
	tags: [String],
	todos: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Todo'
		}
	],
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}
});

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

export const todoSchema = new Schema<ITodo>({
	completed: Boolean,
	task: String,
	status: String,
	details: { type: String, required: false },
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'user'
	},
	tag: String
});

export const TodoModel = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
export const DateModel = mongoose.models.Date || mongoose.model('Date', dateSchema);
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
