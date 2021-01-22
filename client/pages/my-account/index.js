import { Button, Container, Flex, Link } from '@chakra-ui/react';
import React from 'react';
// Locals
import ALink from '../../components/ALink';
import AuthBanner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';

export default function index() {
  return (
    <Layout>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='My Account'
      />
      <Container maxW='7xl' bgColor='gray.200' py='2rem'>
        <Flex p='1rem' boxShadow='lg' bgColor='white' direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex>
            <ALink href='/my-account' mr='1.5rem'>
              Dashboard
            </ALink>
            <ALink href='/my-account/settings' mr='1.5rem'>
              My Account
            </ALink>
            <ALink href='/my-account/projects'>
              Projects
            </ALink>
          </Flex>

          <Button as={Link} href='/my-account/add-project' colorScheme="blue" rounded='0' color='black'>
            Add New Project
          </Button>
        </Flex>
      </Container>
      USER DASHBOARD
    </Layout>
  )
}
