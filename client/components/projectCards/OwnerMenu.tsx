import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  projectId: number;
};

const OwnerMenu = ({ projectId }: Props) => {
  return (
    <Flex
      flexDir="row-reverse"
      zIndex={5}
      pos="absolute"
      top={4}
      right={4}
      color="black"
      gap={4}
    >
      <Button
        as={Link}
        href={`/my-account/projects/${projectId}/updates`}
        colorScheme="green"
        // icon={<EditIcon />}
        aria-label="Edit Authored Project"
        title="Edit Authored Project"
        disabled
      >
        Updates
      </Button>
      <Button
        as={Link}
        href={`/my-account/projects/${projectId}/edit`}
        colorScheme="blue"
        // icon={<EditIcon />}
        aria-label="Edit Authored Project"
        title="Edit Authored Project"
      >
        Edit
      </Button>
      <Button
        as={Link}
        href={`/my-account/projects/${projectId}/delete`}
        colorScheme="red"
        // icon={<DeleteIcon />}
        aria-label="Delete Authored Project"
        title="Delete Authored Project"
      >
        Delete
      </Button>
    </Flex>
  );
};

export default OwnerMenu;
