import { Box } from '@chakra-ui/react';
import React from 'react'
import { Footer } from './sharedNav/Footer';
import Navbar from './sharedNav/Navbar';
// import Wrapper from './Wrapper';

export default function Layout({children, user}) {
  return (
    <Box bgColor='white' textColor='text_primary'>
      {/* Header */}
      <Navbar user={user} />
        <>{children}</>
      {/* FOOTER */}
      <Footer/>
    </Box>
  )
}
