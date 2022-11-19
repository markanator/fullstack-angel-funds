import AuthBanner from "@/components/authShared/AuthBanner";
import { useSyncStripePaymentMutation } from "@/generated/grahpql";
import { StripePaymentInfo } from "@/types/index";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";

interface SuccessPageProps {
  paymentInfo: any;
  syncInfo: boolean;
}

export default function Success({ paymentInfo, syncInfo }: SuccessPageProps) {
  const router = useRouter();
  const { p_id }: { p_id?: string } = router.query;
  const didRender = useRef(false);
  const [syncDono, { error, loading, data }] = useSyncStripePaymentMutation();

  const formattedContent = useMemo(
    () =>
      JSON.stringify(data?.syncStripeDono?.data ?? {}, null, 2) ?? "loading...",
    []
  );

  useEffect(() => {
    if (!didRender.current) {
      console.log("SYNCING");
      syncDono({
        variables: {
          order: {
            amount: paymentInfo.amount_total,
            customerEmail: paymentInfo.customer_details.email,
            projectSlug: p_id!,
            stripeCreatedAt: paymentInfo.created.toString(),
            stripeReceiptUrl: paymentInfo.id,
          },
        },
      })
        .then(({ data }) => {
          console.log({ value: data?.syncStripeDono.data });
          didRender.current = true;
        })
        .catch((err) => {
          console.log({ err });
        });
    }
    console.log("ALREADY SYNCED");
  }, []);

  if (!paymentInfo) return <div>failed to load</div>;
  return (
    <Layout SEO={{ title: "Donation Successfull! - Angel Funds" }}>
      <AuthBanner
        overlay
        bgImage="https://images.unsplash.com/photo-1586021280718-53fbadcb65a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        title="Thank you!"
      />
      <Flex h="full" direction="column">
        <>
          {paymentInfo && (
            <>
              <h1>Checkout Payment Result</h1>
              <h2>
                Status: {paymentInfo?.payment_intent?.status ?? "loading..."}
              </h2>
              <h3>CheckoutSession response:</h3>
              <pre>{formattedContent}</pre>
              <pre>{error?.message}</pre>
            </>
          )}
          {!paymentInfo && (
            <Container maxW="7xl" m="auto">
              <Flex flexDirection="column" py="8rem">
                <Heading>Howdy!</Heading>
                <Text>
                  Thanks for stopping by but there is nothing to show!
                </Text>
              </Flex>
            </Container>
          )}
        </>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { session_id, p_id }: { session_id?: string; p_id?: string } = query;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/${session_id}`;
  const stripeDonoInfo: StripePaymentInfo | undefined = await fetch(url, {
    method: "GET",
  }).then((res) => res.json());
  if (!stripeDonoInfo) {
    return { props: { paymentInfo: null, syncInfo: false } };
  }

  return {
    props: { paymentInfo: stripeDonoInfo, syncInfo: true },
  };
};
