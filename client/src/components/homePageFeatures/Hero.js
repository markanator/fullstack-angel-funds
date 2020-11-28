import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import ProjectCard from '../ProjectCard'
import {data} from '../../dummy/projects'


export const Hero = () => (
  <Flex justifyContent="center" alignItems="center" h='65vh'>
    <Box mr={12}>
      <ProjectCard data={data[0]}/>
    </Box>
    <Box ml={12}>
      <Heading fontSize="6xl">Here Ideas <br/> Become Reality</Heading>
      <Button mt={8} size='lg' color='white' fontWeight='400' letterSpacing={2} fontSize='lg' colorScheme='teal'>Discover Projects</Button>
    </Box>

  </Flex>
)

Hero.defaultProps = {
  title: 'with-chakra-ui',
}
