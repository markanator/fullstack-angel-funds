import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard';

export default function Hero() {
  return (
    <section className="flex flex-row w-full justify-end mx-auto items-center py-10">
      <div className="w-1/2 px-4 items-center m-auto my-12">
        <div className="flex flex-row relative z-50">
          <ProjectCard hX={0} hY={0} vX={0} vY={15} vZ={10} />
          <ProjectCard hX={-100} hY={5} vX={-150} vY={25} vZ={-20} />
        </div>
      </div>
      <div className="w-1/2 px-4 ml-4">
        <h1 className="text-6xl font-bold mb-12 leading-none">
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
    </section>
  );
}
