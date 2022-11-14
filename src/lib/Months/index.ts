export interface IMonth {
	index: number;
	month: string;
	number: number;
}

export enum days {
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
}

export enum months {
	'',
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
}

const leapYear = (year: number) => {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

export const getMonths = (year: number) => {
	return [
		{ month: 'January', number: 31, index: 1 },
		{ month: 'February', number: leapYear(year) ? 29 : 28, index: 2 },
		{ month: 'March', number: 31, index: 3 },
		{ month: 'April', number: 30, index: 4 },
		{ month: 'May', number: 31, index: 5 },
		{ month: 'June', number: 30, index: 6 },
		{ month: 'July', number: 31, index: 7 },
		{ month: 'August', number: 31, index: 8 },
		{ month: 'September', number: 30, index: 9 },
		{ month: 'October', number: 31, index: 10 },
		{ month: 'November', number: 30, index: 11 },
		{ month: 'December', number: 31, index: 12 }
	];
};

export const generateMonth = (month: string, year: number) => {
	const date = new Date(`${month} 1, ${year}`);
	const firstDay = date.getDay();

	const matrix: number[][] = [[], [], [], [], [], [], []];
	const _month = getMonths(year).filter((m) => m.month === month)[0];
	if (firstDay > 0) {
		for (let i = 0; i < firstDay; i++) {
			matrix[i].push(0);
		}
	}
	for (let i = 0; i < _month.number; i++) {
		date.setDate(i + 1);
		const _date = date.getDate();
		const _dayOfWeek = date.getDay();
		matrix[_dayOfWeek].push(_date);
	}

	return matrix;
};
