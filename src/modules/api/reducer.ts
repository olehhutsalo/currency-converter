import {
  GET_CURRENCY_RATES,
  GET_CURRENCY_RATES_SUCCESS,
  GET_CURRENCY_RATES_ERROR,
} from './actionTypes'
import { ApiState, ApiAction } from '../../../module'

const initialState: ApiState = {
  currencyRates: {
    isError: false,
    isLoading: false,
    data: [],
  },
}

export default (state: ApiState = initialState, action: ApiAction) => {
  switch (action.type) {
    case GET_CURRENCY_RATES:
      return {
        ...state,
        currencyRates: { isError: false, isLoading: true, data: [] },
      }
    case GET_CURRENCY_RATES_SUCCESS:
      return {
        ...state,
        currencyRates: {
          isError: false,
          isLoading: false,
          data: action.payload,
        },
      }
    case GET_CURRENCY_RATES_ERROR:
      return {
        ...state,
        currencyRates: {
          isError: true,
          isLoading: false,
          data: [],
        },
      }
    default:
      return state
  }
}
