import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Treat backend-stored amounts as USD (user inputs USD). We still allow viewing in other currencies.
const CurrencyContext = createContext(null);

// Hard-coded fallback rates (approx) relative to 1 USD (since we store USD)
// Real-time updates could be added later via an API call.
const FALLBACK_RATES = {
  USD: 1,
  LKR: 325, // approximate
  EUR: 0.92,
  GBP: 0.78,
  INR: 83,
  AUD: 1.5,
};

const CURRENCY_META = {
  LKR: { symbol: 'LKR', label: 'Sri Lankan Rupee' },
  USD: { symbol: '$', label: 'US Dollar' },
  EUR: { symbol: '€', label: 'Euro' },
  GBP: { symbol: '£', label: 'British Pound' },
  INR: { symbol: '₹', label: 'Indian Rupee' },
  AUD: { symbol: 'A$', label: 'Australian Dollar' },
};

export function CurrencyProvider({ children }) {
  const [selected, setSelected] = useState('USD');
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional: fetch fresh rates from a free API (can be disabled if not wanted)
  const fetchRates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Example open endpoint (no key) - using exchangerate-api free tier style; replace if needed.
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('Failed to fetch rates');
      const data = await res.json();
      if (data && data.result === 'success' && data.rates) {
        // Map only supported currencies to minimize object size.
        const updated = { ...FALLBACK_RATES };
        Object.keys(updated).forEach(code => {
          if (code === 'USD') return; // base 1 now
          if (data.rates[code]) {
            updated[code] = data.rates[code]; // 1 USD -> target
          }
        });
        updated.USD = 1;
        setRates(updated);
        setLastUpdated(new Date());
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Convert from stored USD amount to selected currency
  const convertFromUSD = useCallback((amountUSD, toCurrency = selected, precision = 2) => {
    if (typeof amountUSD !== 'number' || isNaN(amountUSD)) return 0;
    const rate = rates[toCurrency] || 1; // how many target per 1 USD
    const converted = amountUSD * rate;
    // For very small conversions avoid showing 0.00
    if (converted < 0.01 && converted > 0) return '<0.01';
    return Number(converted.toFixed(precision));
  }, [rates, selected]);

  const format = useCallback((amountUSD, currency = selected, precision = 2) => {
    const meta = CURRENCY_META[currency] || { symbol: currency };
    const value = convertFromUSD(amountUSD, currency, precision);
    if (value === '<0.01') return `${meta.symbol} <0.01`;
    return `${meta.symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: precision })}`;
  }, [convertFromUSD, selected]);

  const value = {
    selectedCurrency: selected,
    setSelectedCurrency: setSelected,
    rates,
    lastUpdated,
    loading,
    error,
  convertFromUSD,
    format,
    currencies: Object.keys(CURRENCY_META).map(code => ({ code, ...CURRENCY_META[code] })),
    refresh: fetchRates,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
