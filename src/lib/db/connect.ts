import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

const uri = MONGODB_URI;

export const connect = async () => {
	const connectionStatus = mongoose.connection.readyState;
	if (connectionStatus !== 1) {
		console.log('new connection');
		await mongoose.connect(uri, { dbName: 'calendar-todo-db' });
	}
};
