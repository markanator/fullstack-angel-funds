import { Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react'
import ButtonAlternate from '../ButtonAlternate';
//


export default function CTA() {
  return (
    <Flex as='section' w='full' >
      <Container w='full' maxW='7xl' display='flex'  >
        <Flex bgColor='color_alt' w='full' justifyContent='center' alignItems='center' py="6rem">
          <Flex justifyContent='space-between' alignItems='center' w='4xl'>
            <Heading as='p' fontSize='2.125rem'>Ready to Raise Funds for your Idea?</Heading>
            <ButtonAlternate url="/my-account/add-project" />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}
