import React from 'react';
import { CurrencyProps } from '../models/common';
import cx from 'classnames';
import './currency.styles.scss';

export const Currency = ({ currencyDetails }: CurrencyProps) => {
  return (
    <div
      className={cx('currency-card', {
        'base-currency': currencyDetails.isBaseCurrency,
      })}
      id={currencyDetails.currencyCode}
    >
      <div className="currency-value">
        <div data-testid="testid-currency-symbol" className="currency-symbol">
          {currencyDetails.currencySymbol}
        </div>
        <div
          data-testid={`testid-currency-value-${currencyDetails.currencyCode}`}
          className="currency-value-to-base"
        >
          {currencyDetails.valueToBase}
        </div>
      </div>
      <div data-testid="testid-currency-summary" className="currency-summary">
        {currencyDetails.currencySummary}
      </div>
    </div>
  );
};
