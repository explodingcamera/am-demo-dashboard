let loaded = false;
let loading = false;
let loadCounter = 0;

export const loadGAPI = async (apiKey: string) => {
	if (loaded) return globalThis.gapi;
	if (loading && loadCounter < 3) {
		loadCounter++;
		await new Promise(resolve => {
			setTimeout(resolve, 100);
		});
		return loadGAPI(apiKey);
	}

	loading = true;

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

	// eslint-disable-next-line require-atomic-updates
	loaded = true;
	return globalThis.gapi;
};
