export const loadGAPI = async (apiKey: string) => {
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

	return globalThis.gapi;
};
