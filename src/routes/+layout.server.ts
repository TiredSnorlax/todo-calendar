import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ params, routeId, cookies }) => {
	const { year, month, day } = params;
	if (routeId !== 'login') {
		const session = cookies.get('session');
		if (!session) {
			throw redirect(307, '/login');
		}
	}
	return {
		year,
		month,
		day
	};
};
