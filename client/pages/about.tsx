import React from "react";
import Layout from "../components/Layout";

interface IAboutProps {}

export default function about({}: IAboutProps) {
  return (
    <Layout SEO={{ title: "About Us - VR Funds" }}>
      <p>About</p>
      Page
    </Layout>
  );
}
