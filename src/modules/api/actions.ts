import {
  GET_CURRENCY_RATES,
  GET_CURRENCY_RATES_SUCCESS,
  GET_CURRENCY_RATES_ERROR,
} from './actionTypes'

export const getCurrencyRates = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CURRENCY_RATES })

    const response = await fetch(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    )

    if (!response.ok) {
      return dispatch({ type: GET_CURRENCY_RATES_ERROR })
    }

    const data = await response.json()

    return dispatch({ type: GET_CURRENCY_RATES_SUCCESS, payload: data })
  }
}
