import { TabPanel, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  description: string;
};

const DescriptionPanel = ({ description }: Props) => {
  return (
    <TabPanel m="auto">
      <Container maxW="7xl" mx="auto" py="2.5rem">
        <Flex>
          {/* LEFT DESCRIPTION */}
          <Flex as="article" w="66%" direction="column">
            <Heading as="p" mb=".5rem">
              Description
            </Heading>
            <Text color="text_tertiary" whiteSpace="pre-wrap">
              {description}
            </Text>
          </Flex>
          {/* RIGHT */}
          <Flex as="aside" w="33%">
            {/* TODO: show rewards */}
          </Flex>
        </Flex>
      </Container>
    </TabPanel>
  );
};

export default DescriptionPanel;
