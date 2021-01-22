import React from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from "next/link"

export default function ALink({children, href, ...rest}) {
  return (
    <NextLink passHref href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  )
}
