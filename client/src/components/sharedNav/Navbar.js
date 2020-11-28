import React from 'react'
import { Flex,Box,Heading,Link,Button  } from "@chakra-ui/react"
import {FaCompass,FaProjectDiagram,FaSearch,FaLock,FaRegUserCircle} from 'react-icons/fa';
import NextLink from 'next/link'

export default function Navbar() {
  return (
    <Box as="header" p={8} borderWidth='2px'>
      <Flex justifyContent='space-between' alignItems='center'>
        {/* HEADER */}
        <Link>
          <Heading fontSize='2xl'>VR Funding</Heading>
        </Link>

        {/* MIDDLE */}
        <Box as='nav'>
          <Link display='inline-flex' mr={6} alignItems='center' fontSize='lg' fontWeight={600} >
            <FaCompass style={{fontSize: "1.5rem",marginRight: ".5rem"}} />
            Explore
          </Link>
          <Link display='inline-flex' alignItems='center' fontSize='lg' fontWeight={600} >
            <FaProjectDiagram style={{fontSize: "1.5rem",marginRight: ".5rem"}} />
            Start a Project
          </Link>
        </Box>

        {/* RIGHT */}
        <Flex alignItems='center'>
          <Link display='inline-flex' mr={4}  alignItems='center' fontSize='lg' >
            <FaSearch style={{fontSize: "1.5rem",marginRight: ".5rem"}} />
          </Link>
          <Button colorScheme='teal' mr={4} fontSize='lg' leftIcon={<FaLock />}>
            Wallet
          </Button>
          <NextLink href='/login'>
            <Link display='inline-flex' ml={4}  alignItems='center' fontSize='lg' >
              <FaRegUserCircle style={{fontSize: "1.5rem",marginRight: ".5rem"}} />
              Login/Register
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  )
}
