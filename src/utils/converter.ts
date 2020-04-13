import { CurrencyRateElementType } from '../../module'

/**
 * Convert value from one currency to another.
 * Since currency rates are provided only for base currency of UAH,
 * the conversion is performed in 2 stages:
 * 1 - Convert to UAH
 * 2 - Convert form UAH to target currency
 *
 * If unsupported currency is provided = 0 is returned
 */
export const convertCurrency = (currencyRates: CurrencyRateElementType[]) => (
  valueFrom: number,
  currencyFrom: string,
  currencyTo: string,
) => {
  const fromCurrencyRate = currencyRates.find(
    (rate) => rate.ccy === currencyFrom && rate.base_ccy === 'UAH',
  )

  const toCurrencyRate = currencyRates.find(
    (rate) => rate.ccy === currencyTo && rate.base_ccy === 'UAH',
  )

  if (!fromCurrencyRate && currencyFrom !== 'UAH') return 0
  if (!toCurrencyRate && currencyTo !== 'UAH') return 0

  const valueInUah =
    currencyFrom === 'UAH'
      ? valueFrom
      : valueFrom * Number(fromCurrencyRate.buy)

  const resultValue =
    currencyTo === 'UAH' ? valueInUah : valueInUah / Number(toCurrencyRate.buy)

  return resultValue
}
