import { Container } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";
import auth0 from "../api/utils/auth0";

interface IAccountProps {
  user: any | null;
}

export default function index({ user }: IAccountProps) {
  console.log(user);
  return (
    <Layout user={user} SEO={{ title: "Dashboard - VR Funds" }}>
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

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/auth/login",
    });
    res.end();
    return;
  }

  return {
    props: {
      user: session.user,
    },
  };
}
