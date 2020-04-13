export type CurrencyRateElementType = {
  ccy: string
  base_ccy: string
  buy: string
  sale: string
}
export type ApiState = { currencyRates: ApiStateRatesRequest }

export type ApiStateRatesRequest = {
  isError: boolean
  isLoading: boolean
  data: CurrencyRateElementType[]
}

export type ApiAction =
  | { type: 'api/GET_CURRENCY_RATES' }
  | { type: 'api/GET_CURRENCY_RATES_ERROR' }
  | {
      type: 'api/GET_CURRENCY_RATES_SUCCESS'
      payload: CurrencyRateElementType[]
    }

export type ConverterState = {
  fromCurrency: string
  toCurrency: string
}

export type ConverterAction =
  | { type: 'converter/CHANGE_CURRENCY_FROM'; payload: string }
  | { type: 'converter/CHANGE_CURRENCY_TO'; payload: string }
  | { type: 'converter/SWAP_CURRENCIES' }

export type RatesState = { favorites: string[] }

export type RatesAction = {
  type: 'rates/TOGGLE_FAVORITE_CURRENCY'
  payload: string
}

export type RootStateType = {
  api: ApiState
  rates: RatesState
  converter: ConverterState
}
