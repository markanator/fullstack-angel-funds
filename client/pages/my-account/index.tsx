import { Container, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IAccountProps {}

export default function MyAccountPage({}: IAccountProps) {
  const { isLoggedIn } = useIsAuth();

  if (!isLoggedIn) {
    return <Layout SEO={{ title: "Loading - Angel Funds" }}>Loading...</Layout>;
  }

  return (
    <Layout SEO={{ title: "Dashboard - Angel Funds" }}>
      <AuthBanner bgImage="/images/breadcrumb.png" title="My Account" />
      <Flex bgColor="gray.200" w="full" h="full">
        <Container maxW="7xl" py="2rem">
          <AccountNavbar />
        </Container>
      </Flex>
    </Layout>
  );
}
