import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import React from "react";
import Layout from "../components/Layout";
import { client } from "../utils/apolloClient";
import auth0 from "./api/utils/auth0";

interface IExploreProps {
  user: any | null;
  projects: any[] | null;
}

export default function explore({ user, projects }: IExploreProps) {
  console.log("data", projects);
  return (
    <Layout user={user} SEO={{ title: "Explore Projects - VR Funds" }}>
      EXPLORE
    </Layout>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await auth0.getSession(req);

  const { data } = await client.query({
    query: gql`
      query GetProjects {
        projects {
          id
          title
          description
        }
      }
    `,
  });

  return {
    props: {
      projects: data.projects || null,
      user: session?.user || null,
    },
  };
}
