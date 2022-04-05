import { Product } from '../../utils/order-data';
import { ProgressBar } from '../progressbar';
import styles from './dashboard.module.scss';

export const TopProducts: React.FC<{ products: Product[]; total: number }> = ({
	products,
	total,
}) => (
	<div>
		<table>
			<thead>
				<tr>
					<td>TOP 5 PRODUCTS</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className={styles.padding} />
				</tr>
				{products.map(product => (
					<tr key={products.indexOf(product)}>
						<td className={styles.product}>
							<h2>{product.name}</h2>
							<ProgressBar
								hasCashTarget={false}
								currentValue={product.amount}
								maxValue={total}
								className={styles.progress}
							/>
							<span>{product.amount}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
