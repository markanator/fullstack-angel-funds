import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiSlack, FiGithub } from 'react-icons/fi';
import { FaTwitch } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="container m-auto items-center text-center flex flex-col w-full">
      <div className="w-full max-w-4xl border-t-2">
        <div className="inner flex flex-row mt-12 text-gray-500 mb-8 items-start text-left">
          <section className="w-1/4">
            <Link to="/" className="text-lg font-bold">
              VR Funding
            </Link>
          </section>
          <section className="w-1/4">
            <h3 className="text-base font-bold">Company</h3>
            <ul className="flex flex-col text-sm">
              <Link to="/#about">About</Link>
              <Link to="/#causes">Causes</Link>
              <Link to="/#blog">Blog</Link>
              <Link to="/#tou">Terms of Use</Link>
              <Link to="/#privacy">Privacy Policy</Link>
              <Link to="/#sitemap">Sitemap</Link>
            </ul>
          </section>
          <section className="w-1/4">
            <h3 className="text-base font-bold">Find Us</h3>
            <ul className="flex flex-row text-2xl">
              <a
                href="https://www.twitch.tv/palante_mark"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700"
              >
                <FaTwitch className="mr-3" />
              </a>
              <a
                href="https://twitter.com/Mark_Ambrocio1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700"
              >
                <FiTwitter className="mr-3" />
              </a>
              <a
                href="https://twitter.com/Mark_Ambrocio1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700"
              >
                <FiSlack className="mr-3" />
              </a>
              <a
                href="https://github.com/markanator/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700"
              >
                <FiGithub />
              </a>
            </ul>
          </section>
          <section className="w-1/4">
            <h3 className="text-base font-bold">Newsletter</h3>
            <p className="text-sm">
              We respect your privacy and won't annoy you.
            </p>
          </section>
        </div>
      </div>
      <p className="text-gray-600 py-3">
        Copyright © 2020 Mark Ambrocio. All rights reserved. | Made with{' '}
        <span role="img" aria-label="love" title="love">
          💖
        </span>
        in Chicago,IL.
      </p>
    </footer>
  );
}
