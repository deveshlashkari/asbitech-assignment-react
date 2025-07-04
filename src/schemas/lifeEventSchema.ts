import { z } from "zod";
import { parseISO, isValid, isAfter, isEqual } from "date-fns";
import { NUMBER_PATTERNS } from "../constants/regex";
import {
  VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
} from "../constants/validation";

export const lifeEventSchema = z
  .object({
    employerName: z
      .string()
      .min(
        VALIDATION_LIMITS.REQUIRED_FIELD_MIN,
        VALIDATION_MESSAGES.EMPLOYER_NAME.REQUIRED
      )
      .min(
        VALIDATION_LIMITS.EMPLOYER_NAME.MIN_LENGTH,
        VALIDATION_MESSAGES.EMPLOYER_NAME.MIN_LENGTH
      )
      .max(
        VALIDATION_LIMITS.EMPLOYER_NAME.MAX_LENGTH,
        VALIDATION_MESSAGES.EMPLOYER_NAME.MAX_LENGTH
      ),

    annualGrossIncome: z
      .string()
      .min(
        VALIDATION_LIMITS.REQUIRED_FIELD_MIN,
        VALIDATION_MESSAGES.ANNUAL_GROSS_INCOME.REQUIRED
      )
      .refine((val) => {
        const numericValue = val.replace(NUMBER_PATTERNS.REMOVE_COMMAS, "");
        return !isNaN(Number(numericValue)) && isFinite(Number(numericValue));
      }, VALIDATION_MESSAGES.ANNUAL_GROSS_INCOME.INVALID_FORMAT)
      .refine((val) => {
        const numericValue = val.replace(NUMBER_PATTERNS.REMOVE_COMMAS, "");
        return Number(numericValue) > 0;
      }, VALIDATION_MESSAGES.ANNUAL_GROSS_INCOME.MUST_BE_GREATER_THAN_ZERO),

    employmentStartDate: z
      .string()
      .min(
        VALIDATION_LIMITS.REQUIRED_FIELD_MIN,
        VALIDATION_MESSAGES.EMPLOYMENT_START_DATE.REQUIRED
      )
      .refine((val) => {
        const date = parseISO(val);
        return isValid(date);
      }, VALIDATION_MESSAGES.EMPLOYMENT_START_DATE.INVALID),

    employmentEndDate: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        const date = parseISO(val);
        return isValid(date);
      }, VALIDATION_MESSAGES.EMPLOYMENT_END_DATE.INVALID),

    notes: z
      .string()
      .max(
        VALIDATION_LIMITS.NOTES.MAX_LENGTH,
        VALIDATION_MESSAGES.NOTES.MAX_LENGTH
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.employmentEndDate && data.employmentStartDate) {
        const startDate = parseISO(data.employmentStartDate);
        const endDate = parseISO(data.employmentEndDate);
        return isAfter(endDate, startDate) || isEqual(endDate, startDate);
      }
      return true;
    },
    {
      message: VALIDATION_MESSAGES.EMPLOYMENT_END_DATE.AFTER_START,
      path: ["employmentEndDate"],
    }
  );

export type LifeEventFormData = z.infer<typeof lifeEventSchema>;
