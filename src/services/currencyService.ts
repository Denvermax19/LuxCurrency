import { DEFAULT_RATES } from '../src/constants';
import { RateData } from '../src/types';

let rateCache: RateData | null = null;

export const getExchangeRates = async (): Promise<number> => {
  // Check cache
  if (rateCache && (Date.now() - rateCache.lastUpdated < 5 * 60 * 1000)) {
    return rateCache.rates.INR;
  }

  try {
    // Using a free open API
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();

    if (data && data.rates && data.rates.INR) {
      rateCache = {
        rates: { USD: 1, INR: data.rates.INR },
        lastUpdated: Date.now()
      };
      return data.rates.INR; // Returns How many INR for 1 USD
    }
    throw new Error("Invalid API response");
  } catch (error) {
    console.warn("Currency API failed, using fallback rates.", error);
    return DEFAULT_RATES.USD_TO_INR;
  }
};