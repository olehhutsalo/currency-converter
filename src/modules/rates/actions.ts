import { TOGGLE_FAVORITE_CURRENCY } from './actionTypes'

export const toggleFavoriteCurrency = (currency: string) => {
  return { type: TOGGLE_FAVORITE_CURRENCY, payload: currency }
}
