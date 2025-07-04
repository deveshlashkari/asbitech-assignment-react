import React from "react";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
}

function CustomTextField({
  variant = "outlined",
  sx,
  ...props
}: CustomTextFieldProps) {
  return (
    <TextField
      variant={variant}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "grey.50",
          "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },
        },
        "& .MuiFilledInput-root": {
          backgroundColor: "grey.50",
          "&.Mui-focused:not(.Mui-error)": {
            borderColor: "text.primary",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: "bold",
          "&.Mui-focused:not(.Mui-error)": {
            color: "text.primary",
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}

export default CustomTextField;
