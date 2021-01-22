import { GetServerSidePropsContext } from "next";
import React from "react";
import Layout from "../components/Layout";
import auth0 from "./api/utils/auth0";

interface IHomeProps {
  user: any | null;
}

export default function contact({ user }: IHomeProps) {
  return (
    <Layout user={user} SEO={{ title: "Contact Us - VR Funds" }}>
      Contact
    </Layout>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    return { props: {} };
  }

  return {
    props: {
      user: session.user || null,
    },
  };
}
