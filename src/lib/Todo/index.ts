export interface ITodo {
	completed: boolean;
	task: string;
	status: string;
	details?: string;
	_id?: string;
}
export interface IChange {
	todoId: string;
	change: { [key: string]: any };
}

export const options = ['Urgent', 'Not Urgent', 'Optional'];
export const statusColors = ['Red', 'Yellow', 'Blue'];
