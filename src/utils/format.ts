export function formatPrice(value: number, currency = 'EUR', locale = 'it-IT'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}