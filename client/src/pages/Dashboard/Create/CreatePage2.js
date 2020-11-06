/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
//
import { useNewProject } from '../../../context/CreateProject/NewProjectContext';

export default function CreatePage2({ setPageCount, pageCount, linkFix }) {
  // const [pageCount, setPageCount] = useState(1);
  const { newProject, setTitle, setDescription } = useNewProject();
  const history = useHistory();
  const { pageID } = useParams();

  const handleCancel = (e) => {
    console.log('User wants to go back...');
    history.push(`${linkFix}/${pageCount - 1}`);
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
      <div className="pt-12  flex flex-col items-center">
        {/* INSTRUCTIONS TEXT */}
        <p className="mb-8 text-gray-500">
          Enter a description for your project, sell it!
        </p>
        {/* ACTUAL CONTENT HERE */}
        <form className="flex flex-col" style={{ width: '500px' }}>
          <label htmlFor="title">
            Project Title
            <br />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Project Title"
              className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
              value={newProject.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            Project Description
            <br />
            {/* eslint-disable-next-line react/self-closing-comp */}
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Enter a Project description"
              className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
              value={newProject.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </form>
      </div>
    </div>
  );
}
