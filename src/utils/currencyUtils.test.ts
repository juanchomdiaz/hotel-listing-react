import { formatCurrencyValue } from './currencyUtils';

describe('formatCurrencyValue', () => {
    it('should format values with default precision (0)', () => {
        const result = formatCurrencyValue(100, 'AUD');
        expect(result).toBe('$100');
    });

    it('should handle zero values', () => {
        expect(formatCurrencyValue(0, 'AUD')).toBe('$0');
        expect(formatCurrencyValue(0, 'AUD', 2)).toBe('$0.00');
    });

    it('should handle negative values', () => {
        expect(formatCurrencyValue(-100, 'AUD')).toBe('-$100');
        expect(formatCurrencyValue(-100.5, 'AUD', 1)).toBe('-$100.5');
    });

    it('should format large numbers with separators', () => {
        const result = formatCurrencyValue(1000000, 'AUD');
        expect(result).toBe('$1,000,000');
    });

    it('should trim the result string', () => {
        const original = Number.prototype.toLocaleString;
        Number.prototype.toLocaleString = jest.fn().mockReturnValue('  $100  ');

        const result = formatCurrencyValue(100, 'AUD');
        expect(result).toBe('$100');

        Number.prototype.toLocaleString = original;
    });

    it('should respect the precision parameter for decimal places', () => {
        expect(formatCurrencyValue(100.1234, 'AUD', 0)).toBe('$100');
        expect(formatCurrencyValue(100.1234, 'AUD', 1)).toBe('$100.1');
        expect(formatCurrencyValue(100.1234, 'AUD', 2)).toBe('$100.12');
        expect(formatCurrencyValue(100.1234, 'AUD', 3)).toBe('$100.123');
        expect(formatCurrencyValue(100.1234, 'AUD', 4)).toBe('$100.1234');
    });
});
