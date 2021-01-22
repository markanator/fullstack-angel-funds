import { GetServerSidePropsContext } from "next";
import React from "react";
import Layout from "../../components/Layout";
import auth0 from "../api/utils/auth0";

interface IProjectDetailsProps {
  user: any | null;
}

export default function projectDetails({ user }: IProjectDetailsProps) {
  return (
    <Layout user={user} SEO={{ title: "Project - VR Funds" }}>
      Project Details
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
