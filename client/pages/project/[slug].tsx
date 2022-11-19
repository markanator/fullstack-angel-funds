import { formatAmountForDisplay } from "@/utils/stripe-helpers";
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
  useNumberInput,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBanner from "components/authShared/AuthBanner";
import SmallDeetsBox from "components/projectDetailsComps/SmallDeetsBox";
import { GetbySlugDocument } from "generated/grahpql";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/legacy/image";
import React from "react";
import { useForm } from "react-hook-form";
import TitleFormatter from "title";
// locals
import { IProjectDetails } from "types/IProjectDetails";
import { fetchPostJSON } from "utils/api-helpers";
import { initializeApollo } from "utils/apolloClient";
import getStripe from "utils/getStripe";
import Layout from "../../components/Layout";
import { DonoSchema } from "../../Forms/Schema/DonoSchema";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IFormData {
  donation: number;
}

export default function ProjectDetails({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: "all",
    resolver: yupResolver(DonoSchema),
  });

  // for donation input
  // const { getInputProps } = useNumberInput({
  //   defaultValue: 5,
  //   allowMouseWheel: false,
  // });
  // const input = getInputProps();

  const FormattedProjectTitle = TitleFormatter(
    project!.title
  ) as unknown as string;

  const currentFundPercentage =
    (project?.currentFunds! / project?.fundTarget!) * 100;

  const onSubmit = async ({ donation }: IFormData) => {
    console.log("Submitted a dono:", donation);
    //* API:: Create a Checkout Session.
    const res = await fetchPostJSON("/api/donations", {
      amount: donation,
      projectTitle: FormattedProjectTitle,
      projectSlug: project!.slug as string,
      projectDesc: project!.description.slice(0, 144),
      projectImg: project!.image,
    });

    //! error handling
    if (res.statusCode === 500) {
      console.error(res.message);
      return;
    }

    console.log("FETCH CALL RESPONSE:::", res);

    //* redirect to checkout
    const stripe = await getStripe();
    const result = await stripe!.redirectToCheckout({
      sessionId: res.id,
    });

    console.log("STRIPE REDIRECT RES:::", result);

    if (result?.error) {
      console.warn(result?.error?.message);
    }
    //! END SUBMIT CALL
  };

  return (
    <Layout
      SEO={{
        title: `${project?.title} - Angel Funds`,
        image: project?.image,
        description: project?.description.slice(0, 100),
        keywords: project?.category,
      }}
    >
      <AuthBanner bgImage={project?.image} title={FormattedProjectTitle} />
      <article>
        {/* TOP HALF */}
        <Flex as="section" w="full" h="full" bg="testimonial_bg">
          <Container maxW="7xl" m="auto" py="6rem">
            <Flex className="project_deets" direction="row" h="full">
              {/* LEFT SIDE IMAGE and blurb? */}
              <Flex w="50%" direction="column" h="full">
                <Image
                  src={project!.image}
                  alt={project?.title ?? ""}
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
                    {project?.category}
                  </Text>
                </Flex>
                {/* TITLE */}
                <Heading py=".5rem">{FormattedProjectTitle}</Heading>
                {/* INFO CARDS */}
                <Flex direction="row" justifyContent="space-between">
                  <SmallDeetsBox
                    content={formatAmountForDisplay(project?.currentFunds ?? 0)}
                    heading="Raised"
                  />
                  <SmallDeetsBox
                    content={project?.totalDonation_sum ?? 0}
                    heading="Backers"
                  />
                  <SmallDeetsBox
                    content={dayjs(Date.now()).to(project?.targetDate, true)}
                    heading="Days Left"
                  />
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
                      {formatAmountForDisplay(project?.fundTarget!)}
                    </Box>
                  </Text>
                </Flex>
                {/* DONATE FORM */}
                <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
                  <InputGroup bgColor="white">
                    <InputLeftElement
                      pt="10px"
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    >
                      $
                    </InputLeftElement>
                    <Input
                      // {...input}
                      id="donation"
                      {...register("donation")}
                      isInvalid={!!errors?.donation}
                      type="number"
                      mr="1rem"
                      size="lg"
                    />
                    <InputRightElement
                      pt="10px"
                      right="1rem"
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    >
                      .00
                    </InputRightElement>
                  </InputGroup>
                  <Text>{errors?.donation?.message?.toString()}</Text>
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
                      src={
                        project?.author.avatarUrl ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200"
                      }
                      alt={project?.author?.fullName ?? ""}
                      width={60}
                      height={60}
                      objectFit="cover"
                      objectPosition="center"
                      className="__avatar"
                    />
                  </Flex>
                  <Flex direction="column" justifyContent="center">
                    <Text>
                      By:{" "}
                      <strong>
                        {
                          TitleFormatter(
                            project!.author.fullName
                          ) as unknown as string
                        }
                      </strong>
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
              {/* LEFT DESCRIPTION */}
              <Flex as="article" w="66%" direction="column">
                <Heading as="p" mb=".5rem">
                  Desctiption
                </Heading>
                <Text color="text_tertiary">{project?.description}</Text>
              </Flex>
              {/* RIGHT */}
              <Flex as="aside" w="33%"></Flex>
            </Flex>
            {/* <p>{JSON.stringify(project, null, 2)}</p> */}
          </Container>
        </Flex>
      </article>
    </Layout>
  );
}

export async function getServerSideProps({
  req,
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

  if (!data?.getProjectBySlug) {
    res.writeHead(307, {
      Location: "/404",
    });

    res.end();
    return { props: {} };
  }

  return {
    props: {
      project: data.getProjectBySlug,
    },
  };
}
