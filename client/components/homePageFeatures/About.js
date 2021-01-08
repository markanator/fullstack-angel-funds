import { Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import useWindowSize from '../../hooks/useWindowSize';

export default function About() {
  const {rightFlush} = useWindowSize();

  // console.log(rightFlush);
  return (
    <Flex as='section' mt='5rem' overflow='hidden'>
      <Container px='-1rem' maxW='7xl' w='full' display='flex' flexDirection='row' pos='relative' justifyContent='center' alignItems='center' bgColor='#fff'>
        {/* LEFT */}
        <Flex maxW='50%' w='full' flexDirection='column' h='full' justifyContent='flex-start'>
          {/* LEFT - TOP */}
          <Flex w='full' h='full'>
            <Flex w='290px' h='full' maxH='311px' bgColor='color_alt' justifyContent='center' alignItems='center' m='1px'>
                <Heading fontSize='1.875rem' maxW='185px'  textAlign='center' textAlign='left'>
                We’re a trusted platform
                </Heading>
            </Flex>
            <Box w='290px' h='full' m='1px' maxW='290px'>
              <Image src='/images/image-2.jpg' alt='choose us' w='full' h='full' maxH='311px' display='inline-block' />
            </Box>
          </Flex>
          {/* LEFT - BOTTOM */}
          <Flex w='full' h='full'>
            <Box w='290px' h='full' m='1px' maxW='290px'>
              <Image src='/images/image-2.jpg' alt='choose us' w='full' h='full' maxH='311px' display='inline-block' />
            </Box>
            <Box w='290px' h='full' m='1px' maxW='290px'>
              <Image src='/images/image-3.jpg' alt='choose us' w='full' h='full' maxH='311px' display='inline-block' />
            </Box>
        </Flex>
        </Flex>
        {/* RIGHT */}
        <Flex w='50%' h='full' bgColor='white' pos='relative'>
          <Flex padding='0 1rem 2rem 5rem' w='full' h='auto' pos='relative'>
            <Flex className='inner__content' flexDirection='column' justifyContent='flex-start' w='full' h='full' zIndex='2'>
            <Text textAlign='left' fontSize='1.125rem' color='color_alt' mb='1rem'>A Bussiness You Can Trust</Text>
            <Heading textAlign='left' fontSize='3.5rem' mb='3rem'>Why choose us?</Heading>
              <IconSection title="Highest Success Rates" blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum." />
              <IconSection title="By POC, for POC" blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum." />
              <IconSection title="Highest Success Rates" blurb="Lorem Ipsum velit auctor aliquet. Aenean sollic tudin, lorem is simply free text quis bibendum." />
            </Flex>
            {/* RIGHT SIDE WHITE */}
            <Box style={{content: ""}} h='full' pos='absolute' top='0' left="0" zIndex='1' background='white' width={rightFlush/2} />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}


const IconSection = ({title, blurb}) => (
<Flex mb='2rem' direction='row' h='auto'>
  <Flex padding='1rem' h='58px' w='58px' mr='2rem' mt='5px' bgColor='rgba(238, 99, 82,.2)'>
    <BsCheckCircle style={{margin: "0px", padding: "0px", fontSize: "2rem", color: "var(--color_alt)"}}  />
  </Flex>
  <Box>
    <Heading as='h3' fontSize='1.25rem' mb='1.125rem'>{title}</Heading>
    <Text lineHeight='2rem' color='text_secondary' fontSize='1.125rem'>{blurb}</Text>
  </Box>
</Flex>
)

