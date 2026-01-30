import { Field, Text } from "@chakra-ui/react";
import { NativeSelect } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  options: { value: string; label: string }[];
  helperText?: string;
};

const InputSelect = ({ control, name, helperText, options }: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <Field.Root id={name} mb="1.125rem">
      <Field.Label textTransform="capitalize" htmlFor={name}>
        {name}
      </Field.Label>
      <NativeSelect.Root invalid={!!fieldState.error?.message}>
        <NativeSelect.Field placeholder="Select option" {...field}>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.HelperText>{helperText}</Field.HelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </Field.Root>
  );
};

export default InputSelect;
