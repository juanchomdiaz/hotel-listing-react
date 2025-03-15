/**
 * Returns the formatted currency value with the proper symbol given a ISO4127 currency code and language code.
 * It forces en-AU locale to ensure the correct formatting for this specific use case, but should be adapted to
 * use a locale based on the user's preferences.
 * 
 * @param value The currency value to be formatted
 * @param currency The ISO 4127 currency code
 */
export function formatCurrencyValue(value: number, currency: string, precision: number = 0): string {
    return (value)
        .toLocaleString('en-AU', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        })
        .trim();
}