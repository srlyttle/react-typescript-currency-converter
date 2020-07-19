import {
  mapResponseToCurrencies,
  mapCurrenciesChangedFourDecimals,
  buildNewCurrencyRates,
} from './currency-mapper';
import { CurrencyResponse } from '../models/common';

describe('Currency Mappings', () => {
  test('should change CurrencyDetails List on input value change', () => {
    const rawResponse: CurrencyResponse = {
      rates: {
        USD: 1.1428,
        GBP: 0.91078,
      },
      base: 'EUR',
      date: '2020-07-17',
    };
    const resultWithValue = mapResponseToCurrencies(rawResponse, 2);
    const poundValueToBase = resultWithValue.find(
      (details) => details.currencyCode === 'GBP'
    );
    expect(poundValueToBase?.valueToBase).toEqual('1.8216');
  });
});

describe('Currency Mappings on change', () => {
  test('should map initial values with GBP -- 4 decimals', () => {
    const rawResponse: CurrencyResponse = {
      rates: {
        EUR: 1,
        USD: 1.14,
        GBP: 0.91,
      },
      base: 'GBP',
      date: '2020-07-17',
    };
    expect(mapCurrenciesChangedFourDecimals(rawResponse, 'GBP')).toEqual([
      {
        EUR: '1.0989',
      },
      { USD: '1.2527' },
      { GBP: '1.0000' },
    ]);
  });
});

describe('Build new currency Rates to 4dp when base changes ', () => {
  test('should map initial values with GBP -- 4 decimals', () => {
    const rawResponse: CurrencyResponse = {
      rates: {
        EUR: 1,
        USD: 1.14,
        GBP: 0.91,
      },
      base: 'GBP',
      date: '2020-07-17',
    };
    expect(buildNewCurrencyRates(rawResponse, 'GBP')).toEqual({
      rates: {
        EUR: '1.0989',
        GBP: '1.0000',
        USD: '1.2527',
      },
      base: 'GBP',
      date: '2020-07-17',
    });

    expect(buildNewCurrencyRates(rawResponse, 'USD')).toEqual({
      rates: {
        EUR: '0.8772',
        GBP: '0.7982',
        USD: '1.0000',
      },
      base: 'USD',
      date: '2020-07-17',
    });
  });
  test('should map initial values with USD -- 4 decimals', () => {
    const rawResponse: CurrencyResponse = {
      rates: {
        EUR: 1,
        USD: 1.14,
        GBP: 0.91,
      },
      base: 'GBP',
      date: '2020-07-17',
    };

    expect(buildNewCurrencyRates(rawResponse, 'USD')).toEqual({
      rates: {
        EUR: '0.8772',
        GBP: '0.7982',
        USD: '1.0000',
      },
      base: 'USD',
      date: '2020-07-17',
    });
  });
});
