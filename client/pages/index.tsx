import { Flex } from "@chakra-ui/react";
import React from "react";
import { withApollo } from "utils/withApollo";
import About from "../components/homePageFeatures/About";
// locals
import CTA from "../components/homePageFeatures/CTA";
import CTA2 from "../components/homePageFeatures/CTA2";
import Explore from "../components/homePageFeatures/Explore";
import FeaturedProjects from "../components/homePageFeatures/FeaturedProjects";
import Hero from "../components/homePageFeatures/Hero";
import HomeTeamSection from "../components/homePageFeatures/HomeTeamSection";
import SeenOn from "../components/homePageFeatures/SeenOn";
import Testimonial from "../components/homePageFeatures/Testimonial";
import TopCategories from "../components/homePageFeatures/TopCategories";
import Layout from "../components/Layout";
import Newsletter from "../components/Newsletter";
import { useFetchMeQuery } from "../generated/grahpql";
import { isServer } from "../utils/isServer";

interface IHomeProps {}

const Index = ({}: IHomeProps) => {
  // const [] = useRegisterMutation();

  const { data, loading } = useFetchMeQuery({
    skip: isServer(),
  });

  if (!loading) {
    console.log("me data", data);
  }
  // console.log("server user data", user);

  return (
    <Layout SEO={{ title: "Home - VR Funds" }}>
      <Hero />
      <TopCategories />
      <CTA />
      <FeaturedProjects />
      <About />
      <Flex
        as="section"
        w="full"
        mt="-311px"
        bgColor="color_primary"
        padding="451px 0 0"
      ></Flex>
      <Explore />
      <CTA2 />
      <SeenOn />
      <Testimonial />
      <HomeTeamSection />
      <Newsletter />
    </Layout>
  );
};

export default Index;
