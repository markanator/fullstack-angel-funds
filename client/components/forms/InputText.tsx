import { Field, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  helperText?: string;
  placeHolder?: string;
  disabled?: boolean;
};

const InputText = ({
  control,
  name,
  helperText,
  placeHolder,
  type = "text",
  disabled = false,
}: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <Field.Root
      id={name}
      mb="1.125rem"
      disabled={disabled}
      invalid={!!fieldState.error?.message}
    >
      <Field.Label textTransform="capitalize" htmlFor={name}>
        {name}
      </Field.Label>
      <Input
        {...field}
        placeholder={placeHolder}
        type={type}
        border="1px solid"
        borderColor="progress_bg"
        rounded="none"
        boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
      />
      <Field.HelperText>{helperText}</Field.HelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </Field.Root>
  );
};

export default InputText;
