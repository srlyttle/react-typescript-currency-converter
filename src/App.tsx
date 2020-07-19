import React from 'react';
import logo from './logo_currency.png';
import './App.scss';
import { CurrencyList } from './components/currency-list.component';
import { useCurrencies } from './hooks/useCurrencies';
function App() {
  const currencies = useCurrencies();

  return (
    <div className="app-wrapper">
      <div className="header">
        <div className="logo-container">
          <img height="50" src={logo} alt="logo" />
          <div className="logo-text">Leaseplan Currencies</div>
        </div>

        <div className="options"></div>
      </div>
      {currencies && <CurrencyList currencies={currencies} />}
    </div>
  );
}

export default App;
