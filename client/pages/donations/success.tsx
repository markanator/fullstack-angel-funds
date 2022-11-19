import AuthBanner from "@/components/authShared/AuthBanner";
import { fetchGetJSON } from "@/utils/api-helpers";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";

interface Props {}

export default function Success({}: Props): ReactElement {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/donations/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  const formattedContent: string =
    JSON.stringify(data, null, 2) ?? "loading...";

  return (
    <Layout SEO={{ title: "Donation Successfull! - Angel Funds" }}>
      <AuthBanner
        overlay
        bgImage="https://images.unsplash.com/photo-1586021280718-53fbadcb65a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        title="Thank you!"
      />
      <Flex h="full" direction="column">
        {data && (
          <>
            <h1>Checkout Payment Result</h1>
            <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
            <h3>CheckoutSession response:</h3>
            <pre>{formattedContent}</pre>
          </>
        )}
        {!data && (
          <Container maxW="7xl" m="auto">
            <Flex flexDirection="column" py="8rem">
              <Heading>Howdy!</Heading>
              <Text>Thanks for stopping by but there is nothing to show!</Text>
            </Flex>
          </Container>
        )}
      </Flex>
    </Layout>
  );
}
