import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

import ApiRequestWrapper from '../../components/ApiRequestWrapper/ApiRequestWrapper'
import { getCountryFlagForCurrencyCode } from '../../utils/money'
import { RootStateType, CurrencyRateElementType } from '../../../module'
import CustomPicker from '../../components/CustomPicker/CustomPicker'

import {
  changeCurrencyFrom,
  changeCurrencyTo,
  swapCurrencies,
} from '../../modules/converter/actions'
import { convertCurrency } from '../../utils/converter'

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
  blockShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.68,
    elevation: 11,
  },
  converterRow: { flexDirection: 'row', marginHorizontal: 16 },
  input: {
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 24,
    flex: 3,
  },
  picker: {
    flex: 1,
  },
  pickerLabel: { fontSize: 24 },
  swapButton: {
    zIndex: 1,
    marginVertical: -8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#00d998',
  },
})

const Converter = () => {
  const [valueFrom, setValueFrom] = useState('')
  const [toValue, setValueTo] = useState('')

  const { data: currencyRates } = useSelector(
    (state: RootStateType) => state.api.currencyRates,
  )
  const { fromCurrency, toCurrency } = useSelector(
    (state: RootStateType) => state.converter,
  )
  console.log({ valueFrom, toValue, fromCurrency, toCurrency })

  const currencies = currencyRates.reduce(
    (acc: string[], currencyItem: CurrencyRateElementType) => {
      if (!acc.includes(currencyItem.ccy)) {
        acc.push(currencyItem.ccy)
      }
      if (!acc.includes(currencyItem.base_ccy)) {
        acc.push(currencyItem.base_ccy)
      }
      return acc
    },
    [],
  )

  const pickerItems = currencies.map((currency: string) => ({
    label: `${getCountryFlagForCurrencyCode(currency)} ${currency}`,
    value: currency,
  }))

  const dispatch = useDispatch()

  const changeValueFrom = (nextValueFrom: string) => {
    const nextValueTo = convertCurrency(currencyRates)(
      Number(nextValueFrom),
      fromCurrency,
      toCurrency,
    )

    setValueTo(nextValueTo ? nextValueTo.toFixed(2) : '')
    setValueFrom(nextValueFrom)
  }

  const changeValueTo = (nextValueTo: string) => {
    const nextValueFrom = convertCurrency(currencyRates)(
      Number(nextValueTo),
      toCurrency,
      fromCurrency,
    )

    setValueTo(nextValueTo)
    setValueFrom(nextValueFrom ? nextValueFrom.toFixed(2) : '')
  }

  useEffect(() => {
    const nextValueTo = convertCurrency(currencyRates)(
      Number(valueFrom),
      fromCurrency,
      toCurrency,
    )

    setValueTo(nextValueTo ? nextValueTo.toFixed(2) : '')
    return () => {}
  }, [fromCurrency, toCurrency])

  return (
    <ApiRequestWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Currency{'\n'}Converter</Text>
        <View style={[styles.converterRow, styles.blockShadow]}>
          <TextInput
            style={styles.input}
            onChangeText={changeValueFrom}
            value={valueFrom}
            keyboardType='numeric'
          />
          <CustomPicker
            styles={{ input: styles.picker, label: styles.pickerLabel }}
            selectedValue={fromCurrency}
            items={pickerItems}
            onChange={(text) => dispatch(changeCurrencyFrom(text))}
          />
        </View>
        <TouchableOpacity
          style={[styles.blockShadow, styles.swapButton]}
          onPress={() => dispatch(swapCurrencies())}
        >
          <AntDesign name='swap' size={28} color='#fff' />
        </TouchableOpacity>
        <View style={[styles.converterRow, styles.blockShadow]}>
          <TextInput
            style={styles.input}
            onChangeText={changeValueTo}
            value={toValue}
            keyboardType='numeric'
          />
          <CustomPicker
            styles={{ input: styles.picker, label: styles.pickerLabel }}
            selectedValue={toCurrency}
            items={pickerItems}
            onChange={(text) => dispatch(changeCurrencyTo(text))}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
      </SafeAreaView>
    </ApiRequestWrapper>
  )
}

export default Converter
