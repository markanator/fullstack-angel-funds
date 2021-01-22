import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

interface IALinkProps {
  children: React.ReactNodeArray | any;
  href: string;
  [propName: string]: {};
}

export default function ALink(props: IALinkProps) {
  const { children, href, ...rest } = props;

  return (
    <NextLink passHref href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  );
}
