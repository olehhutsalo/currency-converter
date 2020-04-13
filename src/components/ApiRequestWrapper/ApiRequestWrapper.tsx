import React, { useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { getCurrencyRates } from '../../modules/api/actions'
import { RootStateType } from '../../reducers'

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorHeader: { fontSize: 38 },
  errorSubheader: { fontSize: 28 },
  retryBtn: {
    backgroundColor: '#588da8',
    padding: 16,
    marginVertical: 16,
    minWidth: '50%',
  },
  retryBtnText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
})

type ApiRequestWrapperProps = { children: React.ReactNode }

const ApiRequestWrapper = ({ children }: ApiRequestWrapperProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyRates())
    return () => {}
  }, [])

  const { isLoading, isError } = useSelector(
    (state: RootStateType) => state.api.currencyRates,
  )

  const onRefresh = useCallback(() => dispatch(getCurrencyRates()), [dispatch])

  if (isLoading) return <ActivityIndicator size='large' style={styles.loader} />

  if (isError)
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorHeader}>😔</Text>
        <Text style={styles.errorSubheader}>Something went wrong...</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={onRefresh}>
          <Text style={styles.retryBtnText}>Retry 🚀</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )

  return children
}

export default ApiRequestWrapper
