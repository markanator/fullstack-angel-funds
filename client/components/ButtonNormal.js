import {Link} from '@chakra-ui/react';
import React from 'react'

export default function ButtonNormal({url,text}) {
  return (
    <Link
    href={url || "#"}
    bgColor='color_alt'
    color='text_primary'
    px='2rem'
    py='1rem'
    fontSize='1rem'
    fontFamily='montserrat'
    fontWeight='500'
    textDecoration='none'
    >
        {text || "Start a Project" }
    </Link>
  )
}
