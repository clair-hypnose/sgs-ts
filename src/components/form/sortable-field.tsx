import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { FieldError } from "./field-error";
import { SortableList } from "./sortable-list";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SortableField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: SortableFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  const { invalid } = fieldState;
  const { onChange, value } = field;
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      <FieldDescription>(Déplacez les réponses du plus important au moins important)</FieldDescription>
      <Field data-invalid={invalid} orientation="horizontal">
        <SortableList onValueChange={onChange} value={value} />
      </Field>
      <FieldError {...fieldState} />
    </FieldSet>
  );
}
export type SortableFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;
