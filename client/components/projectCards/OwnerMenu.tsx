import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
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
      experimental_spaceX={4}
    >
      <IconButton
        as={Link}
        href={`/my-account/projects/${projectId}/edit`}
        colorScheme="blue"
        icon={<EditIcon />}
        aria-label="Edit Authored Project"
        title="Edit Authored Project"
      />
      <IconButton
        as={Link}
        href={`/my-account/projects/${projectId}/delete`}
        colorScheme="red"
        icon={<DeleteIcon />}
        aria-label="Delete Authored Project"
        title="Delete Authored Project"
      />
    </Flex>
  );
};

export default OwnerMenu;
