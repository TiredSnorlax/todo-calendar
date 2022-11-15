import type { IUser } from './User';

export interface ITodo {
	completed: boolean;
	task: string;
	status: string;
	details?: string;
	user?: IUser;
	_id?: string;
	tag: string;
}
