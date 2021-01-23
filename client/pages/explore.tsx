import React from "react";
import Layout from "../components/Layout";

interface IExploreProps {
  projects?: any[] | null;
}

export default function explore({ projects }: IExploreProps) {
  console.log("data", projects);
  return (
    <Layout SEO={{ title: "Explore Projects - VR Funds" }}>
      <p>EXPLORE</p>
      <p>EXPLORE</p>
    </Layout>
  );
}
