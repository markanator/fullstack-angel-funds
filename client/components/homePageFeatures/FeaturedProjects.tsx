import { Box, Container, Flex, Heading, Image, Link, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react'
import {FaRegClock} from 'react-icons/fa'
import ProjectCardSM from '../ProjectCardSM';

export default function FeaturedProjects() {
  return (
    <Flex as='section' w='full' pt='7rem' pb='5rem'>
      <Container maxW='7xl'>
        <Flex direction='column' justifyContent='center' alignItems='center'>
          <Text textAlign='center' fontSize='1.125rem' color='color_alt' mb='1rem'>Projects You Can Back</Text>
          <Heading textAlign='center' fontSize='3rem' mb='3rem'>Featured Projects</Heading>
          <List
          display='flex'
          w='full'
          justifyContent='space-between'
          flexDirection={['column','column','row']}

          flexWrap='nowrap'
          >
            <ListItem m='auto' mb='1rem'>
              <ProjectCardSM />
            </ListItem>
            <ListItem m='auto'mb='1rem'>
              <ProjectCardSM />
            </ListItem>
            <ListItem m='auto'mb='1rem'>
              <ProjectCardSM />
            </ListItem>
          </List>
        </Flex>
      </Container>
    </Flex>
  )
}
