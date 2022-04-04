import { sheets } from '@googleapis/sheets';

// this api key isn't secret :) It's limited to just the host this website is hosted on and is read-only
const defaultApiKey = 'AIzaSyCmc--P9ZnKg-QMehToaXBdEs-p8JMXx2A';
const defaultSheet = '1La-EJVOrNt3AwWHYvhuCQ5SRtFE9h_kYjgx0dau1HN4';
const defaultRange = 'Orders!A2:F';

export const getSpreadsheet = async (
	spreadsheetId = defaultSheet,
	apiKey: string = defaultApiKey,
	range: string = defaultRange,
) => {
	// @ts-expect-error external lib
	await import('https://apis.google.com/js/api.js');
	await new Promise(resolve =>
		// eslint-disable-next-line no-promise-executor-return
		(globalThis as any).gapi.load('client:auth2', resolve),
	);
	await globalThis.gapi.client.init({
		apiKey,
		discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
	});

	const res = await globalThis.gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId,
		range,
	});

	console.log(res);
	return res;
};
