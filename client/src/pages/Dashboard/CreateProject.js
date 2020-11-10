/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
// icons
import {
  FaListUl,
  FaFileAlt,
  FaPhotoVideo,
  FaCogs,
  FaVoteYea,
} from 'react-icons/fa';
// locals
import CreateLayout from '../../components/CreateLayout';
import CancelModal from '../../components/CreatePage/CancelModal';
// import { useNewProject } from '../../context/CreateProject/NewProjectContext';
import CreatePage1 from './Create/CreatePage1';
import CreatePage2 from './Create/CreatePage2';
import SEO from '../../components/SEO';
import CreatePage3 from './Create/CreatePage3';

export default function CreateProject() {
  const { path } = useRouteMatch();
  const { pageID } = useParams();
  const [pageCount, setPageCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const linkFix = path.toString().split('/').splice(0, 3).join('/');

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <CreateLayout>
      <SEO title="New Projecet" />
      <CancelModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        headerText="Are you sure you want quit?"
        bodyText="Test Body"
      />
      <main className="w-full h-full">
        <div
          className="w-full flex flex-row flex-no-wrap"
          style={{ height: 'calc(100vh - 82px)' }}
        >
          {/* LEFT */}
          <aside className="h-full w-1/12 flex flex-col border-r-2 border-gray-500 bg-white">
            <ul className="h-full text-sm text-center text-gray-500">
              <li className="flex flex-col items-center p-4">
                {/* className="text-2xl text-gray-700 bg-gray-300 p-3 rounded-full"  */}
                <FaListUl />
                <p className="text-gray-600 font-semibold">Category</p>
              </li>
              <li className="flex flex-col items-center p-4">
                {/* className="far fa-file-alt text-2xl text-gray-700"  */}
                <FaFileAlt />
                <p>Overview</p>
              </li>
              <li className="flex flex-col items-center p-4">
                {/* className="fas fa-photo-video text-2xl text-gray-700"  */}
                <FaPhotoVideo />
                <p>Media</p>
              </li>
              <li className="flex flex-col items-center p-4">
                {/* className="fas fa-cogs text-2xl text-gray-700" */}
                <FaCogs />
                <p>Details</p>
              </li>
              <li className="flex flex-col items-center p-4">
                {/* className="fas fa-vote-yea text-2xl text-gray-700" */}
                <FaVoteYea />
                <p>Publish</p>
              </li>
            </ul>
          </aside>
          {/* RIGHT */}
          <div className="h-full w-11/12 flex flex-col items-center">
            {/* progress bar */}
            <div className="w-full bg-gray-100">
              <div
                className="bg-blue text-xs leading-none bg-blue-500 py-1 rounded-r-lg"
                // edit length here
                style={{ width: `${(pageID / 5) * 100}%` }}
              />
            </div>

            {/* NESTED COMPONENTS */}
            {pageID === '1' ? (
              <CreatePage1
                setPageCount={setPageCount}
                pageCount={pageCount}
                linkFix={linkFix}
                openModal={openModal}
              />
            ) : (
              ''
            )}
            {pageID === '2' ? (
              <CreatePage2
                pageCount={pageCount}
                setPageCount={setPageCount}
                linkFix={linkFix}
              />
            ) : (
              ''
            )}
            {pageID === '3' ? (
              <CreatePage3
                pageCount={pageCount}
                setPageCount={setPageCount}
                linkFix={linkFix}
              />
            ) : (
              ''
            )}
            {pageID === '4' ? <h1>test 4</h1> : ''}
            {pageID === '5' ? <h1>test 5</h1> : ''}
          </div>
        </div>
      </main>
    </CreateLayout>
  );
}
