import { useIsAuth } from '@/Queries/useIsAuth'
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import AuthBanner from '../../components/authShared/AuthBanner'
import Layout from '../../components/Layout'
import AccountNavbar from '../../components/myAccountShared/AccountNavbar'
import * as yup from 'yup';

type formData = {
  fullName: string;
  email: string;
  avatarUrl: string;
  oldPassword: string;
  newPassword: string;
}

export const settingsScheme = yup.object().shape({
  fullName: yup.string().optional(),
  email: yup.string().optional(),
  avatarUrl: yup.string().optional(),
  oldPassword: yup.string().optional(),
  newPassword: yup.string().optional(),
});


export default function Settings () {
  const {checksOut} = useIsAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: yupResolver(settingsScheme),
  })

  const onSubmit = (data) => alert(JSON.stringify(data, null, 2))

  if (checksOut) {
    return (
      <Layout SEO={{ title: 'My Settings - VR Funds' }}>
        <AuthBanner bgImage='/images/breadcrumb.png' title='My Settings' />
        <Flex bgColor='gray.200'>

        <Container maxW='7xl'  py='2rem'>
          <AccountNavbar />
          {/* MAIN container */}
          <Flex w='full' py='4rem'>
            <Flex
              as='form'
              onSubmit={handleSubmit(onSubmit)}
              direction='column'
              w='full'
              border='1px solid'
              borderColor='progress_bg'
              p='2rem'
              boxShadow='lg'
              bgColor='white'
            >
              <Heading as='h3' mb='1.5rem'>
                Basic Info
              </Heading>

              {/* TITLE */}
              <FormControl mb='1.125rem'>
                <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                <Input
                  name='fullName'
                  {...register('fullName')}
                  border='1px solid'
                  borderColor='progress_bg'
                  rounded='none'
                  boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
                />
                <FormErrorMessage>
                  {errors?.fullName && errors?.fullName?.message}
                </FormErrorMessage>
              </FormControl>

              {/* avatar */}
              <FormControl mb='1.125rem'>
                <FormLabel htmlFor='avatarUrl'>Avatar Url</FormLabel>
                <Input
                  name='avatarUrl'
                  {...register('avatarUrl')}
                  border='1px solid'
                  borderColor='progress_bg'
                  rounded='none'
                  boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
                />
                <FormErrorMessage>
                  {errors?.avatarUrl && errors?.avatarUrl?.message}
                </FormErrorMessage>
              </FormControl>

              {/* email */}
              <FormControl mb='1.125rem'>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  name='email'
                  {...register('email')}
                  border='1px solid'
                  borderColor='progress_bg'
                  rounded='none'
                  boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
                />
                <FormErrorMessage>
                  {errors?.email && errors?.email?.message}
                </FormErrorMessage>
              </FormControl>

              <Flex dir='row'>
                {/* oldPassword */}
                <FormControl mb='1.125rem' mr='1rem'>
                  <FormLabel htmlFor='oldPassword'>Old Password</FormLabel>
                  <Input
                    name='oldPassword'
                    {...register('oldPassword')}
                    border='1px solid'
                    borderColor='progress_bg'
                    rounded='none'
                    boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
                  />
                  <FormErrorMessage>
                    {errors?.oldPassword && errors?.oldPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                {/* oldPassword */}
                <FormControl mb='1.125rem' ml='1rem'>
                  <FormLabel htmlFor='newPassword'>New Password</FormLabel>
                  <Input
                    name='newPassword'
                    {...register('newPassword')}
                    border='1px solid'
                    borderColor='progress_bg'
                    rounded='none'
                    boxShadow='0 0 2px 2px rgba(0, 0, 0, 0.02) inset'
                  />
                  <FormErrorMessage>
                    {errors?.newPassword && errors?.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <Button my='1rem' type='submit' colorScheme='blue' size='lg'>
                Submit Changes
              </Button>
            </Flex>
          </Flex>
        </Container>

        </Flex>
      </Layout>
    )
  }

  // no logged user, redirect
  return <Layout SEO={{ title: 'Loading - VR Funds' }}>Loading...</Layout>
}
