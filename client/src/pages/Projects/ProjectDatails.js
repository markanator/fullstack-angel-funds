import React from 'react';
import { useParams } from 'react-router-dom';
// locals
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';

export default function ProjectDatails() {
  const { slug } = useParams();
  const imageURL =
    'https://images.unsplash.com/photo-1587400520111-af8b9a6ea5ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=50';
  const projectDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus risus, blandit in eros nec, pretium fermentum urna.';
  return (
    <Layout>
      <SEO title={slug} image={imageURL} description={projectDescription} />
      <main className="container m-auto mt-16">
        <div className="flex flex-row w-full h-auto">
          {/* <!-- leftside --> */}
          <div className="w-1/2 flex flex-col p-4">
            <img className="rounded-lg" src={imageURL} alt="test" />
          </div>
          {/* <!-- RIGHT side --> */}
          <div className="w-1/2 flex flex-col p-4 justify-between">
            {/* <!-- HEADER --> */}
            <div className="flex flex-row justify-between mb-4">
              <h1 className="text-xl font-bold">{slug}</h1>
              <span>Category</span>
            </div>
            {/* <!-- DESCRIPTION --> */}
            <div className="mb-4">
              <p className="text-gray-600">{projectDescription}</p>
            </div>
            {/* <!-- PROGRESS --> */}
            <div className="relative pt-1">
              <span className="text-gray-700 text-xs font-bold mb-6">30%</span>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: '30%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                />
              </div>
            </div>
            {/* <!-- money INFO --> */}
            <div className="flex flex-row text-sm justify-around text-center my-4">
              {/* <!-- left 1 --> */}
              <div className="flex flex-col justify-center bg-gray-400 py-2 px-4 rounded-lg">
                <p className="font-bold">01 : 12 : 45 : 55</p>
                <p className="text-xs uppercase">Funding Ends</p>
              </div>
              {/* <!-- left 2 --> */}
              <div className="flex flex-col justify-center">
                <p className="font-bold">$150K</p>
                <p className="text-xs uppercase">Funded</p>
              </div>
              <div className="h-10 border border-gray-400 mt-2" />
              {/* <!-- left 3 --> */}
              <div className="flex flex-col justify-center">
                <p className="font-bold">$350K</p>
                <p className="text-xs uppercase">Min Goal</p>
              </div>
              <div className="h-10 border border-gray-400 mt-2" />
              {/* <!-- last 4 --> */}
              <div className="flex flex-col justify-center">
                <p className="font-bold">$150K</p>
                <p className="text-xs uppercase">Stretch Goal</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="bg-teal-400 py-2 px-6 rounded-full text-sm text-white"
              >
                Fund this Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
