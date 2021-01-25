import Layout from "components/Layout";
import React, { ReactElement } from "react";

interface Props {}

export default function cancel({}: Props): ReactElement {
  return (
    <Layout SEO={{ title: "Thats Ok! - VR Funds" }}>
      <p>Please keep looking around!</p>
    </Layout>
  );
}
