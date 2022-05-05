import React, { useEffect, useState } from 'react';
import CurrencyRow from "./view/CurrencyRow";
import { getCurrencyOptions, changeCurrencyInSelect } from "./actions/actions";
import { CURRENCY_EUR, CURRENCY_UAH, INITIAL_AMOUNT } from "./constants";
import Header from "./view/Header";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(INITIAL_AMOUNT);
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [amountInFormCurrency, setAmountInFormCurrency] = useState(true);

  const toAmount = amountInFormCurrency ? amount * exchangeRate : amount;
  const fromAmount = amountInFormCurrency ? amount : amount / exchangeRate;

  useEffect(() => {
    const init = async () => {
      const result = await getCurrencyOptions();
      const currencyOptionsArr = Object.keys(result.data.conversion_rates);
      const firstCurrency = currencyOptionsArr.find(item => item === CURRENCY_UAH);

      setCurrencyOptions(currencyOptionsArr);
      setFromCurrency(firstCurrency);
      setToCurrency(currencyOptionsArr.find(item => item === CURRENCY_EUR));
      setExchangeRate(result.data.conversion_rates[firstCurrency])
    }

    init();
  }, [])

  useEffect(() => {
    if(fromCurrency && toCurrency) {
      const load = async () => {
        const result = await changeCurrencyInSelect(fromCurrency);
        setExchangeRate(result.data.conversion_rates[toCurrency]);
      }

      load();
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFormCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFormCurrency(false);
  };

  return (
      <div>
        <Header />
        <div className="main">
          <div className="title">Currency Converter</div>
          <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e => setFromCurrency(e.target.value)}
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
          />
          <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              amount={toAmount}
              onChangeAmount={handleToAmountChange}
          />
        </div>
      </div>
  );
}

export default App;
