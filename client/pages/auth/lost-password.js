import React from 'react'
import Layout from '../../components/Layout';

export default function LostPassword() {
  return (
    <Layout>
      <Banner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='Login'
      />
      <Container maxW='7xl'>
        <Flex
          w='50%'
          mr='1rem'
          flexDirection='column'
          >
          LOST PASSWORD
        </Flex>
      </Container>
    </Layout>
  )
}
