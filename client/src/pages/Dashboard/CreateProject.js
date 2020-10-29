import React from 'react';
import CreateLayout from '../../components/CreateLayout';

export default function CreateProject() {
  return (
    <CreateLayout>
      <main className="w-full h-full">
        <div
          className="w-full flex flex-row flex-no-wrap"
          style={{ height: 'calc(100vh - 82px)' }}
        >
          {/* LEFT */}
          <aside className="h-full w-1/12 flex flex-col border-r-2 border-gray-500 bg-white">
            <ul className="h-full text-sm text-center text-gray-500">
              <li className="flex flex-col items-center p-4">
                <i className="fas fa-list-ul text-2xl text-gray-700 bg-gray-300 p-3 rounded-full" />
                <p className="text-gray-600 font-semibold">Category</p>
              </li>
              <li className="flex flex-col items-center p-4">
                <i className="far fa-file-alt text-2xl text-gray-700" />
                <p>Overview</p>
              </li>
              <li className="flex flex-col items-center p-4">
                <i className="fas fa-photo-video text-2xl text-gray-700" />
                <p>Media</p>
              </li>
              <li className="flex flex-col items-center p-4">
                <i className="fas fa-cogs text-2xl text-gray-700" />
                <p>Details</p>
              </li>
              <li className="flex flex-col items-center p-4">
                <i className="fas fa-vote-yea text-2xl text-gray-700" />
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
                style={{ width: '20%' }}
              />
            </div>
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
                  >
                    Cancel
                  </button>
                  {/* NEXT BTN */}
                  <button
                    type="button"
                    className="text-base text-white px-8 py-3 bg-indigo-500 rounded-full shadow-lg font-bold hover:bg-indigo-600"
                  >
                    Next
                  </button>
                </span>
              </header>
              {/* MEAT AND POTATOS */}
              <div className="pt-12  flex flex-col items-center">
                {/* INSTRUCTIONS TEXT */}
                <p className="mb-8 text-gray-500">
                  Select the category that best fits you project.
                </p>
                {/* ACTUAL CONTENT HERE */}
                <ul className="flex max-w-3xl flex-wrap items-center justify-center m-auto w-auto">
                  <li className="flex flex-row bg-indigo-200 px-4 py-1 rounded-full text-indigo-600 font-bold m-2 w-auto">
                    Supply chain
                    <span className="-mr-2 pl-1 text-lg text-indigo-600">
                      <i className="fas fa-check-circle" />
                    </span>
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto hover:bg-gray-200 pointer-events-none">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                  <li className="flex flex-row bg-white border-2 px-4 py-1 rounded-full text-gray-600 font-normal m-2 w-auto">
                    Security
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </CreateLayout>
  );
}
