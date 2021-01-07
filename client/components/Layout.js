import { Box } from '@chakra-ui/react';
import React from 'react'
import { Footer } from './sharedNav/Footer';
import Navbar from './sharedNav/Navbar';
// import Wrapper from './Wrapper';

export default function Layout({children}) {
  return (
    <Box>
      {/* Header */}
      <Navbar />
        <>{children}</>
      {/* FOOTER */}
      <Footer/>
    </Box>
  )
}
