import { loadGAPI } from './gapi';

// this api key isn't secret :) It's limited to just the host this website is hosted on and is read-only
const defaultApiKey = 'AIzaSyCmc--P9ZnKg-QMehToaXBdEs-p8JMXx2A';
const defaultSheet = '1La-EJVOrNt3AwWHYvhuCQ5SRtFE9h_kYjgx0dau1HN4';
const defaultRange = 'Orders!A2:F';

export const getSpreadsheet = async (
	spreadsheetId = defaultSheet,
	apiKey: string = defaultApiKey,
	range: string = defaultRange,
) => {
	const gapi = await loadGAPI(apiKey);
	const res = await gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId,
		range,
	});

	return res;
};
