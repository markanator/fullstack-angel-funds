import React from 'react'
import { Flex,Box,Heading,Link,List,ListItem, Container,  } from "@chakra-ui/react"
import NextLink from 'next/link'
import ALink from '../ALink';

export default function Navbar() {
  return (
    <Flex as="header" w='full'  direction='column' boxShadow='md'>
      {/* TOP */}
      <Flex direction='row' bgColor='color_primary' color='white' w='full'
      display={["none",'none','block']}
      >
        <Container maxW='7xl' display='flex' flexDirection='row' py=".5rem"
          fontSize='.875rem'
          textColor='white'
        >
          {/* LEFT */}
          <Flex w="50%" direction='row'>
            <ALink href='mailto:hey@markambrocio.com' mr='2rem'>
                contact@vrfunds.com
            </ALink>
            <ALink href='#'>
                123 Main St., Chicago, IL
            </ALink>
          </Flex>
          {/* RIGHT */}
          <Flex w="50%" justifyContent='flex-end' direction='row'>
            <ALink href='/auth' mr='1rem'>
                Sign In or Register
            </ALink>
            <ALink href='/auth' mr='1rem'>
                Add a Project
            </ALink>
          </Flex>
        </Container>
      </Flex>
      {/* NAVIGATION */}
      <Container as='nav' maxW='7xl' display='flex' flexDirection='row' py='1.5rem'>
        <Box w="50%">
          <Box display='inline-block'>
          <ALink textColor='text_primary' href='/#'>
            <Heading as='p' fontSize='20px' textColor='text_primary'>
              VR Funds
            </Heading>
          </ALink>
          </Box>
        </Box>
        <List w='50%' display='inline-flex' justifyContent='flex-end'>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/#' color='white'>
                Home
            </ALink>
          </ListItem>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/#' color='white'>
                Explore
            </ALink>
          </ListItem>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/#' color='white'>
                About
            </ALink>
          </ListItem>
          <ListItem>
            <ALink textColor='text_primary' href='/#' color='white'>
                Contact
            </ALink>
          </ListItem>
        </List>
      </Container>
    </Flex>
  )
}
