export interface CurrencyResponse {
  rates: Object;
  base: string;
  date: string;
}

export interface CurrencyProps {
  // valueChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //removeCurrency: (event: React.MouseEvent<HTMLInputElement>) => void;
  currencyDetails: CurrencyDetails;
}
export interface CurrencyItemProps {
  removeCurrency: (event: React.MouseEvent<HTMLInputElement>) => void;
  currencyDetails: CurrencyDetails;
  currencyValue: string;
}

export interface CurrencyListProps {
  currencies: CurrencyResponse;
}
export interface CurrencyDetails {
  valueToBase: string;
  isBaseCurrency: boolean;
  currencyCode: string;
  currencyFlag: string;
  currencySymbol: string;
  currencyName: string;
  currencySummary: string;
  latestRate: number;
  lastDate?: string;
  baseCalcCurrency?: string;
  displayForUser: boolean;
}
