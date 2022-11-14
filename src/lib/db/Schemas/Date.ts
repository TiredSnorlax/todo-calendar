import mongoose from 'mongoose';
import { TodoModel, type ITodo } from './Todo';
import type { IUser } from './User';

const { Schema } = mongoose;

const todo = TodoModel;

export interface IDate {
	year: number;
	month: number;
	day: number;
	_id?: string;
	tags: string[];
	todos: ITodo[];
	user: IUser;
}

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

export const DateModel = mongoose.models.Date || mongoose.model('Date', dateSchema);
