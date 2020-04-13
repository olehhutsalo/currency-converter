import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
// import CurrencyRates from './src/screens/CurrencyRates/CurrencyRates'
import Navigator from './src/Navigator'

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}
