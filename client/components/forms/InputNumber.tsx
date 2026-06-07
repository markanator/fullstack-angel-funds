import { Field, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type Props = {
  control: any;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  helperText?: string;
  placeHolder?: string;
  disabled?: boolean;
  numberInputProps?: NumericFormatProps;
};

const InputNumber = ({
  control,
  name,
  helperText,
  placeHolder,
  numberInputProps,
  disabled = false,
}: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <Field.Root id={name} mb="1.125rem" disabled={disabled}>
      <Field.Label textTransform="capitalize" htmlFor={name}>
        {name}
      </Field.Label>
      <Input
        {...field}
        as={NumericFormat}
        placeholder={placeHolder}
        invalid={!!fieldState.error?.message}
        border="1px solid"
        borderColor="progress_bg"
        rounded="none"
        boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        {...(numberInputProps as any)}
      />
      <Field.HelperText>{helperText}</Field.HelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </Field.Root>
  );
};

export default InputNumber;
