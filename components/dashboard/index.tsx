import { useCallback } from 'react';
import styles from './dashboard.module.scss';

import { useSheet } from './../../hooks/use-sheet';
import { useTime } from '../../hooks/use-time';
import { useRefresh } from '../../hooks/use-refresh';

import { filterOrders, filterProducts } from '../../utils/order-data';
import { parseCurrencyEuro } from '../../utils/currency-format';

import { Hero } from './hero';
import { Header } from './header';
import { Orders } from './orders';
import { TopProducts } from './top-products';
import { ProgressBar } from '../progressbar';

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
		?.sort((a, b) => b.amount - a.amount)
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
			<ProgressBar
				hasCashTarget
				className={styles.monthVolumeBar}
				currentValue={total}
				maxValue={currentTargetNumber}
			/>
			<div className={styles.tables}>
				<Orders orders={currentOrders.reverse().slice(0, 5)} />
				<TopProducts total={total} products={top5products} />
			</div>
		</div>
	);
};
