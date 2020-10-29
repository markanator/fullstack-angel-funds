import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// locals
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNotify } from '../context/Notifications/NotifcationProvider';

// validation
const resetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
});

export default function ForgotPass() {
  const notify = useNotify();
  const { resetPassword } = useAuth();
  const [actionErr, setActionErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <Layout>
      <main className="py-20 bg-gray-100">
        <div className="container m-auto flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={resetSchema}
              onSubmit={async (values) => {
                // console.log(values);
                try {
                  setMessage('');
                  setActionErr('');
                  // await resetPassword(values.email);
                  notify({
                    type: 'info',
                    text:
                      'If the email exists, please be sure to check your inbox for further instructions.',
                  });
                } catch {
                  setActionErr('Failed to reset password!');
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
                          type="button"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none
                      text-blue-500 border-b-2 font-medium border-blue-500 text-center"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="w-1/2 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-center"
                        >
                          {/* SIGN UP */}
                          Sign Up
                        </Link>
                      </nav>
                    </div>

                    <h1 className="text-center pt-4 text-lg font-bold">
                      Forgot Password
                    </h1>

                    {/* EMAIL */}
                    <div className="px-8 py-4">
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
                            className="t
                        ext-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.email}{' '}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* button */}
                    <div>
                      <button
                        type="submit"
                        className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-b-lg px-6 py-3
                    block shadow-xl hover:text-white hover:bg-black"
                      >
                        Reset Password
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
