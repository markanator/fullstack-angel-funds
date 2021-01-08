import { Box, Container, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { FiTwitter, FiSlack, FiGithub } from 'react-icons/fi';
import { FaTwitch } from 'react-icons/fa';

export const Footer = (props) => {

return(
  <Flex
    as='footer'
    w='100%'
    direction='column'

    textAlign='center'
    m='auto'
    bgColor='text_primary'
  >
    <Container maxW='7xl' display='flex' flexDirection='column' justifyContent='center'
    alignItems='center'>
      <Flex mt={12} textColor='text_four' mb={8} alignItems='start' textAlign='left' w='full'>
      <Box w='25%'>
        <Link fontWeight='700' fontFamily='Montserrat' mb='1.5rem'>
          VR Funding
        </Link>
      </Box>
      <Box w='25%'>
        <Heading fontSize='md' mb={1} fontWeight='700' mb='1.5rem'>
          Company
        </Heading>
        <List display='flex' flexDirection='column'>
          <ListItem>
            <Link>
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              Causes
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              Blog
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              Terms of Use
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              Privacy Policy
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              Sitemap
            </Link>
          </ListItem>
        </List>
      </Box>
      <Box w='25%'>
        <Heading fontSize='md' mb={2} fontWeight='700'  mb='1.5rem'>Find Us</Heading>
        <List display='flex' flexDirection='row' fontSize='2xl'>
          <ListItem mr={2}>
            <Link>
              <FaTwitch />
            </Link>
          </ListItem>
          <ListItem mr={2}>
            <Link>
              <FiTwitter />
            </Link>
          </ListItem>
          <ListItem mr={2}>
            <Link>
              <FiSlack />
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              <FiGithub />
            </Link>
          </ListItem>
        </List>
      </Box>
      <Box w='25%'>
        <Heading fontSize='md' mb={1} fontWeight='700'  mb='1.5rem'>Newsletter</Heading>
        <Text fontSize='sm'>We respect your privacy and won't annoy you.</Text>
      </Box>
      </Flex>
    <Text textColor='text_four' py='1.5rem' borderTop='2px solid var(--text_tertiary)' w='full' >
      Copyright © 2020 Mark Ambrocio. All rights reserved. | Made with{' '}
        <span role="img" aria-label="brains" title="brains">
          🧠
        </span>
        in Chicago,IL.
    </Text>
    </Container>
  </Flex>
)
}
