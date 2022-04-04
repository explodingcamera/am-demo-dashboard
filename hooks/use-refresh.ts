import { useEffect, useState } from 'react';

export const useRefresh = (refresh: () => void, time = 60) => {
	const [refreshIn, setRefreshIn] = useState(time);
	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshIn(i => {
				if (i === 0) {
					refresh();
					return time;
				}

				return i - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [refresh, time]);
	return refreshIn;
};
