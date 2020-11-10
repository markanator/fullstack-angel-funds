/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// locals
import { useNewProject } from '../../../context/CreateProject/NewProjectContext';

// login Schema
const projectSchema = Yup.object().shape({
  title: Yup.string()
    .min(8, 'Title too short.')
    .max(64, 'Title is too long.')
    .required('Required'),
  description: Yup.string()
    .min(100, 'Description too short.')
    .required('Required'),
});

export default function CreatePage2({ setPageCount, pageCount, linkFix }) {
  const { newProject, setOverviewDeets } = useNewProject();
  const history = useHistory();
  const { pageID } = useParams();

  const handleCancel = () => {
    console.log('User wants to go back...');
    history.push(`${linkFix}/1`);
  };

  return (
    <Formik
      initialValues={{
        title: newProject.title,
        description: newProject.description,
      }}
      validationSchema={projectSchema}
      onSubmit={(values) => {
        setPageCount(pageCount + 1);
        // setTitle(values.title);
        setTimeout(() => {
          console.log('user submitted content');
          setOverviewDeets(values.title, values.description);
          history.push(`${linkFix}/3`);
        }, 500);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full max-w-5xl">
          {/* header */}
          <header className="border-b-2 border-gray-200 py-6 px-2 flex flex-row justify-between items-center">
            {/* EDIT STEP NAME HERE */}
            <h1 className="text-3xl">
              Project <b>Overview</b>
            </h1>
            <span>
              {/* CANCEL BTN */}
              <button
                type="button"
                className="text-base text-gray-600 px-8 py-3 bg-gray-200 rounded-full mr-2 shadow font-bold hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setPageCount(pageCount - 1);
                  handleCancel();
                }}
              >
                {pageCount > 1 ? 'Back' : 'Cancel'}
              </button>
              {/* NEXT BTN */}
              {pageID < 5 ? (
                <button
                  type="submit"
                  className="text-base text-white px-8 py-3 bg-indigo-500 rounded-full shadow-lg font-bold hover:bg-indigo-600"
                >
                  Next
                </button>
              ) : (
                'Scroll below to submit'
              )}
            </span>
          </header>
          <div className="pt-12  flex flex-col items-center">
            {/* INSTRUCTIONS TEXT */}
            <p className="mb-8 text-gray-500">
              Enter a description for your project, sell it!
            </p>
            {/* ACTUAL CONTENT HERE */}
            <div className="flex flex-col" style={{ width: '500px' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="title">
                Project Title
                <br />
                <Field
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  className="text-sm p-1 sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
                />
              </label>
              {errors.title && touched.title ? (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.title}{' '}
                </span>
              ) : null}
              <label htmlFor="description">
                Project Description
                <br />
                {/* eslint-disable-next-line react/self-closing-comp */}
                <Field
                  as="textarea"
                  type="textarea"
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="Enter a Project description"
                  className="text-sm p-1 sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
                ></Field>
              </label>
              {errors.description && touched.description ? (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.description}{' '}
                </span>
              ) : null}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
