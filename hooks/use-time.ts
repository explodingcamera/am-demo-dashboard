import { useState } from 'react';

const MONTHS = [
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
	'December',
];

export const useTime = () => {
	const [currentDate, setCurrentDate] = useState(() => new Date());
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const addMonth = (n: number) =>
		setCurrentDate(d => new Date(d.setMonth(d.getMonth() + n)));

	return {
		currentMonth,
		currentMonthString: MONTHS[currentMonth],
		currentYear,
		addMonth,
	};
};
