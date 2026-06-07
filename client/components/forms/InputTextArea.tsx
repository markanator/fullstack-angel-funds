import { Field, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  helperText?: string;
  placeHolder?: string;
  rows?: number;
  cols?: number;
};

const InputTextArea = ({ control, name, helperText, placeHolder, rows = 8 }: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <Field.Root id={name} mb="1.125rem" invalid={!!fieldState.error?.message}>
      <Field.Label textTransform="capitalize" htmlFor={name}>
        {name}
      </Field.Label>
      <Textarea
        {...field}
        placeholder={placeHolder}
        rows={rows}
        border="1px solid"
        borderColor="progress_bg"
        rounded="none"
        boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
      />
      <Field.HelperText>{helperText}</Field.HelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message?.toString()}
      </Text>
    </Field.Root>
  );
};

export default InputTextArea;
