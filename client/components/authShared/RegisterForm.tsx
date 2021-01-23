import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "generated/grahpql";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {}

interface IFormInputs {
  fullName: string;
  reg_email: string;
  password: string;
  terms: boolean;
}

const Schema = yup.object().shape({
  fullName: yup.string().min(4, "Too short.").required("Required"),
  reg_email: yup
    .string()
    .email("Must be valid email.")
    .required("Please enter an email address."),
  password: yup
    .string()
    .min(8, "Too Short")
    .required("Please enter a password."),
  terms: yup
    .boolean()
    .oneOf([true], "You must read and accept.")
    .required("Required."),
});

export default function RegisterForm({}: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm({
    mode: "all",
    resolver: yupResolver(Schema),
  });

  const [registerMutation] = useRegisterMutation();

  const onSubmit = async (formData: IFormInputs) => {
    const options = {
      email: formData.reg_email,
      ...formData,
    };
    // alert(JSON.stringify(options, null, 2));

    const res = await registerMutation({
      variables: {
        options: options,
      },
    });

    console.log("REGISTER response", res);
  };

  return (
    <Flex
      as="form"
      flexDirection="column"
      border="1px solid"
      borderColor="gray.300"
      bgColor="white"
      p="2rem"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* FULL NAME */}
      <FormControl id="fullName">
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <Input
          name="fullName"
          type="text"
          ref={register}
          isInvalid={errors?.fullName}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {errors.fullName?.message}
        </Text>
      </FormControl>

      <FormControl id="reg_email" mt="1rem">
        <FormLabel htmlFor="reg_email">Email:</FormLabel>
        <Input
          name="reg_email"
          type="reg_email"
          ref={register}
          isInvalid={errors?.reg_email}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {errors.reg_email?.message}
        </Text>
      </FormControl>

      <FormControl id="password" mt="1rem">
        <FormLabel htmlFor="password">Password address</FormLabel>
        <Input
          name="password"
          type="password"
          ref={register}
          isInvalid={errors?.password}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {errors.password?.message}
        </Text>
      </FormControl>

      <FormControl id="terms" mt="1.5rem">
        <Checkbox
          colorScheme="red"
          name="terms"
          ref={register}
          isInvalid={errors?.terms}
        >
          I agree to the Terms and Conditions and Privacy Policy.
        </Checkbox>
        <Text fontSize="sm" color="color_alt">
          {errors.terms?.message}
        </Text>
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
