import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

export default function FeaturedHomepage() {
  return (
    <Flex as="section" w="full" direction="row">
      <Flex w="40%" justifyContent="flex-end" bgColor="color_primary">
        <Box px="2rem" py="3rem">
          <Heading color="white" fontSize="2rem" maxW="185px">
            Cliché <br /> As Seen on
          </Heading>
        </Box>
      </Flex>
      <Flex
        w="60%"
        borderBottom="2px solid var(--progress_bg)"
        backgroundImage="url('/images/dots.svg')"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Image src="/brands/florbes.svg" alt="florbes" w="120px" h="34px" />
        <Image src="/brands/NewYorkTimes.svg" alt="NYT" w="auto" h="75px" />
      </Flex>
    </Flex>
  );
}
