import { differenceInDays, parseISO, isValid, startOfToday } from "date-fns";
import { NUMBER_PATTERNS } from "../constants/regex";

/**
 * Formats a number with thousands separators
 * @param value - The number to format (string or number)
 * @returns Formatted string with commas as thousands separators
 */
export const formatNumberWithCommas = (value: string | number): string => {
  if (!value && value !== 0) return "";

  const cleanValue = value
    .toString()
    .replace(NUMBER_PATTERNS.REMOVE_COMMAS, "");

  if (isNaN(Number(cleanValue))) return cleanValue;

  const parts = cleanValue.split(".");

  parts[0] = (parts[0] || "").replace(NUMBER_PATTERNS.THOUSANDS_SEPARATOR, ",");

  return parts.join(".");
};

/**
 * Removes commas and returns raw numeric value
 * @param formattedValue - The formatted string with commas
 * @returns Raw numeric string without commas
 */
export const parseFormattedNumber = (formattedValue: string): string => {
  if (!formattedValue) return "";

  return formattedValue.replace(NUMBER_PATTERNS.DIGITS_AND_DECIMAL_ONLY, "");
};

/**
 * Calculates the total income earned during employment period
 * @param annualGrossIncome - Annual gross income as formatted string with commas
 * @param employmentStartDate - Start date of employment in ISO format
 * @param employmentEndDate - End date of employment in ISO format
 * @returns Total income earned (rounded to nearest integer) based on years worked and annual income
 */
export const calculateTotalIncome = (
  annualGrossIncome: string,
  employmentStartDate: string,
  employmentEndDate: string
) => {
  if (!annualGrossIncome || !employmentStartDate) {
    return 0;
  }

  try {
    const startDate = parseISO(employmentStartDate);

    const endDate = employmentEndDate
      ? parseISO(employmentEndDate)
      : startOfToday();

    // Validate dates
    if (!isValid(startDate) || !isValid(endDate)) {
      return 0;
    }

    if (endDate < startDate) {
      return 0;
    }

    const totalDays = differenceInDays(endDate, startDate);
    // Add 1 to make end date inclusive for the calculation
    const actualDaysWorked = totalDays + 1;
    // Using 365.25 to account for leap years (average days per year over a 4-year cycle)
    const yearsWorked = actualDaysWorked / 365.25;

    const annualIncome =
      parseFloat(parseFormattedNumber(annualGrossIncome)) || 0;

    return Math.round(annualIncome * yearsWorked);
  } catch (error) {
    console.warn("Error calculating total income:", error);
    return 0;
  }
};

/**
 * Formats a number as US currency
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "$1,500")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
