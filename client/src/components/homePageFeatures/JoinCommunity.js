import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react'
import {FaTwitch,FaTwitter,FaSlack} from 'react-icons/fa'

function JoinCommunity() {
  return (
    <Box as='section' m='auto' maxW="5xl" my={20}>
      <Box textAlign='center' mb={10} >
        <Heading as='h4' fontSize='md' color='grey' fontWeight='700'>
          Connect With Past and Present Founders
        </Heading>
        <Text fontSize='4xl' >
          Join our{' '}
          <strong className="text-orange-500">Growing Community</strong>
        </Text>
      </Box>
      {/* CARDS */}
      <Box className="cards__outer">
        <Flex direction='row' className="cards__inner">
          {/* LEFT */}
          <Box width="50%" m='auto' alignItems='center'>
            <Flex direction='column' m='auto' alignItems='center'>
              <Flex
                direction='column'
                boxShadow='md'
                p={4}
                borderRadius='lg'
                borderTopWidth={8}
                borderTopColor='#ff5a1f'
                maxW='sm'
                w='100%'
              >
                <Text
                  textColor='gray.600'
                  letterSpacing={0.5}
                  mb={6}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum expedita, ducimus quos, iusto aliquam cumque magni
                  excepturi labore tempora sed porro, velit ipsa? Culpa facilis
                  voluptas voluptate tempore doloremque consectetur?
                </Text>
                <Flex direction='row' alignItems='flex-start'>
                  <Image
                    src="https://i.imgur.com/kcPMLNS.jpg"
                    alt="Malka Benton"
                    borderRadius='100%'
                    mr={4}
                    w={12}
                    h={12}
                  />
                  <Flex direction='column'>
                    <Heading fontWeight='700' fontSize='xl' letterSpacing={1}>Gabi</Heading>
                    <Text textColor='gray.500'>Founder, Pa'Lante Studios</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          {/* RIGHT */}
          <Box width="50%" m='auto'>
            <Flex direction='column' alignItems='center'>
              {/* TOP CARDS */}
              <Card
                title="Twitch"
                text="For workshops, livestreams, videos"
                link="https://www.twitch.tv/palante_mark"
              >
                <FaTwitch />
              </Card>
              {/* MIDDLE CARDS */}
              <Card
                title="Twitter"
                text="Join the conversation"
                link="https://twitter.com/_mark_ambro"
              >
                <FaTwitter />
              </Card>
              {/* MIDDLE CARDS */}
              <Card
                title="Slack"
                text="Join our online community"
                link="https://twitter.com/_mark_ambro"
              >
                <FaSlack />
              </Card>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

function Card({ children, title, text, link }) {
  return (
    <Link href={link}
    target="_blank"
    rel="noopener noreferrer"
    width='100%'
    maxW='sm'>
      <Flex
        direction='row'
        p={4}
        boxShadow='md'
        borderRadius='lg'
        borderTopWidth={8}
        borderTopColor='#ff5a1f'
        justifyItems='center'
        alignItems='center'
        mb={6}>
        <Box
          borderRadius='100%'
          bgColor='#ff5a1f'
          color='#fff'
          fontSize='2xl'
          p={2}
          mr={4}>
          {children}
        </Box>
        <Flex direction='column'>
          <Heading letterSpacing={1} fontSize='xl' fontWeight='700'>
            {title}
          </Heading>
          <Text textColor='gray.600'>{text}</Text>
        </Flex>
      </Flex>
    </Link>
  );
}

export default JoinCommunity
