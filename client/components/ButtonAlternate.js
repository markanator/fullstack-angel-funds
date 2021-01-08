import {Link} from '@chakra-ui/react';
import React from 'react'

export default function ButtonAlternate() {
  return (
    <Link
      href='#'
      bgColor="text_primary"
      color='white'
      px='2rem'
      py='1rem'
      fontSize='.875rem'
      textTransform='uppercase'
      fontFamily='montserrat'
      fontWeight='500'
      textDecoration='none'
    >
      Start a Project
    </Link>
  )
}
