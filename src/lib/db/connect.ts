import { domain } from '$lib/utils';

export const connect = async () => {
	await fetch(domain + 'api/connect', {
		method: 'POST'
	});
};
