import React from "react";
import { Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldErrors } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import type { TextFieldProps } from "@mui/material";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from "../utils/numberUtils";

interface FormFieldProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  gridSize?: { xs?: number; md?: number };
  variant?: "default" | "currency";
  textFieldProps?: Omit<
    TextFieldProps,
    "name" | "label" | "error" | "helperText"
  >;
}

function FormField<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  gridSize = { xs: 12, md: 6 },
  variant = "default",
  textFieldProps = {},
}: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <Grid size={gridSize}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (variant === "currency") {
            const { onChange, value, ...restField } = field;
            return (
              <CustomTextField
                {...restField}
                {...textFieldProps}
                label={label}
                value={formatNumberWithCommas(value)}
                onChange={(e) => {
                  const rawValue = parseFormattedNumber(e.target.value);
                  onChange(rawValue);
                }}
                error={!!error}
                helperText={error?.message as string}
                slotProps={{
                  ...textFieldProps.slotProps,
                  input: {
                    ...textFieldProps.slotProps?.input,
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  },
                }}
              />
            );
          }

          return (
            <CustomTextField
              {...field}
              {...textFieldProps}
              label={label}
              error={!!error}
              helperText={error?.message as string}
            />
          );
        }}
      />
    </Grid>
  );
}

export default FormField;
