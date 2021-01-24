import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import AuthBanner from "components/authShared/AuthBanner";
import { GetbySlugDocument } from "generated/grahpql";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import title from "title";
// locals
import { initializeApollo } from "utils/apolloClient";
import Layout from "../../components/Layout";

interface IProjectDetails {
  getProjectBySlug: {
    __typename: string;
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    fundTarget: number;
    currentFunds: number;
    publishDate: string;
    targetDate: string;
    totalDonation_sum: number;
    viewCount: number;
    votePoints: number;
    slug: string;
    author: {
      __typename: string;
      fullName: string;
      avatarUrl: string;
      email: string;
    };
  };
}

export default function projectDetails({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter();

  return (
    <Layout SEO={{ title: `${project.title} - VR Funds` }}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title={title(project.title)}
      />
      {/* TOP HALF */}
      <Flex as="section" w="full" h="full" bg="testimonial_bg">
        <Container maxW="7xl" m="auto" py="6rem">
          <Flex className="project_deets" direction="row" h="full">
            {/* LEFT SIDE IMAGE and blurb? */}
            <Flex w="50%" direction="column" h="full">
              <Image
                src="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
                alt={project.title}
                width={678}
                height={580}
                objectFit="cover"
                objectPosition="center"
              />
            </Flex>
            {/* RIGHT SIDE DEETS */}
            <Flex
              w="50%"
              direction="column"
              pl="1rem"
              h="auto"
              justifyContent="space-between"
            >
              {/* CAT AND LOCATION */}
              <Flex>
                <Text
                  fontSize=".875rem"
                  textColor="white"
                  bgColor="color_primary"
                  py="4px"
                  px="1rem"
                  textTransform="uppercase"
                >
                  {project.category}
                </Text>
              </Flex>
              {/* TITLE */}
              <Heading py=".5rem">{title(project.title)}</Heading>
              {/* INFO CARDS */}
              <Flex direction="row" justifyContent="space-between">
                <SmallDeetsBox content="$2,500" heading="test" />
                <SmallDeetsBox content="34" heading="Backers" />
                <SmallDeetsBox content="25" heading="Days Left" />
              </Flex>
              {/* PROGRESS BAR w/ GOAL  */}
              <Flex direction="column">
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  mb=".25rem"
                >
                  <Text fontSize=".875rem" color="text_secondary">
                    Raised:
                  </Text>
                  <Text fontSize=".875rem" color="text_secondary">
                    14%
                  </Text>
                </Flex>
                <Box h=".65rem" bgColor="progress_bg">
                  <Box
                    w="50%"
                    h="full"
                    pos="relative"
                    overflow="hidden"
                    bgColor="color_alt"
                  />
                </Box>
                <Text mt=".5rem" fontWeight="700" fontSize="1.125rem">
                  Goal:{" "}
                  <Box as="span" color="color_primary">
                    $2500
                  </Box>
                </Text>
              </Flex>
              {/* DONATE FORM */}
              <Flex as="form">
                <InputGroup>
                  <InputLeftElement
                    pt="10px"
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input type="number" mr="1rem" size="lg" />
                  <InputRightElement
                    pt="10px"
                    right="1rem"
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children=".00"
                  />
                </InputGroup>
                <Box ml="1rem">
                  <Button
                    type="submit"
                    letterSpacing="3px"
                    backgroundColor="color_alt"
                    _hover={{
                      backgroundColor: "color_primary",
                    }}
                    color="white"
                    fontWeight="300"
                    size="lg"
                    rounded="none"
                  >
                    Back Campaign
                  </Button>
                </Box>
              </Flex>
              {/* Original Poster */}
              <Flex className="project_author">
                <Flex mr=".875rem">
                  <Image
                    src={project.author.avatarUrl || "/images/image-2.jpg"}
                    alt={project.author.fullName}
                    width="60px"
                    height="60px"
                    objectFit="cover"
                    objectPosition="center"
                    className="__avatar"
                  />
                </Flex>
                <Flex direction="column">
                  <Text>
                    By: <strong>{title(project.author.fullName)}</strong>
                  </Text>
                  <Text></Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      {/* BOTTOM */}
      <Flex as="section" w="full" h="full" bg="white">
        <Container maxW="7xl" m="auto" py="6rem">
          <Flex>
            {/* LEFT DESCROTION */}
            <Flex as="article" w="66%" direction="column">
              <Heading as="p" mb=".5rem">
                Desctiption
              </Heading>
              <Text color="text_tertiary">{project.description}</Text>
            </Flex>
            {/* RIGHT */}
            <Flex as="aside" w="33%"></Flex>
          </Flex>
          {/* <p>{JSON.stringify(project, null, 2)}</p> */}
        </Container>
      </Flex>
    </Layout>
  );
}

const SmallDeetsBox = ({
  content,
  heading,
}: {
  content: string;
  heading: string;
}) => (
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

export async function getServerSideProps({
  res,
  query,
}: GetServerSidePropsContext) {
  const apc = initializeApollo();
  const slug = query.slug;

  const { data }: { data: IProjectDetails } = await apc.query({
    query: GetbySlugDocument,
    variables: {
      slug,
    },
  });

  console.log("project slug::", slug);
  console.log("project data loaded?::", !!data);

  if (!data?.getProjectBySlug) {
    res.writeHead(307, {
      Location: "/404",
    });

    res.end();

    return { props: {} };
  }

  return {
    props: {
      project: data?.getProjectBySlug,
    },
  };
}
