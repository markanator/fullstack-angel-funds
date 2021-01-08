import React from 'react'
import { Flex,Box,Heading,Link,List,ListItem, Container,  } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Navbar() {
  return (
    <Flex as="header" w='full'  direction='column' boxShadow='md'>
      {/* TOP */}
      <Flex direction='row' background='color_primary' color='white' w='full'
      display={["none",'none','block']}
      >
        <Container maxW='7xl' display='flex' flexDirection='row' py=".5rem">
          {/* LEFT */}
          <Flex w="50%" direction='row'>
            <Link mr='2rem'>
              <a>
                contact@vrfunds.com
              </a>
            </Link>
            <Link>
              <a>
                123 Main St., Chicago, IL
              </a>
            </Link>
          </Flex>
          {/* RIGHT */}
          <Flex w="50%" justifyContent='flex-end' direction='row'>
            <Link mr='1rem'>
              <a>
                Sign In or Register
              </a>
            </Link>
            <Link>
              <a>
                Add a Project
              </a>
            </Link>
          </Flex>
        </Container>
      </Flex>
      {/* NAVIGATION */}
      <Container as='nav' maxW='7xl' display='flex' flexDirection='row' py='1.5rem'>
        <Box w="50%">
          <Box display='inline-block'>
          <Link textColor='text_primary'>
            <Heading as='p' fontSize='20px'>
              VR Funds
            </Heading>
          </Link>
          </Box>
        </Box>
        <List w='50%' display='inline-flex' justifyContent='flex-end'>
          <ListItem mr='1rem'>
            <Link textColor='text_primary'>
              <a>
                Home
              </a>
            </Link>
          </ListItem>
          <ListItem mr='1rem'>
            <Link textColor='text_primary'>
              <a>
                Explore
              </a>
            </Link>
          </ListItem>
          <ListItem mr='1rem'>
            <Link textColor='text_primary'>
              <a>
                About
              </a>
            </Link>
          </ListItem>
          <ListItem>
            <Link textColor='text_primary'>
              <a>
                Contact
              </a>
            </Link>
          </ListItem>
        </List>
      </Container>
    </Flex>
  )
}
