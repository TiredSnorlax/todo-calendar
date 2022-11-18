import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

// export const connect = async () => {
// 	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
// 		await mongoose.connect(uri, { dbName: 'calendar-todo-db' }).then(() => {
// 			console.log('new connection');
// 		});
// 	}
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		console.log('new connection');
		const opts = {
			bufferCommands: false,
			dbName: 'calendar-todo-db'
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

// const connect = async () => {
// 	await fetch(domain + 'api/connect', {
// 		method: 'POST'
// 	});
// };

export default connect;
