import { useApolloClient } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// locals
import Banner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import { useForgotPasswordMutation } from "../../generated/grahpql";

interface ILostMyPasswordProps {}

interface IFormInputs {
  forgot_email: string;
}

const ForgotSchema = yup.object().shape({
  forgot_email: yup.string().email("Must be valid email.").required("Please enter an email address."),
});

export default function LostPassword({}: ILostMyPasswordProps) {
  // const router = useRouter();
  // const apolloClient = useApolloClient();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(ForgotSchema),
  });

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: IFormInputs) => {
    // alert(JSON.stringify(formData.forgot_email, null, 2));
    // router.push("/my-account");
    const res = await forgotPassword({
      variables: {
        email: formData.forgot_email,
      },
    });

    if (res.data?.forgotPassword) {
      toast({
        title: "Email Sent!",
        description: "If the email address exists, we will immediately send instructions to you.",
        isClosable: true,
        duration: 9000,
      });
    }
  };

  return (
    <Layout SEO={{ title: "Reset Password - VR Funds" }}>
      <Banner bgImage="/images/breadcrumb.png" title="Forgot Password" />
      <Container maxW="7xl" pt="3rem">
        <Alert status="info" mb="2rem">
          <AlertIcon />
          We have a demo account setup. Username: <strong> demo </strong> and Password: <strong>demo</strong>
        </Alert>
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
            <FormControl id="forgot_email">
              <Text mb="1.5rem" fontSize="md" textColor="text_secondary">
                Enter your email. You will receive a link to create a new password via email.
              </Text>
              <FormLabel htmlFor="forgot_email">Email</FormLabel>
              <Input
                type="email"
                border="1px solid"
                {...register("forgot_email")}
                isInvalid={!!errors?.forgot_email}
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <Text fontSize="sm" color="color_alt">
                {errors.forgot_email?.message?.toString()}
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
              Reset Password
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
