import { useQuery } from 'react-query';
import { getSpreadsheet } from '../utils/sheet';

interface SheetOptions {
	id?: string;
	apikey?: string;
	range?: string;
}

export const useSheet = ({ apikey, id, range }: SheetOptions = {}) =>
	useQuery(
		['sheet', range, id],
		async () => getSpreadsheet(id, apikey, range),
		{
			enabled: !import.meta.env.SSR,
		},
	);
