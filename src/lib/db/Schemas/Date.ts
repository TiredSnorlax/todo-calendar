import type { ITodo } from './Todo';
import type { IUser } from './User';

export interface IDate {
	year: number;
	month: number;
	day: number;
	_id?: string;
	tags: string[];
	todos: ITodo[];
	user: IUser;
}
