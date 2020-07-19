import React, { useState, useEffect } from 'react';
import { CurrencyListProps, CurrencyDetails } from '../models/common';
import { InputNumber, PageHeader, List, Avatar, Select } from 'antd';

import {
  mapResponseToCurrencies,
  buildNewCurrencyRates,
} from '../services/currency-mapper';
import { currenciesData } from '../services/currency-builder';
import './currency-list.styles.scss';
import { Currency } from './currency.component';

const { Option } = Select;

export const CurrencyList = ({ currencies }: CurrencyListProps) => {
  const [baseCurrencyValue, setBaseCurrencyValue] = useState(1);
  const [currentBaseCurrency, setCurrentBaseCurrency] = useState('EUR');
  const [currencyDetailsList, setCurrencyDetailsList] = useState<
    CurrencyDetails[]
  >([]);
  const [raw, setRaw] = useState(currencies);

  useEffect(() => {
    const list = mapResponseToCurrencies(raw, baseCurrencyValue);
    setCurrencyDetailsList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: any) => {
    setBaseCurrencyValue(e);
    const list = mapResponseToCurrencies(raw, e);

    setCurrencyDetailsList(list);
  };
  const handleChange = (value: any) => {
    if (value !== currentBaseCurrency) {
      setCurrentBaseCurrency(value);
      const newRates = buildNewCurrencyRates(raw, value);
      setRaw(newRates);
      const list = mapResponseToCurrencies(newRates, baseCurrencyValue);
      setCurrencyDetailsList(list);
    }
  };

  const currencyOptions = currenciesData.map((currency) => (
    <Option key={currency.abbreviation} value={currency.abbreviation}>
      {currency.name}
    </Option>
  ));
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Currency Converter"
        subTitle="Updated daily from https://exchangeratesapi.io/"
      />
      <div className="base-currency">
        <div className="base-value">
          <div className="label-text"> Base Value:</div>
          <InputNumber
            data-testid="testid-currency-input-value"
            type="number"
            min={1}
            max={1000}
            defaultValue={1}
            onChange={onChange}
          />
        </div>
        <div className="base-currency-selection">
          <div className="label-text">Base Currency:</div>
          <Select
            data-testid="testid-currency-select"
            defaultValue="EUR"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            {currencyOptions}
          </Select>
        </div>
      </div>

      <div className="list-container">
        <List
          dataSource={currencyDetailsList}
          renderItem={(item) => (
            <List.Item key={item.currencyName}>
              <List.Item.Meta
                avatar={<Avatar src={item.currencyFlag} />}
                title={item.currencyCode}
              />
              <Currency currencyDetails={item} />
            </List.Item>
          )}
        ></List>
      </div>
    </>
  );
};
