/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
//
import { useNewProject } from '../../../context/CreateProject/NewProjectContext';

export default function CreatePage1({ setPageCount, pageCount, linkFix }) {
  // const [pageCount, setPageCount] = useState(1);
  const { newProject, setCat } = useNewProject();
  const history = useHistory();
  const { pageID } = useParams();

  const projectTypes = [
    'Experience',
    'Narrative Experience',
    'Supply Chain',
    'Other',
    'Security',
    'Security1',
    'Security2',
    'Security3',
    'Security4',
    'Security5',
    'Security6',
    'Security7',
    'Security8',
    'Security9',
    'Security10',
  ];

  const CategoryButton = ({ title }) => (
    <button
      type="button"
      onClick={() => {
        setCat(title);
      }}
      className={`flex flex-row ${
        newProject.category === title
          ? 'bg-indigo-200 px-4 py-1 rounded-full text-indigo-600 font-bold m-2 w-auto'
          : 'bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto'
      }`}
    >
      {title}
      {newProject.category === title ? (
        <span className="-mr-2 pl-1 text-lg text-indigo-600">
          <FaCheckCircle />
        </span>
      ) : (
        <span className="-mr-2 pl-1 text-lg text-indigo-600" />
      )}
    </button>
  );

  const handleCancel = () => {
    console.log('User wants to stop...');
    history.push('/dashboard');
  };

  return (
    <div className="w-full max-w-5xl">
      {/* header */}
      <header className="border-b-2 border-gray-200 py-6 px-2 flex flex-row justify-between items-center">
        {/* EDIT STEP NAME HERE */}
        <h1 className="text-3xl">
          Project <b>Category</b>
        </h1>
        <span>
          {/* CANCEL BTN */}
          <button
            type="button"
            className="text-base text-gray-600 px-8 py-3 bg-gray-200 rounded-full mr-2 shadow font-bold hover:bg-gray-300"
            onClick={(e) => {
              setPageCount(pageCount - 1);
              handleCancel();
            }}
          >
            {pageCount > 1 ? 'Back' : 'Cancel'}
          </button>
          {/* NEXT BTN */}
          {pageID < 5 ? (
            <Link
              type="button"
              onClick={(e) => {
                setPageCount(pageCount + 1);
                // e.preventDefault();
              }}
              className="text-base text-white px-8 py-3 bg-indigo-500 rounded-full shadow-lg font-bold hover:bg-indigo-600"
              to={`${linkFix}/${pageCount + 1}`}
            >
              Next
            </Link>
          ) : (
            'Scroll below to submit'
          )}
        </span>
      </header>

      <section className="pt-12  flex flex-col items-center">
        {/* INSTRUCTIONS TEXT */}
        <p className="mb-8 text-gray-500">
          Select the category that best fits you project.
        </p>
        {/* ACTUAL CONTENT HERE */}
        <ul className="flex max-w-3xl flex-wrap items-center justify-center m-auto w-auto">
          {projectTypes.map((type, idx) => (
            <CategoryButton key={`${idx}-${type}`} title={type} />
          ))}
        </ul>
      </section>
    </div>
  );
}
