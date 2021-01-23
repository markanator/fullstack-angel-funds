import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Props {}

interface IFormInputs {
  fullName: string;
  email: string;
  password: string;
  terms: boolean;
}

// const schema;

export default function RegisterForm({}: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm<IFormInputs>();

  return (
    <Flex
      as="form"
      flexDirection="column"
      border="1px solid"
      borderColor="gray.300"
      bgColor="white"
      p="2rem"
    >
      {/* FULL NAME */}
      <FormControl id="fullName">
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <Input
          name="fullName"
          type="text"
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
      </FormControl>

      <FormControl id="email">
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          name="email"
          type="email"
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
      </FormControl>

      <FormControl id="password" mt="1rem">
        <FormLabel htmlFor="password">Password address</FormLabel>
        <Input
          name="password"
          type="password"
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
      </FormControl>

      <FormControl id="password" mt="1.5rem">
        <Checkbox colorScheme="red">
          I agree to the Terms and Conditions and Privacy Policy.
        </Checkbox>
      </FormControl>

      <Button
        type="submit"
        bgColor="color_alt"
        rounded="none"
        size="lg"
        mt="1rem"
        textTransform="uppercase"
      >
        Register
      </Button>
    </Flex>
  );
}
