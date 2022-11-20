import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
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
    <FormControl id={name} mb="1.125rem">
      <FormLabel textTransform="capitalize" htmlFor={name}>
        {name}
      </FormLabel>
      <Select
        placeholder="Select option"
        {...field}
        isInvalid={!!fieldState.error?.message}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message}
      </Text>
    </FormControl>
  );
};

export default InputSelect;
