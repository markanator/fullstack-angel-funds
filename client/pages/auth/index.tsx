import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import LoginForm from "components/authShared/LoginForm";
import RegisterForm from "components/authShared/RegisterForm";
import React from "react";
import ALink from "../../components/ALink";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";

interface IAuthProps {
  user: any | null;
}

export default function index({ user }: IAuthProps) {
  return (
    <Layout SEO={{ title: "Login/Register - VR Funds" }}>
      {/* BANNER */}
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title="Login"
      />

      <Container maxW="7xl">
        <Alert status="info" mt="2rem" textColor="text_primary">
          <AlertIcon />
          We have a demo account setup. Username: demo and Password: demo
        </Alert>
        {/* FORMS */}
        <Flex
          dir="row"
          pt="2rem"
          pb="6rem"
          justifyContent="space-evenly"
          textColor="text_primary"
        >
          {/* LEFT SIDE - LOGIN */}
          <Flex w="50%" mr="1rem" flexDirection="column">
            <Heading as="h2" fontSize="2rem" mb="1rem">
              Login
            </Heading>
            <LoginForm />
          </Flex>
          {/* RIGHT SIDE - REGISTER */}
          <Flex w="50%" mr="1rem" flexDirection="column">
            <Heading as="h3" fontSize="2rem" mb="1rem">
              Register
            </Heading>
            <RegisterForm />
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
