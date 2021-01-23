import { Container } from "@chakra-ui/react";
import React from "react";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IAccountProps {}

export default function index({}: IAccountProps) {
  // TODO
  return (
    <Layout SEO={{ title: "Dashboard - VR Funds" }}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title="My Account"
      />
      <Container maxW="7xl" bgColor="gray.200" py="2rem">
        <AccountNavbar />
        USER DASHBOARD
      </Container>
    </Layout>
  );
}