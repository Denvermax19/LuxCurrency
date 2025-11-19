export const INDIAN_MULTIPLIERS: { [key: string]: number } = {
  k: 1000,
  thousand: 1000,
  l: 100000,
  lakh: 100000,
  lac: 100000,
  c: 10000000,
  cr: 10000000,
  crore: 10000000,
  arab: 1000000000,
};

export const AMERICAN_MULTIPLIERS: { [key: string]: number } = {
  k: 1000,
  thousand: 1000,
  m: 1000000,
  million: 1000000,
  b: 1000000000,
  billion: 1000000000,
  t: 1000000000000,
  trillion: 1000000000000,
};

export const DEFAULT_RATES = {
  INR_TO_USD: 0.012, // Fallback
  USD_TO_INR: 83.5,   // Fallback
};

export const API_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const SAMPLE_INPUTS = [
  "4 lakh", "2.5 Cr", "1 crore 50 lakh", "45k", "2.3 million", "10 grand"
];