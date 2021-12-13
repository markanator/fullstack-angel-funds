import { donateToProject, newDono } from "@/async/donations";
import { getProjectBySlug } from "@/async/projects";
import { useFetchProjectQuery } from "@/Queries/projects";
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
  useToast
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthBanner from "components/authShared/AuthBanner";
import SmallDeetsBox from "components/projectDetailsComps/SmallDeetsBox";
import dayjs from "dayjs";
import { pick } from "lodash";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import TitleFormatter from "title";
import Layout from "../../components/Layout";
import { DonoSchema } from "../../Forms/Schema/DonoSchema";

interface IFormData {
  donation: number;
}

export default function ProjectDetails({
  ssrProject,
  slug
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const qc = useQueryClient()
  const {data: project } = useFetchProjectQuery(slug, {
    initialData: ssrProject
  })
  const { mutateAsync: donateAsync } = useMutation(({pId, payload}: {pId: number, payload: newDono}) => donateToProject(pId,payload));
  const toast = useToast()

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(DonoSchema),
  });

  const FormattedProjectTitle = useMemo(() => TitleFormatter(project.title), [project.title]);
  const totalBackers = useMemo(() => project.donations.length, [project.donations]);
  const percentageProgress =  useMemo(()=> Math.floor((project.currentFunds / project.fundTarget) * 100), [project.currentFunds,project.fundTarget]);

  const daysLeft = useMemo(()=>{
    const date1 = dayjs(project.publishDate)
    const date2 = dayjs(project.targetDate)
    return date2.diff(date1, 'd')
  }, [project.publishDate, project.targetDate]);

  const onSubmit = async ({ donation }: IFormData) => {
    console.log("Submitted a dono:", donation);
    //* API:: Create a Checkout Session.
    const payload:newDono = {
      amount: donation,
      stripeCreatedAt: "",
      stripeCustomerId: "",
      stripeReceiptUrl: "",
    }
    await donateAsync({pId: project.id, payload}, {
      onSuccess: () => {
        toast({
          isClosable: true,
          status: "success",
          title: "Successfully donated!"
        })
      },
      onError: (err: any) => {
        toast({
          isClosable: true,
          status: "error",
          title: "Error!",
          description: err?.message
        })
      },
      onSettled: () => {
        qc.invalidateQueries(['project', slug])
      }
    })
  };

  return (
    <Layout
      SEO={{
        title: `${project?.title} - VR Funds`,
        image: project.image,
        description: project.description.slice(0, 100),
        keywords: project.category,
      }}
    >
      <AuthBanner bgImage={project.image} title={FormattedProjectTitle} overlay />
      <article>
        {/* TOP HALF */}
        <Flex as="section" w="full" h="full" bg="testimonial_bg">
          <Container maxW="7xl" m="auto" py="6rem">
            <Flex className="project_deets" direction="row" h="full">
              {/* LEFT SIDE IMAGE and blurb? */}
              <Flex w="50%" direction="column" h="full">
                <Image
                  src={project.image}
                  alt={project?.title}
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
                  <SmallDeetsBox content={`$${project.fundTarget}`} heading="Goal" />
                  <SmallDeetsBox content={`${totalBackers}`} heading="Backers" />
                  <SmallDeetsBox content={`${daysLeft}`} heading="Days Left" />
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
                      {percentageProgress}%
                    </Text>
                  </Flex>
                  <Box h=".65rem" bgColor="progress_bg">
                    <Box
                      maxW="608px"
                      w={`${percentageProgress}%`}
                      h="full"
                      pos="relative"
                      overflow="hidden"
                      bgColor="color_alt"
                    />
                  </Box>
                  <Text mt=".5rem" fontWeight="700" fontSize="1.125rem">
                    Raised:{" "}
                    <Box as="span" color="color_primary">
                      ${project.currentFunds}
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
                      id="donation"
                      {...register('donation', { value: 5 })}
                      isInvalid={errors?.donation?.message}
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
                  <Text>{errors?.donation?.message}</Text>
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
                        project.author?.avatarUrl ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200"
                      }
                      alt={project.author?.fullName}
                      width="60px"
                      height="60px"
                      objectFit="cover"
                      objectPosition="center"
                      className="__avatar"
                    />
                  </Flex>
                  <Flex direction="column" justifyContent="center">
                    <Text>
                      By:{" "}
                      <strong>
                        {TitleFormatter(project.author.fullName)}
                      </strong>
                    </Text>
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
  try {
    const slug = query.slug as string;
    const project = await getProjectBySlug(slug);
    return {
      props: {
        ssrProject: project!,
        slug
      },
    };
  } catch (error) {
    res.writeHead(307, {
      Location: "/404",
    });
    res.end();
    return { props: {} };
  }
}
