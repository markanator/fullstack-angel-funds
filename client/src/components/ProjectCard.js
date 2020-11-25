import { Flex,Box,Image, Heading, Tag, Text,Progress,Divider  } from '@chakra-ui/react';
import React from 'react'
import { getProjectFundPercentage} from '../utils/getProjectFundPercentage'

export default function ProjectCard({data}) {

  const projFundPercentage = getProjectFundPercentage(600,data.fundTarget);

  console.log(projFundPercentage);
  return (
    <Box borderWidth='1px' borderRadius='lg' m='auto' >
      {/* image */}
        <Image
          width='100%'
          maxW='300px'
          maxH='200px'
          objectFit='cover'
          src={data.image}
          alt={data.title}
          borderTopRadius='lg'
          // fallbackSrc="https://via.placeholder.com/200"
        />
      <Flex direction='column' p={4}>
        {/* //! TOP */}
        <Flex direction='row' justifyContent='space-between' mb={2}>
          <Heading as='p' fontSize='md'>{data.title}</Heading>
          <Tag colorScheme='teal' textTransform='uppercase'>{data.category}</Tag>
        </Flex>
        {/* //!  brief DESCRIPTION */}
        <Text>{data.description}</Text>
        {/* //! BOTTOM */}
        <Box mt={4}>
        {/* progress bar */}
          <Text fontSize='sm' textAlign='center'>{`${projFundPercentage}%`}</Text>
          <Progress colorScheme='teal' size='sm' value={parseInt(projFundPercentage)} />
        {/* //! DEETS */}
          <Flex justifyContent='space-around' alignContent='center' py={2}>
            <Flex direction='column' alignItems='center'>
              <Heading as='h4' fontSize='lg'>{`$${data.currentFunds}`}</Heading>
              <Text fontSize='xs' textTransform='uppercase' >Funded</Text>
            </Flex>
            <Box borderRightWidth="2px" />
            <Flex direction='column' alignItems='center' color='GrayText'>
              <Heading as='h4' fontSize='lg'>{`$${data.fundTarget}`}</Heading>
              <Text fontSize='xs' textTransform='uppercase' >Goal</Text>
            </Flex>
            <Box borderRightWidth="2px" />
            <Flex direction='column' alignItems='center' color='GrayText'>
              <Heading as='h4' fontSize='lg'>{data.totalDonation_sum}</Heading>
              <Text fontSize='xs' textTransform='uppercase' >Donations</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
