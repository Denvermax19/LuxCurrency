/**
 * Formats a number into American compact system (k, M, B)
 */
export const formatAmerican = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2).replace(/\.00$/, '')} Billion`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2).replace(/\.00$/, '')} Million`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2).replace(/\.00$/, '')} Thousand`;
  }
  return num.toLocaleString('en-US');
};

/**
 * Formats a number into American abbreviation (k, M, B)
 */
export const formatAmericanAbbr = (num: number): string => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
}

/**
 * Formats a number into Indian system (Lakh, Crore)
 */
export const formatIndian = (num: number): string => {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2).replace(/\.00$/, '')} Thousand`;
  }
  return num.toLocaleString('en-IN');
};

/**
 * Formats a number into Indian abbreviation (L, Cr)
 */
export const formatIndianAbbr = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)} k`;
    return num.toString();
}

export const formatCurrency = (num: number, currency: 'USD' | 'INR'): string => {
    return num.toLocaleString(currency === 'USD' ? 'en-US' : 'en-IN', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 2
    });
};