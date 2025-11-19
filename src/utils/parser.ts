import { INDIAN_MULTIPLIERS, AMERICAN_MULTIPLIERS } from '../src/constants';

const ALL_MULTIPLIERS = { ...INDIAN_MULTIPLIERS, ...AMERICAN_MULTIPLIERS };

/**
 * Normalizes input string by removing commas, extra spaces, and handling basic typos.
 */
const normalizeInput = (input: string): string => {
  return input.toLowerCase().replace(/,/g, '').trim();
};

/**
 * Parses a hybrid number string into a raw float value.
 * Supports formats like:
 * - "4 lakh"
 * - "2 crore 50 lakh"
 * - "1.5M"
 * - "4k"
 */
export const parseHybridNumber = (input: string): number => {
  const cleanInput = normalizeInput(input);
  if (!cleanInput) return 0;

  // Check for pure number first
  const pureNumber = parseFloat(cleanInput);
  if (!isNaN(pureNumber) && /^\d+(\.\d+)?$/.test(cleanInput)) {
    return pureNumber;
  }

  // Tokenization approach
  // Regex splits by numbers and words, keeping delimiters
  // e.g. "2.5 crore 5 lakh" -> ["2.5", "crore", "5", "lakh"]
  // e.g. "4L" -> ["4", "L"]
  const tokens = cleanInput.split(/([0-9]+(?:\.[0-9]+)?)|(\s+)/).filter(t => t && t.trim().length > 0);

  let totalValue = 0;
  let currentNumber = 0;
  let hasCurrentNumber = false;

  for (const token of tokens) {
    const val = parseFloat(token);

    if (!isNaN(val)) {
      // If we already have a pending number that hasn't been multiplied (e.g. "100 200"), add it
      // This handles spaces between numbers, though technically invalid, we sum them in this logic or treating as separate entities
      if (hasCurrentNumber) {
        totalValue += currentNumber;
      }
      currentNumber = val;
      hasCurrentNumber = true;
    } else {
      // It's a word/suffix
      // Check if it is a multiplier
      const multiplier = ALL_MULTIPLIERS[token] || 
                         Object.entries(ALL_MULTIPLIERS).find(([key]) => token.startsWith(key))?.[1];

      if (multiplier) {
        if (hasCurrentNumber) {
            totalValue += currentNumber * multiplier;
            currentNumber = 0;
            hasCurrentNumber = false;
        } else {
            // Case like "lakh" appearing without number? assume 1? No, usually invalid. 
            // But for "half lakh" (not supported here), or just typos. 
        }
      }
    }
  }

  // Add remaining number
  if (hasCurrentNumber) {
    totalValue += currentNumber;
  }

  return totalValue;
};