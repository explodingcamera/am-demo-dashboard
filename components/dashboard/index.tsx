import styles from './dashboard.module.scss';
import { formatCurrencyEuro } from './../../utils/currency-format';

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
const Header: React.FC<{ nextRefresh: number }> = ({ nextRefresh }) => (
	<div className={styles.header}>
		<div>
			<h3>Order Dashboard</h3>
			<div>
				<h2>January 2021</h2>
				<button type="button">{leftArrow}</button>
				<button type="button">{leftArrow}</button>
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

const Hero: React.FC<{ value: number }> = ({ value }) => (
	<div className={styles.hero}>
		<h1>{formatCurrencyEuro(value)}</h1>
	</div>
);

interface Product {
	index: number;
	date: Date;
	name: string;
	orderVolume: number;
}

const Products: React.FC<{ products: Product[] }> = ({ products }) => (
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
		</table>
	</div>
);

export const Dashboard = () => (
	<div className={styles.wrapper}>
		<Header nextRefresh={10} />
		<Hero value={1000} />
		<div className={styles.tables}>
			<Products products={[]} />
			<TopProducts products={[]} />
		</div>
	</div>
);
