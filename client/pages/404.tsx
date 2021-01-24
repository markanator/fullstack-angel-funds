import Layout from "components/Layout";
import React, { ReactElement } from "react";

interface Props {}

export default function Custom404({}: Props): ReactElement {
  return (
    <Layout SEO={{ title: "Oops, Error 404 - VR Funds" }}>
      <p>Page Not Found</p>
    </Layout>
  );
}
