import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { Currency } from './currency.component';
import { CurrencyDetails } from '../models/common';

describe('<Currency/>', () => {
  test('should render correct input for canadian dollar', () => {
    const currencyDetails: CurrencyDetails = {
      currencyCode: 'CAD',
      currencyFlag: 'http://www.geonames.org/flags/l/ca.gif',
      currencyName: 'Canadian Dollar',
      currencySummary: '1 CAD = 1.551 EUR',
      currencySymbol: '$',
      displayForUser: false,
      isBaseCurrency: false,
      latestRate: 1.551,
      valueToBase: '1.5510',
    };
    const { getByText, getByTestId, container } = render(
      <Currency currencyDetails={currencyDetails} />
    );
    //screen.debug();
    //screen.getByText("USD - US Dollar");
    expect(getByText('1 CAD = 1.551 EUR')).toBeInTheDocument();

    expect(getByTestId('testid-currency-summary')).toHaveTextContent(
      currencyDetails.currencySummary
    );
    expect(getByTestId('testid-currency-value-CAD')).toHaveTextContent(
      currencyDetails.valueToBase
    );

    expect(container).toMatchSnapshot();
  });
});
