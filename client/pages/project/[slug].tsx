import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

interface IProjectDetailsProps {}

export default function projectDetails({}: IProjectDetailsProps) {
  const { query } = useRouter();
  return (
    <Layout SEO={{ title: "Project - VR Funds" }}>
      <Heading>{query.slug}</Heading>
      <p>Project Details</p>p
    </Layout>
  );
}
