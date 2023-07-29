import React from "react";
import { Box, ChakraComponent } from "@chakra-ui/react";
import NextLink from "next/link";

interface IALinkProps {
  children?: React.ReactNode;
  href: string;
  [key: string]: any;
}

export default function ALink(props: IALinkProps) {
  const { children, href, ...rest } = props;

  return (
    <NextLink passHref href={href}>
      <Box {...rest}>{children}</Box>
    </NextLink>
  );
}
