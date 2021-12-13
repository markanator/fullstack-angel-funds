import { login } from "@/async/auth";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.umd";
import ALink from "components/ALink";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import TokenIntercepter from '../../axios/intercepters'

// interface Props { }

interface IFormInputs {
  log_email: string;
  log_pass: string;
}

const LoginSchema = yup.object().shape({
  log_email: yup
    .string()
    .email("Must be valid email.")
    .required("Please enter an email address."),
  log_pass: yup.string().required("Please enter a password."),
});

export default function LoginForm(): ReactElement {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    mode: "all",
    resolver: yupResolver(LoginSchema),
  });

  const {mutate: logUser} = useMutation( ({email, pass}: any) => login(email, pass));

  const onSubmit = async (LogFormData: IFormInputs) => {
    // * make call
    logUser({email: LogFormData.log_email,pass: LogFormData.log_pass},{
      onSuccess:  ({data})=>{
        console.log({data});
        TokenIntercepter.setUserToken(data?.access_token as string);
        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        } else {
          // it worked
          router.push("/my-account");
        }
      },
      onError: (er)=>{
        // @ts-ignore
        console.error(er?.message);
      }
    });
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
      {/* EMAIL */}
      <FormControl id="log_email">
        <FormLabel htmlFor="log_email">Email</FormLabel>
        <Input
          name="log_email"
          type="email"
          {...register("log_email")}
          isInvalid={errors?.log_email}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {errors.log_email?.message}
        </Text>
      </FormControl>

      {/* PASS */}
      <FormControl id="log_pass" mt="1rem">
        <FormLabel htmlFor="log_pass">Password</FormLabel>
        <Input
          name="log_pass"
          type="password"
          {...register("log_pass")}
          isInvalid={errors?.log_pass}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {errors.log_pass?.message}
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
        Login
      </Button>

      <ALink href="/auth/lost-password" mt="1rem">
        Forgot Password
      </ALink>
    </Flex>
  );
}
