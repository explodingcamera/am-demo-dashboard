import { formatCurrencyEuroNoFractions } from '../../utils/currency-format';
import styles from './progressbar.module.scss';

export const ProgressBar: React.FC<{
	currentValue: number;
	maxValue: number;
	className?: string;
	hasCashTarget: boolean;
}> = ({ currentValue, maxValue, className, hasCashTarget }) => (
	<div className={`${styles.progressbar} ${className ?? ''}`}>
		{maxValue && (
			<>
				<div
					style={{
						transform: `scaleX(${currentValue / maxValue})`,
					}}
					className={styles.progress}
				/>
				{hasCashTarget && (
					<div className={styles.target}>
						<span>{formatCurrencyEuroNoFractions(maxValue)}</span>
					</div>
				)}
			</>
		)}
	</div>
);
