import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import ALink from "../ALink";

export default function AccountNavbar() {
  return (
    <Flex
      p="1rem"
      boxShadow="lg"
      bgColor="white"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex>
        <ALink href="/my-account" mr="1.5rem">
          Dashboard
        </ALink>
        <ALink href="/my-account/projects" mr="1.5rem">
          My Projects
        </ALink>
        {/* <ALink href="/my-account/settings">Account Settings</ALink> */}
      </Flex>

      <Link href="/my-account/add-project">
        <Button colorScheme="blue" rounded="0">
          Add New Project
        </Button>
      </Link>
    </Flex>
  );
}
