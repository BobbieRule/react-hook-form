import { useFormContext } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { Schema } from "../types/schema";
import { useGenders, useLanguages, useStates } from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { useEffect } from "react";

export function Users() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <Stack rowGap={2}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={statesQuery.data}
      />

      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languagesQuery.data}
      />

      <RHFRadioGroup<Schema>
        name="gender"
        label="Gender"
        options={gendersQuery.data}
      />
    </Stack>
  );
}
