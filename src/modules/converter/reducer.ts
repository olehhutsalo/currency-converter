import { ConverterAction, ConverterState } from '../../../module'
import {
  CHANGE_CURRENCY_FROM,
  CHANGE_CURRENCY_TO,
  SWAP_CURRENCIES,
} from './actionTypes'

const initialState: ConverterState = {
  fromCurrency: 'UAH',
  toCurrency: 'USD',
}

export default (state: ConverterState = initialState, action: ConverterAction) => {
  switch (action.type) {
    case CHANGE_CURRENCY_FROM:
      return { ...state, fromCurrency: action.payload }
    case CHANGE_CURRENCY_TO:
      return { ...state, toCurrency: action.payload }
    case SWAP_CURRENCIES:
      return {
        ...state,
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
      }

    default:
      return state
  }
}
