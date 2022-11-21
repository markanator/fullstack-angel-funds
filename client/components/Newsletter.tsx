import { Box, Container, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React from "react";
import ButtonAlternate from "./ButtonAlternate";

export default function Newsletter() {
  return (
    <Flex
      as="section"
      w="full"
      maxW="7xl"
      m="auto"
      bgColor="color_alt"
      py="3rem"
      backgroundImage="url('/images/bg-lines-transparent.png')"
      backgroundPosition="center"
      // backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Container maxW="3xl">
        <Text
          textAlign="center"
          fontSize="1.25rem"
          color="text_primary"
          mb="1rem"
        >
          Get Our Complete
        </Text>
        <Heading
          textAlign="center"
          color="text_primary"
          fontSize="3.5rem"
          mb="2rem"
        >
          Crowdfunding Guide
        </Heading>
        <Flex as="form" w="full" justifyContent="center" alignItems="center">
          <Input
            type="text"
            name="newsletter_email"
            mr="2rem"
            bg="white"
            rounded="0px"
            placeholder="Enter E-Mail Address"
            textColor="text_primary"
            fontSize="1.125rem"
            _placeholder={{
              color: "text_tertiary",
            }}
            py="1.5rem"
          />
          <ButtonAlternate url="#" text="Subscribe" />
        </Flex>
      </Container>
    </Flex>
  );
}
