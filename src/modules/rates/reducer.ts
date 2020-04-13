import { TOGGLE_FAVORITE_CURRENCY } from './actionTypes'
import { RatesState, RatesAction } from '../../../module'

const initialState: RatesState = {
  favorites: [],
}

export default (state: RatesState = initialState, action: RatesAction) => {
  switch (action.type) {
    case TOGGLE_FAVORITE_CURRENCY:
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(
              (currency: string) => currency !== action.payload,
            )
          : [...state.favorites, action.payload],
      }
    default:
      return state
  }
}
