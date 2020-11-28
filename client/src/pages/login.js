import React,{useState} from 'react'
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import NextLink from 'next/link'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Box, Button, Flex,Link} from '@chakra-ui/react'
import Layout from '../components/Layout';

// login Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required').min(4, 'Too short'),
});

export default function login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <Box as='main' py={20} bgColor='gray.100'>
        <Flex m='auto' direction='column' alignItems='center'>
          <Flex direction='column' alignItems='center'>
            {/* {actionErr} */}
            {/* {currentUser && currentUser.email} */}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                try {
                  // setActionErr('');
                  setIsLoading(false);
                  await login(values.email, values.password);
                  history.push('/dashboard');
                } catch {
                  notify({
                    type: 'danger',
                    text:
                      'Failed to log you in. Make Sure your login information is correct.',
                  });
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col items-center shadow-lg rounded-xl">
                  <div className="bg-gray-100 flex flex-col w-full rounded-xl">
                    {/* NAV */}
                    <div className="bg-white flex flex-row whitespace-no-wrap w-full rounded-t-lg">
                      <Flex direction='row' w='100%'>
                        {/* LOGIN */}
                        <Button
                        className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500"
                        >
                          Login
                        </Button>
                        <NextLink
                          href="/signup"
                          >
                          <Button
                            w='50%'
                            textColor='gray.600'
                            className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-center"
                          >
                          {/* SIGN UP */}
                          Sign Up
                          </Button>
                        </NextLink>
                      </Flex>
                    </div>
                    {/* EMAIL */}
                    <Box p={8}>
                      <Flex direction='column' mb={4}>
                        <label
                          htmlFor="email"
                          className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                        >
                          {' '}
                          Email{' '}
                        </label>
                        <Box pos='relative'>
                          {/* ICON */}
                          <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                            <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                              <MdEmail />
                            </div>
                          </div>
                          {/* INPUT */}
                          <Field
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                          />
                        </Box>
                        {errors.email && touched.email ? (
                          <Flex alignItems='center' fontSize='md'
                          textColor='red'
                          fontSize='sm'
                          mt={1}
                          ml={1}>
                            {errors.email}{' '}
                          </Flex>
                        ) : null}
                      </Flex>
                      {/* PASSWORD */}
                      <Flex direction='column' mb={4}>
                        <label
                          htmlFor="password"
                          className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                        >
                          {' '}
                          Password{' '}
                        </label>
                        <div className="relative">
                          {/* ICON */}
                          <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                            <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                              <FaLock />
                            </div>
                          </div>
                          {/* INPUT */}
                          <Field
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            className="t
                        ext-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12 border-grey-500"
                          />
                        </div>

                        {/* ERROR MESSAGE
                         */}
                        {errors.password && touched.password ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.password}{' '}
                          </span>
                        ) : null}
                      </Flex>
                    </Box>
                    {/* FORGOT PASSWORD */}
                    <Box px={8} alignItems='center' mt={-4} mb={4}>
                      <NextLink href="/forgot-password" className="hover:underline">
                        Forgot Password
                      </NextLink>
                    </Box>
                    {/* button */}
                    <Box textAlign='center'>
                      <Button
                        className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-b-lg px-6 py-3
                    block shadow-xl hover:text-white hover:bg-black"
                        disabled={isLoading}
                      >
                        Login
                      </Button>
                    </Box>
                  </div>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}
