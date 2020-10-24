import React from 'react';
import { FaRegLightbulb, FaHandsHelping } from 'react-icons/fa';
import { BiDonateHeart } from 'react-icons/bi';

export default function FlowShowcase() {
  return (
    <section id="home__flow" className="m-auto max-w-4xl my-10">
      <div className="flex flex-col">
        {/* Section Header */}
        <div className="m-auto">
          <h2 className="text-4xl text-left text-gray-800 mb-12">
            Get help <span className="font-bold">bootstrapping</span>
            <br />
            your{' '}
            <span className="font-bold italic">Virtual Reality Venture</span>
          </h2>
        </div>

        {/* CARD ONE */}
        <div className="m-auto flex flex-row mb-8">
          {/* LEFT */}
          <div className=" bg-gradient-to-r from-purple-200 w-1/2 rounded-lg p-6 h-auto text-purple-800 font-medium">
            <div className="flex flex-row items-center">
              <div className="inner__left w-2/3">
                <span className="bg-purple-700 py-1 px-3 text-white tracking-wider uppercase text-xs rounded-xl">
                  Initial Phase
                </span>
                <ul className="mt-6">
                  <li className="mb-3">
                    - Go from raw experience to refined story.
                  </li>
                  <li>- Build a team to start working on a product.</li>
                </ul>
              </div>
              <FaRegLightbulb className="w-1/3 text-6xl" />
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-1/2 p-4 ml-12">
            <ul className="text-gray-600">
              <li>
                <h4 className=" text-gray-800 text-2xl font-bold mb-3">
                  Get help refining your business
                </h4>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam, eius molestias id laboriosam soluta nisi expedita.
                  Illo similique quibusdam aliquid, aut alias accusantium rem ab
                  labore ipsum placeat dolorem eos.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* CARD Two */}
        <div className="m-auto flex flex-row mb-8">
          {/* LEFT */}
          <div className=" bg-gradient-to-r from-indigo-200 w-1/2 rounded-lg p-6 h-auto text-indigo-800 font-medium">
            <div className="flex flex-row items-center">
              <div className="w-2/3">
                <span className="bg-indigo-700 py-1 px-3 text-white tracking-wider uppercase text-xs rounded-xl">
                  Bootstrapping
                </span>
                <ul className="mt-6">
                  <li className="mb-3">
                    - We help you navigate the fundraising stage
                  </li>
                  <li>
                    - Get help setting up a company budget to stay profitable
                  </li>
                </ul>
              </div>
              <BiDonateHeart className="w-1/3 text-6xl" />
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-1/2 p-4 ml-12">
            <ul className="text-gray-600">
              <li>
                <h4 className=" text-gray-800 text-2xl font-bold mb-3 leading-7">
                  Focus on your venture,
                  <br /> we take care of raising funds
                </h4>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam, eius molestias id laboriosam soluta nisi expedita.
                  Illo similique quibusdam aliquid, aut alias accusantium rem ab
                  labore ipsum placeat dolorem eos.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* CARD THREE */}
        <div className="m-auto flex flex-row mb-8">
          {/* LEFT */}
          <div className=" bg-gradient-to-r from-green-200 w-1/2 rounded-lg p-6 h-auto text-green-800 font-medium">
            <div className="flex flex-row items-center">
              <div className="w-2/3">
                <span className="bg-green-700 py-1 px-3 text-white tracking-wider uppercase text-xs rounded-xl">
                  Mentorship
                </span>
                <ul className="mt-6">
                  <li className="mb-3">
                    - We'll provide startup founders with mentoring
                  </li>
                  <li>- We host startup business workshops</li>
                </ul>
              </div>
              <FaHandsHelping className="w-1/3 text-5xl" />
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-1/2 p-4 ml-12">
            <ul className="text-gray-600">
              <li>
                <h4 className=" text-gray-800 text-2xl font-bold mb-3 leading-7">
                  Lead your team to success,
                  <br />
                  with some guidance
                </h4>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magnam, eius molestias id laboriosam soluta nisi expedita.
                  Illo similique quibusdam aliquid, aut alias accusantium rem ab
                  labore ipsum placeat dolorem eos.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
