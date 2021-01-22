import { Box, Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic'
import React from 'react'

// const Splide = dynamic(()=> import('@splidejs/react-splide').then((mod)=>mod.Splide),{ssr: false})

// const SplideSlide = dynamic(()=> import('@splidejs/react-splide').then((mod)=>mod.SplideSlide), {ssr: false})


export default function Testimonial() {

  return (
    <Flex as='section' w='full' py='6rem'>
      <Container maxW='7xl' display='flex' flexDirection='column'>
        <Flex direction='column'>
          <Text textAlign='left' fontSize='1.125rem' color='color_alt' mb='1rem'>
            Testimonials
          </Text>
          <Heading textAlign='left' color='text_primary' fontSize='3.5rem' mb='3rem'>
            What They Say
          </Heading>
          {/* <Splide
          id='splide__main'
          options={ {
            rewind : true,
            perPage: 1,
            perMove: 1,
            pagination: false,
          }}
          >
            <SplideSlide>
              <TestimonialSlide />
            </SplideSlide>
            <SplideSlide>
              <TestimonialSlide />
            </SplideSlide>
            <SplideSlide>
              <TestimonialSlide />
            </SplideSlide>
          </Splide> */}
        </Flex>
      </Container>
    </Flex>
  )
}

const TestimonialSlide = () => (
  <Box className='testimonial__main' display='inline-flex' pos='relative' w="full">
    <Flex borderLeft='5px solid var(--color_alt)' bgColor='testimonial_bg' height='415px' pos='relative' zIndex='1' overflow='visible' mt='2rem' w='full'>
      <Flex direction='column' pb='2.5rem' px='5rem' justifyContent='center' zIndex='1' w='full'>
        <Heading as='p' fontSize='1.875rem' mb='3rem' textAlign='left' maxW='xl'>Jo Martinez</Heading>
        <Text fontSize='1.25rem' lineHeight='2.5rem' color='text_tertiary' maxW='xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum, metus vitae suscipit posuere, nisl quam dignissim lectus, id maximus justo nisl ac dui. Cras rutrum nulla tincidunt libero gravida, eu mattis purus volutpat.</Text>
      </Flex>
    </Flex>
    <Flex zIndex='2' position='absolute' top='-20px' right='20px'>
      <Image src="/images/image-3.jpg" alt="Image 2" w='385px' h='415px' zIndex='2'  />
    </Flex>
  </Box>
)