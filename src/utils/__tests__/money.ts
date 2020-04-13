import { getCountryFlagForCurrencyCode, parseMoneyUnits } from '../money'

describe('test utils->getCountryFlagForCurrencyCode()', () => {
  it('returns valid flag for the supported currencies', () => {
    expect(getCountryFlagForCurrencyCode('UAH')).toEqual('🇺🇦')
    expect(getCountryFlagForCurrencyCode('USD')).toEqual('🇺🇸')
    expect(getCountryFlagForCurrencyCode('EUR')).toEqual('🇪🇺')
    expect(getCountryFlagForCurrencyCode('RUR')).toEqual('🇷🇺')
    expect(getCountryFlagForCurrencyCode('BTC')).toEqual('🌐')
  })

  it('returns question mark for unsupported currencies', () => {
    expect(getCountryFlagForCurrencyCode('GBP')).toEqual('❓')
  })
})

describe('test utils->parseMoneyUnits()', () => {
  it('Formats integers', () => {
    expect(parseMoneyUnits(12)).toEqual('12.00')
  })
  it('Formats floats', () => {
    expect(parseMoneyUnits(12.69696969)).toEqual('12.70')
  })

  it('Formats string values', () => {
    expect(parseMoneyUnits('12.69696969')).toEqual('12.70')
  })

  it('Handles NaN values', () => {
    expect(parseMoneyUnits('cat' + 9)).toEqual('-')
  })
})
