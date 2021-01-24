import { Heading } from "@chakra-ui/react";
import { GetbySlugDocument } from "generated/grahpql";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { initializeApollo } from "utils/apolloClient";
import Layout from "../../components/Layout";

interface IProjectDetails {
  getProjectBySlug: {
    __typename: string;
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    fundTarget: number;
    currentFunds: number;
    publishDate: string;
    targetDate: string;
    totalDonation_sum: number;
    viewCount: number;
    votePoints: number;
    slug: string;
    author: {
      __typename: string;
      fullName: string;
      avatarUrl: string;
      email: string;
    };
  };
}

export default function projectDetails({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();
  return (
    <Layout SEO={{ title: "Project - VR Funds" }}>
      <Heading>{query.slug}</Heading>
      <p>Project Details</p>
      <p>{JSON.stringify(project, null, 2)}</p>
    </Layout>
  );
}

export async function getServerSideProps({
  res,
  query,
}: GetServerSidePropsContext) {
  const apc = initializeApollo();
  const slug = query.slug;

  const { data }: { data: IProjectDetails } = await apc.query({
    query: GetbySlugDocument,
    variables: {
      slug,
    },
  });

  console.log("project slug::", slug);
  console.log("project data loaded?::", !!data);

  if (!data?.getProjectBySlug) {
    res.writeHead(307, {
      Location: "/404",
    });

    res.end();

    return { props: {} };
  }

  return {
    props: {
      project: data?.getProjectBySlug,
    },
  };
}
