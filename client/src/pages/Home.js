import React from 'react';
import { Link } from 'react-router-dom';
// locals
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <main className="container m-auto">
        <div className="flex flex-row w-full justify-end mx-auto items-center my-20">
          <div className="w-1/2 px-4 mr-4">
            <img
              src="https://img.favpng.com/14/14/18/business-card-design-business-cards-project-manager-visiting-card-png-favpng-pztaaG7AfXZBk5YFvxz2MwvkB.jpg"
              alt="projects"
            />
          </div>
          <div className="w-1/2 px-4 ml-4">
            <h1 className="text-5xl font-bold mb-6 leading-none">
              <span className="text-gray-500">Here</span> ideas
              <br />
              <span className="text-gray-500">become</span> reality.
            </h1>
            <Link
              className="bg-teal-400 text-white tracking-widest text-sm py-3 px-6 rounded-full shadow-xl transition-colors duration-200 hover:bg-teal-500 hover:text-gray-200 focus:bg-teal-600 focus:text-gray-500"
              to="/project/test-slug-here"
            >
              Discover Projects
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
