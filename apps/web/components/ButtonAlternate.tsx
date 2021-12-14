import { Link } from "@chakra-ui/react";
import React from "react";

interface IButtonAltProps {
  url: string;
  text?: string;
}

export default function ButtonAlternate({ url, text }: IButtonAltProps) {
  return (
    <Link
      href={url || "#"}
      bgColor="text_primary"
      // display='inline-block'
      whiteSpace="nowrap"
      color="white"
      px="2rem"
      py="1rem"
      fontSize=".875rem"
      textTransform="uppercase"
      fontFamily="montserrat"
      fontWeight="500"
      textDecoration="none"
    >
      {text || "Start a Project"}
    </Link>
  );
}
