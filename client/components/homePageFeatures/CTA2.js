import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import ButtonNormal from '../ButtonNormal';

export default function CTA2() {
  return (
    <Flex
      as='section'
      w='full'
      pos='relative'
      className='overlay'
      backgroundImage="url(https://images.unsplash.com/photo-1607219739284-8523775a5868?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80)"
      backgroundSize='cover'
      backgroundPosition='center'
      bgRepeat='no-repeat'
      backgroundAttachment='fixed'
    >
      <Container maxW='5xl' py='6rem' zIndex='1' display='flex' alignItems='center' flexDirection='column'>
        <Text textAlign='center' fontSize='1.125rem' color='color_alt' mb='1rem'>Projects you can back</Text>
        <Heading textAlign='center' color='white' fontSize='3.5rem' mb='2rem'>Together We can Bring More Creativity into the World</Heading>
        <ButtonNormal url="/my-account/add-project" text="Start a Project" />
      </Container>
    </Flex>
  )
}
