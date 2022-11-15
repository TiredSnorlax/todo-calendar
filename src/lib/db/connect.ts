import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

const uri = MONGODB_URI;

let status = -1;

export const connect = async () => {
	status = mongoose.connection.readyState;
	if (status === 0 || status === 3) {
		await mongoose.connect(uri, { dbName: 'calendar-todo-db' });
		status = 1;
	}
};

export const db = mongoose
