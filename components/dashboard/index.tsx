import styles from './dashboard.module.scss';

import {
	formatCurrencyEuro,
	parseCurrencyEuro,
} from '../../utils/currency-format';

import { useSheet } from './../../hooks/use-sheet';
import { useCallback } from 'react';
import { useTime } from '../../hooks/use-time';
import { useRefresh } from '../../hooks/use-refresh';

const leftArrow = (
	<svg
		width="11"
		height="17"
		viewBox="0 0 11 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.4638 2.18875L8.52502 0.25L0.275024 8.5L8.52502 16.75L10.4638 14.8113L4.16627 8.5L10.4638 2.18875Z"
			fill="#C4C4C4"
		/>
	</svg>
);

const Header: React.FC<{
	nextRefresh: number;
	month: string;
	changeMonth: (n: number) => void;
	year: number;
}> = ({ nextRefresh, changeMonth, month, year }) => (
	<div className={styles.header}>
		<div>
			<h3>Order Dashboard</h3>
			<div>
				<h2>
					{month} {year}
				</h2>
				<button onClick={() => changeMonth(-1)} type="button">
					{leftArrow}
				</button>
				<button onClick={() => changeMonth(+1)} type="button">
					{leftArrow}
				</button>
			</div>
		</div>
		<div>
			<h2>
				Refresh in{' '}
				<b>
					<span>{nextRefresh}</span>
				</b>
			</h2>
		</div>
	</div>
);

const Hero: React.FC<{ value: number; loading: boolean }> = ({
	value,
	loading,
}) => (
	<div className={styles.hero}>
		<h1>
			{loading || import.meta.env.SSR
				? 'Loading...'
				: formatCurrencyEuro(value || 0)}
		</h1>
	</div>
);

interface Order {
	index: number;
	date: string;
	month: number;
	year: number;
	amount: number;
	name: string;
}

interface Product {
	month: number;
	amount: number;
	name: string;
}

const Orders: React.FC<{ orders: Order[] }> = ({ orders }) => (
	<div>
		<table>
			<thead>
				<tr>
					<td>NR</td>
					<td>DATE</td>
					<td>PRODUCT NAME</td>
					<td>ORDER VOLUME</td>
				</tr>
			</thead>
			<tbody>
				{orders.map(order => (
					<tr key={order.index}>
						<td>{order.index}</td>
						<td>{order.date}</td>
						<td>{order.name}</td>
						<td>{order.amount}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const TopProducts: React.FC<{ products: Product[] }> = ({ products }) => (
	<div>
		<table>
			<thead>
				<tr>
					<td>TOP 5 PRODUCTS</td>
				</tr>
			</thead>
			<tbody>
				{products.map(product => (
					<tr key={products.indexOf(product)}>
						<td>{product.name}</td>
						<td>{product.amount}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const filterOrders = (
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

const filterProducts = (currentOrders: Order[]) => {
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

export const Dashboard = () => {
	const time = useTime();

	const orders = useSheet({ range: 'Orders!A2:F' });
	const currentOrders = filterOrders(
		orders,
		time.currentMonth,
		time.currentYear,
	);

	const targets = useSheet({ range: 'Targets!A2:B' });
	const { products, total } = filterProducts(currentOrders);

	const refresh = useCallback(
		async () => Promise.all([orders.refetch(), targets.refetch]),
		[orders, targets],
	);

	const refreshIn = useRefresh(refresh, 60);

	const top5products = Object.values(products)
		?.sort((a, b) => a.amount - b.amount)
		.slice(0, 5);

	const currentTarget: string | undefined = targets.data?.result?.values?.find(
		([month]) => month === time.currentMonthString,
	)[1];

	const currentTargetNumber = currentTarget
		? parseCurrencyEuro(currentTarget)
		: undefined;

	return (
		<div className={styles.wrapper}>
			<Header
				nextRefresh={refreshIn}
				month={time.currentMonthString}
				changeMonth={time.addMonth}
				year={time.currentYear}
			/>
			<Hero loading={orders.isLoading} value={total} />
			<div className={styles.tables}>
				<Orders orders={currentOrders} />
				<TopProducts products={top5products} />
			</div>
		</div>
	);
};
