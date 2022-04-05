import { formatCurrencyEuro } from '../../utils/currency-format';
import styles from './dashboard.module.scss';

export const Hero: React.FC<{ value: number; loading: boolean }> = ({
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
