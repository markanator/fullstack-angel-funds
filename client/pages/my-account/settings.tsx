import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";
import auth0 from "../api/utils/auth0";

interface ISettingProps {
  user: any | null;
}

export default function settings({ user }: ISettingProps) {
  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2));

  return (
    <Layout user={user} SEO={{ title: "My Settings - VR Funds" }}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title="My Settings"
      />
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
            <FormControl mb="1.125rem">
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input
                name="fullName"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormErrorMessage>
                {errors.fullName && errors.fullName.message}
              </FormErrorMessage>
            </FormControl>

            {/* avatar */}
            <FormControl mb="1.125rem">
              <FormLabel htmlFor="avatarUrl">Avatar Url</FormLabel>
              <Input
                name="avatarUrl"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormErrorMessage>
                {errors.avatarUrl && errors.avatarUrl.message}
              </FormErrorMessage>
            </FormControl>

            {/* email */}
            <FormControl mb="1.125rem">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Flex dir="row">
              {/* oldPassword */}
              <FormControl mb="1.125rem" mr="1rem">
                <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                <Input
                  name="oldPassword"
                  ref={register}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <FormErrorMessage>
                  {errors.oldPassword && errors.oldPassword.message}
                </FormErrorMessage>
              </FormControl>

              {/* oldPassword */}
              <FormControl mb="1.125rem" ml="1rem">
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Input
                  name="newPassword"
                  ref={register}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <FormErrorMessage>
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Button
              my="1rem"
              type="submit"
              isloading={formState.isSubmitting}
              colorScheme="blue"
              size="lg"
            >
              Submit Changes
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}

// make sure user is logged in
export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/auth/login",
    });
    res.end();
    return;
  }
  return {
    props: {
      user: session.user,
    },
  };
}
