import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

export default function About() {
  return (
    <Flex as="section" mt="5rem" direction="row" maxH="625px" w="full" h="full">
      {/* <Container px='-1rem' maxW='7xl' w='full' display='flex' flexDirection='row' pos='relative' justifyContent='center' alignItems='center' bgColor='#fff'> */}
      {/* LEFT - QUAD */}
      <Flex justifyContent="flex-end" maxW="50%" w="full" h="full">
        <Flex flexDirection="column" bg="white">
          {/* LEFT - TOP */}
          <Flex w="full" h="full">
            <Flex
              w="290px"
              h="full"
              maxH="311px"
              bgColor="color_alt"
              justifyContent="center"
              alignItems="center"
              m="0 1px 0 0"
            >
              <Heading
                fontSize="1.875rem"
                maxW="185px"
                textAlign="left"
                textColor="white"
              >
                We’re a trusted platform
              </Heading>
            </Flex>
            <Box w="290px" h="full" m="0 0 1px 1px" maxW="290px">
              <Image
                src="/images/image-2.jpg"
                alt="choose us"
                w="full"
                h="full"
                maxH="311px"
                display="inline-block"
              />
            </Box>
          </Flex>
          {/* LEFT - BOTTOM */}
          <Flex w="full" h="full">
            <Box w="290px" h="full" m="1px 1px 0 0" maxW="290px">
              <Image
                src="/images/image-2.jpg"
                alt="choose us"
                w="full"
                h="full"
                maxH="311px"
                display="inline-block"
              />
            </Box>
            <Box w="290px" h="full" m="1px 0 0 1px" maxW="290px">
              <Image
                src="/images/image-3.jpg"
                alt="choose us"
                w="full"
                h="full"
                maxH="311px"
                display="inline-block"
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* RIGHT - DEETS */}
      <Flex
        w="50%"
        h="full !important"
        maxH="625px"
        bgColor="white"
        pos="relative"
        justifyContent="flex-start"
      >
        <Flex padding="0 1rem 2rem 3rem" w="auto" h="full" pos="relative">
          <Flex
            className="inner__content"
            flexDirection="column"
            justifyContent="flex-start"
            w="auto"
            maxW="530px"
            h="full"
            zIndex="2"
          >
            <Text
              textAlign="left"
              fontSize="1.125rem"
              color="color_alt"
              mb="1rem"
            >
              A Bussiness You Can Trust
            </Text>
            <Heading textAlign="left" fontSize="3.5rem" mb="3rem">
              Why choose us?
            </Heading>
            <IconSection
              title="Highest Success Rates"
              blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum."
            />
            <IconSection
              title="By POC, for POC"
              blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum."
            />
            <IconSection
              title="Highest Success Rates"
              blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum."
            />
          </Flex>
        </Flex>
      </Flex>
      {/* </Container> */}
    </Flex>
  );
}

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
