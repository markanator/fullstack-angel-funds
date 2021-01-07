import { Box, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { FiTwitter, FiSlack, FiGithub } from 'react-icons/fi';
import { FaTwitch } from 'react-icons/fa';

export const Footer = (props) => {

return(
  <Flex as='footer'
  direction='column'
  alignItems='center'
  textAlign='center'
  w='100%'
  m='auto'>
    <Box w="100%" maxW='4xl' borderTopWidth='2px'>
      <Flex mt={12} textColor='gray.500' mb={8} alignItems='start' textAlign='left' >
      <Box w='25%'>
        <Link fontWeight='700'>
          VR FUNDING
        </Link>
      </Box>
      <Box w='25%'>
        <Heading fontSize='md' mb={1} fontWeight='700'>Company</Heading>
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
        <Heading fontSize='md' mb={2} fontWeight='700'>Find Us</Heading>
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
        <Heading fontSize='md' mb={1} fontWeight='700'>Newsletter</Heading>
        <Text fontSize='sm'>We respect your privacy and won't annoy you.</Text>
      </Box>
      </Flex>
    </Box>
    <Text textColor='gray.600' py={3}>
      Copyright © 2020 Mark Ambrocio. All rights reserved. | Made with{' '}
        <span role="img" aria-label="love" title="love">
          💖
        </span>
        in Chicago,IL.
    </Text>
  </Flex>
)
}
