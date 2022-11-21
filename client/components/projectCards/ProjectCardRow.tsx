import { ProjectResponseWAuthorFragment } from "@/generated/grahpql";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { useIsAuth } from "@/utils/useIsAuth";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Image,
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
              <CircularProgress
                value={Math.floor((currentFunds / fundTarget) * 100)}
                color="green.400"
              >
                <CircularProgressLabel>
                  {Math.floor((currentFunds / fundTarget) * 100)}%
                </CircularProgressLabel>
              </CircularProgress>
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
    <Flex flexDir="column" ml="50px" fontSize="14px" textColor="gray.700">
      <Box fontWeight="bold">{value}</Box>
      <Box>{label}</Box>
    </Flex>
  );
};
/**
 * <Box className="cardsm__parent" pos="relative">
        {isAuthor && <OwnerMenu projectId={proj.id} />}
        <Box pos="relative">
          <Link
            href={projectLink}
            cursor="pointer"
            textDecoration="none"
            outline="none"
          >
            <Image
              display="inline-block"
              objectFit="cover"
              src={image || "https://picsum.photos/seed/picsum/350"}
              alt="name"
              w="370px"
              h="320px"
            />
          </Link>
          <Link
            href={projectLink}
            pos="absolute"
            top="0"
            left="0"
            zIndex="1"
            w="full"
            h="full"
            background="linear-gradient(0deg,#1b1f2e 0%,rgba(27,31,46,0) 100%)"
            transition="all .3s"
          />
        </Box>
        <Box
          className="cardsm__content"
          padding="2.125rem"
          pos="absolute"
          w="full"
          bottom="0"
          left="0"
          zIndex="2"
          background="0 0"
          transition="all .3s"
        >
          <Box
            display="inline-flex"
            mb="1rem"
            alignItems="center"
            fontSize=".875rem"
          >
            <Text
              mr="1.5rem"
              backgroundColor="color_alt"
              textTransform="uppercase"
              padding="2px 1rem"
              letterSpacing=".1rem"
            >
              {category}
            </Text>
            <Text className="__norm" display="flex" alignItems="center">
              <FaRegClock style={{ marginRight: ".5rem" }} />
              {dayjs(Date.now()).to(proj?.targetDate, true)} left
            </Text>
          </Box>
          <Heading className="__dark" as="p" fontSize="1.25rem" mb="1rem">
            <Link href={projectLink} _hover={{ color: "#EE6352" }}>
              {title}
            </Link>
          </Heading>
          <Flex
            direction="row"
            justifyContent="space-between"
            color="white"
            mb=".5rem"
          >
            <Text className="__norm">
              {formatAmountForDisplay(currentFunds)} raised of{" "}
              {formatAmountForDisplay(fundTarget)}
            </Text>
            <Text className="__norm">
              {Math.floor((currentFunds / fundTarget) * 100)}%
            </Text>
          </Flex>
          <Box h=".65rem" bgColor="progress_bg">
            <Box
              w={`${Math.ceil((currentFunds / fundTarget) * 100)}%`}
              h="full"
              pos="relative"
              overflow="hidden"
              bgColor="color_alt"
            />
          </Box>
        </Box>
      </Box>
 */

export default ProjectCardRow;
