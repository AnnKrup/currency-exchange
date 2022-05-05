import axios from "axios";

export const getCurrencyOptions = async () => {
    try {
        return axios.get('https://v6.exchangerate-api.com/v6/4bed72d1ff8cb2d2da86a241/latest/EUR', {});
    } catch (e) {
        console.error(e);
    }
}

export const getHeaderCurrency = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/4bed72d1ff8cb2d2da86a241/latest/${fromCurrency}`, {});

        return {
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            amount: response.data.conversion_rates[toCurrency]
        };
    } catch (e) {
        console.error(e);
    }
}

export const changeCurrencyInSelect = async (fromCurrency) => {
    try {
        return axios.get(`https://v6.exchangerate-api.com/v6/4bed72d1ff8cb2d2da86a241/latest/${fromCurrency}`, {});
    } catch (e) {
        console.error(e);
    }
}