import { Box } from '@chakra-ui/react';
import React from 'react'
import Navbar from './Navbar';
import Wrapper from './Wrapper';

export default function Layout({children,variant}) {
  return (
    <Box>
      {/* Header */}
      <Navbar />
        <Wrapper variant={variant}>{children}</Wrapper>
      {/* FOOTER */}
    </Box>
  )
}
