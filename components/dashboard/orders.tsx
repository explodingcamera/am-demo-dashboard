import { formatCurrencyEuro } from '../../utils/currency-format';
import { Order } from '../../utils/order-data';
import styles from './dashboard.module.scss';

export const Orders: React.FC<{ orders: Order[] }> = ({ orders }) => (
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
				<tr>
					<td className={styles.padding} />
				</tr>
				{orders.map(order => (
					<tr key={order.index}>
						<td>{order.index}</td>
						<td>{order.date}</td>
						<td>{order.name}</td>
						<td>
							<b>{formatCurrencyEuro(order.amount)}</b>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
