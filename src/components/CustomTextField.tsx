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
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "text.primary",
          },
        },
        "& .MuiFilledInput-root": {
          backgroundColor: "grey.50",
          "&.Mui-focused": {
            borderColor: "text.primary",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: "bold",
          "&.Mui-focused": {
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
