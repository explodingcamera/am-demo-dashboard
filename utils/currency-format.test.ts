import { expect, test } from 'vitest';
import { parseCurrencyEuro } from './currency-format';

test('parseCurrencyEuro should work with some really basic values', () => {
	expect(parseCurrencyEuro('100.212,21 €')).toBe(100212.21);
	expect(parseCurrencyEuro('100.212,21')).toBe(100212.21);
	expect(parseCurrencyEuro('100')).toBe(100);
	expect(parseCurrencyEuro('')).toBe(NaN);
	expect(parseCurrencyEuro('-1 Euro')).toBe(-1);
});
