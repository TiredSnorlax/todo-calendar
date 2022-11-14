import type { Handle } from '@sveltejs/kit';


export const handle:Handle = async ({ event, resolve }) => {
	// const userID = event.cookies.get("session");
	// console.log(userID)
	// if (userID) {
	// 	event.locals.userID = userID
	// } else {
	// 	event.locals.userID = null;
	// }
	const response = await resolve(event);
	return response;
};
