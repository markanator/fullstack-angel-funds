import { Box, Flex, Heading, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { FaRegClock } from "react-icons/fa";
import { Project } from "../types";

interface IProjCards {
  project: Project
}

export default function ProjectCardLG({ project }: IProjCards) {
  const projectLink = useMemo(()=> (`/project/${project.slug}`), [project.slug]);
  const percentageProgress =  useMemo(()=> Math.floor((project.currentFunds / project.fundTarget) * 100), [project.currentFunds,project.fundTarget]);


  const daysLeft = useMemo(()=>{
    const date1 = dayjs(project.publishDate)
    const date2 = dayjs(project.targetDate)
    return date2.diff(date1, 'd')
  }, [project.publishDate,project.targetDate]);

  return (
    <Flex direction="column" w="full" boxShadow="md" maxW="370px" m='.5rem'>
      <Box>
        <Image
          src={project.image}
          w="370px"
          h="325px"
          objectFit="cover"
          objectPosition="center"
          alt={project.slug}
        />
      </Box>
      <Box padding="2rem" maxW="370px">
        <Box
          display="inline-flex"
          mb="1rem"
          alignItems="center"
          fontSize=".875rem"
        >
          <Text
            mr="1.5rem"
            backgroundColor="color_alt"
            color="white"
            textTransform="uppercase"
            padding="2px 1rem"
            letterSpacing=".1rem"
          >
            {project.category}
          </Text>
          <Text className="__norm" display="flex" alignItems="center">
            <FaRegClock style={{ marginRight: ".5rem" }} />
            {daysLeft} Left
          </Text>
        </Box>
        <Heading className="__dark" as="p" fontSize="1.25rem" mb="1rem">
        <NextLink href={projectLink} passHref>
          <ChakraLink _hover={{ color: "#EE6352" }}>
            {project.title}
          </ChakraLink>
        </NextLink>
        </Heading>
        <Flex
          direction="row"
          justifyContent="space-between"
          color="text_secondary"
          mb=".5rem"
        >
          <Text className="__norm">
            ${project.currentFunds} raised of ${project.fundTarget}
          </Text>
          <Text className="__norm">
            {percentageProgress.toFixed(0)}%
          </Text>
        </Flex>
        <Box h=".65rem" bgColor="progress_bg">
          <Box
            maxW="306px"
            w={`${percentageProgress}%`}
            h="full"
            pos="relative"
            overflow="hidden"
            bgColor="color_alt"
          />
        </Box>
      </Box>
    </Flex>
  );
}
