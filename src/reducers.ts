import { combineReducers } from 'redux'

import api from './modules/api/reducer'
import rates from './modules/rates/reducer'
import converter from './modules/converter/reducer'

export default combineReducers({ api, rates, converter })
