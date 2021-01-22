import { Box } from '@chakra-ui/react';
import React from 'react'
import Page from './Page';
import { Footer } from './sharedNav/Footer';
import Navbar from './sharedNav/Navbar';
// import Wrapper from './Wrapper';

export default function Layout({children, user, SEO}) {
  return (
    <Box bgColor='white' textColor='text_primary'>
      <Page {...SEO} />
      {/* Header */}
      <Navbar user={user} />
        <>{children}</>
      {/* FOOTER */}
      <Footer/>
    </Box>
  )
}
