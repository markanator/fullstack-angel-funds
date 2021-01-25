import Layout from "components/Layout";
import React, { ReactElement } from "react";

interface Props {}

export default function success({}: Props): ReactElement {
  return (
    <Layout SEO={{ title: "Awesome! - VR Funds" }}>
      <p>Thank you for donating!</p>
    </Layout>
  );
}
