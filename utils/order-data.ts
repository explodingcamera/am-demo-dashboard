import { parseCurrencyEuro } from './currency-format';

export interface Order {
	index: number;
	date: string;
	month: number;
	year: number;
	amount: number;
	name: string;
}

export interface Product {
	month: number;
	amount: number;
	name: string;
}

export const filterOrders = (
	orders: any,
	currentMonth: number,
	currentYear: number,
): Order[] =>
	orders.data?.result?.values
		?.map(([index, date, name, amount]) => ({
			index: parseInt(index, 10),
			date,
			month: parseInt(date.split('.')[1], 10) - 1,
			year: parseInt(date.split('.')[2], 10),
			name,
			amount: parseCurrencyEuro(amount),
		}))
		.filter(d => d.month === currentMonth && d.year === currentYear) || [];

export const filterProducts = (currentOrders: Order[]) => {
	const products: Record<string, Product> = {};
	let total = 0;
	for (const order of currentOrders) {
		products[order.name] = {
			...order,
			amount: (products?.[order?.name]?.amount || 0) + order.amount,
		};
		total += order.amount;
	}

	return { products, total };
};
