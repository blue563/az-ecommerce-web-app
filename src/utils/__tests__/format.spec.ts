import { describe, it, expect } from 'vitest'
import { formatPrice } from '../format'

describe('formatPrice', () => {
    it('formats as EUR by default', () => {
        expect(formatPrice(19.99)).toContain('19,99')
        expect(formatPrice(19.99)).toContain('€')
    })

    it('rounds to two decimals', () => {
        expect(formatPrice(10)).toContain('10,00')
    })

    it('supports a different currency and locale', () => {
        expect(formatPrice(19.99, 'USD', 'en-US')).toBe('$19.99')
    })
})