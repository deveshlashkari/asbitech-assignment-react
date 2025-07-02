import React from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldErrors } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import type { TextFieldProps } from "@mui/material";

interface FormFieldProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  gridSize?: { xs?: number; md?: number };
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
  textFieldProps = {},
}: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <Grid size={gridSize}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            {...textFieldProps}
            label={label}
            error={!!error}
            helperText={error?.message as string}
          />
        )}
      />
    </Grid>
  );
}

export default FormField;
