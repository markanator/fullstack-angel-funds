import { Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface AuthBannerProps {
  bgImage?: string;
  title: string;
  overlay?: boolean;
  extraBottomSpace?: boolean;
}

export default function AuthBanner({
  bgImage = "/images/breadcrumb.png",
  title,
  overlay = false,
  extraBottomSpace = false,
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
      zIndex={2}
      justifyContent="center"
      alignItems="flex-start"
      pb={extraBottomSpace ? "5rem" : ""}
    >
      <Container maxW="7xl" m="auto" zIndex="5">
        <Heading
          as="h1"
          fontSize="3rem"
          textColor="white"
          textTransform="capitalize"
        >
          {title}
        </Heading>
      </Container>
    </Flex>
  );
}
