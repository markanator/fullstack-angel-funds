import { Container } from "@chakra-ui/react";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IProjectsProps {}

export default function projects({}: IProjectsProps) {
  const { checksOut } = useIsAuth();

  if (checksOut) {
    return (
      <Layout SEO={{ title: "My Projects - VR Funds" }}>
        <AuthBanner
          bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
          title="My Projects"
        />
        <Container maxW="7xl" bgColor="gray.200" py="2rem">
          <AccountNavbar />
        </Container>
        USER projects
      </Layout>
    );
  }

  // no logged user, redirect
  return <Layout SEO={{ title: "Loading - VR Funds" }}>Loading...</Layout>;
}
