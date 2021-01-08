import { Box, Link, Container, Flex, Heading, Text } from '@chakra-ui/react'

const Hero = () => {
  return (<Flex
    as='section'
    className='hero'
    position='relative'
    justifyContent="flex-start"
    alignItems="center"
    h='75vh'
    w='full'
    bgImage={`url('/images/hero.jpg')`}
    bgSize='125%'
    bgPos='center'
    bgRepeat='no-repeat'
  >
    <Box className='hero__inner' pos='relative'></Box>
    <Container pos='relative' maxW='7xl' display='flex'>
    <Flex direction='column' color='white' >
      <Container maxW='3xl'>

      <Text fontSize='1.25rem' textDecoration='underline'>
        Raising Money Has Never Been So Easy
      </Text>
      <Heading as='h1' fontSize='4rem' mb='3rem' lineHeight='4.5rem'  textShadow="0 1px 0 black" >
        We help low-income, minorities bring their ideas to market
      </Heading >
      <Link bgColor='color_alt' color='text_primary' px='2rem' py='1rem' fontSize='1rem' fontFamily='montserrat' fontWeight='500' textDecoration='none'>
        Start a Project
      </Link>
      </Container>
    </Flex>
    </Container>
  </Flex>
)
}

export default Hero;