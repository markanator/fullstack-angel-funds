import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

type Props = {
  control: any;
  name: string;
  helperText?: string;
  placeHolder?: string;
};

const InputTextArea = ({ control, name, helperText, placeHolder }: Props) => {
  const { field, fieldState } = useController({ control, name });
  return (
    <FormControl id={name} mb="1.125rem">
      <FormLabel textTransform="capitalize" htmlFor={name}>
        {name}
      </FormLabel>
      <Textarea
        {...field}
        placeholder={placeHolder}
        isInvalid={!!fieldState.error?.message}
        rows={8}
        cols={8}
        border="1px solid"
        borderColor="progress_bg"
        rounded="none"
        boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
      />
      <FormHelperText>{helperText}</FormHelperText>
      <Text fontSize="sm" color="color_alt">
        {fieldState.error?.message?.toString()}
      </Text>
    </FormControl>
  );
};

export default InputTextArea;
