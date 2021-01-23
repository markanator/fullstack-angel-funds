import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import ALink from "components/ALink";
import React, { ReactElement } from "react";

interface Props {}

export default function LoginForm({}: Props): ReactElement {
  return (
    <Flex
      as="form"
      flexDirection="column"
      border="1px solid"
      borderColor="gray.300"
      bgColor="white"
      p="2rem"
      onSubmit={(e) => {
        e.preventDefault();
        return null;
      }}
    >
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
      </FormControl>

      <FormControl id="login_password" mt="1rem">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          border="1px solid"
          borderColor="progress_bg"
          rounded="none"
          boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
        />
      </FormControl>

      <Button
        type="submit"
        bgColor="color_alt"
        rounded="none"
        size="lg"
        mt="1rem"
        textTransform="uppercase"
      >
        Login
      </Button>

      <ALink href="/auth/lost-password" mt="1rem">
        Forgot Password
      </ALink>
    </Flex>
  );
}
