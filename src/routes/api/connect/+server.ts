import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

import type { RequestHandler } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let cached = global.mongoose;

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

export const POST: RequestHandler = async () => {
	if (!cached) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		cached = global.mongoose = { conn: null, promise: null };
	}

	await connect();

	return new Response('connected');
};
