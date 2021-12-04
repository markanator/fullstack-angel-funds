import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import IconSection from "../TextWithIcon";

export default function About() {
  return (
    <Flex as="section" mt="5rem" direction="row" maxH="625px" w="full" h="full">
      {/* <Container px='-1rem' maxW='7xl' w='full' display='flex' flexDirection='row' pos='relative' justifyContent='center' alignItems='center' bgColor='#fff'> */}
      {/* LEFT - QUAD */}
      <Flex justifyContent="flex-end" maxW={["0%","0%","0%","50%"]} w="full" h="full" display={['none','none','flex','flex','flex']}>
        <Flex flexDirection="column" bg="white" mb='1px'>
          {/* LEFT - TOP */}
          <Flex w="full" h="full" maxH="311px" >
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
                className=""
                src="/images/meeting-1.jpg"
                alt="choose us"
                w="full"
                h="311px"
                // maxH="311px"
                objectFit="cover"
                objectPosition="center"
                display="inline-block"
              />
            </Box>
          </Flex>
          {/* LEFT - BOTTOM */}
          <Flex w="full" h="full" maxH="311px" >
            <Box w="290px" h="full" m="1px 1px 0 0" maxW="290px">
              <Image
                src="/images/image-1.png"
                alt="choose us"
                w="full"
                h="full"
                maxH="311px"
                display="inline-block"
              />
            </Box>
            <Box w="290px" h="full" m="1px 0 0 1px" maxW="290px">
              <Image
                src="/images/image-2.png"
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
        w={["100%","100%","100%","50%"]}
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
