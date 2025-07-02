import React from "react";
import { Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldErrors } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from "../utils/numberUtils";

interface FormFieldIncomeProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  gridSize?: { xs?: number; md?: number };
}

function FormFieldIncome<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  gridSize = { xs: 12, md: 6 },
}: FormFieldIncomeProps<T>) {
  const error = errors[name];

  return (
    <Grid size={gridSize}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <CustomTextField
            {...field}
            label={label}
            value={formatNumberWithCommas(value)}
            onChange={(e) => {
              const rawValue = parseFormattedNumber(e.target.value);
              onChange(rawValue);
            }}
            error={!!error}
            helperText={error?.message as string}
            slotProps={{
              input: {
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              },
            }}
          />
        )}
      />
    </Grid>
  );
}

export default FormFieldIncome;
