import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IAccountProps {}

export default function index({}: IAccountProps) {
  const { checksOut } = useIsAuth();

  if (checksOut) {
    return (
      <Layout SEO={{ title: "Dashboard - VR Funds" }}>
        <AuthBanner bgImage="/images/breadcrumb.png" title="My Account" />
        <Flex bgColor="gray.200" w="full" h="full">
          <Container maxW="7xl" py="2rem">
            <AccountNavbar />
            USER DASHBOARD
          </Container>
        </Flex>
      </Layout>
    );
  }

  return <Layout SEO={{ title: "Loading - VR Funds" }}>Loading...</Layout>;
}
