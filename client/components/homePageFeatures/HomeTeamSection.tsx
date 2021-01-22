import { Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react'
import TeamMemberCardMD from '../Team/TeamMemberCardMD';

export default function HomeTeamSection() {
  return (
    <>
    <Flex
      as='section'
      className='overlay'
      pos='relative'
      backgroundImage="url(https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      backgroundAttachment='fixed'
    >
      <Container maxW='5xl' zIndex='1' pt='7rem' pb='15rem' display='flex' alignItems='center' flexDirection='column'>
        <Text textAlign='center' fontSize='1.25rem' color='color_alt' mb='1rem'>Meet the Team</Text>
        <Heading textAlign='center' color='white' fontSize='3.5rem' mb='2rem'>Our Pros</Heading>
      </Container>
    </Flex>
      <Flex justifyContent='center' mt='-12rem' zIndex='5' mb='6rem'>
        <TeamMemberCardMD />
      </Flex>
    </>
  )
}