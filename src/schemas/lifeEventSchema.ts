import { z } from "zod";
import { parseISO, isValid, isAfter, isEqual } from "date-fns";
import { NUMBER_PATTERNS } from "../constants/regex";

export const lifeEventSchema = z
  .object({
    employerName: z
      .string()
      .min(1, "Employer name is required")
      .min(2, "Employer name must be at least 2 characters")
      .max(100, "Employer name must be less than 100 characters"),

    annualGrossIncome: z
      .string()
      .min(1, "Annual gross income is required")
      .refine((val) => {
        const numericValue = val.replace(NUMBER_PATTERNS.REMOVE_COMMAS, "");
        return !isNaN(Number(numericValue)) && Number(numericValue) > 0;
      }, "Please enter a valid income amount"),

    employmentStartDate: z
      .string()
      .min(1, "Employment start date is required")
      .refine((val) => {
        const date = parseISO(val);
        return isValid(date);
      }, "Please enter a valid start date"),

    employmentEndDate: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        const date = parseISO(val);
        return isValid(date);
      }, "Please enter a valid end date"),

    notes: z
      .string()
      .max(500, "Notes must be less than 500 characters")
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
      message: "Employment end date must be after start date",
      path: ["employmentEndDate"],
    }
  );

export type LifeEventFormData = z.infer<typeof lifeEventSchema>;
