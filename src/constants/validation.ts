/**
 * Validation constants used throughout the application
 */

// Validation limits
export const VALIDATION_LIMITS = {
  EMPLOYER_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  NOTES: {
    MAX_LENGTH: 500,
  },
  REQUIRED_FIELD_MIN: 1,
} as const;

// Error messages
export const VALIDATION_MESSAGES = {
  EMPLOYER_NAME: {
    REQUIRED: "Employer name is required",
    MIN_LENGTH: "Employer name must be at least 2 characters",
    MAX_LENGTH: "Employer name must be less than 100 characters",
  },
  ANNUAL_GROSS_INCOME: {
    REQUIRED: "Annual gross income is required",
    INVALID: "Please enter a valid income amount",
  },
  EMPLOYMENT_START_DATE: {
    REQUIRED: "Employment start date is required",
    INVALID: "Please enter a valid start date",
  },
  EMPLOYMENT_END_DATE: {
    INVALID: "Please enter a valid end date",
    AFTER_START: "Employment end date must be after start date",
  },
  NOTES: {
    MAX_LENGTH: "Notes must be less than 500 characters",
  },
} as const;
