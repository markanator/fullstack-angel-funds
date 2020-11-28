import React from 'react'
import { Box, Flex, Tag, Text, List, ListItem} from '@chakra-ui/react'
import {FaRegLightbulb,FaHandsHelping} from 'react-icons/fa'
import { BiDonateHeart } from 'react-icons/bi';


function FlowShowcase() {
  return (
    <Box as='section' m='auto' maxW="4xl" py={10}>
      <Flex direction='column'>
      {/* SECTION HEADER */}
      <Box m='auto' mb={12}>
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
      <Card
        count='1'
        mainColor='purple'
        phaseText="INITIAL PHASE"
        LeftListOne="Go from raw experience to refined story."
        LeftListTwo="Build a team to start working on a product."
        Icon={FaRegLightbulb}
        RightHeader="Get help refining your business"
      />
      <Card
        count='2'
        mainColor='blue'
        phaseText="BOOTSTRAPPING"
        LeftListOne="We help you navigate the fundraising stage."
        LeftListTwo="Get help setting up a company budget to stay profitable."
        Icon={BiDonateHeart}
        RightHeader="Get help refining your business"
      />
      <Card
        count='3'
        mainColor='green'
        phaseText="INITIAL PHASE"
        LeftListOne="Go from raw experience to refined story."
        LeftListTwo="Build a team to start working on a product."
        Icon={FaHandsHelping}
        RightHeader="Get help refining your business"
      />

      </Flex>
    </Box>
  )
}

const Card = ({count,phaseText,LeftListOne,LeftListTwo,Icon,RightHeader,mainColor}) =>{
  let css = {};
  let iconColor;
  switch(count){
    case '1':
      iconColor = "#5521b5";
      css = {background:"linear-gradient(90deg, rgba(220,215,254,1) 0%, rgba(255,255,255,0) 100%) !important;"}
      break;
    case "2":
      iconColor = "#42389d";
      css = {background:"linear-gradient(90deg, #cddbfe 0%, rgba(255,255,255,0) 100%) !important;"}
      break;
    case "3":
      iconColor = "#03543f";
      css = {background:"linear-gradient(90deg, #bcf0da 0%, rgba(255,255,255,0) 100%) !important;"}
      break;
    default:
      iconColor = "#5521b5";
      css = {background:"linear-gradient(90deg, rgba(220,215,254,1) 0%, rgba(255,255,255,0) 100%) !important;"}
      break;
  }
  return (
  <Flex m='auto' direction='row' mb={8}>
  {/* LEFT */}
  <Box
    width="50%"
    height='auto'
    borderRadius='lg'
    p={6}
    fontWeight='500'
    css={css}
  >
    <Flex direction='row' alignItems='center'>
      <Box width='66%'>
        <Tag colorScheme="black" variant='outline'>{phaseText}</Tag>
        <List mt={6} >
          <ListItem mb={3}>
            <Text color={`${mainColor}.600`}>
            - {LeftListOne}
            </Text>
          </ListItem>
          <ListItem>
            <Text color={`${mainColor}.600`}>
            - {LeftListTwo}
            </Text>
            </ListItem>
        </List>
      </Box>
      <Icon style={{width: "34%", fontSize: "3rem", color: `${iconColor}`}} />
    </Flex>
  </Box>
  {/* RIGHT */}
  <Box width='50%' p={4} ml={12} >
    <List>
      <ListItem>
        <Text as="h4"
          color='gray'
          fontSize='xl'
          fontWeight='700'
          mb={3}>
          {RightHeader}
        </Text>
      </ListItem>
      <ListItem>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, eius molestias id laboriosam soluta nisi expedita.
          Illo similique quibusdam aliquid, aut alias accusantium rem ab
          labore ipsum placeat dolorem eos.
        </Text>
      </ListItem>
    </List>
  </Box>
</Flex>)
}


export default FlowShowcase;
