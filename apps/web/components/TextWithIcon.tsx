import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

interface IconSectionProps {
  title: string;
  blurb: string;
}

const IconSection = ({ title, blurb }: IconSectionProps) => (
  <Flex mb="2rem" direction="row" h="auto">
    <Flex
      padding="1rem"
      h="58px"
      w="58px"
      mr="2rem"
      mt="5px"
      bgColor="rgba(238, 99, 82,.2)"
    >
      <BsCheckCircle
        style={{
          margin: "0px",
          padding: "0px",
          fontSize: "2rem",
          color: "var(--color_alt)",
        }}
      />
    </Flex>
    <Box>
      <Heading as="h3" fontSize="1.25rem" mb="1.125rem">
        {title}
      </Heading>
      <Text lineHeight="2rem" color="text_secondary" fontSize="1.125rem">
        {blurb}
      </Text>
    </Box>
  </Flex>
);

export default IconSection;
