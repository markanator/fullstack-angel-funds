import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function TeamMemberCardMD() {
  return (
    <Flex direction="column" zIndex="5">
      <Box w="370px" h="405px" pos="relative">
        <Image
          src="/images/markAvatar.jpeg"
          alt="founder Mark Ambrocio"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="top"
        />
        <Box
          pos="absolute"
          bottom="0"
          left="0"
          textColor="white"
          className="team__share"
        >
          <Link href="https://markambrocio.com/" isExternal>
            <Flex
              w="60px"
              h="60px"
              bgColor="color_alt"
              justifyContent="center"
              alignItems="center"
              fontSize="xl"
            >
              <FaExternalLinkAlt />
            </Flex>
          </Link>
        </Box>
      </Box>
      <Flex
        direction="column"
        bgColor="progress_bg"
        textAlign="center"
        py="1rem"
      >
        <Text color="text_primary" fontSize="1.25rem" fontWeight="500">
          Mark Ambrocio
        </Text>
        <Text color="text_secondary">Founder</Text>
      </Flex>
    </Flex>
  );
}
