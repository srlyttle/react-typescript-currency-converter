import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { CurrencyList } from './currency-list.component';
import { CurrencyDetails } from '../models/common';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
const data = {
  base: 'EUR',
  date: '2020-07-17',
  rates: {
    AUD: 1.636,
    CAD: 1.551,
    GBP: 0.91078,
    HKD: 8.8617,
  },
};
describe('<CurrencyList/>', () => {
  test('should render correct input for a list of currencies & display input  & select', () => {
    const { getByText, getByTestId, getAllByDisplayValue, container } = render(
      <CurrencyList currencies={data} />
    );
    screen.getByRole('spinbutton');
    //number input
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton').getAttribute('value')).toBe('1');

    const selectElement = screen.getByTestId('testid-currency-select');
    expect(selectElement).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(getByText('1 CAD = 1.551 EUR')).toBeInTheDocument();

    expect(getByText('1 HKD = 8.8617 EUR')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
