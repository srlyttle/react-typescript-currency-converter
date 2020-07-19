import React, { useState, useEffect } from 'react';
import { CurrencyResponse } from '../models/common';
import axios from 'axios';

export const useCurrencies = () => {
  const [currenciesData, setCurrenciesData] = useState<CurrencyResponse>();
  const getCurrencyData = async () => {
    try {
      const resp = await axios.get<CurrencyResponse>(
        'https://api.exchangeratesapi.io/latest'
      );

      setCurrenciesData(resp.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getCurrencyData();
  }, []);

  return currenciesData;
};
