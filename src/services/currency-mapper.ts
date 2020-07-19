import { CurrencyResponse, CurrencyDetails } from '../models/common';
import { currenciesData } from './currency-builder';

const mapCurrencyItems = (
  key: string,
  currentRate: number,
  currentBase: string
) => {
  const currencyItem = currenciesData.find((c) => c.abbreviation === key);
  if (currencyItem) {
    return {
      currencyName: currencyItem.name,
      currencySummary: `1 ${key} = ${currentRate} ${currentBase}`,
      currencySymbol: currencyItem.currencySymbol,
      currencyFlag: currencyItem.currencyFlag,
    };
  } else {
    return {
      currencyName: key,
      currencySummary: `1 ${key} = ${currentRate} ${currentBase}`,
      currencySymbol: key,
      currencyFlag: key,
    };
  }
};

// used to calculate values of all the currencies based on value change in the UI
export const mapResponseToCurrencies = (
  raw: CurrencyResponse,
  baseValue: number
): CurrencyDetails[] => {
  const nonBase = Object.keys(raw.rates).map((keyVal) => {
    const currentRate = (raw.rates as any)[keyVal];
    const currentRateParsed = currentRate ? (currentRate as number) : 0;
    const currencyItems = mapCurrencyItems(keyVal, currentRateParsed, raw.base);
    return {
      isBaseCurrency: false,
      currencyCode: keyVal,
      currencyFlag: currencyItems.currencyFlag,
      currencyName: currencyItems.currencyName,
      currencySummary: currencyItems.currencySummary,
      currencySymbol: currencyItems.currencySymbol,
      displayForUser: false,
      latestRate: currentRateParsed,
      valueToBase: (currentRateParsed * baseValue).toFixed(4),
    };
  });
  const currencies = [...nonBase].filter(
    (curr) => curr.currencyCode !== raw.base
  );

  return currencies;
};

// usused - would parse to number
export const mapCurrenciesChangedToNumber = (raw: CurrencyResponse) => {
  const baseCurrency = raw.base;
  const baseCurrencyRate = (raw.rates as any)[baseCurrency];

  const newRates = Object.keys(raw.rates).map((k) => {
    const rate = (raw.rates as any)[k];
    const newRate = k === baseCurrency ? 1 : rate / baseCurrencyRate;
    const parsedValue = Math.round((newRate + Number.EPSILON) * 100) / 100;
    return { [k]: parsedValue };
  });

  return newRates;
};

// used by buildNewCurrencyRates to set the rates (rate / baseCurrencyRate) or 1

export const mapCurrenciesChangedFourDecimals = (
  raw: CurrencyResponse,
  newBase: string
) => {
  const baseCurrency = newBase;
  const baseCurrencyRate = (raw.rates as any)[baseCurrency];

  const newRates = Object.keys(raw.rates).map((k) => {
    const rate = (raw.rates as any)[k];

    const newRate =
      k === baseCurrency
        ? (1).toFixed(4)
        : (rate / baseCurrencyRate).toFixed(4);
    return { [k]: newRate };
  });

  return newRates;
};
/// Changes the rates based on which base currency is selected in the UI
export const buildNewCurrencyRates = (
  currentRates: CurrencyResponse,
  baseCurrency: string
): CurrencyResponse => {
  const mappedCurenciesAndValues = mapCurrenciesChangedFourDecimals(
    currentRates,
    baseCurrency
  );

  const rates = mappedCurenciesAndValues.reduce((p, c, i) => {
    return { ...p, [Object.keys(c)[0]]: c[Object.keys(c)[0]] };
  }, {});

  const results: CurrencyResponse = {
    ...currentRates,
    rates,
    base: baseCurrency,
  };

  return results;
};
