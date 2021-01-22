import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ButtonNormal from "../ButtonNormal";

const Hero = () => {
  return (
    <Flex
      as="section"
      className="overlay"
      position="relative"
      justifyContent="flex-start"
      alignItems="center"
      h={["50vh", "50vh", "75vh"]}
      w="full"
      bgImage={`url('/images/hero.jpg')`}
      bgSize="cover"
      bgPos="25% 25%"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
    >
      <Box className="hero__inner" pos="relative"></Box>
      <Container pos="relative" maxW="7xl" display="flex">
        <Flex direction="column" color="white">
          <Container maxW="3xl">
            <Text fontSize="1.25rem" textDecoration="underline">
              Raising Money Has Never Been So Easy
            </Text>
            <Heading
              as="h1"
              fontSize={["2rem", "3rem", "4rem"]}
              mb="3rem"
              lineHeight="4.5rem"
              textShadow="0 1px 0 black"
            >
              We help low-income, minorities bring their ideas to market
            </Heading>
            <ButtonNormal
              url="/my-account/add-project"
              text="Start a Project"
            />
          </Container>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Hero;
