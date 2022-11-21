import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
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
    <FormControl id={name} mb="1.125rem" isDisabled={disabled}>
      <FormLabel textTransform="capitalize" htmlFor={name}>
        {name}
      </FormLabel>
      <Input
        {...field}
        placeholder={placeHolder}
        type={type}
        isInvalid={!!fieldState.error?.message}
        border="1px solid"
        borderColor="progress_bg"
        rounded="none"
        boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
      />
      <FormHelperText>{helperText}</FormHelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </FormControl>
  );
};

export default InputText;
