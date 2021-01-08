import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react'
import { FaRegClock } from 'react-icons/fa';

export default function ProjectCardSM() {
  return (
    <Flex
      className='cardsm'
      flex='1 0 33%'
      className='pcard__sm'
      pos='relative'
      direction='column'
      w='auto'
      h='auto'
      minH='1px'
      float='left'
      color='white'
      mx='.5rem'
    >
      <Box
        className='cardsm__parent'
      >
        <Box pos='relative'>
          <Link href="#" cursor='pointer' textDecoration='none' outline='none'>
            <Image display='inline-block' w='full' h='full' objectFit='cover' src='https://picsum.photos/seed/picsum/350' alt='name' maxW='370px' maxH='320px' />
          </Link>
          <Link
            href='#'
            pos='absolute'
            top='0'
            left='0'
            zIndex='1'
            w='full'
            h='full'
            background='linear-gradient(0deg,#1b1f2e 0%,rgba(27,31,46,0) 100%)'
            transition='all .3s'
          />
        </Box>
        <Box
        className='cardsm__content'
        padding='2.125rem'
        pos='absolute'
        bottom='0'
        left='0'
        zIndex='2'
        background='0 0'
        transition='all .3s'
        >
          <Box display='inline-flex' mb='1rem' alignItems='center' fontSize='.875rem'>
            <Text mr='1.5rem' backgroundColor='color_alt' textTransform='uppercase' padding='2px 1rem'  letterSpacing='.1rem'>
              Category
            </Text>
            <Text className='__norm' display='flex' alignItems='center'>
              <FaRegClock style={{marginRight: ".5rem"}}/>
              232 Days Left
            </Text>
          </Box>
          <Heading className='__dark' as='p' fontSize='1.25rem' mb='1rem'>
            <Link href="#" _hover={{color: "#EE6352"}}>
              An Illustrated Diagram of Popular Tea Recipes
            </Link>
          </Heading>
          <Flex direction='row' justifyContent='space-between' color='white'  mb='.5rem'>
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
      </Box>
    </Flex>
  )
}
