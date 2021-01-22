import { Box, Container, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import React from 'react';
import ALink from '../ALink';

export default function Navbar({user}) {
  console.log("navbar props.user:: ", user);

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
            <ALink href='/#'>
                123 Main St., Chicago, IL
            </ALink>
          </Flex>
          {/* RIGHT */}
          <Flex w="50%" justifyContent='flex-end' direction='row'>
            { !!user ?
              (<>
              <ALink href='/my-account' mr='2rem'>
                Dashboard
              </ALink>
              <a href='/api/auth/logout'>
                Logout
              </a>
              </>)
              :
              <a href='/api/auth/login'>
              Sign In or Register
              </a>
            }

            <ALink href='/my-account/add-project' ml='2rem'>
                Add a Project
            </ALink>
          </Flex>
        </Container>
      </Flex>
      {/* NAVIGATION */}
      <Container as='nav' maxW='7xl' display='flex' flexDirection='row' py='1.5rem'>
        <Box w="50%">
          <Box display='inline-block'>
          <ALink textColor='text_primary' href='/'>
            <Heading as='p' fontSize='20px' textColor='text_primary'>
              Virtual Reality Funds
            </Heading>
          </ALink>
          </Box>
        </Box>
        <List w='50%' display='inline-flex' justifyContent='flex-end'>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/' color='white'>
                Home
            </ALink>
          </ListItem>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/explore' color='white'>
                Explore
            </ALink>
          </ListItem>
          <ListItem mr='1rem'>
            <ALink textColor='text_primary' href='/about' color='white'>
                About
            </ALink>
          </ListItem>
          <ListItem>
            <ALink textColor='text_primary' href='/contact' color='white'>
                Contact
            </ALink>
          </ListItem>
        </List>
      </Container>
    </Flex>
  )
}