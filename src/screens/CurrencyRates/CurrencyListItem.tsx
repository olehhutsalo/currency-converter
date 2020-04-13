import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import {
  getCountryFlagForCurrencyCode,
  parseMoneyUnits,
} from '../../utils/money'
import { CurrencyRateElementType } from '../../../module'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderLeftColor: '#00d998',
    borderLeftWidth: 8,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.68,

    elevation: 11,
  },
  currency: { flex: 2, fontSize: 18 },
  rates: { flex: 3 },
  star: {},
  starInactive: { opacity: 0.4 },
})

type CurrencyListItemProps = {
  item: CurrencyRateElementType
  isFavorite: boolean
  onToggleFavoriteCurrency: (currency: string) => void
}

const CurrencyListItem = ({
  item,
  isFavorite,
  onToggleFavoriteCurrency,
}: CurrencyListItemProps) => {
  const onFavoritePress = useCallback(
    () => onToggleFavoriteCurrency(item.ccy),
    [onToggleFavoriteCurrency, item],
  )

  return (
    <View style={styles.container}>
      <Text style={styles.currency}>
        {getCountryFlagForCurrencyCode(item.ccy)}
        {item.ccy}
      </Text>
      <Text style={styles.rates}>
        {parseMoneyUnits(item.buy)} / {parseMoneyUnits(item.sale)}
      </Text>
      <TouchableOpacity style={styles.star} onPress={onFavoritePress}>
        <AntDesign
          name={isFavorite ? 'star' : 'staro'}
          color='#f3c623'
          size={18}
        />
      </TouchableOpacity>
    </View>
  )
}

export default CurrencyListItem
