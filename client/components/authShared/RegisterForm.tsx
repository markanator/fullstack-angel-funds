import { useApolloClient } from "@apollo/client";
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
import { FetchMeDocument, useRegisterMutation } from "generated/grahpql";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props { }

interface IFormInputs {
  fullName: string;
  reg_email: string;
  password: string;
  terms: boolean;
}

const RegSchema = yup.object().shape({
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

export default function RegisterForm({ }: Props): ReactElement {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    mode: "all",
    resolver: yupResolver(RegSchema),
  });

  const [registerMutation] = useRegisterMutation();

  const onSubmit = async (formData: IFormInputs) => {
    const options = {
      email: formData.reg_email,
      fullName: formData.fullName,
      password: formData.password,
    };

    const res = await registerMutation({
      variables: {
        options,
      },
    });

    //! set errors from server
    if (res.data?.register?.errors) {
      res.data?.register?.errors.forEach((element) => {
        setError(element.field, {
          message: element.message,
        });
      });
    } else if (res.data?.register?.user) {
      apolloClient.writeQuery({
        query: FetchMeDocument,
        data: {
          me: { ...res.data?.register?.user },
        },
      });
      // * All good
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        // it worked
        router.push("/my-account");
      }
    }

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
          {...register("fullName")}
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
        <FormLabel htmlFor="reg_email">Email</FormLabel>
        <Input
          name="reg_email"
          type="reg_email"
          {...register("reg_email")}
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
          {...register("password")}
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
          {...register("terms")}
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
