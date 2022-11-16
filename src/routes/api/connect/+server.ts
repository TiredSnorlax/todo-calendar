import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';
import type { RequestHandler } from './$types';

const uri = MONGODB_URI;

export const POST: RequestHandler = async () => {
	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
		console.log(' new connection');
		await mongoose.connect(uri, { dbName: 'calendar-todo-db' });
	}
	return new Response('Db connected');
};
