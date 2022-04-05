export const formatCurrencyEuro = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
}).format;

export const formatCurrencyEuroNoFractions = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
}).format;

export const parseCurrencyEuro = (c: string) =>
	parseFloat(c.replace(/\./g, '').replace(/,/g, '.'));
