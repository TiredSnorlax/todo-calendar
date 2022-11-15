import { db } from '../connect';

import type { ITheme } from '$lib/Layout/Theme';
import type { IDate } from './Date';
import type { ITodo } from './Todo';
import type { IUser } from './User';

const { Schema } = db;

const dateSchema = new Schema<IDate>({
	year: Number,
	month: Number,
	day: Number,
	tags: [String],
	todos: [
		{
			type: db.Types.ObjectId,
			ref: 'Todo'
		}
	],
	user: {
		type: db.Types.ObjectId,
		ref: 'User'
	}
});

const userSchema = new Schema<IUser>({
	username: String,
	password: String,
	settings: { type: { themeID: String, additionalThemes: Array<ITheme> }, required: false },

	dates: [
		{
			type: db.Types.ObjectId,
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
		type: db.Types.ObjectId,
		ref: 'user'
	},
	tag: String
});

console.log('initModels');
export const TodoModel = db.models.Todo || db.model('Todo', todoSchema);
export const DateModel = db.models.Date || db.model('Date', dateSchema);
export const UserModel = db.models.User || db.model('User', userSchema);
