export const formatCurrencyEuro = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
}).format;
