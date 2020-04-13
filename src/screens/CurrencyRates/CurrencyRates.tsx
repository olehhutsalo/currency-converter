import React, { useCallback, useMemo } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { toggleFavoriteCurrency } from '../../modules/rates/actions'
import { RootStateType } from '../../../module'
import { currencyRatesSorter } from '../../utils/currencyRates'

import ApiRequestWrapper from '../../components/ApiRequestWrapper/ApiRequestWrapper'
import CurrencyListItem from './CurrencyListItem'

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    textTransform: 'uppercase',
    color: '#00d998',
    fontWeight: '600',
    fontSize: 32,
    marginVertical: 16,
    marginLeft: 16,
  },
})

const CurrencyRates = () => {
  const dispatch = useDispatch()
  const { data: currencyRates } = useSelector(
    (state: RootStateType) => state.api.currencyRates,
  )
  const { favorites: favoriteRates } = useSelector(
    (state: RootStateType) => state.rates,
  )

  const onToggleFavoriteCurrency = useCallback(
    (currency) => {
      return dispatch(toggleFavoriteCurrency(currency))
    },
    [dispatch],
  )

  const listData = useMemo(
    () => currencyRates.sort(currencyRatesSorter(favoriteRates)),
    [currencyRates, favoriteRates],
  )

  return (
    <ApiRequestWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Currency{'\n'}Rates</Text>
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <CurrencyListItem
              item={item}
              isFavorite={favoriteRates.includes(item.ccy)}
              onToggleFavoriteCurrency={onToggleFavoriteCurrency}
            />
          )}
          keyExtractor={(item) => `${item.ccy}-${item.base_ccy}`}
        ></FlatList>
      </SafeAreaView>
    </ApiRequestWrapper>
  )
}

export default CurrencyRates
