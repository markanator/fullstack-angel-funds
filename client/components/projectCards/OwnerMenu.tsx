import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

type Props = {
  projectId: number;
};

const OwnerMenu = ({ projectId }: Props) => {
  return (
    <Flex flexDir="row-reverse" zIndex={5} pos="absolute" top={4} right={4} color="black" gap={4}>
      {/* TODO: Add blog style project update */}
      {/* <Button
        as={Link}
        href={`/my-account/projects/${projectId}/updates`}
        colorScheme="green"
        // icon={<EditIcon />}
        aria-label="Edit Authored Project"
        title="Edit Authored Project"
        disabled
      >
        Updates
      </Button> */}
      <Button colorPalette="blue" asChild>
        <Link
          href={`/my-account/projects/${projectId}/edit`}
          aria-label="Edit Authored Project"
          title="Edit Authored Project"
        >
          <FiEdit /> Edit
        </Link>
      </Button>
      {/* <Button
        as={Link}
        href={`/my-account/projects/${projectId}/delete`}
        colorScheme="red"
        leftIcon={<DeleteIcon />}
        aria-label="Delete Authored Project"
        title="Delete Authored Project"
      >
        Delete
      </Button> */}
    </Flex>
  );
};

export default OwnerMenu;
