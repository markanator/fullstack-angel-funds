import { useApolloClient } from "@apollo/client/react";
import { Button, Field, Flex, Input, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ALink from "components/ALink";
import { FetchMeDocument, useFetchMeQuery, useLoginMutation } from "generated/grahpql";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// interface Props { }

interface IFormInputs {
  log_email: string;
  log_pass: string;
}

const LoginSchema = yup.object().shape({
  log_email: yup.string().email("Must be valid email.").required("Please enter an email address."),
  log_pass: yup.string().required("Please enter a password."),
});

export default function LoginForm(): ReactElement {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    setError,
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      log_email: "demo@gmail.com",
      log_pass: "password123!@#",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (LogFormData: IFormInputs) => {
    // * make call
    const res = await login({
      variables: {
        email: LogFormData.log_email,
        password: LogFormData.log_pass,
      },
    });

    // ! error handle
    if (res.data?.login?.errors) {
      res.data?.login?.errors.forEach((element: { field: string; message: string }) => {
        if (element.field == "password") {
          setError("log_pass", {
            message: element.message,
          });
        } else {
          setError("log_email", {
            message: element.message,
          });
        }
      });
    } else if (res.data?.login?.user) {
      apolloClient.writeQuery({
        query: FetchMeDocument,
        data: {
          me: { ...res.data?.login?.user },
        },
      });
      //? All good
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        // it worked
        router.push("/my-account");
      }
    }
  };

  return (
    <Flex
      as="form"
      flexDirection="column"
      border="1px solid"
      borderColor="gray.300"
      bgColor="white"
      p="2rem"
      onSubmit={handleSubmit(onSubmit as any)}
    >
      {/* EMAIL */}
      <Field.Root id="log_email">
        <Field.Label htmlFor="log_email">Email</Field.Label>
        <Input
          type="email"
          {...register("log_email")}
          invalid={!!errors?.log_email}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {!!errors?.log_email?.message && errors?.log_email?.message.toString()}
        </Text>
      </Field.Root>

      {/* PASS */}
      <Field.Root id="log_pass" mt="1rem">
        <Field.Label htmlFor="log_pass">Password</Field.Label>
        <Input
          type="password"
          {...register("log_pass")}
          invalid={!!errors?.log_pass}
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
        <Text fontSize="sm" color="color_alt">
          {!!errors?.log_pass?.message && errors.log_pass?.message.toString()}
        </Text>
      </Field.Root>

      <Button
        type="submit"
        bgColor="color_alt"
        rounded="none"
        size="lg"
        mt="1rem"
        textTransform="uppercase"
        loading={isLoading}
        disabled={!isValid}
      >
        Login
      </Button>

      <ALink href="/auth/lost-password" mt="1rem" _hover={{ textDecoration: "underline" }}>
        Forgot Password
      </ALink>
    </Flex>
  );
}
