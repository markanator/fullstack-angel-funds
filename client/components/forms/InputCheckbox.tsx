import { Checkbox, Field, Text } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  labelText: string;
  checkboxText: string;
};

const InputCheckbox = ({ control, name, labelText, checkboxText }: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <Field.Root id={name} mb="1.125rem">
      <Field.Label htmlFor="terms" aria-hidden="true" visibility="hidden">
        {labelText}
      </Field.Label>
      <Checkbox.Root {...field} invalid={!!fieldState.error?.message}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>{checkboxText}</Checkbox.Label>
      </Checkbox.Root>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </Field.Root>
  );
};

export default InputCheckbox;
