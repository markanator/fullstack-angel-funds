import { Box, Container, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react'

export default function About() {
  return (
    <Flex as='section' mt='5rem'>
      <Container maxW='6xl' display='flex' pos='relative' justifyContent='center' alignItems='center'>
        <Flex w='50%' h='full' justifyContent='center' alignItems='center'>
          <Flex w='full' h='full' bgColor='color_alt' justifyContent='center' alignItems='center'>
              <Heading fontSize='1.875rem' maxW='185px' textAlign='center'>
              We’re a trusted platform
              </Heading>
          </Flex>
        </Flex>
        <Flex w='50%'>
          <Box w='full' h='full'>
            <Image src='/images/image-2.jpg' alt='choose us' w='290px' h='311px' maxW='full' display='inline-block' />
          </Box>
        </Flex>
      </Container>
    </Flex>
  )
}
