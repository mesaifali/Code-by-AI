document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const sourceCurrencySelect = document.getElementById('source-currency');
    const destinationCurrencySelect = document.getElementById('destination-currency');
    const resultInput = document.getElementById('result');
    const swapBtn = document.getElementById('swap-btn');

    const currencies = {
        'USD': { name: 'United States Dollar', flag: '🇺🇸' },
        'EUR': { name: 'Euro', flag: '🇪🇺' },
        'GBP': { name: 'British Pound', flag: '🇬🇧' },
        'JPY': { name: 'Japanese Yen', flag: '🇯🇵' },
        'AUD': { name: 'Australian Dollar', flag: '🇦🇺' },
        'CAD': { name: 'Canadian Dollar', flag: '🇨🇦' },
        'CHF': { name: 'Swiss Franc', flag: '🇨🇭' },
        'CNY': { name: 'Chinese Yuan', flag: '🇨🇳' },
        'INR': { name: 'Indian Rupee', flag: '🇮🇳' },
        'RUB': { name: 'Russian Ruble', flag: '🇷🇺' }
    };

    const exchangeRates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.72,
        'JPY': 110.75,
        'AUD': 1.37,
        'CAD': 1.26,
        'CHF': 0.92,
        'CNY': 6.47,
        'INR': 73.87,
        'RUB': 74.36
    };

    const populateCurrencyOptions = (select, selectedCurrency) => {
        const sortedCurrencies = Object.keys(currencies).sort((a, b) => {
            const currencyA = currencies[a].name.toUpperCase();
            const currencyB = currencies[b].name.toUpperCase();
            if (currencyA < currencyB) return -1;
            if (currencyA > currencyB) return 1;
            return 0;
        });

        sortedCurrencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = `${currencies[currency].flag} ${currencies[currency].name}`;
            if (currency === selectedCurrency) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    const convert = () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount)) {
            resultInput.value = '';
            return;
        }

        const sourceCurrency = sourceCurrencySelect.value;
        const destinationCurrency = destinationCurrencySelect.value;
        const exchangeRate = exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        resultInput.value = convertedAmount;

};

const swapCurrencies = () => {
    const tempValue = sourceCurrencySelect.value;
    sourceCurrencySelect.value = destinationCurrencySelect.value;
    destinationCurrencySelect.value = tempValue;
    convert();
};

populateCurrencyOptions(sourceCurrencySelect, 'USD');
populateCurrencyOptions(destinationCurrencySelect, 'EUR');

amountInput.addEventListener('input', convert);
sourceCurrencySelect.addEventListener('change', convert);
destinationCurrencySelect.addEventListener('change', convert);
swapBtn.addEventListener('click', swapCurrencies);
});