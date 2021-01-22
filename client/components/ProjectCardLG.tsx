import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react'
import { FaRegClock } from 'react-icons/fa';

export default function ProjectCardLG() {
  return (
    <Flex direction='column' w='full' boxShadow='md' maxW='370px'>
      <Box>
        <Image src='/images/project-2.webp' w='370px' h='325px' objectFit='cover' objectPosition='center' />
      </Box>
      <Box padding='2rem' maxW='370px'>
          <Box display='inline-flex' mb='1rem' alignItems='center' fontSize='.875rem'>
            <Text mr='1.5rem' backgroundColor='color_alt' color='white' textTransform='uppercase' padding='2px 1rem'  letterSpacing='.1rem'>
              Category
            </Text>
            <Text className='__norm' display='flex' alignItems='center'>
              <FaRegClock style={{marginRight: ".5rem"}}/>
              232 Days Left
            </Text>
          </Box>
          <Heading className='__dark' as='p' fontSize='1.25rem' mb='1rem'>
            <Link href="#" _hover={{color: "var(--color_primary)"}}>
              An Illustrated Diagram of Popular Tea Recipes
            </Link>
          </Heading>
          <Flex direction='row' justifyContent='space-between' color='text_secondary'  mb='.5rem'>
            <Text className='__norm'>
              $10,000 raised of $20,000
            </Text>
            <Text className='__norm'>
              50%
            </Text>
          </Flex>
          <Box h='.65rem' bgColor='progress_bg' >
            <Box w='50%' h='full' pos='relative' overflow='hidden'  bgColor='color_alt' />
          </Box>
        </Box>
    </Flex>
  )
}
