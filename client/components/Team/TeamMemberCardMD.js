import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'

export default function TeamMemberCardMD() {
  return (
    <Flex direction='column' zIndex='5'>
      <Box w='370px' h='405px'>
        <Image src='https://uifaces.co/our-content/donated/hh33bQqB.jpg' alt='founder' w='full' h='full' />
      </Box>
      <Flex direction='column' bgColor='progress_bg' textAlign='center' py='1rem'>
        <Text color='text_primary' fontSize='1.25rem' fontWeight='500'>Mark Ambro</Text>
        <Text color='text_secondary'>Founder</Text>
      </Flex>
    </Flex>
  )
}
