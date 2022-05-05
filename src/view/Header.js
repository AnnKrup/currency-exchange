import React, { useEffect, useState } from 'react';
import { getHeaderCurrency } from "../actions/actions";
import { CURRENCY_EUR, CURRENCY_UAH, CURRENCY_USD } from "../constants";
import "../index.css";

const Header = () => {
    const [currencyHeader, setCurrencyHeader] = useState([]);

    useEffect(() => {
        const init = async () => {
            const usd = await getHeaderCurrency(CURRENCY_USD, CURRENCY_UAH);
            const eur = await getHeaderCurrency(CURRENCY_EUR, CURRENCY_UAH);

            setCurrencyHeader([usd, eur]);
        }

        init();
    }, [])

    return (
        <div className="header">
            {currencyHeader.map(item =>
                <div
                    key={item.fromCurrency+item.toCurrency+item.amount}>
                    {item.fromCurrency} = {item.amount.toFixed(2)}{item.toCurrency}
                </div>
            )}
        </div>
    );
};

export default Header;