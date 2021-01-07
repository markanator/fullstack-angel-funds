import React from 'react'
import {Box, Container, Flex, Heading, Image, List, ListItem, Text} from '@chakra-ui/react'
import {FiCpu} from 'react-icons/fi'
import {MdSchool} from 'react-icons/md'
import {FaPhotoVideo,FaBook,FaStethoscope,FaStar} from 'react-icons/fa'

export default function TopCategories() {
  return (
    <Flex
      className='topcats'
      as='section'
      pos='relative'
      w='full'
      h='full'
      py='7rem'
      backgroundColor='color_primary'
      backgroundImage={`url('/images/waves.svg')`}
      backgroundRepeat='repeat'
      // backgroundSize='15%'
    >
      <Container display='flex' flexDir='row' maxW='6xl' color='white' h='380px'>
        <Flex
          direction='column'
          w='35%'
          h='full'
          pr='.5rem'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Text >Which Category  Interests You?</Text>
          <Heading fontSize='3rem' mb='1rem'>Top Categories</Heading>
          <Text lineHeight='2rem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dolor ex, laoreet ac scelerisque eu, lobortis sit amet nibh. Quisque ultricies ipsum volutpat, auctor augue at, volutpat ligula.</Text>
          <Flex mt='1rem'h='full' w='full' h='auto' alignItems='flex-end'>
            <Flex  borderLeft='5px solid' borderColor='color_alt' h='85px' alignItems='center'>
              <Box border='2px solid white' rounded='full' ml='3rem'>
              <Image src='https://images.unsplash.com/photo-1554384645-13eab165c24b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt='lorain' w='71px' h='71px' rounded='full' objectFit='cover' objectPosition='center' m='5px' />
              </Box>
              <Text ml='1.5rem' fontFamily='Dancing Script' fontSize='2rem'>Irma Callan</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w='65%'  pl='1rem'>
          <List className='das__list' display='flex' flexDirection='row' flexWrap='wrap' justifyContent='flex-end'>
            <CategoryIconBox Icon={FiCpu} text="Tech" />
            <CategoryIconBox Icon={FaPhotoVideo} text="Video" />
            <CategoryIconBox Icon={FaBook} text="Story" />
            <CategoryIconBox Icon={FaStethoscope} text="Medical"/>
            <CategoryIconBox Icon={FaStar} text="Fashion"/>
            <CategoryIconBox Icon={MdSchool} text="Education"/>
          </List>
        </Flex>
      </Container>
    </Flex>
  )
}


function CategoryIconBox({Icon, text}) {
  return (<ListItem
              display='flex'
              flexDirection='column'
              w='full'
              h='full'
              maxH='188px'
              maxW='198px'
              px='5rem'
              m='0 2px 4px 2px'
              bg='white'
            >
              <Flex
              flex='1 0 33%'
              direction='column'
              justifyContent='center'
              alignItems='center'
              color='color_alt'
              >
                <Icon fontSize='3rem' />
                <Text mt='1rem' color='text_primary'>
                  {text}
                  </Text>
              </Flex>
            </ListItem>
  )
}