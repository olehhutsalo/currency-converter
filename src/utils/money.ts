export const getCountryFlagForCurrencyCode: (currency: string) => string = (
  currency,
) => {
  switch (currency) {
    case 'UAH':
      return '🇺🇦'
    case 'USD':
      return '🇺🇸'
    case 'EUR':
      return '🇪🇺'
    case 'RUR':
      return '🇷🇺'
    case 'BTC':
      return '🌐'
    default:
      return '❓'
  }
}

export const parseMoneyUnits: (value: string | number) => string = (value) =>
  isNaN(Number(value)) ? '-' : Number(value).toFixed(2)
