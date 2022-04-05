import styles from './dashboard.module.scss';

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

export const Header: React.FC<{
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
