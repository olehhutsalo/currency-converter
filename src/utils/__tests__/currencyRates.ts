import { currencyRatesSorter } from '../currencyRates'

const currencyRates = [
  {
    ccy: 'USD',
    base_ccy: 'UAH',
    buy: '26.85000',
    sale: '27.25000',
  },
  {
    ccy: 'EUR',
    base_ccy: 'UAH',
    buy: '29.15000',
    sale: '29.80000',
  },
  {
    ccy: 'RUR',
    base_ccy: 'UAH',
    buy: '0.32500',
    sale: '0.37500',
  },
]

describe('test utils->currencyRatesSorter()', () => {
  it('should place favorite currency on top when sorting', () => {
    const favorites = ['EUR']
    const usdRate = currencyRates[0]
    const eurRate = currencyRates[1]

    expect(currencyRatesSorter(favorites)(usdRate, eurRate)).toEqual(1)
    expect(currencyRatesSorter(favorites)(eurRate, usdRate)).toEqual(-1)
  })

  it('should sort alphabetically when no favorites', () => {
    const favorites: string[] = []
    const usdRate = currencyRates[0]
    const eurRate = currencyRates[1]
    const rurRate = currencyRates[2]

    expect(
      Array.from(currencyRates).sort(currencyRatesSorter(favorites)),
    ).toEqual([eurRate, rurRate, usdRate])
  })

  it('should place favorite currency on top', () => {
    const favorites = ['USD']
    const usdRate = currencyRates[0]
    const eurRate = currencyRates[1]
    const rurRate = currencyRates[2]

    expect(
      Array.from(currencyRates).sort(currencyRatesSorter(favorites)),
    ).toEqual([usdRate, eurRate, rurRate])
  })
  it('should sort alphabetically when no favorites', () => {
    const favorites = ['EUR', 'RUR', 'USD']
    const usdRate = currencyRates[0]
    const eurRate = currencyRates[1]
    const rurRate = currencyRates[2]

    expect(
      Array.from(currencyRates).sort(currencyRatesSorter(favorites)),
    ).toEqual([eurRate, rurRate, usdRate])
  })
})
