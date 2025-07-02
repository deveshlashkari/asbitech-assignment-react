import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  lifeEventSchema,
  type LifeEventFormData,
} from "../schemas/lifeEventSchema";
import { STRING_PATTERNS } from "../constants/regex";
import { calculateTotalIncome, formatCurrency } from "../utils/numberUtils";

export function useLifeEventForm() {
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LifeEventFormData>({
    resolver: zodResolver(lifeEventSchema),
    defaultValues: {
      employerName: "",
      annualGrossIncome: "",
      employmentStartDate: "",
      employmentEndDate: "",
      notes: "",
    },
  });

  const watchedValues = useWatch({
    control,
    name: ["annualGrossIncome", "employmentStartDate", "employmentEndDate"],
  });
  const [annualGrossIncome, employmentStartDate, employmentEndDate] =
    watchedValues;

  const totalIncome = calculateTotalIncome(
    annualGrossIncome || "",
    employmentStartDate || "",
    employmentEndDate || ""
  );

  /**
   * Handles form submission
   *
   * Validates form data, calculates total income, generates a JSON file with all form data,
   * and automatically downloads it. Shows loading state during file generation.
   *
   * @param data - The validated form data from react-hook-form
   */
  const onSubmit = async (data: LifeEventFormData) => {
    setIsGeneratingFile(true);

    try {
      const formData = {
        ...data,
        totalIncome: formatCurrency(totalIncome),
      };

      const fileContent = JSON.stringify(formData, null, 2);
      const blob = new Blob([fileContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `life-event-${data.employerName
        .replace(STRING_PATTERNS.WHITESPACE, "-")
        .toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingFile(false);
    }
  };

  /**
   * Handles the cancel button action
   *
   * Resets the form to its initial default values, clearing all user inputs.
   */
  const handleCancel = () => {
    reset();
  };

  return {
    // Form state
    control,
    errors,
    isSubmitting,
    isGeneratingFile,
    totalIncome,

    // Form handlers
    onSubmit: handleSubmit(onSubmit),
    handleCancel,
  };
}
