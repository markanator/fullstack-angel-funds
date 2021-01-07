import React from 'react'
import {Box, Container, Flex, Heading, Image, Text} from '@chakra-ui/react'
export default function TopCategories() {
  return (
    <Flex as='section' className='topcats' w='full'
      backgroundColor='color_primary' py='6rem'
      backgroundImage={`url('/images/bank-note.svg')`}
    >
      <Container display='flex' flexDir='row' maxW='6xl' color='white'>
        <Flex direction='column' w='35%' pr='.5rem'>
          <Text mb='1rem'>Which Category  Interests You?</Text>
          <Heading fontSize='3rem' mb='2rem'>Top Categories</Heading>
          <Text lineHeight='2rem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dolor ex, laoreet ac scelerisque eu, lobortis sit amet nibh. Quisque ultricies ipsum volutpat, auctor augue at, volutpat ligula.</Text>
          <Flex>
            <Flex mt='1rem' borderLeft='5px solid' borderColor='color_alt' h='85px' alignItems='center'>
              <Image src='https://images.unsplash.com/photo-1554384645-13eab165c24b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' alt='lorain' w='71px' h='71px' rounded='full' objectFit='cover' objectPosition='center' ml='3rem' />
              <Text ml='1.5rem' fontFamily='Dancing Script' fontSize='2rem'>Lorain Ambrocio</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w='65%'  pl='.5rem'>Right</Flex>
      </Container>
    </Flex>
  )
}
