import { Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface AuthBannerProps {
  bgImage?: string;
  title: string;
  overlay?: boolean;
}

export default function AuthBanner({
  bgImage = "/images/breadcrumb.png",
  title,
  overlay = false,
}: AuthBannerProps) {
  return (
    <Flex
      as="section"
      w="full"
      h="300px"
      m="auto"
      pos="relative"
      className={overlay ? "overlay" : ""}
      backgroundImage={`url('${bgImage}')`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      zIndex="2"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Container maxW="7xl" m="auto" zIndex="5">
        <Heading as="h1" fontSize="3rem" textColor="white">
          {title}
        </Heading>
      </Container>
    </Flex>
  );
}
