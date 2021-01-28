import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

export default function FeaturedSimple() {
  return (
    <Flex as="section" w="full" direction="row">
      <Flex
        w="full"
        borderBottom="2px solid var(--progress_bg)"
        backgroundImage="url('/images/dots.svg')"
        justifyContent="space-evenly"
        alignItems="center"
        py="3rem"
      >
        <Image src="/brands/florbes.svg" alt="florbes" w="120px" h="34px" />
        <Image src="/brands/NewYorkTimes.svg" alt="NYT" w="auto" h="75px" />
      </Flex>
    </Flex>
  );
}
