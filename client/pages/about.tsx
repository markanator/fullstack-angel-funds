import FeaturedSimple from "@/components/AsSeenOn/FeaturedSimple";
import AuthBanner from "@/components/authShared/AuthBanner";
import CTA2 from "@/components/homePageFeatures/CTA2";
import HomeTeamSection from "@/components/homePageFeatures/HomeTeamSection";
import Testimonial from "@/components/homePageFeatures/Testimonial";
import Layout from "@/components/Layout";
import IconSection from "@/components/TextWithIcon";
import { Flex, Heading, Text, Container, Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface IAboutProps {}

export default function about({}: IAboutProps) {
  return (
    <Layout SEO={{ title: "About Us - VR Funds" }}>
      <AuthBanner title="About" />
      {/* OG CONTENT HERE */}
      <Container maxW="7xl" w="full" py="5rem">
        <Flex direction="row" w="full">
          {/* LEFT IMAGE */}
          <Flex w="50%" direction="column" justifyContent="space-between">
            <Heading as="h3">Learn About Us</Heading>
            <Text textColor="text_secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              tortor turpis. Pellentesque in arcu id augue tempus imperdiet ac
              sed metus. Praesent pellentesque nunc sed malesuada placerat.
              Integer gravida facilisis fringilla. Aenean aliquet odio justo.
            </Text>
            <IconSection
              title="Highest Success Rates"
              blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum."
            />
            <IconSection
              title="By POC, for POC"
              blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum."
            />
          </Flex>
          {/* RIGHT IMAGE */}
          <Flex w="50%" direction="column">
            <Flex pos="relative">
              <Image
                src="/images/about-us.jpg"
                alt="about us"
                width="800"
                height="750"
              />
              <Box
                pos="absolute"
                bottom="20px"
                left="20px"
                bg="color_alt"
                textColor="text_primary"
                p="2rem"
              >
                <Heading as="p">321</Heading>
                <Text>Projects Bootstrapped!</Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <HomeTeamSection showBG={false} />
      <CTA2 />
      <Testimonial />
      <FeaturedSimple />
    </Layout>
  );
}
