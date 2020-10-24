import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({
  hX = 0,
  hY = 0,
  vX = 0,
  vY = 0,
  vZ = 1,
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: hY,
          x: hX,
          z: -99,
        },
        visible: {
          opacity: 1,
          y: vY,
          x: vX,
          z: vZ,
          transition: { delay: 0.2, type: 'spring', stiffness: 40 },
        },
      }}
      initial="hidden"
      animate="visible"
      className="max-w-xs rounded-lg flex flex-col shadow-md m-auto relative bg-white"
    >
      <span className="flex flex-col relative">
        <img
          className="rounded-t-lg"
          src="https://directory-rose.now.sh/content/img/photo/photo-1467987506553-8f3916508521.jpg"
          alt="test"
        />
        <span className="absolute bottom-0 right-0 z-10 mb-4 mr-4 bg-indigo-400 text-white text-sm px-2 rounded-full tracking-wider">
          Fundrasing
        </span>
      </span>
      <div className="flex flex-col w-full p-4 text-gray-500">
        {/* TOP */}
        <span className="flex flex-row w-full justify-between mb-3 items-center">
          <h4 className="font-bold w-56 text-gray-700">
            Lorem ipsum dolor sit amet
          </h4>
          <span className="bg-red-400 text-white tracking-wide font-semibold text-xs py-1 px-2 rounded-full">
            Category
          </span>
        </span>
        {/* content */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        {/* Progress bar */}
        <div className="relative pt-1 my-4">
          <p className="text-center text-xs font-semibold">89%</p>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: '89%' }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
          {/* info */}
          <div className="flex flex-row justify-around">
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-gray-700">$9k</h4>
              <p className="text-xs text-gray-600 uppercase">Funded</p>
            </div>
            <span className="border-r-2" />
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-gray-500">$10k</h4>
              <p className="text-xs text-gray-400 uppercase">Goal</p>
            </div>
            <span className="border-r-2" />
            <div className="flex flex-col items-center">
              <h4 className="font-bold text-gray-500">123</h4>
              <p className="text-xs text-gray-400 uppercase">Donations</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
