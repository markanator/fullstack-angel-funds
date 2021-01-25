import Layout from "components/Layout";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import useSWR from "swr";
import { fetchGetJSON } from "utils/api-helpers";

interface Props {}

export default function success({}: Props): ReactElement {
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
    <Layout SEO={{ title: "Awesome! - VR Funds" }}>
      <h1>Checkout Payment Result</h1>
      <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
      <h3>CheckoutSession response:</h3>
      <pre>{formattedContent}</pre>
    </Layout>
  );
}
