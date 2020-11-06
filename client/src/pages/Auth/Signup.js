import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// icons
import { FaLock, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
// form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// auth stuff
import { useAuth } from '../../context/AuthContext';
// locals
import Layout from '../../components/Layout';
// Signup Schema
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  username: Yup.string().min(4, 'Username too short').required('Required'),
  password: Yup.string().required('Required').min(4, 'Too short'),
  termsAgree: Yup.boolean()
    .oneOf([true], 'Must Accept Terms and Conditions')
    .required('Required'),
});

export default function Signup() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const { signup, currentUser } = useAuth();
  const [actionErr, setActionErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  return (
    <Layout>
      <main className="py-20 bg-gray-100">
        <div className="container m-auto flex flex-col items-center">
          <div className="flex flex-col items-center">
            {currentUser && currentUser.email}
            <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
                termsAgree: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                await sleep(500);
                // console.log(values);
                try {
                  setActionErr('');
                  setIsLoading(true);
                  await signup(values.email, values.password);
                  history.push('/dashboard');
                } catch {
                  setActionErr('Oops, an error occured.');
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col items-center shadow-lg rounded-xl">
                  <div className="bg-gray-100 flex flex-col w-full rounded-xl">
                    {/* NAV */}
                    <div className="bg-white flex flex-row whitespace-no-wrap w-full rounded-t-lg">
                      <nav className="flex flex-row w-full">
                        {/* LOGIN */}
                        <Link
                          to="/login"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-center"
                        >
                          Login
                        </Link>
                        <button
                          type="button"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-center text-blue-500 border-b-2 font-medium border-blue-500"
                        >
                          {/* SIGN UP */}
                          Sign Up
                        </button>
                      </nav>
                    </div>
                    {/* INPUTS */}
                    <div className="p-8">
                      {/* EMAIL */}
                      <div className="flex flex-col mb-4">
                        <label
                          htmlFor="email"
                          className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                        >
                          {' '}
                          Email{' '}
                        </label>
                        <div className="relative">
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
                            type="email"
                            placeholder="email@example.com"
                            className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.email}{' '}
                          </span>
                        ) : null}
                      </div>
                      {/* Username */}
                      <div className="flex flex-col mb-4">
                        <label
                          htmlFor="username"
                          className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                        >
                          {' '}
                          User Name{' '}
                        </label>
                        <div className="relative">
                          {/* ICON */}
                          <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                            <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                              <FaUser />
                            </div>
                          </div>
                          {/* INPUT */}
                          <Field
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Jayril Smith"
                            className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                          />
                        </div>
                        {errors.username && touched.username ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.username}{' '}
                          </span>
                        ) : null}
                      </div>
                      {/* PASSWORD */}
                      <div className="flex flex-col mb-4">
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
                            name="password"
                            type="password"
                            placeholder="password"
                            className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12 border-grey-500"
                          />
                        </div>
                        {/* ERROR MESSAGE */}
                        {errors.password && touched.password ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.password}{' '}
                          </span>
                        ) : null}
                      </div>
                      {/* TERMS OF USE */}
                      <div className="flex flex-col justify-start">
                        <label
                          htmlFor="termsAgree"
                          className="text-gray-500 font-bold my-4 flex items-center"
                        >
                          <Field
                            className="leading-loose text-pink-600 top-0"
                            type="checkbox"
                            name="termsAgree"
                            id="termsAgree"
                          />
                          <span className="ml-4 text-sm py-2 text-gray-600 text-left">
                            Accept the{' '}
                            <Link
                              to="/#"
                              className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
                            >
                              {' '}
                              Terms and Conditions{' '}
                            </Link>{' '}
                            of the site <br />
                            and
                            <Link
                              to="/#"
                              className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
                            >
                              {' '}
                              the information data policy.
                            </Link>
                          </span>
                        </label>
                        {errors.termsAgree && touched.termsAgree ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                            {errors.termsAgree}{' '}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {actionErr ? <p>{actionErr}</p> : null}
                    {/* button */}
                    <div>
                      <button
                        type="submit"
                        className={`mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-b-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black ${
                          isLoading ? 'bg-gray-400' : ''
                        }`}
                        disabled={isLoading}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </Layout>
  );
}
