import { Flex, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  content: React.ReactNode;
  heading: string;
}

export default function SmallDeetsBox({
  content,
  heading,
}: Props): ReactElement {
  return (
    <Flex
      direction="column"
      w="150px"
      h="135px"
      shadow="md"
      justifyContent="center"
      alignItems="center"
      // m="auto"
      bgColor="white"
    >
      <Text fontSize="1.5rem" fontWeight="600" color="text_primary">
        {content}
      </Text>
      <Text fontSize="1rem" fontWeight="300" color="text_tertiary">
        {heading}
      </Text>
    </Flex>
  );
}
