import { ProjectResponseWAuthorFragment } from "@/generated/grahpql";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { useIsAuth } from "@/utils/useIsAuth";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { formatDistanceStrict } from "date-fns";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaRegClock } from "react-icons/fa";
import OwnerMenu from "./OwnerMenu";

dayjs.extend(relativeTime);
interface ICardSmProps {
  proj: ProjectResponseWAuthorFragment;
}

export default function ProjectCardSM({ proj }: ICardSmProps) {
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
  const daysLeft = formatDistanceStrict(
    parseInt(publishDate),
    parseInt(targetDate),
    { unit: "day" }
  );

  const isAuthor = Boolean(proj?.author?.id === user?.id);

  return (
    <Flex
      className="cardsm pcard__sm"
      flex="1 0 33%"
      pos="relative"
      direction="column"
      w="auto"
      h="auto"
      minH="1px"
      float="left"
      color="white"
      mx=".5rem"
    >
      <Box className="cardsm__parent" pos="relative">
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
    </Flex>
  );
}
