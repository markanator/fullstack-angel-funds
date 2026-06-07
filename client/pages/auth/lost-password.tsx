import { toaster } from "@/utils/toaster";
import { Alert, Button, Container, Field, Flex, Input, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// locals
import Banner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import { useForgotPasswordMutation } from "../../generated/grahpql";
import ALink from "@/components/ALink";

interface ILostMyPasswordProps {}

interface IFormInputs {
  forgot_email: string;
}

const ForgotSchema = yup.object().shape({
  forgot_email: yup
    .string()
    .email("Must be valid email.")
    .required("Please enter an email address."),
});

export default function LostPassword({}: ILostMyPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "all",
    resolver: yupResolver(ForgotSchema),
  });

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: IFormInputs) => {
    const res = await forgotPassword({
      variables: {
        email: formData.forgot_email,
      },
    });

    if (res.data?.forgotPassword) {
      toaster.create({
        title: "Email Sent!",
        description: "If the email address exists, we will immediately send instructions to you.",
        duration: 9000,
      });
    }
  };

  return (
    <Layout SEO={{ title: "Reset Password - Angel Funds" }}>
      <Banner bgImage="/images/breadcrumb.png" title="Forgot Password" />
      <Container maxW="7xl" pt="3rem">
        <Alert.Root status="info" mb="2rem">
          <Alert.Indicator />
          <Alert.Content>
            We have a demo account setup. Username: <strong> demo@gmail.com </strong> and Password:{" "}
            <strong>password123!@#</strong>
          </Alert.Content>
        </Alert.Root>
        <Flex w="50%" mr="1rem" flexDirection="column" pb="6rem">
          <Flex
            as="form"
            flexDirection="column"
            border="1px solid"
            borderColor="gray.300"
            bgColor="white"
            p="2rem"
            onSubmit={handleSubmit(onSubmit as any)}
          >
            <Field.Root id="forgot_email" invalid={!!errors?.forgot_email}>
              <Text mb="1.5rem" fontSize="md" color="text_secondary">
                Enter your email. You will receive a link to create a new password via email.
              </Text>
              <Field.Label htmlFor="forgot_email">Email</Field.Label>
              <Input
                type="email"
                border="1px solid"
                {...register("forgot_email")}
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <Text fontSize="sm" color="color_alt">
                {errors.forgot_email?.message?.toString()}
              </Text>
            </Field.Root>

            <Button
              type="submit"
              bgColor="color_alt"
              rounded="none"
              size="lg"
              mt="1rem"
              textTransform="uppercase"
            >
              Reset Password
            </Button>
            <ALink href="/auth" mt="1rem" _hover={{ textDecoration: "underline" }}>
              Remember Password?
            </ALink>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
