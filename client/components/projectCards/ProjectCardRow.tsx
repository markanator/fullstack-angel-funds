import { ProjectResponseWAuthorFragment } from "@/generated/grahpql";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { useIsAuth } from "@/utils/useIsAuth";
import {
  AbsoluteCenter,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  ProgressCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ALink from "../ALink";
import OwnerMenu from "./OwnerMenu";

dayjs.extend(relativeTime);
interface ICardSmProps {
  proj: ProjectResponseWAuthorFragment;
}

function ProjectCardRow({ proj }: ICardSmProps) {
  const { user } = useIsAuth();
  const {
    title,
    slug,
    image,
    category,
    currentFunds,
    fundTarget,
    publishDate,
    targetDate,
  } = proj;
  const projectLink = `/project/${slug}`;

  const isAuthor = Boolean(proj?.author?.id === user?.id);

  return (
    <Flex
      p={4}
      mb={8}
      pos="relative"
      shadow="lg"
      bgColor="white"
      rounded="sm"
      w="full"
    >
      <Box pos="relative" w="20%">
        <ALink
          href={projectLink}
          cursor="pointer"
          textDecoration="none"
          outline="none"
        >
          <Image
            src={image || "https://picsum.photos/seed/picsum/350"}
            objectFit="cover"
            alt={proj.title}
            w="100%"
            h="auto"
            minH="128px"
            minW="128px"
            verticalAlign="top"
          />
        </ALink>
      </Box>
      <Box w="80%" pl={6}>
        <VStack alignItems="flex-start">
          <HStack mt={2}>
            <VStack alignItems="flex-start">
              <ALink href={projectLink} _hover={{ color: "#EE6352" }}>
                <Heading as="h4" fontSize="large" textTransform="capitalize">
                  {proj.title}
                </Heading>
              </ALink>
              <Text>by {proj.author.fullName}</Text>
            </VStack>
            <Flex>{isAuthor && <OwnerMenu projectId={proj.id} />}</Flex>
          </HStack>
          <Flex mt={2}>
            <Flex>
              <ProgressCircle.Root
                value={Math.floor((currentFunds / fundTarget) * 100)}
                colorPalette="green"
              >
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                  <ProgressCircle.ValueText>
                    {Math.floor((currentFunds / fundTarget) * 100)}%
                  </ProgressCircle.ValueText>
                </AbsoluteCenter>
              </ProgressCircle.Root>
            </Flex>
            <StatBlockSmall
              value={formatAmountForDisplay(currentFunds)}
              label="Funds Raised"
            />
            <StatBlockSmall
              value={formatAmountForDisplay(fundTarget)}
              label="Funding Goal"
            />
            <StatBlockSmall
              value={dayjs(Date.now()).to(proj?.targetDate, true)}
              label="Days to go"
            />
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
interface StatProps {
  value: string;
  label: string;
}
const StatBlockSmall = ({ value, label }: StatProps) => {
  return (
    <Flex flexDir="column" ml="50px" fontSize="14px" color="gray.700">
      <Box fontWeight="bold">{value}</Box>
      <Box>{label}</Box>
    </Flex>
  );
};

export default ProjectCardRow;
