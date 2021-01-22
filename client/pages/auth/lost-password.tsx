import { Alert, AlertIcon, Button, Container, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React from 'react';
import {useRouter} from 'next/router'
// locals
import Banner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';

export default function LostPassword() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("User is being moved...");
    router.push('/my-account');
  }

  return (
    <Layout>
      <Banner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='Forgot Password'
      />
      <Container maxW='7xl' pt='3rem'>
      <Alert status="info" mb='2rem'>
        <AlertIcon />
        We have a demo account setup. Username:{" "} <strong>{" "}demo{" "}</strong> {" "}and Password: {" "}<strong>demo</strong>
      </Alert>
        <Flex
          w='50%'
          mr='1rem'
          flexDirection='column'
          pb='6rem'
          >
          <Flex
            as='form'
            flexDirection='column'
            border='1px solid'
            borderColor='gray.300'
            bgColor='white'
            p='2rem'
            onSubmit={handleSubmit}
          >
            <FormControl id="email">
              <Text mb='1.5rem' textColor='text_secondary'>Enter your email. You will receive a link to create a new password via email.</Text>
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                border='1px solid'
                borderColor='progress_bg'
                rounded='none'
                boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
              />
            </FormControl>

            <Button
              type='submit'
              bgColor='color_alt'
              rounded='none'
              size='lg'
              mt='1rem'
              textTransform='uppercase'
            >
              Reset Password
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  )
}
