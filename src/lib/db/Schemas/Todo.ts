import mongoose from 'mongoose';
import type { IUser } from './User';
const { Schema } = mongoose;

export interface ITodo {
	completed: boolean;
	task: string;
	status: string;
	details?: string;
	user?: IUser;
	_id?: string;
	tag: string;
}

export const todoSchema = new Schema<ITodo>({
	completed: Boolean,
	task: String,
	status: String,
	details: { type: String, required: false },
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'user'
	},
	tag: String,
});

export const TodoModel = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
