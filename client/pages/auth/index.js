import { Alert, AlertIcon, Box, Button, Checkbox, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import React from 'react'
import ALink from '../../components/ALink';
import Banner from '../../components/authShared/banner';
import Layout from '../../components/Layout';

export default function index() {
  return (
    <Layout>
      {/* BANNER */}
      <Banner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='Login'
      />

      <Container maxW='7xl'>
      <Alert status="info" mt='2rem'>
        <AlertIcon />
        We have a demo account setup. Username:{" "} <strong>{" "}demo{" "}</strong> {" "}and Password: {" "}<strong>demo</strong>
      </Alert>
      {/* FORMS */}
      <Flex dir='row' pt='2rem' pb='6rem'  justifyContent='space-evenly'>
        {/* LEFT SIDE */}
        <Flex
          w='50%'
          mr='1rem'
          flexDirection='column'
        >
          <Heading as='h2' fontSize='2rem' mb='1rem'>
            Login
          </Heading>
          <Flex
            as='form'
            flexDirection='column'
            border='1px solid'
            borderColor='gray.300'
            bgColor='white'
            p='2rem'
          >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
              border='1px solid'
              borderColor='progress_bg'
              rounded='none'
              boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
              />
            </FormControl>

            <FormControl id="password" mt='1rem'>
              <FormLabel>Password address</FormLabel>
              <Input type="password"
              border='1px solid'
              borderColor='progress_bg'
              rounded='none'
              boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
              />
            </FormControl>

            <Button type='submit' bgColor='color_alt' rounded='none' size='lg'
            mt='1rem' textTransform='uppercase'
            >Login</Button>

          <ALink href='/auth/lost-password' mt='1rem'>
            <a>
              Forgot Password
            </a>
          </ALink>
          </Flex>
        </Flex>
        {/* RIGHT SIDE */}
        <Flex
          w='50%'
          mr='1rem'
          flexDirection='column'
        >
          <Heading as='h3' fontSize='2rem' mb='1rem'>
            Register
          </Heading>
          <Flex
            as='form'
            flexDirection='column'
            border='1px solid'
            borderColor='gray.300'
            bgColor='white'
            p='2rem'
          >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                border='1px solid'
                borderColor='progress_bg'
                rounded='none'
                boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
              />
            </FormControl>

            <FormControl id="password" mt='1rem'>
              <FormLabel>Password address</FormLabel>
              <Input type="password"
              border='1px solid'
              borderColor='progress_bg'
              rounded='none'
              boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset' />
            </FormControl>

            <FormControl id="password" mt='1rem'>
              <Checkbox colorScheme="red" defaultIsChecked>
                I agree to the Terms and Conditions and Privacy Policy.
              </Checkbox>
            </FormControl>

            <Button type='submit' bgColor='color_alt' rounded='none' size='lg'
              mt='1rem' textTransform='uppercase'
            >Register</Button>
          </Flex>
        </Flex>
      </Flex>
      </Container>
    </Layout>
  )
}
