import { Button, Container, Flex, Field, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

// interface ISettingProps { }

export default function Settings() {
  const { isLoggedIn } = useIsAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(JSON.stringify(data, null, 2));

  if (!isLoggedIn) {
    // no logged user, redirect
    return <Layout SEO={{ title: "Loading - Angel Funds" }}>Loading...</Layout>;
  }
  return (
    <Layout SEO={{ title: "My Settings - Angel Funds" }}>
      <AuthBanner bgImage="/images/breadcrumb.png" title="My Settings" />
      <Container maxW="7xl" bgColor="gray.200" py="2rem">
        <AccountNavbar />
        {/* MAIN container */}
        <Flex w="full" py="4rem">
          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            direction="column"
            w="full"
            border="1px solid"
            borderColor="progress_bg"
            p="2rem"
            boxShadow="lg"
            bgColor="white"
          >
            <Heading as="h3" mb="1.5rem">
              Basic Info
            </Heading>

            {/* TITLE */}
            <Field.Root mb="1.125rem">
              <Field.Label htmlFor="fullName">Full Name</Field.Label>
              <Input
                {...register("fullName")}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <Field.ErrorText>
                {!!errors?.fullName && errors?.fullName?.message?.toString()}
              </Field.ErrorText>
            </Field.Root>

            {/* avatar */}
            <Field.Root mb="1.125rem">
              <Field.Label htmlFor="avatarUrl">Avatar Url</Field.Label>
              <Input
                {...register("avatarUrl")}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <Field.ErrorText>
                {!!errors.avatarUrl && errors.avatarUrl.message?.toString()}
              </Field.ErrorText>
            </Field.Root>

            {/* email */}
            <Field.Root mb="1.125rem">
              <Field.Label htmlFor="email">Email</Field.Label>
              <Input
                {...register("email")}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <Field.ErrorText>
                {!!errors.email && errors.email.message?.toString()}
              </Field.ErrorText>
            </Field.Root>

            <Flex dir="row">
              {/* oldPassword */}
              <Field.Root mb="1.125rem" mr="1rem">
                <Field.Label htmlFor="oldPassword">Old Password</Field.Label>
                <Input
                  {...register("oldPassword")}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <Field.ErrorText>
                  {!!errors.oldPassword && errors.oldPassword.message?.toString()}
                </Field.ErrorText>
              </Field.Root>

              {/* oldPassword */}
              <Field.Root mb="1.125rem" ml="1rem">
                <Field.Label htmlFor="newPassword">New Password</Field.Label>
                <Input
                  {...register("newPassword")}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <Field.ErrorText>
                  {!!errors.newPassword && errors.newPassword.message?.toString()}
                </Field.ErrorText>
              </Field.Root>
            </Flex>

            <Button my="1rem" type="submit" colorPalette="blue" size="lg">
              Submit Changes
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
