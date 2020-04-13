import {
  CHANGE_CURRENCY_FROM,
  CHANGE_CURRENCY_TO,
  SWAP_CURRENCIES,
} from './actionTypes'

export const changeCurrencyFrom = (currency: string) => {
  return { type: CHANGE_CURRENCY_FROM, payload: currency }
}

export const changeCurrencyTo = (currency: string) => {
  return { type: CHANGE_CURRENCY_TO, payload: currency }
}

export const swapCurrencies = () => {
  return { type: SWAP_CURRENCIES }
}
