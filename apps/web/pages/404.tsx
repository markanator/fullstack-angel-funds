import ALink from "@/components/ALink";
import ButtonNormal from "@/components/ButtonNormal";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "components/Layout";
import React, { ReactElement } from "react";

interface Props {}

export default function Custom404({}: Props): ReactElement {
  const bgImage = "/images/error.jpg";
  return (
    <Layout SEO={{ title: "Oops, Error 404 - VR Funds" }}>
      <Flex
        className="overlay"
        pos="relative"
        zIndex="3"
        w="100%"
        h="800px"
        m="auto"
        justifyContent="space-between"
        alignItems="center"
        backgroundImage={`url('${bgImage}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Flex
          zIndex="5"
          direction="column"
          h="300px"
          m="auto"
          justifyContent="space-between"
          alignItems="center"
          textColor="white"
        >
          <Heading as="p" fontSize="8xl">
            404
          </Heading>
          <Heading>Page Not Found</Heading>
          <Text textAlign="center" fontSize="lg">
            The requested page could not be found. Try again later?
          </Text>
          <ButtonNormal url="/" text="Return Home" />
        </Flex>
      </Flex>
    </Layout>
  );
}
