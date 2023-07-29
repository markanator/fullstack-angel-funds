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

const Index = () => {
  const { data, loading } = useFetchMeQuery({
    skip: isServer(),
  });

  if (!loading && !__isProd__) {
    console.log("me data", data);
  }

  return (
    <Layout
      SEO={{
        title:
          "Angel Funds - Help lift low income entreprenuers that are trying to break into the tech space!",
        description:
          "Angel Funds - Help lift low income entreprenuers that are trying to break into the tech space!",
        image: "/images/hero.jpg",
        keywords: "funding platform, technology, startup, not really a bussiness, mark ambrocio",
      }}
    >
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
        backgroundImage="url('/images/bg-lines-transparent-2.png')"
        bgPosition="bottom right"
        backgroundRepeat="repeat-x"
      />
      {/* <Explore /> */}
      <CTA2 />
      <FeaturedHomepage />
      <Testimonial />
      <HomeTeamSection />
      <Newsletter />
    </Layout>
  );
};

export default Index;
