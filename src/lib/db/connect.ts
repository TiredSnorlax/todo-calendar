import { domain } from '$lib/utils';

// export const connect = async () => {
// 	if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
// 		await mongoose.connect(uri, { dbName: 'calendar-todo-db' }).then(() => {
// 			console.log('new connection');
// 		});
// 	}
// };

const connect = async () => {
	await fetch(domain + 'api/connect', {
		method: 'POST'
	});
};

export default connect;
