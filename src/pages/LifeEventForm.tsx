import { Box, Button, Typography, Grid, CircularProgress } from "@mui/material";
import FormField from "../components/FormField";
import { formatCurrency } from "../utils/numberUtils";
import { useLifeEventForm } from "../hooks/useLifeEventForm";

/**
 * LifeEventForm Component
 *
 * A form component for editing life events with employment information.
 * Displays the form UI and delegates business logic to the custom hook.
 *
 * @returns JSX.Element - The rendered life event form
 */
function LifeEventForm() {
  const {
    control,
    errors,
    isSubmitting,
    isGeneratingFile,
    totalIncome,
    onSubmit,
    handleCancel,
  } = useLifeEventForm();

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

      <Box component="form" onSubmit={onSubmit}>
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
            <FormField
              name="employerName"
              control={control}
              errors={errors}
              textFieldProps={{
                autoFocus: true,
              }}
              label="Employer's Name"
            />

            <FormField
              name="annualGrossIncome"
              control={control}
              errors={errors}
              label="Annual Gross Income (Amount)"
              variant="currency"
            />

            <FormField
              name="employmentStartDate"
              control={control}
              errors={errors}
              label="Employment Start Date"
              textFieldProps={{
                type: "date",
                slotProps: {
                  inputLabel: {
                    shrink: true,
                  },
                },
              }}
            />

            <FormField
              name="employmentEndDate"
              control={control}
              errors={errors}
              label="Employment End Date"
              textFieldProps={{
                type: "date",
                slotProps: {
                  inputLabel: {
                    shrink: true,
                  },
                },
              }}
            />

            <FormField
              name="notes"
              control={control}
              errors={errors}
              label="Notes"
              gridSize={{ xs: 12 }}
              textFieldProps={{
                multiline: true,
                rows: 6,
              }}
            />

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
}

export default LifeEventForm;
