import { Alert, AlertIcon, Container, Flex, Heading } from "@chakra-ui/react";
import LoginForm from "components/authShared/LoginForm";
import RegisterForm from "components/authShared/RegisterForm";
import React from "react";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";

function Index() {
  return (
    <Layout SEO={{ title: "Login/Register - Angel Funds" }}>
      {/* BANNER */}
      <AuthBanner bgImage="/images/breadcrumb.png" title="Login" />

      <Container maxW="7xl">
        <Alert status="info" mt="2rem" textColor="text_primary">
          <AlertIcon />
          We have a demo account setup. email: demo@gmail.com and Password:
          password123!@#
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

export default Index;
