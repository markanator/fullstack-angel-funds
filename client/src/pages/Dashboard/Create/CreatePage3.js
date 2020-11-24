/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
//
import { useNewProject } from '../../../context/CreateProject/NewProjectContext';

// styles

export default function CreatePage3({ setPageCount, pageCount, linkFix }) {
  const history = useHistory();
  const { pageID } = useParams();
  const { newProject, setImageContent, uploadImages } = useNewProject();
  // dropzone stuff
  const [files, setFiles] = useState([...newProject.project_images] || []);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    maxSize: 2000000,
    disabled: files.length >= 3,
    accept: 'image/jpeg,image/png',
    onDropAccepted: (acceptedFiles) => {
      // console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setTimeout(() => {
        setImageContent([...acceptedFiles]);
      }, 200);
    },
    onDropRejected: (event) => {
      // console.log(event);
      alert(event[0]?.errors[0]?.message);
    },
  });

  // file stuff

  const handleCancel = () => {
    console.log('User wants to go back...');
    history.push(`${linkFix}/2`);
  };

  const handleNext = async () => {
    console.log('uploading files');
    const imageRes = await uploadImages();
    console.log(imageRes);
  };

  return (
    <div className="w-full max-w-5xl">
      {/* header */}
      <header className="border-b-2 border-gray-200 py-6 px-2 flex flex-row justify-between items-center">
        {/* EDIT STEP NAME HERE */}
        <h1 className="text-3xl">
          Project <b>Images</b>
        </h1>
        <span>
          {/* CANCEL BTN */}
          <button
            type="button"
            className="text-base text-gray-600 px-8 py-3 bg-gray-200 rounded-full mr-2 shadow font-bold hover:bg-gray-300"
            onClick={() => {
              setPageCount(2);
              handleCancel();
            }}
          >
            {pageCount > 1 ? 'Back' : 'Cancel'}
          </button>
          {/* NEXT BTN */}
          {pageID < 5 ? (
            <Link
              type="button"
              onClick={() => {
                setPageCount(pageCount + 1);
                handleNext();
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
        {/* DROPZONE */}
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRootProps({
            className:
              'dropzone border-2 border-gray-300 border-dashed px-16 py-8 text-center rounded-2xl',
          })}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input {...getInputProps()} />
          <h2 className="text-2xl">
            Drag 'n' drop some files here, or click to select files
          </h2>
          <p>Limit: 3 images. Images must be 2MB or smaller in size.</p>
          <em className="text-sm text-center text-gray-400 ">
            (Only *.jpeg and *.png images will be accepted)
          </em>
        </div>
        <aside className="w-full flex flex-col">
          <p className="text-left m-auto pt-4">Preview:</p>
          <div className="flex flex-row flex-wrap pt-4 m-auto">
            {files.map((file) => (
              <div
                key={file.name}
                className="inline-flex border-2 solid border-gray-200 mb-2 mr-2 w-24 h-24 p-1 box-border"
              >
                <div className="flex min-w-0 overflow-hidden">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="block w-auto h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
        <button
          type="button"
          onClick={() => handleNext()}
          className="hover:underline text-xs text-gray-300"
        >
          Print Dropzone File Values
        </button>
      </section>
    </div>
  );
}
