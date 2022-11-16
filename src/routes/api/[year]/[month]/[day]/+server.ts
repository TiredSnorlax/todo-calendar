import { error, type RequestHandler } from '@sveltejs/kit';
import type { IUser } from '$lib/db/Schemas/User';
import type { ITodo } from '$lib/db/Schemas/Todo';
import type { IDate } from '$lib/db/Schemas/Date';
import { TodoModel, UserModel, DateModel } from '$lib/db/Schemas';
import type { HydratedDocument } from 'mongoose';
import { connect } from '$lib/db/connect';
import type { IChange } from '$lib/Todo';

export const PUT: RequestHandler = async ({ request, params, cookies }) => {
	await connect();
	const data = await request.json();
	const { year, month, day } = params;
	const user = (await UserModel.findById(cookies.get('session')).populate(
		'dates'
	)) as HydratedDocument<IUser>;

	if (!year || !month || !day) throw error(400, 'Invalid date');
	const date = user.dates?.find(
		(date) =>
			date.year === parseInt(year) && date.month === parseInt(month) && date.day === parseInt(day)
	);

	const newTodo: HydratedDocument<ITodo> = new TodoModel({
		...data.newTodo,
		user
	});
	await newTodo.save();

	let dateObj: HydratedDocument<IDate>;
	if (date) {
		dateObj = (await DateModel.findById(date._id).exec()) as HydratedDocument<IDate>;
		await dateObj.updateOne({
			$push: { todos: newTodo }
		});
		if (newTodo.tag !== '') {
			await dateObj.updateOne({
				$addToSet: { tags: newTodo.tag }
			});
		}
	} else {
		dateObj = new DateModel({ year, month, day, user, tags: [], todos: [newTodo] });
		await user.updateOne({
			$push: { dates: dateObj }
		});
		if (newTodo.tag !== '') {
			dateObj.tags.push(newTodo.tag);
		}
		await user.save();
	}

	// add tags to date

	dateObj.save();
	// console.log(newTodo);
	return new Response(JSON.stringify({ newTodo }));
};

export const DELETE: RequestHandler = async ({ request, cookies, params }) => {
	await connect();
	const { year, month, day } = params;
	const { id } = await request.json();

	// const user = (await UserModel.findById(cookies.get('session'))) as HydratedDocument<IUser>;
	// if (user.todos) {
	// 	user.todos = user.todos.filter((t) => t._id !== id);
	// 	user.markModified('todos');
	// }

	// const userId = new mongoose.Types.ObjectId(cookies.get('session'));

	const date = (await DateModel.findOne({
		year,
		month,
		day,
		user: cookies.get('session')
	}).exec()) as HydratedDocument<IDate>;
	if (date.todos) {
		date.todos = date.todos.filter((t) => t._id?.toString() !== id);
		date.markModified('todos');
		await date.save();
	}
	await TodoModel.findByIdAndDelete(id);
	return new Response(JSON.stringify({ todos: date.todos }));
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	await connect();
	const userId = cookies.get('session');
	const { modified }: { modified: IChange[] } = await request.json();

	try {
		for (let i = 0; i < modified.length; i++) {
			const { todoId, change } = modified[i];
			const todo = (await TodoModel.findById(todoId).exec()) as HydratedDocument<ITodo>;
			if (todo.user && todo.user.toString() === userId) {
				await TodoModel.updateOne({ _id: todoId }, change);
			} else {
				throw error(403, 'Not authorised');
			}
		}
		return new Response('Successful');
	} catch (err) {
		console.log(err);
		throw error(400, 'Something went wrong');
	}
};
