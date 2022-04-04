import { useQuery } from 'react-query';
import { getSpreadsheet } from '../utils/sheet';

export const useSheet = (id?: string, apikey?: string) =>
	useQuery(['sheet', id], async () => getSpreadsheet(id, apikey), {
		suspense: true,
		enabled: !import.meta.env.SSR,
	});
