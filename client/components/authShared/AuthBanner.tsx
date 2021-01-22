import { Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface AuthBannerProps {
  bgImage: string;
  title: string;
}

export default function AuthBanner({ bgImage, title }: AuthBannerProps) {
  return (
    <Flex
      as="section"
      w="full"
      py="6rem"
      backgroundImage={`url('${bgImage}')`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Container maxW="7xl">
        <Heading as="h1" fontSize="3rem" textColor="white">
          {title}
        </Heading>
      </Container>
    </Flex>
  );
}
