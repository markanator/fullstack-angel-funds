import {
  Checkbox,
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
  labelText: string;
  checkboxText: string;
};

const InputCheckbox = ({ control, name, labelText, checkboxText }: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormControl id={name} mb="1.125rem">
      <FormLabel htmlFor="terms" aria-hidden="true" visibility="hidden">
        {labelText}
      </FormLabel>
      <Checkbox {...field} isInvalid={!!fieldState.error?.message}>
        {checkboxText}
      </Checkbox>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </FormControl>
  );
};

export default InputCheckbox;
