import { CurrencyRateElementType, CurrencyRatesSorterType } from '../../module'
/**
 * Creates sorter for currency rates, placing favorite currencies on top.
 * Sorts currencies alphabetically.
 */
export const currencyRatesSorter: CurrencyRatesSorterType = (
  favoriteRates: string[],
) => (a: CurrencyRateElementType, b: CurrencyRateElementType) => {
  const isAFavorite = favoriteRates.includes(a.ccy)
  const isBFavorite = favoriteRates.includes(b.ccy)

  if (isAFavorite === isBFavorite) return a.ccy.localeCompare(b.ccy)

  return isAFavorite ? -1 : 1
}
