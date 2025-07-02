/**
 * Regular expression patterns used throughout the application
 */

// Number formatting patterns
export const NUMBER_PATTERNS = {
  /** Removes all commas from a string */
  REMOVE_COMMAS: /,/g,

  /** Adds commas as thousands separators */
  THOUSANDS_SEPARATOR: /\B(?=(\d{3})+(?!\d))/g,

  /** Extracts only digits and decimal points from a string */
  DIGITS_AND_DECIMAL_ONLY: /[^\d.]/g,
} as const;

// String formatting patterns
export const STRING_PATTERNS = {
  /** Replaces one or more whitespace characters */
  WHITESPACE: /\s+/g,
} as const;
