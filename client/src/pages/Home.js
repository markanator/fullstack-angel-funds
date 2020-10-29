import React from 'react';
import { Link } from 'react-router-dom';
// locals
import Layout from '../components/Layout';
import Hero from '../components/homeHero/Hero';
import FlowShowcase from '../components/homeShowcase/FlowShowcase';
import HomeInvitation from '../components/homeInvitation/HomeInvitation';
// context
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  return (
    <Layout>
      <main className="container m-auto">
        {/* Hero Section */}
        <Hero />
        {/* Featured on Section */}
        <section className="m-auto py-8">
          <div className="text-center">
            <h4 className="text-gray-400 text-sm uppercase font-semibold">
              Featured on
            </h4>
          </div>
        </section>
        {/* Flow Showcase Section */}
        <FlowShowcase />
        {/* JOIN THE COMMUNITY */}
        <HomeInvitation />
        {/* GET STARTED */}
        <section className="">
          <div className="m-auto max-w-5xl my-20">
            <div className="w-full items-center m-auto">
              <div className="inner max-w-4xl m-auto">
                <div className="shadow-md border-purple-500 py-4 px-8 rounded-lg flex flex-col border-t-8 w-full">
                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-col">
                      <h4 className="font-bold text-base leading-4 text-gray-600">
                        Ready to start?
                      </h4>
                      <h3 className="text-gray-800 text-2xl font-bold leading-7">
                        Join today, start from scratch <br />
                        and launch tomorrow!
                      </h3>
                    </span>
                    <span>
                      <Link
                        to={`${
                          currentUser && currentUser.email
                            ? '/dashboard'
                            : '/signup'
                        }`}
                        className="bg-purple-500 font-bold uppercase text-white tracking-widest text-base py-3 px-6 rounded-full shadow-lg transition-colors duration-200 hover:bg-purple-600 hover:text-gray-200 focus:bg-purple-600 focus:text-gray-500"
                      >
                        {currentUser && currentUser.email
                          ? 'Get Started!'
                          : 'Sign Up!'}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
