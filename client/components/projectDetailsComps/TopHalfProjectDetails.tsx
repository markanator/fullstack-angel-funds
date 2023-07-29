import { ProjectResponseWAuthorFragment } from "@/generated/grahpql";
import { apiFetcher } from "@/utils/api-helpers";
import getStripe from "@/utils/getStripe";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import {
  Flex,
  Container,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { DonoSchema } from "Forms/Schema/DonoSchema";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import SmallDeetsBox from "./SmallDeetsBox";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  project: ProjectResponseWAuthorFragment;
};

interface IFormData {
  donation: number;
}

const TopHalfProjectDetails = ({ project }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormData>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(DonoSchema),
  });

  const currentFundPercentage = (project?.currentFunds! / project?.fundTarget!) * 100;

  const onSubmit = async ({ donation }: IFormData) => {
    console.log("Submitted a dono:", donation * 100);
    //* API:: Create a Checkout Session.
    const res = await apiFetcher<{ id?: string }>("/api/donations", {
      method: "POST",
      body: JSON.stringify({
        amount: donation * 100,
        projectTitle: project.title,
        projectSlug: project.slug as string,
        projectDesc: project.description.slice(0, 144),
        projectImg: project.image,
      }),
    });

    console.log("FETCH CALL RESPONSE:::", res);
    if (!!res?.id) {
      //* redirect to checkout
      const stripe = await getStripe();
      const result = await stripe!.redirectToCheckout({
        sessionId: res.id,
      });

      console.log("STRIPE REDIRECT RES:::", result);
      if (result?.error) {
        console.warn(result?.error?.message);
      }
    }
  };
  return (
    <Flex as="section" w="full" h="full" bg="testimonial_bg">
      <Container maxW="7xl" m="auto" py="120px" pb="10rem">
        <Flex className="project_deets" direction="row" h="full">
          {/* LEFT SIDE IMAGE and blurb? */}
          <Flex w="50%" direction="column" h="full">
            <Image
              src={project!.image ?? ""}
              alt={project?.title ?? ""}
              width={678}
              height={580}
              objectFit="cover"
              objectPosition="center"
            />
          </Flex>
          {/* RIGHT SIDE DEETS */}
          <Flex w="50%" direction="column" pl="1rem" h="auto" justifyContent="space-between">
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
            <Heading py=".5rem" textTransform="capitalize">
              {project.title}
            </Heading>
            {/* INFO CARDS */}
            <Flex direction="row" justifyContent="space-between">
              <SmallDeetsBox
                content={formatAmountForDisplay(project?.currentFunds ?? 0)}
                heading="Raised"
              />
              <SmallDeetsBox content={project?.totalDonation_sum ?? 0} heading="Backers" />
              <SmallDeetsBox
                content={dayjs(Date.now()).to(project?.targetDate, true)}
                heading="Days Left"
              />
            </Flex>
            {/* PROGRESS BAR w/ GOAL  */}
            <Flex direction="column" mt={4}>
              <Flex direction="row" justifyContent="space-between" mb=".25rem">
                <Text fontSize=".875rem" color="text_secondary">
                  Raised:
                </Text>
                <Text fontSize=".875rem" color="text_secondary">
                  {Math.floor(currentFundPercentage)}%
                </Text>
              </Flex>
              <Box h=".65rem" bgColor="progress_bg">
                <Box
                  w={`${Math.floor(currentFundPercentage)}%`}
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
            <Flex as="form" onSubmit={handleSubmit(onSubmit)} w="full">
              <VStack w="full">
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
                    {...register("donation")}
                    isInvalid={!!errors?.donation}
                    type="number"
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
              </VStack>
              <Box ml="1rem">
                <Button
                  type="submit"
                  letterSpacing="3px"
                  backgroundColor="color_alt"
                  _hover={{
                    backgroundColor: "color_primary",
                  }}
                  color="white"
                  fontWeight="bold"
                  size="lg"
                  rounded="none"
                  isDisabled={!isValid || !isDirty}
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
                <Text textTransform="capitalize">
                  By: <strong>{project!.author.fullName}</strong>
                </Text>
                <Text></Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default TopHalfProjectDetails;
