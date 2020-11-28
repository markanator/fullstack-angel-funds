import React from 'react'
import NextLink from 'next/link'
import {Box, Button, Flex, Heading, Link} from '@chakra-ui/react'

export default function JoinSite() {
  return (
    <Box as='section'>
      <Box m='auto' maxW='5xl' my={20}>
        <Box w='100%' alignItems='center' m='auto'>
          <Box boxShadow='inner' maxW='4xl' m='auto'>
            <Flex direction='column' boxShadow='md' borderColor='purple.600' py={4} px={8} borderRadius='lg' borderTop borderTopWidth={8} w='100%'>
              <Flex direction='row' justifyContent='space-between' alignItems='center'>
                <Flex direction='column'>
                  <Heading fontWeight='700' fontSize='md' textColor='gray.500' letterSpacing={1}>
                    Ready to start?
                  </Heading>
                  <Heading textColor='gray.800' fontSize='2xl' fontWeight='700' letterSpacing={1}>
                    Join today, start from scratch <br />
                    and launch tomorrow!
                  </Heading>
                </Flex>
                <Box>
                  <NextLink href='/'>
                    <Button colorScheme='purple'>
                      Get Started
                    </Button>
                  </NextLink>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
