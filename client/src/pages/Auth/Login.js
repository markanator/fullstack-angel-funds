import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// locals
import Layout from '../../components/Layout';
// context
import { useAuth } from '../../context/AuthContext';
import { useNotify } from '../../context/Notifications/NotifcationProvider';
import SEO from '../../components/SEO';

// login Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required').min(4, 'Too short'),
});

export default function Login() {
  const notify = useNotify();
  const history = useHistory();
  const { login, currentUser } = useAuth();
  const [actionErr, setActionErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <SEO title="Log In" />
      <main className="py-20 bg-gray-100">
        <div className="container m-auto flex flex-col items-center">
          <div className="flex flex-col items-center">
            {actionErr}
            {currentUser && currentUser.email}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                try {
                  setActionErr('');
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
                      <nav className="flex flex-row w-full">
                        {/* LOGIN */}
                        <button
                          type="button"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none
                      text-blue-500 border-b-2 font-medium border-blue-500"
                        >
                          Login
                        </button>
                        <Link
                          to="/signup"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-center"
                        >
                          {/* SIGN UP */}
                          Sign Up
                        </Link>
                      </nav>
                    </div>
                    {/* EMAIL */}
                    <div className="p-8">
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
                      </div>
                    </div>
                    {/* FORGOT PASSWORD */}
                    <div className="px-8 text-center -mt-4 mb-4">
                      <Link to="/forgot-password" className="hover:underline">
                        Forgot Password
                      </Link>
                    </div>
                    {/* button */}
                    <div>
                      <button
                        type="submit"
                        className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-b-lg px-6 py-3
                    block shadow-xl hover:text-white hover:bg-black"
                        disabled={isLoading}
                      >
                        Login
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
