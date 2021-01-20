import { Button, Container, Flex } from '@chakra-ui/react';
import React from 'react'
import ALink from '../../components/ALink';
// Locals
import Banner from '../../components/authShared/Banner';
import Layout from '../../components/Layout';

export default function index() {
  return (
    <Layout>
      <Banner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='My Account'
      />
      <Container maxW='7xl' bgColor='gray.200' py='2rem'>
        <Flex p='1rem' boxShadow='lg' bgColor='white' direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Flex>
            <ALink href='#' mr='1.5rem'>
              Dashboard
            </ALink>
            <ALink href='#' mr='1.5rem'>
              My Account
            </ALink>
            <ALink href='#'>
              Projects
            </ALink>
          </Flex>

          <Button colorScheme="blue" rounded='0' color='black'>
            Add New Project
          </Button>
        </Flex>
      </Container>
      USER DASHBOARD
    </Layout>
  )
}
