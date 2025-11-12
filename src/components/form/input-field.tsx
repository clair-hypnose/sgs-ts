import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldError, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "../ui/input";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function InputField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: InputFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      <Field data-invalid={fieldState.invalid} orientation="horizontal">
        <Input {...field} />
      </Field>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
}
export type InputFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;
