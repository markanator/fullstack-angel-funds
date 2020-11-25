import React from 'react'
import { Box, Flex, Tag, Text} from '@chakra-ui/react'
import {FaRegLightbulb} from 'react-icons/fa'

function FlowShowcase() {
  return (
    <Box as='section' m='auto' maxW={960} my={10}>
      <Flex direction='column'>
      {/* SECTION HEADER */}
      <Box m='auto'>
          <Text textAlign='left' color='gray'fontSize='3xl'>
            Get help <span style={{fontWeight:'700'}}>bootstrapping</span>
            <br />
            your{" "}
            <span style={{fontWeight:'700',fontStyle:'italic'}}>
              Virtual Reality Venture
            </span>
          </Text>
        </Box>
      {/* Card One */}
      <Card />

      </Flex>
      This is the showcase
    </Box>
  )
}

const Card = () =>{
  return (
  <Flex m='auto' direction='row' mb={8}>
  {/* LEFT */}
  <Box
    width="50%"
    borderRadius='lg'
    p={6}
    fontWeight='400'
    className=" bg-gradient-to-r from-purple-200 w-1/2 rounded-lg p-6 h-auto text-purple-800 font-medium"
    >
    <div className="flex flex-row items-center">
      <div className="inner__left w-2/3">
        <Tag
          colorScheme='purple'
        >
          Initial Phase
        </Tag>
        <ul className="mt-6">
          <li className="mb-3">
            - Go from raw experience to refined story.
          </li>
          <li>- Build a team to start working on a product.</li>
        </ul>
      </div>
      <FaRegLightbulb className="w-1/3 text-6xl" />
    </div>
  </Box>
  {/* RIGHT */}
  <div className="w-1/2 p-4 ml-12">
    <ul className="text-gray-600">
      <li>
        <h4 className=" text-gray-800 text-2xl font-bold mb-3">
          Get help refining your business
        </h4>
      </li>
      <li>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, eius molestias id laboriosam soluta nisi expedita.
          Illo similique quibusdam aliquid, aut alias accusantium rem ab
          labore ipsum placeat dolorem eos.
        </p>
      </li>
    </ul>
  </div>
</Flex>)
}


export default FlowShowcase;
