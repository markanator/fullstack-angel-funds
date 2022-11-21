import { Container, Flex, Text, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IAccountProps {}

export default function MyAccountPage({}: IAccountProps) {
  const { isLoggedIn } = useIsAuth();

  return (
    <Layout SEO={{ title: "Dashboard - Angel Funds" }}>
      <AuthBanner bgImage="/images/breadcrumb.png" title="My Account" />
      <Flex bgColor="gray.200" w="full" h="full">
        <Container maxW="7xl" py="2rem">
          {!isLoggedIn ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <AccountNavbar />
              <Image
                src="/images/newFeatureComingSoon1.png"
                alt="new feature coming soon"
                width="100%"
                height="auto"
                mt={8}
                shadow="lg"
              />
            </>
          )}
        </Container>
      </Flex>
    </Layout>
  );
}
