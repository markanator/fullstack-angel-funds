import FeaturedHomepage from "@/components/AsSeenOn/FeaturedHomepage";
import About from "@/components/homePageFeatures/About";
// locals
import CTA from "@/components/homePageFeatures/CTA";
import CTA2 from "@/components/homePageFeatures/CTA2";
import Explore from "@/components/homePageFeatures/Explore";
import FeaturedProjects from "@/components/homePageFeatures/FeaturedProjects";
import Hero from "@/components/homePageFeatures/Hero";
import HomeTeamSection from "@/components/homePageFeatures/HomeTeamSection";
import Testimonial from "@/components/homePageFeatures/Testimonial";
import TopCategories from "@/components/homePageFeatures/TopCategories";
import Layout from "@/components/Layout";
import Newsletter from "@/components/Newsletter";
import { useFetchMeQuery } from "@/generated/grahpql";
import { __isProd__ } from "@/utils/isProd";
import { isServer } from "@/utils/isServer";
import { Flex } from "@chakra-ui/react";
import React from "react";

interface IHomeProps {}

const Index = ({}: IHomeProps) => {
  // const [] = useRegisterMutation();

  const { data, loading } = useFetchMeQuery({
    skip: isServer(),
  });

  if (!loading && !__isProd__) {
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
      />
      <Explore />
      <CTA2 />
      <FeaturedHomepage />
      <Testimonial />
      <HomeTeamSection />
      <Newsletter />
    </Layout>
  );
};

export default Index;
