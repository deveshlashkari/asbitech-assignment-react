import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography, Grid, CircularProgress } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../components/CustomTextField";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  calculateTotalIncome,
  formatCurrency,
} from "../utils/numberUtils";
import {
  lifeEventSchema,
  type LifeEventFormData,
} from "../schemas/lifeEventSchema";
import { STRING_PATTERNS } from "../constants/regex";

/**
 * LifeEventForm Component
 *
 * A form component for editing life events with employment information.
 * Handles form validation, real-time calculations, and file generation.
 *
 * @returns JSX.Element - The rendered life event form
 */
const LifeEventForm = () => {
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

  return (
    <Box
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.md,
        margin: "0 auto",
        padding: (theme) => theme.spacing(3),
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "text.primary",
          mb: 3,
        }}
      >
        Edit Life Event
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            padding: (theme) => theme.spacing(3),
            marginBottom: (theme) => theme.spacing(3),
            backgroundColor: "background.paper",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="employerName"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label="Employer's Name"
                    error={!!errors.employerName}
                    helperText={errors.employerName?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="annualGrossIncome"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomTextField
                    {...field}
                    label="Annual Gross Income (Amount)"
                    value={formatNumberWithCommas(value)}
                    onChange={(e) => {
                      const rawValue = parseFormattedNumber(e.target.value);
                      onChange(rawValue);
                    }}
                    error={!!errors.annualGrossIncome}
                    helperText={errors.annualGrossIncome?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <Typography sx={{ mr: 1 }}>$</Typography>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="employmentStartDate"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label="Employment Start Date"
                    type="date"
                    error={!!errors.employmentStartDate}
                    helperText={errors.employmentStartDate?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="employmentEndDate"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label="Employment End Date"
                    type="date"
                    error={!!errors.employmentEndDate}
                    helperText={errors.employmentEndDate?.message}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label="Notes"
                    multiline
                    rows={6}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "text.primary",
                  mt: 2,
                }}
              >
                Total Income: {formatCurrency(totalIncome)}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: (theme) => theme.spacing(2),
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleCancel}
            disabled={isSubmitting || isGeneratingFile}
            sx={{
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isGeneratingFile}
            sx={{
              px: 3,
              py: 1,
            }}
          >
            {isSubmitting || isGeneratingFile ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LifeEventForm;
