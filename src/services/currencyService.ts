import { DEFAULT_RATES } from '../constants';
import { RateData } from '../types';

let rateCache: RateData | null = null;

export const getExchangeRates = async (): Promise<number> => {
  // Check local memory cache first (5 minutes)
  if (rateCache && (Date.now() - rateCache.lastUpdated < 5 * 60 * 1000)) {
    return rateCache.rates.INR;
  }

  try {
    // Fix: Cast import.meta to any to avoid TypeScript error "Property 'env' does not exist on type 'ImportMeta'"
    const apiKey = (import.meta as any).env.VITE_CURRENCY_API_KEY;
    
    // Construct URL: If key exists, use authenticated endpoint, otherwise fall back to open endpoint
    const url = apiKey 
      ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
      : 'https://open.er-api.com/v6/latest/USD';

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();

    // Handle different API response structures depending on if key was used or not
    // ExchangeRate-API (Key) returns: conversion_rates
    // Open.er-api (No Key) returns: rates
    const rates = data.conversion_rates || data.rates;

    if (rates && rates.INR) {
      rateCache = {
        rates: { USD: 1, INR: rates.INR },
        lastUpdated: Date.now()
      };
      return rates.INR;
    }
    throw new Error("Invalid API response structure");
  } catch (error) {
    console.warn("Currency service failed, using fallback rates.", error);
    return DEFAULT_RATES.USD_TO_INR;
  }
};